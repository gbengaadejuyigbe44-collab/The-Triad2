'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Clinician } from '@/types/database'
import { ArrowLeft, User, Shield, LogOut, CheckCircle2, Zap } from 'lucide-react'

const PLAN_COLORS: Record<string, string> = {
  standard: 'var(--color-accent-blue)',
  growth: 'var(--color-accent-purple)',
  enterprise: 'var(--color-accent-green)',
}

const PLAN_LIMITS: Record<string, number> = {
  standard: 20,
  growth: 50,
  enterprise: 100,
}

function getInitials(name: string) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default function AccountPage() {
  const router = useRouter()
  const [clinician, setClinician] = useState<Clinician | null>(null)
  const [patientCount, setPatientCount] = useState(0)
  const [loading, setLoading] = useState(true)

  // Edit name
  const [editingName, setEditingName] = useState(false)
  const [nameValue, setNameValue] = useState('')
  const [nameSaving, setNameSaving] = useState(false)
  const [nameSuccess, setNameSuccess] = useState(false)

  // Password change
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', newPass: '', confirm: '' })
  const [passwordSaving, setPasswordSaving] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }

      const [{ data: c }, { count }] = await Promise.all([
        supabase.from('clinicians').select('*').eq('id', session.user.id).single(),
        supabase.from('patients').select('*', { count: 'exact', head: true }).eq('clinician_id', session.user.id),
      ])

      setClinician(c as unknown as Clinician)
      setNameValue((c as unknown as Clinician)?.full_name || '')
      setPatientCount(count || 0)
      setLoading(false)
    }
    load()
  }, [router])

  async function saveName() {
    if (!nameValue.trim() || !clinician) return
    setNameSaving(true)
    const { data } = await (supabase.from('clinicians') as any)
      .update({ full_name: nameValue.trim() })
      .eq('id', clinician.id)
      .select()
      .single()
    if (data) {
      setClinician(data)
      setEditingName(false)
      setNameSuccess(true)
      setTimeout(() => setNameSuccess(false), 3000)
    }
    setNameSaving(false)
  }

  async function changePassword() {
    setPasswordError('')
    if (passwords.newPass.length < 8) {
      setPasswordError('Password must be at least 8 characters.')
      return
    }
    if (passwords.newPass !== passwords.confirm) {
      setPasswordError('Passwords do not match.')
      return
    }
    setPasswordSaving(true)
    const { error } = await supabase.auth.updateUser({ password: passwords.newPass })
    if (error) {
      setPasswordError(error.message)
    } else {
      setPasswordSuccess(true)
      setShowPasswordForm(false)
      setPasswords({ current: '', newPass: '', confirm: '' })
      setTimeout(() => setPasswordSuccess(false), 4000)
    }
    setPasswordSaving(false)
  }

  async function signOut() {
    await supabase.auth.signOut()
    router.push('/')
  }

  if (loading) return (
    <div className="tracker-shell flex items-center justify-center min-h-screen">
      <div className="tracker-grid" />
      <div className="w-12 h-12 rounded-full border-4 border-[var(--color-border)] border-t-[var(--color-accent-blue)] animate-spin z-10" />
    </div>
  )

  if (!clinician) return null

  const planColor = clinician.plan ? PLAN_COLORS[clinician.plan] || 'var(--color-accent-blue)' : 'var(--color-text-muted)'
  const planLimit = clinician.patient_limit || (clinician.plan ? PLAN_LIMITS[clinician.plan] : 0)
  const fillPercent = planLimit > 0 ? Math.min((patientCount / planLimit) * 100, 100) : 0
  const planExpired = clinician.plan_expires_at && new Date(clinician.plan_expires_at) < new Date()
  const expiryDate = clinician.plan_expires_at
    ? new Date(clinician.plan_expires_at).toLocaleDateString('en-NG', { day: 'numeric', month: 'long', year: 'numeric' })
    : null

  return (
    <div className="tracker-shell min-h-screen">
      <div className="tracker-grid" />
      
      {/* Nav */}
      <nav className="tracker-nav">
        <div className="tracker-nav-inner px-4 md:px-0">
          <button onClick={() => router.push('/dashboard')} className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </button>
          <div className="flex items-center gap-2 border-l border-[var(--color-border)] pl-4">
            <span className="text-sm font-extrabold text-[var(--color-text-primary)]">Account Settings</span>
          </div>
        </div>
      </nav>

      <main className="tracker-container max-w-2xl mx-auto py-8 md:py-12 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

        {/* Profile card */}
        <div className="tracker-card p-6 md:p-8">
          <div className="flex items-center gap-5 mb-8">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-black shrink-0 shadow-lg"
              style={{
                background: `color-mix(in srgb, ${planColor} 15%, transparent)`,
                border: `1px solid color-mix(in srgb, ${planColor} 30%, transparent)`,
                color: planColor,
              }}
            >
              {getInitials(clinician.full_name)}
            </div>
            <div>
              <p className="text-xl md:text-2xl font-extrabold text-[var(--color-text-primary)] tracking-tight">{clinician.full_name}</p>
              <p className="text-sm font-medium text-[var(--color-text-secondary)] mt-0.5">{clinician.email}</p>
              {clinician.plan && (
                <span
                  className="inline-block mt-2 text-xs font-bold px-3 py-1 rounded-full capitalize"
                  style={{ background: `color-mix(in srgb, ${planColor} 15%, transparent)`, color: planColor, border: `1px solid color-mix(in srgb, ${planColor} 30%, transparent)` }}
                >
                  {clinician.plan} Plan
                </span>
              )}
            </div>
          </div>

          {/* Name edit */}
          <div className="flex flex-col gap-2 mb-6">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em]">Full Name</label>
            {editingName ? (
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={nameValue}
                  onChange={e => setNameValue(e.target.value)}
                  className="tracker-input flex-1"
                  autoFocus
                  onKeyDown={e => { if (e.key === 'Enter') saveName(); if (e.key === 'Escape') setEditingName(false) }}
                />
                <div className="flex gap-2">
                  <button onClick={saveName} disabled={nameSaving} className="tracker-button py-2 flex-1 sm:flex-none">
                    {nameSaving ? '...' : 'Save'}
                  </button>
                  <button onClick={() => { setEditingName(false); setNameValue(clinician.full_name) }} className="tracker-button-secondary py-2 flex-1 sm:flex-none">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between p-4 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border-soft)]">
                <span className="text-sm font-bold text-[var(--color-text-primary)]">{clinician.full_name}</span>
                <button onClick={() => setEditingName(true)} className="text-xs font-bold text-[var(--color-accent-blue)] hover:text-[#38bdf8] transition-colors">
                  Edit
                </button>
              </div>
            )}
            {nameSuccess && (
              <p className="text-xs font-bold text-[var(--color-accent-green)] mt-1 flex items-center gap-1"><CheckCircle2 className="w-3 h-3"/> Name updated successfully</p>
            )}
          </div>

          {/* Email (read-only) */}
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em]">Email Address</label>
            <div className="p-4 bg-[var(--color-surface-soft)] rounded-xl border border-[var(--color-border-soft)] opacity-80 cursor-not-allowed">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">{clinician.email}</span>
            </div>
          </div>
        </div>

        {/* Subscription card */}
        <div className="tracker-card p-6 md:p-8">
          <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-[var(--color-accent-amber)]" /> Subscription
          </p>

          {clinician.plan ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-lg font-bold text-[var(--color-text-primary)] capitalize">{clinician.plan} Plan</p>
                  {expiryDate && (
                    <p className={`text-xs mt-1 font-medium ${planExpired ? 'text-[var(--color-accent-red)]' : 'text-[var(--color-text-secondary)]'}`}>
                      {planExpired ? `Expired on ${expiryDate}` : `Renews on ${expiryDate}`}
                    </p>
                  )}
                </div>
                <a href="/pricing" className="tracker-button-secondary text-xs px-4 py-2 border-[color-mix(in_srgb,var(--color-accent-amber)_30%,transparent)] text-[var(--color-accent-amber)] hover:bg-[color-mix(in_srgb,var(--color-accent-amber)_10%,transparent)]">
                  {planExpired ? 'Renew Plan' : 'Upgrade Plan'}
                </a>
              </div>

              {/* Usage bar */}
              <div className="p-5 bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-[var(--color-text-secondary)] uppercase tracking-wider">Patient slots used</span>
                  <span className="text-sm font-extrabold" style={{ color: planColor }}>{patientCount} / {planLimit}</span>
                </div>
                <div className="h-3 bg-[var(--color-bg-deep)] rounded-full overflow-hidden border border-[var(--color-border-soft)] shadow-inner">
                  <div
                    className="h-full rounded-full transition-all duration-700 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
                    style={{
                      width: `${fillPercent}%`,
                      background: fillPercent > 90
                        ? 'linear-gradient(90deg, var(--color-accent-amber), var(--color-accent-red))'
                        : `linear-gradient(90deg, ${planColor}, color-mix(in srgb, ${planColor} 80%, transparent))`,
                    }}
                  />
                </div>
                <p className="text-xs font-medium text-[var(--color-text-muted)] mt-3">
                  {planLimit - patientCount > 0 ? `${planLimit - patientCount} slots remaining in your current plan.` : 'You have reached your maximum patient limit.'}
                </p>
              </div>
            </>
          ) : (
            <div className="flex items-center justify-between p-5 bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl">
              <p className="text-sm font-medium text-[var(--color-text-secondary)]">No active subscription found.</p>
              <a href="/pricing" className="tracker-button text-xs py-2 px-4 shadow-sm">
                Choose a plan
              </a>
            </div>
          )}
        </div>

        {/* Security card */}
        <div className="tracker-card p-6 md:p-8">
          <p className="text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[var(--color-accent-green)]" /> Security & Access
          </p>

          {passwordSuccess && (
            <div className="mb-6 p-4 bg-[color-mix(in_srgb,var(--color-accent-green)_10%,transparent)] border border-[color-mix(in_srgb,var(--color-accent-green)_30%,transparent)] rounded-xl text-sm font-bold text-[var(--color-accent-green)] flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4"/> Password updated successfully
            </div>
          )}

          {!showPasswordForm ? (
            <div className="flex items-center justify-between p-5 bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl">
              <div>
                <p className="text-sm font-bold text-[var(--color-text-primary)]">Password</p>
                <p className="text-xs text-[var(--color-text-secondary)] mt-1">Protect your account using a strong password.</p>
              </div>
              <button onClick={() => setShowPasswordForm(true)} className="tracker-button-secondary text-xs px-4 py-2 border-[var(--color-border)]">
                Change Password
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-5 bg-[var(--color-surface-soft)] border border-[var(--color-border-soft)] rounded-xl">
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  value={passwords.newPass}
                  onChange={e => setPasswords(p => ({ ...p, newPass: e.target.value }))}
                  className="tracker-input"
                />
              </div>
              <div>
                <label className="block text-[10px] font-extrabold text-[var(--color-text-muted)] uppercase tracking-[0.1em] mb-2">Confirm New Password</label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={passwords.confirm}
                  onChange={e => setPasswords(p => ({ ...p, confirm: e.target.value }))}
                  className="tracker-input"
                />
              </div>
              {passwordError && (
                <p className="text-xs font-bold text-[var(--color-accent-red)]">{passwordError}</p>
              )}
              <div className="flex gap-3 mt-2">
                <button onClick={() => { setShowPasswordForm(false); setPasswordError(''); setPasswords({ current: '', newPass: '', confirm: '' }) }} className="tracker-button-secondary flex-1 py-3 text-sm">
                  Cancel
                </button>
                <button onClick={changePassword} disabled={passwordSaving} className="tracker-button flex-1 py-3 text-sm !from-[var(--color-accent-green)] !to-[#16a34a] shadow-[0_8px_24px_rgba(74,222,128,0.25)]">
                  {passwordSaving ? 'Updating...' : 'Save Password'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Danger zone */}
        <div className="tracker-card p-6 md:p-8 border-[color-mix(in_srgb,var(--color-accent-red)_20%,transparent)]">
          <p className="text-[10px] font-extrabold text-[var(--color-accent-red)] uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Active Session
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-[var(--color-text-primary)]">Sign Out</p>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">You will need to sign in again to access patient records.</p>
            </div>
            <button onClick={signOut} className="tracker-button-secondary w-full sm:w-auto text-xs px-6 py-2.5 border-[color-mix(in_srgb,var(--color-accent-red)_30%,transparent)] text-[var(--color-accent-red)] hover:bg-[color-mix(in_srgb,var(--color-accent-red)_10%,transparent)]">
              Sign out securely
            </button>
          </div>
        </div>

      </main>
    </div>
  )
}
