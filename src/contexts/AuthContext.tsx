import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { auth, Auth } from "../services/firebase";
import { supabase } from '../services/supabase'

import { createCode } from '../hooks/useRandomCode'

type User = { // tipo do usuário
  id: string;
  name: string;
  email: string;
  avatar: string;
}

type AuthContextType = { // tipo do contexto do usuário
  user: User | undefined; // pode ter o tipo de um User ou undefined quando nenhum usuário está logado
  createNewRoom: (user: User) => Promise<string>; // quando uma função é assincrona, ela sempre devolve uma Promise (neste caso, string)
  signInWithGoogle: (createRoom?: boolean) => Promise<string>; // quando uma função é assincrona, ela sempre devolve uma Promise (neste caso, string)
  signOutGoogle: () => Promise<void>; // quando uma função é assincrona, ela sempre devolve uma Promise (neste caso, void)
}

type AuthContextProviderProps = {
  children: ReactNode
}

// Criando um contexto do tipo AuthContextType
export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  // O tipo desse estado é do tipo User.
  const [user, setUser] = useState<User>();
  const ref = useRef(true);

  async function checkIdUser(id: string) {
    /**
     * Esta função será chamada quando um usuário realizar o login.
     * 
     * Ela faz uma busca no banco, procurando por um id específico,
     * o id do usuário que acabou de fazer o login.
     * 
     * ---
     * 
     * PARAMS
     * 
     * id: string => o id que deve ser procurado.
     * 
     * ---
     * 
     * RETURNS
     * 
     * return -1 => se o retorno for null
     * 
     * return 0 => se não encontrar nenhum id na busca, significa que
     * o usuário que realizou o login, nunca logou antes nesta aplicação.
     * 
     * return 1 => se encontrar apenas um id na busca, significa que
     * o usuário que realizou o login, já fez login antes nesta aplicação.
     * 
     * return 2 => se encontrar mais de um id na busca, significa que
     * o usuário foi cadastrado mais de uma vez no banco.
     * ISSO DEVE SER TRATADO
     */
    const { data: userGetted } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
    if (userGetted === null) {
      return -1 // data é null
    } else if (userGetted.length === 0) {
      // Não foi encontrado nenhum id de usuário igual ao informado.
      // Isso significa que este usuário é novo.
      return 0
    } else if (userGetted.length === 1) {
      // Foi encontrado um id de usuário igual ao informado.
      // Isso significa que o usuário já logou antes.
      return 1
    } else {
      // Foi encontrado mais de um id de usuário igual ao informado.
      // Isso significa que o mesmo usuário foi cadastrado mais de uma vez.
      // TODO: é importante tratar isso!
      return 2
    }
  }

  async function insertNewUser(user: User) {
    /**
     * Esta função é executada quando um usuário é novo. Na primeira vez
     * em que ele faz o login.
     */
    const { data } = await supabase
      .from('users')
      .insert([user])
    return data !== null && data.length > 0
  }

  async function createNewRoom(user: User) {
    /**
     * Esta função é executada quando um usuário faz o login juntamente com
     * o desejo de criar uma nova sala. Ou quando o usuário já está logado
     * e quer criar uma nova sala.
     */

    // Cria um código para a sala
    let codeTheNewRoom = createCode()

    while (true) {
      // Faz uma busca no banco em relação ao código gerado
      const { data: codeReturned } = await supabase
        .from('rooms')
        .select('code')
        .eq('code', codeTheNewRoom)

      // Verifica se o código já existe
      if (codeReturned !== null && codeReturned.length === 0) {
        // Não existe, pode prosseguir
        break
      } else {
        // Existe, gera outro código e volta para o início do laço,
        // para uma nova verificação
        codeTheNewRoom = createCode()
      }
    }

    // Depois da verificação do código, é certeza que este ainda não
    // existe no banco, então é feito um insert com este código
    const { data, error } = await supabase
      .from('rooms')
      .insert([{ code: codeTheNewRoom, idPlayer1: user.id }])
    if (data !== null && data.length > 0 && error === null) {
      return codeTheNewRoom
    }
    return "#"
  }

  // Utilizando useEffect:
  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(auth, user => {
      if (user && ref) {
        const { displayName, photoURL, uid, email } = user;

        if (!displayName || !photoURL || !email) {
          throw new Error('Missing information from Google Acount.');
        }

        setUser({
          id: uid,
          name: displayName,
          email: email,
          avatar: photoURL,
        });
        ref.current = false
      } else {
        if (!user && ref) {
          setUser(undefined);
        } else {
          ref.current = true
        }
      }
    });

    // Sempre que é declarado um eventListener, é obrigatório se "descadastrar" desse evento no final do useEffect. (essa é uma boa prática)
    return () => {
      unsubscribe();
    }
  }, [user]);

  async function signInWithGoogle(createRoom: boolean = false) {
    const provider = new Auth.GoogleAuthProvider();
    const result = await Auth.signInWithPopup(auth, provider)

    if (result.user) {
      const { displayName, photoURL, uid, email } = result.user;

      if (!displayName || !photoURL || !email) {
        throw new Error('Missing information from Google Acount.');
      }

      const currentUser = {
        id: uid,
        name: displayName,
        email: email,
        avatar: photoURL,
      }

      setUser(currentUser);

      const refCheckIdUser = await checkIdUser(uid)
      if (refCheckIdUser === 1) {
        // Usuário encontrado
        alert('Bom te ver de novo!')
      } else if (refCheckIdUser === 0) {
        // Não há um usuário com esse id cadastrado, então... cadastra
        if (await insertNewUser(currentUser)) {
          postMessage(`Olá ${displayName.split(' ')[0]}, seja bem vindo(a)!`)
        } else {
          alert('Falha')
        }
      } else if (refCheckIdUser === 2) {
        // Mais de um usuário com este id encontrado
        alert('Deu ruim... tem mais de um cadasto com esse ID!')
      } else {
        alert('Voltou null.')
      }

      // Verifica se é preciso criar uma sala nova
      if (createRoom) {
        return await createNewRoom(currentUser)
      }
    }
    return "#"
  }

  async function signOutGoogle() {
    await Auth.signOut(auth);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, createNewRoom, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}