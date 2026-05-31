'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const plans = [
  {
    key: 'standard',
    name: 'Standard',
    price: '₦15,000',
    patients: 'Up to 20 patients',
    color: '#0ea5e9',
    borderColor: 'border-[#0ea5e9]/30',
    activeBorder: 'border-[#0ea5e9]',
    glowColor: 'shadow-[#0ea5e9]/20',
    features: [
      'BP & BG tracker for all patients',
      'AI trend analysis per patient',
      'Medication & side effect tracking',
      'Patient portal (self-logging)',
      'Drug-drug interaction checker',
      'ESC/ESH & ADA clinical guidelines',
    ],
    roi: '₦85,000',
    roiNote: 'net monthly from 20 patients',
  },
  {
    key: 'growth',
    name: 'Growth',
    price: '₦20,000',
    patients: 'Up to 50 patients',
    color: '#a855f7',
    borderColor: 'border-[#a855f7]/30',
    activeBorder: 'border-[#a855f7]',
    glowColor: 'shadow-[#a855f7]/20',
    popular: true,
    features: [
      'Everything in Standard',
      '50 patient slots',
      'Priority AI analysis',
      'Detailed medication response reports',
      'Adherence pattern insights',
    ],
    roi: '₦230,000',
    roiNote: 'net monthly from 50 patients',
  },
  {
    key: 'enterprise',
    name: 'Enterprise',
    price: '₦30,000',
    patients: '50+ patients',
    color: '#22c55e',
    borderColor: 'border-[#22c55e]/30',
    activeBorder: 'border-[#22c55e]',
    glowColor: 'shadow-[#22c55e]/20',
    features: [
      'Everything in Growth',
      'Unlimited patients',
      'Full clinical reference suite',
      'Emergency protocol access',
      'Priority support',
    ],
    roi: '₦470,000+',
    roiNote: 'net monthly potential',
  },
]

