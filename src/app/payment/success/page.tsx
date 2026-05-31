'use client'

import { Suspense } from 'react'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentSuccessInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const reference = searchParams.get('reference')
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(c => {
        if (c <= 1) { clearInterval(timer); router.push('/auth'); return 0 }
        return c - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [router])

  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-[#1e293b] border border-[#334155] rounded-2xl p-9 text-center">

        <div className="w-16 h-16 bg-[#052e16] border border-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#f1f5f9] mb-3">Payment Successful!</h1>
        <p className="text-[#94a3b8] text-sm mb-6">
          Your Triad subscription is now active. We've sent your login credentials to your email address.
          Please check your inbox (and spam folder) for your temporary password.
        </p>

        {reference && (
          <div className="bg-[#0f172a] border border-[#334155] rounded-xl px-4 py-3 mb-6">
            <p className="text-xs text-[#475569]">Payment Reference</p>
            <p className="text-sm font-mono text-[#94a3b8] mt-1">{reference}</p>
          </div>
        )}

        <button
          onClick={() => router.push('/auth')}
          className="w-full bg-[#0ea5e9] hover:bg-[#0284c7] text-white font-semibold rounded-xl py-3 text-sm transition-colors mb-3"
        >
          Sign In to Dashboard →
        </button>

        <p className="text-xs text-[#475569]">
          Redirecting automatically in {countdown} seconds…
        </p>
      </div>
    </div>
  )
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#0f172a]"><div className="text-[#94a3b8] text-sm">Loading…</div></div>}>
      <PaymentSuccessInner />
    </Suspense>
  )
}