import { createContext, ReactNode, useEffect, useState } from "react";
import { auth, Auth } from "../services/firebase";
import { supabase } from '../services/supabase'

type User = { // tipo do usuário
  id: string;
  name: string;
  avatar: string;
}

type AuthContextType = { // tipo do contexto do usuário
  user: User | undefined; // pode ter o tipo de um User ou undefined quando nenhum usuário está logado
  signInWithGoogle: () => Promise<void>; // quando uma função é assincrona, ela sempre devolve uma Promise (neste caso, void)
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
  const [ref, setRef] = useState(true);

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
     * 
     */
    const { data } = await supabase
      .from('users')
      .insert([user])
    return data !== null && data.length > 0
  }

  // Utilizando useEffect:
  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(auth, user => {
      if (user && ref) {
        const { displayName, photoURL, uid } = user;

        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Acount.');
        }

        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        });
        setRef(false);
      } else {
        if (!user && ref) {
          setUser(undefined);
        } else {
          setRef(true);
        }
      }
    });

    // Sempre que é declarado um eventListener, é obrigatório se "descadastrar" desse evento no final do useEffect. (essa é uma boa prática)
    return () => {
      unsubscribe();
    }
  }, [user]);

  async function signInWithGoogle() {
    const provider = new Auth.GoogleAuthProvider();
    const result = await Auth.signInWithPopup(auth, provider)
    console.log(result)

    if (result.user) {
      const { displayName, photoURL, uid } = result.user;

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Acount.');
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      });

      const refCheckIdUser = await checkIdUser(uid)
      if (refCheckIdUser === 1) {
        alert('Bom te ver de novo!')
      } else if (refCheckIdUser === 0) {
        if (await insertNewUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })) {
          postMessage(`Olá ${displayName.split(' ')[0]}, seja bem vindo(a)!`)
        } else {
          alert('Falha')
        }
      } else if (refCheckIdUser === 2) {
        alert('Deu ruim... tem mais de um cadasto com esse ID!')
      } else {
        alert('Voltou null.')
      }
    }
  }

  async function signOutGoogle() {
    await Auth.signOut(auth);
    setUser(undefined);
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, signOutGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}