export default function PricingPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  const [form, setForm] = useState({ email: '', full_name: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubscribe() {
    if (!selectedPlan) { setError('Please select a plan first.'); return }
    if (!form.full_name.trim()) { setError('Please enter your full name.'); return }
    if (!form.email.trim()) { setError('Please enter your email address.'); return }
    setLoading(true)
    setError('')
    const res = await fetch('/api/payment/initiate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, full_name: form.full_name, plan: selectedPlan }),
    })
    const data = await res.json()
    if (data.error) { setError(data.error); setLoading(false); return }
    window.location.href = data.authorization_url
  }

  const selected = plans.find(p => p.key === selectedPlan)

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f1f5f9]" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* Nav */}
      <nav className="sticky top-0 z-50 border-b border-white/5 bg-[#0a0f1e]/90 backdrop-blur-xl px-5 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 64 64" width="32" height="32">
              <circle cx="32" cy="32" r="32" fill="#0f172a"/>
              <line x1="32" y1="8" x2="54" y2="44" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="54" y1="44" x2="10" y2="44" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="10" y1="44" x2="32" y2="8" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
              <polyline points="15,29 19,29 22,19 25,37 28,23 31,29 35,29 38,15 41,36 44,29 48,29"
                fill="none" stroke="#f0f9ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div>
              <div className="text-sm font-bold tracking-wide">The Triad</div>
              <div className="text-[8px] font-semibold text-[#0ea5e9] tracking-[0.2em] uppercase">Clinical Decision Support</div>
            </div>
          </div>
          <button
            onClick={() => router.push('/auth')}
            className="text-xs font-semibold text-[#94a3b8] border border-white/10 rounded-lg px-4 py-2 hover:border-white/20 hover:text-white transition-all"
          >
            Sign In →
          </button>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-5 py-12">

        {/* Hero */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 rounded-full px-4 py-1.5 mb-6">
            <div className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] animate-pulse"/>
            <span className="text-xs font-semibold text-[#0ea5e9] tracking-wider uppercase">Remote Chronic Disease Monitoring</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-5">
            Turn your practice into a<br/>
            <span className="text-[#0ea5e9]">remote monitoring service</span>
          </h1>

          <p className="text-[#94a3b8] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Enroll your HTN and DM patients. Monitor readings continuously.
            Let AI flag deterioration before it becomes a stroke or dialysis case.
          </p>

          {/* Key stat */}
          <div className="mt-8 inline-flex items-center gap-6 bg-white/3 border border-white/8 rounded-2xl px-7 py-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#22c55e]">5×</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">ROI minimum</div>
            </div>
            <div className="w-px h-10 bg-white/10"/>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0ea5e9]">₦5,000</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">per patient/month</div>
            </div>
            <div className="w-px h-10 bg-white/10"/>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#a855f7]">AI</div>
              <div className="text-xs text-[#94a3b8] mt-0.5">powered insights</div>
            </div>
          </div>
        </div>

        {/* Plans */}
        <div className="flex flex-col gap-4 mb-12">
          {plans.map(plan => (
            <div
              key={plan.key}
              onClick={() => setSelectedPlan(plan.key)}
              className={`relative rounded-2xl border-2 cursor-pointer transition-all duration-200 overflow-hidden ${
                selectedPlan === plan.key
                  ? `${plan.activeBorder} bg-white/4 shadow-xl ${plan.glowColor}`
                  : `${plan.borderColor} bg-white/2 hover:bg-white/3`
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-[#a855f7] text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl tracking-wider">
                  MOST POPULAR
                </div>
              )}

              <div className="p-5">
                {/* Plan header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: plan.color }}>
                      {plan.name}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      <span className="text-sm text-[#94a3b8]">/month</span>
                    </div>
                    <div className="text-xs text-[#94a3b8] mt-1">{plan.patients}</div>
                  </div>

                  {/* ROI box */}
                  <div className="text-right bg-[#052e16] border border-[#22c55e]/20 rounded-xl px-4 py-3 min-w-[120px]">
                    <div className="text-base font-bold text-[#22c55e]">{plan.roi}</div>
                    <div className="text-[10px] text-[#94a3b8] mt-0.5 leading-tight">{plan.roiNote}</div>
                  </div>
                </div>

                {/* Features */}
                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                  {plan.features.map(f => (
                    <div key={f} className="flex items-start gap-2">
                      <span className="mt-0.5 text-xs shrink-0" style={{ color: plan.color }}>✓</span>
                      <span className="text-xs text-[#94a3b8] leading-relaxed">{f}</span>
                    </div>
                  ))}
                </div>

                {/* Selected indicator */}
                {selectedPlan === plan.key && (
                  <div className="mt-4 pt-3 border-t border-white/8 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: plan.color }}/>
                    <span className="text-xs font-semibold" style={{ color: plan.color }}>Selected</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Signup form */}
        <div className="bg-white/3 border border-white/8 rounded-2xl p-6 mb-8">
          <h3 className="font-bold text-base text-[#f1f5f9] mb-1">
            {selected ? `Subscribe to ${selected.name}` : 'Select a plan above'}
          </h3>
          <p className="text-xs text-[#94a3b8] mb-5">
            {selected
              ? `${selected.price}/month · ${selected.patients} · Your credentials will be sent to your email`
              : 'Choose Standard, Growth, or Enterprise to continue'}
          </p>

          <div className="flex flex-col gap-3">
            <div>
              <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider block mb-1.5">Full Name</label>
              <input
                type="text"
                placeholder="Dr. Adebayo Okafor"
                value={form.full_name}
                onChange={e => setForm(f => ({...f, full_name: e.target.value}))}
                className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f1f5f9] outline-none focus:border-[#0ea5e9] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-[#94a3b8] uppercase tracking-wider block mb-1.5">Email Address</label>
              <input
                type="email"
                placeholder="doctor@clinic.com"
                value={form.email}
                onChange={e => setForm(f => ({...f, email: e.target.value}))}
                className="w-full bg-[#0a0f1e] border border-white/10 rounded-xl px-4 py-3 text-sm text-[#f1f5f9] outline-none focus:border-[#0ea5e9] transition-colors"
              />
            </div>

            {error && (
              <div className="bg-[#450a0a] border border-[#ef4444]/30 rounded-xl px-4 py-3 text-xs text-[#fca5a5]">
                {error}
              </div>
            )}

            <button
              onClick={handleSubscribe}
              disabled={loading || !selectedPlan}
              className="w-full rounded-xl py-3.5 text-sm font-bold text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ background: selected ? selected.color : '#334155' }}
            >
              {loading ? 'Redirecting to payment…' : selectedPlan ? `Pay ${selected?.price} via Paystack →` : 'Select a plan to continue'}
            </button>

            <p className="text-[10px] text-[#475569] text-center">
              Secure payment · Card, Bank Transfer & USSD accepted · Login credentials sent to your email on payment
            </p>
          </div>
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap items-center justify-center gap-5">
          {['ESC/ESH 2023', 'ADA 2024', 'Nigerian Formulary', 'Groq AI Powered', 'Supabase Secured'].map(item => (
            <div key={item} className="flex items-center gap-1.5 text-[10px] text-[#475569]">
              <span className="text-[#22c55e]">✓</span>{item}
            </div>
          ))}
        </div>

        <p className="text-center text-[10px] text-[#334155] mt-8">
          The Triad · For licensed healthcare professionals only · Not a substitute for clinical judgment
        </p>
      </main>
    </div>
  )
}
