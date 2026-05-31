'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import type { Diagnosis, Gender } from '@/types/database'
import { ArrowLeft, HeartPulse, Activity, User, UserPlus, Mail, Calendar, Ruler, Weight, ShieldAlert, CheckCircle2 } from 'lucide-react'

export default function NewPatient() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [created, setCreated] = useState<{ patientId: string; patientName: string; portalLink: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const [form, setForm] = useState({
    full_name: '',
    age: '',
    gender: '' as Gender | '',
    weight_kg: '',
    height_cm: '',
    portal_email: '',
    diagnosis: [] as Diagnosis[],
  })

  function toggleDiagnosis(d: Diagnosis) {
    setForm(f => ({
      ...f,
      diagnosis: f.diagnosis.includes(d)
        ? f.diagnosis.filter(x => x !== d)
        : [...f.diagnosis, d]
    }))
  }

  async function handleSubmit() {
    if (!form.full_name.trim()) { setError('Patient name is required.'); return }
    if (form.diagnosis.length === 0) { setError('Select at least one diagnosis.'); return }
    if (!form.portal_email.trim()) { setError('Portal email is required so the patient can log readings.'); return }

    setLoading(true)
    setError('')

    const res = await fetch('/api/patient/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || 'Failed to create patient. Please try again.')
      setLoading(false)
      return
    }

    setCreated({
      patientId: data.patient.id,
      patientName: data.patient.full_name,
      portalLink: data.portalLink,
    })
    setLoading(false)
  }

  function copyLink() {
    if (!created) return
    navigator.clipboard.writeText(created.portalLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // ── Confirmation screen ──────────────────────────────────
  if (created) {
    return (
      <div className="tracker-shell min-h-screen">
        <div className="tracker-grid"></div>
        <nav className="tracker-nav">
          <div className="tracker-nav-inner px-6 flex items-center gap-2">
            <button onClick={() => router.push('/dashboard')} className="text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-medium">
              ← Dashboard
            </button>
            <span className="text-[var(--color-border)]">/</span>
            <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-wide">Patient Enrolled</span>
          </div>
        </nav>

        <main className="tracker-container py-12 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="tracker-card p-8 md:p-10 mb-6 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[color-mix(in_srgb,var(--color-accent-green)_15%,var(--color-surface-soft))] border border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)] rounded-2xl flex items-center justify-center mb-6 shadow-sm">
              <CheckCircle2 className="w-8 h-8 text-[var(--color-accent-green)]" />
            </div>
            
            <h1 className="text-2xl font-extrabold text-[var(--color-text-primary)] mb-2">
              Patient Enrolled Successfully
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8 max-w-md">
              A secure welcome email with passwordless login credentials has been dispatched to <span className="font-bold text-[var(--color-text-primary)]">{created.patientName}</span>.
            </p>

            <div className="w-full text-left bg-[var(--color-surface-soft)] border border-[var(--color-border)] rounded-2xl p-6">
              <p className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider mb-3">
                Patient Portal Magic Link
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="flex-1 bg-[var(--color-bg-deep)] border border-[var(--color-border-soft)] rounded-xl px-4 py-3 shadow-inner">
                  <span className="text-sm font-mono text-[var(--color-text-primary)] truncate block overflow-hidden">{created.portalLink}</span>
                </div>
                <button
                  onClick={copyLink}
                  className={`flex items-center justify-center px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-sm ${
                    copied
                      ? 'bg-[color-mix(in_srgb,var(--color-accent-green)_15%,var(--color-surface-soft))] text-[var(--color-accent-green)] border border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)]'
                      : 'bg-[var(--color-accent-blue)] hover:bg-blue-600 text-white border border-transparent'
                  }`}
                >
                  {copied ? '✓ Copied' : 'Copy Link'}
                </button>
              </div>
              <p className="text-xs font-medium text-[var(--color-text-muted)] mt-3">
                If the automated email is delayed, you can securely share this unique link directly with the patient.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row gap-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="tracker-button-secondary flex-1 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Return to Dashboard
            </button>
            <button
              onClick={() => router.push(`/patients/${created.patientId}`)}
              className="tracker-button flex-1 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Access Medical Profile →
            </button>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="tracker-shell min-h-screen">
      <div className="tracker-grid"></div>
      
      <nav className="tracker-nav">
        <div className="tracker-nav-inner px-6">
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Dashboard
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[var(--color-border)]">/</span>
            <span className="text-sm font-bold text-[var(--color-text-primary)] tracking-wide">New Patient Enrollment</span>
          </div>
        </div>
      </nav>

      <main className="tracker-container py-12 max-w-3xl">
        <div className="mb-10 text-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] mb-6 shadow-xl">
            <User className="w-8 h-8 text-[var(--color-accent-blue)]" />
          </div>
          <h1 className="text-4xl font-extrabold text-[var(--color-text-primary)] tracking-tight mb-3">
            Enroll New Patient
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-lg mx-auto text-lg">
            Create a secure medical profile. Portal access will be automatically provisioned and emailed to the patient.
          </p>
        </div>

        <div className="tracker-card p-8 md:p-10 flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-150">
          
          {/* Identity Section */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-widest border-b border-[var(--color-border-soft)] pb-3 flex items-center gap-2">
              <User className="w-4 h-4 text-[var(--color-accent-blue)]" /> Identity & Contact
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Field label="Full Legal Name" required icon={<User className="w-4 h-4" />}>
                <input
                  type="text"
                  value={form.full_name}
                  onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                  placeholder="e.g. Adebayo Okafor"
                  className="tracker-input pl-11"
                />
              </Field>

              <Field label="Patient Portal Email" required icon={<Mail className="w-4 h-4" />}>
                <input
                  type="email"
                  value={form.portal_email}
                  onChange={e => setForm(f => ({ ...f, portal_email: e.target.value }))}
                  placeholder="patient@email.com"
                  className="tracker-input pl-11"
                />
              </Field>
            </div>
          </div>

          {/* Clinical Profile Section */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-widest border-b border-[var(--color-border-soft)] pb-3 flex items-center gap-2 mt-4">
              <Activity className="w-4 h-4 text-[var(--color-accent-purple)]" /> Clinical Profile
            </h2>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
                Primary Diagnosis <span className="text-[var(--color-accent-red)]">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(['HTN', 'DM'] as Diagnosis[]).map(d => {
                  const isSelected = form.diagnosis.includes(d);
                  const isHTN = d === 'HTN';
                  return (
                    <button
                      key={d}
                      onClick={() => toggleDiagnosis(d)}
                      className={`relative flex items-center gap-4 p-4 rounded-xl border text-left transition-all duration-200 overflow-hidden group ${
                        isSelected
                          ? isHTN
                            ? 'bg-red-500/10 border-red-500/50 text-red-700 dark:text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.15)]'
                            : 'bg-purple-500/10 border-purple-500/50 text-purple-700 dark:text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.15)]'
                          : 'bg-[var(--color-bg-deep)] border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-text-muted)] hover:shadow-md'
                      }`}
                    >
                      <div className={`p-3 rounded-lg ${isSelected ? (isHTN ? 'bg-red-500/20' : 'bg-purple-500/20') : 'bg-[var(--color-surface-soft)]'}`}>
                        {isHTN ? <HeartPulse className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-[15px]">{isHTN ? 'Hypertension' : 'Diabetes Mellitus'}</div>
                        <div className="text-xs opacity-80 mt-0.5">{isHTN ? 'Blood pressure monitoring' : 'Blood glucose tracking'}</div>
                      </div>
                      <div className={`absolute right-4 transition-transform duration-300 ${isSelected ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Biometrics Section */}
          <div className="space-y-6">
            <h2 className="text-sm font-bold text-[var(--color-text-primary)] uppercase tracking-widest border-b border-[var(--color-border-soft)] pb-3 flex items-center gap-2 mt-4">
              <Ruler className="w-4 h-4 text-[var(--color-accent-green)]" /> Biometrics
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Field label="Age" icon={<Calendar className="w-4 h-4" />}>
                <input
                  type="number"
                  value={form.age}
                  onChange={e => setForm(f => ({ ...f, age: e.target.value }))}
                  placeholder="Yrs"
                  className="tracker-input pl-11"
                />
              </Field>
              <Field label="Gender" icon={<User className="w-4 h-4" />}>
                <select
                  value={form.gender}
                  onChange={e => setForm(f => ({ ...f, gender: e.target.value as Gender }))}
                  className="tracker-input pl-11 appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%24%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748b%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[position:calc(100%-12px)_center] bg-[size:16px]"
                >
                  <option value="" disabled>Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </Field>
              <Field label="Weight" icon={<Weight className="w-4 h-4" />}>
                <div className="relative">
                  <input
                    type="number"
                    value={form.weight_kg}
                    onChange={e => setForm(f => ({ ...f, weight_kg: e.target.value }))}
                    placeholder="0"
                    className="tracker-input pl-11 pr-8"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-text-muted)]">kg</span>
                </div>
              </Field>
              <Field label="Height" icon={<Ruler className="w-4 h-4" />}>
                <div className="relative">
                  <input
                    type="number"
                    value={form.height_cm}
                    onChange={e => setForm(f => ({ ...f, height_cm: e.target.value }))}
                    placeholder="0"
                    className="tracker-input pl-11 pr-9"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-[var(--color-text-muted)]">cm</span>
                </div>
              </Field>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl px-5 py-4 text-sm text-red-600 dark:text-red-400 font-medium animate-in fade-in zoom-in-95">
              <ShieldAlert className="w-5 h-5 flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row gap-4 pt-6 border-t border-[var(--color-border-soft)] mt-4">
            <button
              onClick={() => router.push('/dashboard')}
              className="tracker-button-secondary w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold transition-all"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="tracker-button w-full sm:flex-1 py-3.5 rounded-xl text-sm font-bold transition-all relative overflow-hidden group"
            >
              <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
                <UserPlus className="w-4 h-4" /> Enroll Patient
              </span>
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-white/10">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span className="ml-3">Provisioning Portal...</span>
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Info box */}
        <div className="mt-8 tracker-card-soft px-6 py-5 flex items-start gap-4">
          <div className="p-2.5 bg-[var(--color-accent-blue)]/10 rounded-lg text-[var(--color-accent-blue)]">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[var(--color-text-primary)] mb-1">Automated Portal Provisioning</h4>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              Upon successful enrollment, the patient will instantly receive a secure, passwordless magic link to their designated email address. They can immediately begin logging biometric data via their personalized dashboard.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

function Field({ label, required, icon, children }: { label: string; required?: boolean; icon?: React.ReactNode; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2 relative">
      <label className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
        {label} {required && <span className="text-[var(--color-accent-red)]">*</span>}
      </label>
      <div className="relative group">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)] group-focus-within:text-[var(--color-accent-blue)] transition-colors pointer-events-none z-10">
          {icon}
        </div>
        {children}
      </div>
    </div>
  )
}
