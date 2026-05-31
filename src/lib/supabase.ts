import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key'

export const supabase = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)

// ── Session expiry handler ────────────────────────────────────────────────────
// Listens for auth state changes. If the session expires or is signed out
// while the clinician is on any protected page, redirect to /auth.
if (typeof window !== 'undefined') {
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'SIGNED_OUT' || event === 'TOKEN_REFRESHED') {
      if (event === 'SIGNED_OUT') {
        const protectedPaths = ['/dashboard', '/patients', '/brief', '/account']
        const isProtected = protectedPaths.some(p => window.location.pathname.startsWith(p))
        if (isProtected) {
          window.location.href = '/auth'
        }
      }
    }
  })
}
