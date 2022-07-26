/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react';
import { supabase } from '../services/supabase'

type UserType = {
  id: string;
  name: string;
  avatar: string;
}

export function supabaseFunctions() {
  const [users, setUsers] = useState<UserType[]>([])

  async function select(table: string, columns: string, options?: string) {
    const { data } = await supabase
      .from(table)
      .select(columns)
    
    if (data !== null && data.length > 0) {
      setUsers(data)
    }
    return users
  }
}