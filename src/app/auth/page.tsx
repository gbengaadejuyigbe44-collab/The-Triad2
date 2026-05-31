'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

function TrackerLogo() {
  return (
    <svg viewBox="0 0 64 64" width="48" height="48" className="drop-shadow-lg transition-transform group-hover:scale-105">
      <circle cx="32" cy="32" r="32" className="fill-[var(--color-bg-elevated)]" />
      <line x1="32" y1="8" x2="54" y2="44" stroke="var(--color-accent-blue)" strokeWidth="3" strokeLinecap="round" />
      <line x1="54" y1="44" x2="10" y2="44" stroke="var(--color-accent-purple)" strokeWidth="3" strokeLinecap="round" />
      <line x1="10" y1="44" x2="32" y2="8" stroke="var(--color-accent-red)" strokeWidth="3" strokeLinecap="round" />
      <polyline
        points="15,29 19,29 22,19 25,37 28,23 31,29 35,29 38,15 41,36 44,29 48,29"
        fill="none"
        stroke="var(--color-text-primary)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function AuthPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleLogin() {
    if (!email || !password) {
      setError('Please enter your email and password.')
      return
    }
    if (!supabase) {
      setError('Authentication service is not configured. Please contact support.')
      return
    }
    setLoading(true)
    setError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }
    router.push('/dashboard') // Fixed: Should go to dashboard
  }

  return (
    <div className="tracker-shell min-h-screen flex items-center justify-center px-4">
      <div className="tracker-grid" />
      <div className="tracker-card w-full max-w-md p-8 md:p-10 flex flex-col gap-8 relative z-10 animate-in fade-in zoom-in-95 duration-500">

        {/* Logo */}
        <div className="flex items-center justify-center gap-4 group">
          <TrackerLogo />
          <div>
            <div className="text-2xl font-extrabold text-[var(--color-text-primary)] tracking-wide">The Triad</div>
            <div className="text-[10px] font-bold text-[var(--color-accent-blue)] tracking-[0.2em] uppercase">Clinical Decision Support</div>
          </div>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-[var(--color-text-primary)]">Clinician Sign In</h2>
            <p className="text-sm text-[var(--color-text-secondary)] mt-2">Access is restricted to registered clinicians only.</p>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="your@email.com"
              className="tracker-input"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="••••••••"
              className="tracker-input"
            />
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-sm text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          <button
            onClick={handleLogin}
            disabled={loading}
            className="tracker-button w-full mt-2 py-3.5 relative overflow-hidden"
          >
            <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
              Sign In
            </span>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span className="ml-3 text-white font-bold">Signing in...</span>
              </div>
            )}
          </button>
        </div>

        <div className="pt-6 border-t border-[var(--color-border-soft)] text-center">
          <p className="text-xs font-medium text-[var(--color-text-secondary)]">
            For licensed healthcare professionals only<br/><span className="inline-block mt-1"></span>
            <a href="mailto:gbengaadejuyigbe4@gmail.com" className="text-[var(--color-accent-blue)] hover:underline font-bold transition-all">
              Request access
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
