import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'
// import { supabaseFunctions } from '../hooks/useDatabase'

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

export function Test() {
  const [users, setUsers] = useState<UserType[]>([])
  const [user, setUser] = useState<UserType>({ id: "---", name: "---", avatar: "---" })
  // const test = supabaseFunctions.select("users", "*")

  async function getUsers() {
    const { data } = await supabase
      .from('users')
      .select('*')
    // console.log(data);
    if (data !== null) {
      setUsers(data)
    }
  }

  async function checkIdUser(id: string) {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
    console.log(data);
    if (data !== null && data.length > 0) {
      setUser(data[0])
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // console.log('Teste =>', users);
  return (
    <div id="page-test">
        {users.map((user, key) => {
          return (
            <>
              <div key={key}>
                <p>{user.id}</p>
                <p>{user.name}</p>
                <p>{user.avatar}</p>
                <button onClick={() => checkIdUser(user.id)} style={{color: "#2e2e2e"}}>Checar id</button>
              </div>
            </>
          )
        })}
        <p>Id: {user.id}</p>
        <p>Name: {user.name}</p>
        <p>Avatar: {user.avatar}</p>
    </div>
  )
}