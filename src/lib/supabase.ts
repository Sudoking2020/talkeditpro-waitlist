import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const hasEnv = Boolean(supabaseUrl && supabaseAnonKey)

/** Returns Supabase client when env is configured, otherwise null (test/local mode). */
export function getSupabase(): SupabaseClient | null {
  if (!hasEnv) return null
  return createClient(supabaseUrl!, supabaseAnonKey!)
}
