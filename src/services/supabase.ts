import { createClient } from '@supabase/supabase-js'

const supabaseURL = process.env.REACT_APP_SUPABASE_URL ?? ""
const supabaseKey = process.env.REACT_APP_SUPABASE_API_KEY ?? ""
const supabase = createClient(supabaseURL, supabaseKey)
if (supabaseURL === "" && supabaseKey === "") {
  throw new Error("URL e API key do supabase não existem!")
}
export {supabase}