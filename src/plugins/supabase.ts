import { createClient, type SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Try runtimeConfig first
  let url = (config.public as any)?.supabaseUrl as string | undefined || (config.public as any)?.SUPABASE_URL as string | undefined
  let key = (config.public as any)?.supabaseKey as string | undefined || (config.public as any)?.SUPABASE_ANON_KEY as string | undefined || (config.public as any)?.SUPABASE_KEY as string | undefined

  // Fallback to import.meta.env (Vite) if runtimeConfig missing
  if (!url) url = (import.meta as any).env?.NUXT_PUBLIC_SUPABASE_URL as string | undefined
  if (!key) key = (import.meta as any).env?.NUXT_PUBLIC_SUPABASE_KEY as string | undefined
  if (!key) key = (import.meta as any).env?.NUXT_PUBLIC_SUPABASE_ANON_KEY as string | undefined

  if (process.client) {
    console.log('[Supabase] URL:', url)
    console.log('[Supabase] KEY present:', Boolean(key))
  }

  if (!url || !key) {
    // Do not throw on server/client – allow app to render and component can handle missing client
    return
  }

  const client: SupabaseClient = createClient(url, key)
  return { provide: { supabase: client } }
})
