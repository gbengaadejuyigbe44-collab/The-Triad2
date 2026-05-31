'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import type { Patient } from '@/types/database'

type Tab = 'bp' | 'bg' | 'meds' | 'se'

interface Classification {
  category: string
  color: string
  isCrisis: boolean
  isCaution: boolean
  recommendation: string
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function firstName(name: string) {
  return name.split(' ')[0]
}

const inp: React.CSSProperties = {
  width: '100%',
  background: '#f8fafc',
  border: '2px solid #e2e8f0',
  borderRadius: '16px',
  padding: '18px 20px',
  fontSize: '18px',
  color: '#0f172a',
  fontFamily: 'inherit',
  outline: 'none',
  boxSizing: 'border-box',
  transition: 'border-color 0.2s',
  appearance: 'none',
  WebkitAppearance: 'none',
}

const bigBtn = (color: string, disabled: boolean): React.CSSProperties => ({
  width: '100%',
  background: disabled ? '#cbd5e1' : color,
  color: 'white',
  border: 'none',
  borderRadius: '20px',
  padding: '20px',
  fontSize: '18px',
  fontWeight: 800,
  fontFamily: 'inherit',
  cursor: disabled ? 'not-allowed' : 'pointer',
  transition: 'all 0.2s',
  letterSpacing: '-0.01em',
  boxShadow: disabled ? 'none' : `0 8px 24px ${color}40`,
})

// ── Portal Inner ──────────────────────────────────────────────────────────────
function PatientPortalInner() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [patient, setPatient] = useState<Patient | null>(null)
  const [loading, setLoading] = useState(true)
  const [invalid, setInvalid] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('bp')

  // BP
  const [bp, setBp] = useState({ systolic: '', diastolic: '', pulse: '', notes: '' })
  const [bpSaving, setBpSaving] = useState(false)
  const [bpResult, setBpResult] = useState<Classification | null>(null)
  const [bpSaved, setBpSaved] = useState(false)

  // BG
  const [bg, setBg] = useState({ value_mgdl: '', reading_type: 'fasting' as 'fasting' | 'postprandial' | 'random', notes: '' })
  const [bgSaving, setBgSaving] = useState(false)
  const [bgResult, setBgResult] = useState<Classification | null>(null)
  const [bgSaved, setBgSaved] = useState(false)

  // Meds
  const [med, setMed] = useState({ drug_name: '', dose: '', frequency: '', start_date: '' })
  const [medSaving, setMedSaving] = useState(false)
  const [medDone, setMedDone] = useState(false)

  // Side effects
  const [se, setSe] = useState({ drug_name: '', description: '', severity: 'mild' as 'mild' | 'moderate' | 'severe' })
  const [seSaving, setSeSaving] = useState(false)
  const [seDone, setSeDone] = useState(false)

  useEffect(() => {
    async function load() {
      if (!token) { setInvalid(true); setLoading(false); return }
      const { data } = await (supabase as any).from('patients').select('*').eq('portal_token', token).single()
      if (!data) { setInvalid(true); setLoading(false); return }
      setPatient(data)
      setLoading(false)
      if (data.diagnosis.includes('HTN')) setActiveTab('bp')
      else if (data.diagnosis.includes('DM')) setActiveTab('bg')
    }
    load()
  }, [token])

  async function logBP() {
    if (!bp.systolic || !bp.diastolic || !token) return
    setBpSaving(true)
    setBpResult(null)
    try {
      const res = await fetch('/api/readings/bp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, systolic: bp.systolic, diastolic: bp.diastolic, pulse: bp.pulse || null, notes: bp.notes || null }),
      })
      const data = await res.json()
      if (data.classification) {
        setBpResult(data.classification)
        setBp({ systolic: '', diastolic: '', pulse: '', notes: '' })
        setBpSaved(true)
        setTimeout(() => setBpSaved(false), 6000)
      }
    } catch { }
    setBpSaving(false)
  }

  async function logBG() {
    if (!bg.value_mgdl || !token) return
    setBgSaving(true)
    setBgResult(null)
    try {
      const res = await fetch('/api/readings/bg', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, value_mgdl: bg.value_mgdl, reading_type: bg.reading_type, notes: bg.notes || null }),
      })
      const data = await res.json()
      if (data.classification) {
        setBgResult(data.classification)
        setBg({ value_mgdl: '', reading_type: 'fasting', notes: '' })
        setBgSaved(true)
        setTimeout(() => setBgSaved(false), 6000)
      }
    } catch { }
    setBgSaving(false)
  }

  async function logMed() {
    if (!med.drug_name || !med.dose || !med.frequency || !med.start_date || !patient) return
    setMedSaving(true)
    await (supabase as any).from('medications').insert({
      patient_id: patient.id, drug_name: med.drug_name,
      dose: med.dose, frequency: med.frequency, start_date: med.start_date, active: true,
    })
    setMedSaving(false)
    setMedDone(true)
    setMed({ drug_name: '', dose: '', frequency: '', start_date: '' })
    setTimeout(() => setMedDone(false), 4000)
  }

  async function logSE() {
    if (!se.description || !patient) return
    setSeSaving(true)
    const { data: meds } = await (supabase as any).from('medications').select('id,drug_name').eq('patient_id', patient.id).eq('active', true)
    const matched = meds?.find((m: any) => se.drug_name && m.drug_name.toLowerCase().includes(se.drug_name.toLowerCase()))
    await (supabase as any).from('side_effects').insert({
      patient_id: patient.id, medication_id: matched?.id || null,
      drug_name_freetext: se.drug_name || null,
      description: se.description, severity: se.severity, reported_at: new Date().toISOString(),
    })
    setSeSaving(false)
    setSeDone(true)
    setSe({ drug_name: '', description: '', severity: 'mild' })
    setTimeout(() => setSeDone(false), 4000)
  }

  // ── Loading ──────────────────────────────────────────────────────────────────
  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', border: '3px solid #e2e8f0', borderTop: '3px solid #0ea5e9', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p style={{ fontSize: '16px', color: '#94a3b8', fontFamily: 'sans-serif' }}>Loading your health portal…</p>
      </div>
    </div>
  )

  // ── Invalid ──────────────────────────────────────────────────────────────────
  if (invalid) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', padding: '24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '320px' }}>
        <div style={{ fontSize: '64px', marginBottom: '20px' }}>🔗</div>
        <h2 style={{ fontSize: '22px', fontWeight: 700, color: '#0f172a', marginBottom: '12px', fontFamily: 'sans-serif' }}>This link has expired</h2>
        <p style={{ fontSize: '16px', color: '#64748b', lineHeight: 1.6, fontFamily: 'sans-serif' }}>
          Please contact your doctor or nurse to get a new link to this portal.
        </p>
      </div>
    </div>
  )

  const hasBP = patient!.diagnosis.includes('HTN')
  const hasBG = patient!.diagnosis.includes('DM')

  // Build tabs based on diagnosis
  const tabs: { key: Tab; icon: string; label: string; color: string }[] = [
    ...(hasBP ? [{ key: 'bp' as Tab, icon: '🫀', label: 'Blood Pressure', color: '#ef4444' }] : []),
    ...(hasBG ? [{ key: 'bg' as Tab, icon: '💧', label: 'Blood Sugar', color: '#a855f7' }] : []),
    { key: 'meds' as Tab, icon: '💊', label: 'Medicines', color: '#22c55e' },
    { key: 'se' as Tab, icon: '⚠️', label: 'Problems', color: '#f59e0b' },
  ]

  const activeTabData = tabs.find(t => t.key === activeTab)!
  const accentColor = activeTabData?.color || '#0ea5e9'

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif", paddingBottom: '100px' }}>
      <style>{`
        @keyframes slideUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        input:focus, select:focus, textarea:focus { border-color: ${accentColor} !important; box-shadow: 0 0 0 4px ${accentColor}20 !important; }
      `}</style>

      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, #0f172a 0%, #1e293b 100%)`,
        padding: '28px 24px 32px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background decoration */}
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '160px', height: '160px', borderRadius: '50%', background: `${accentColor}15`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20px', left: '-20px', width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.03)', pointerEvents: 'none' }} />

        {/* Logo row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <svg viewBox="0 0 64 64" width="32" height="32" style={{ flexShrink: 0 }}>
            <circle cx="32" cy="32" r="32" fill="#1e293b"/>
            <line x1="32" y1="8" x2="54" y2="44" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="54" y1="44" x2="10" y2="44" stroke="#a855f7" strokeWidth="2.5" strokeLinecap="round"/>
            <line x1="10" y1="44" x2="32" y2="8" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round"/>
            <polyline points="15,29 19,29 22,19 25,37 28,23 31,29 35,29 38,15 41,36 44,29 48,29" fill="none" stroke="#f0f9ff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <div>
            <div style={{ fontSize: '13px', fontWeight: 700, color: '#f1f5f9', letterSpacing: '-0.01em' }}>The Triad</div>
            <div style={{ fontSize: '10px', color: '#475569', fontWeight: 500, letterSpacing: '0.05em' }}>Health Monitoring</div>
          </div>
        </div>

        {/* Welcome */}
        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px', fontWeight: 500 }}>
          {getGreeting()},
        </p>
        <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#f1f5f9', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '8px' }}>
          {firstName(patient!.full_name)}.
        </h1>
        <p style={{ fontSize: '14px', color: '#475569', lineHeight: 1.5 }}>
          Your doctor is watching over you. Log your reading below and it goes straight to them.
        </p>
      </div>

      {/* Main content */}
      <main style={{ maxWidth: '480px', margin: '0 auto', padding: '0 16px' }}>

        {/* BP Tab */}
        {activeTab === 'bp' && hasBP && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <SectionHeader icon="🫀" title="Save your blood pressure" subtitle="Enter the two numbers from your blood pressure monitor" color="#ef4444" />

            {bpSaved && bpResult && (
              <ResultCard classification={bpResult} />
            )}

            <Card>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <BigField label="Top number" hint="e.g. 130">
                  <input type="number" inputMode="numeric" placeholder="e.g. 130" value={bp.systolic}
                    onChange={e => setBp(f => ({ ...f, systolic: e.target.value }))}
                    style={inp} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#ef4444'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'} />
                </BigField>
                <BigField label="Bottom number" hint="e.g. 85">
                  <input type="number" inputMode="numeric" placeholder="e.g. 85" value={bp.diastolic}
                    onChange={e => setBp(f => ({ ...f, diastolic: e.target.value }))}
                    style={inp} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#ef4444'}
                    onBlur={e => (e.target as HTMLInputElement).style.borderColor = '#e2e8f0'} />
                </BigField>
              </div>
              <BigField label="Heart rate (optional)" hint="e.g. 72">
                <input type="number" inputMode="numeric" placeholder="Pulse / heart rate" value={bp.pulse}
                  onChange={e => setBp(f => ({ ...f, pulse: e.target.value }))}
                  style={{ ...inp, marginBottom: '16px' }} />
              </BigField>
              <BigField label="Anything to add? (optional)" hint="">
                <input type="text" placeholder="e.g. I took my medication this morning" value={bp.notes}
                  onChange={e => setBp(f => ({ ...f, notes: e.target.value }))}
                  style={{ ...inp, marginBottom: '20px' }} />
              </BigField>
              <button onClick={logBP} disabled={bpSaving || !bp.systolic || !bp.diastolic}
                style={bigBtn('#ef4444', bpSaving || !bp.systolic || !bp.diastolic)}>
                {bpSaving ? 'Saving…' : '✓  Save blood pressure'}
              </button>
            </Card>
          </div>
        )}

        {/* BG Tab */}
        {activeTab === 'bg' && hasBG && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <SectionHeader icon="💧" title="Save your blood sugar" subtitle="Enter the number shown on your glucometer" color="#a855f7" />

            {bgSaved && bgResult && (
              <ResultCard classification={bgResult} />
            )}

            <Card>
              <BigField label="Blood sugar level" hint="e.g. 126">
                <input type="number" inputMode="decimal" placeholder="e.g. 126" value={bg.value_mgdl}
                  onChange={e => setBg(f => ({ ...f, value_mgdl: e.target.value }))}
                  style={{ ...inp, marginBottom: '4px' }} />
                <p style={{ fontSize: '12px', color: '#94a3b8', margin: '4px 0 16px 4px' }}>mg/dL — the number your machine shows</p>
              </BigField>

              <BigField label="When was this taken?" hint="">
                <select value={bg.reading_type}
                  onChange={e => setBg(f => ({ ...f, reading_type: e.target.value as any }))}
                  style={{ ...inp, marginBottom: '16px', background: '#f8fafc', cursor: 'pointer' }}>
                  <option value="fasting">Before eating (fasting)</option>
                  <option value="postprandial">2 hours after eating</option>
                  <option value="random">Any other time</option>
                </select>
              </BigField>

              <BigField label="Anything to add? (optional)" hint="">
                <input type="text" placeholder="e.g. I skipped dinner last night" value={bg.notes}
                  onChange={e => setBg(f => ({ ...f, notes: e.target.value }))}
                  style={{ ...inp, marginBottom: '20px' }} />
              </BigField>

              <button onClick={logBG} disabled={bgSaving || !bg.value_mgdl}
                style={bigBtn('#a855f7', bgSaving || !bg.value_mgdl)}>
                {bgSaving ? 'Saving…' : '✓  Save blood sugar'}
              </button>
            </Card>
          </div>
        )}

        {/* Meds Tab */}
        {activeTab === 'meds' && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <SectionHeader icon="💊" title="Your medicines" subtitle="Tell your doctor what medicine you are taking" color="#22c55e" />

            {medDone && (
              <div style={{ background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '20px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>✅</div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#15803d' }}>Medicine saved!</p>
                <p style={{ fontSize: '14px', color: '#22c55e' }}>Your doctor can now see this.</p>
              </div>
            )}

            <Card>
              <BigField label="Name of medicine" hint="e.g. Amlodipine">
                <input type="text" placeholder="e.g. Amlodipine, Metformin" value={med.drug_name}
                  onChange={e => setMed(f => ({ ...f, drug_name: e.target.value }))}
                  style={{ ...inp, marginBottom: '16px' }} />
              </BigField>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <BigField label="How much?" hint="e.g. 5mg">
                  <input type="text" placeholder="e.g. 5mg" value={med.dose}
                    onChange={e => setMed(f => ({ ...f, dose: e.target.value }))} style={inp} />
                </BigField>
                <BigField label="How often?" hint="e.g. Once a day">
                  <input type="text" placeholder="e.g. Once a day" value={med.frequency}
                    onChange={e => setMed(f => ({ ...f, frequency: e.target.value }))} style={inp} />
                </BigField>
              </div>
              <BigField label="When did you start?" hint="">
                <input type="date" value={med.start_date}
                  onChange={e => setMed(f => ({ ...f, start_date: e.target.value }))}
                  style={{ ...inp, marginBottom: '20px' }} />
              </BigField>
              <button onClick={logMed} disabled={medSaving || !med.drug_name || !med.dose || !med.frequency || !med.start_date}
                style={bigBtn('#22c55e', medSaving || !med.drug_name || !med.dose || !med.frequency || !med.start_date)}>
                {medSaving ? 'Saving…' : '✓  Save medicine'}
              </button>
            </Card>
          </div>
        )}

        {/* Side Effects Tab */}
        {activeTab === 'se' && (
          <div style={{ animation: 'slideUp 0.3s ease' }}>
            <SectionHeader icon="⚠️" title="Report a problem" subtitle="Tell your doctor if something doesn't feel right" color="#f59e0b" />

            {seDone && (
              <div style={{ background: '#fffbeb', border: '2px solid #f59e0b', borderRadius: '20px', padding: '20px', marginBottom: '16px', textAlign: 'center' }}>
                <div style={{ fontSize: '40px', marginBottom: '8px' }}>📨</div>
                <p style={{ fontSize: '16px', fontWeight: 700, color: '#b45309' }}>Report sent to your doctor!</p>
                <p style={{ fontSize: '14px', color: '#d97706' }}>They will follow up with you soon.</p>
              </div>
            )}

            <Card>
              <BigField label="Which medicine is causing it? (if you know)" hint="">
                <input type="text" placeholder="e.g. Amlodipine — or leave empty if unsure" value={se.drug_name}
                  onChange={e => setSe(f => ({ ...f, drug_name: e.target.value }))}
                  style={{ ...inp, marginBottom: '16px' }} />
              </BigField>

              <BigField label="What are you feeling?" hint="">
                <textarea
                  placeholder="Describe what you feel, e.g. swollen ankles, dizziness when I stand up, headache in the morning"
                  value={se.description}
                  onChange={e => setSe(f => ({ ...f, description: e.target.value }))}
                  rows={4}
                  style={{ ...inp, resize: 'none', marginBottom: '16px', lineHeight: 1.5 } as React.CSSProperties} />
              </BigField>

              <BigField label="How bad is it?" hint="">
                <select value={se.severity}
                  onChange={e => setSe(f => ({ ...f, severity: e.target.value as any }))}
                  style={{ ...inp, marginBottom: '20px', background: '#f8fafc', cursor: 'pointer' }}>
                  <option value="mild">Mild — I can manage, still going about my day</option>
                  <option value="moderate">Moderate — it is slowing me down</option>
                  <option value="severe">Severe — it is seriously affecting me</option>
                </select>
              </BigField>

              <button onClick={logSE} disabled={seSaving || !se.description}
                style={bigBtn('#f59e0b', seSaving || !se.description)}>
                {seSaving ? 'Sending…' : '✓  Send to my doctor'}
              </button>
            </Card>
          </div>
        )}

        <p style={{ textAlign: 'center', fontSize: '12px', color: '#cbd5e1', marginTop: '24px', paddingBottom: '8px' }}>
          The Triad Health Monitoring · Your data goes directly to your doctor
        </p>
      </main>

      {/* Bottom nav */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white',
        borderTop: '1px solid #e2e8f0',
        display: 'flex',
        padding: '8px 0 max(8px, env(safe-area-inset-bottom))',
        boxShadow: '0 -4px 24px rgba(0,0,0,0.08)',
        zIndex: 100,
      }}>
        {tabs.map(t => (
          <button key={t.key} onClick={() => setActiveTab(t.key)}
            style={{
              flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              padding: '8px 4px',
              transition: 'all 0.15s',
            }}>
            <div style={{
              width: '48px', height: '32px', borderRadius: '16px',
              background: activeTab === t.key ? `${t.color}18` : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '20px',
              transition: 'all 0.2s',
            }}>
              {t.icon}
            </div>
            <span style={{
              fontSize: '11px', fontWeight: activeTab === t.key ? 700 : 500,
              color: activeTab === t.key ? t.color : '#94a3b8',
              letterSpacing: '-0.01em',
            }}>
              {t.label}
            </span>
            {activeTab === t.key && (
              <div style={{ width: '20px', height: '3px', borderRadius: '2px', background: t.color }} />
            )}
          </button>
        ))}
      </nav>
    </div>
  )
}

// ── Sub components ────────────────────────────────────────────────────────────

function SectionHeader({ icon, title, subtitle, color }: { icon: string; title: string; subtitle: string; color: string }) {
  return (
    <div style={{ padding: '24px 0 12px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '6px' }}>
        <span style={{ fontSize: '28px' }}>{icon}</span>
        <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0f172a', letterSpacing: '-0.03em', lineHeight: 1.1 }}>{title}</h2>
      </div>
      <p style={{ fontSize: '14px', color: '#64748b', marginLeft: '40px', lineHeight: 1.5 }}>{subtitle}</p>
    </div>
  )
}

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: 'white', borderRadius: '24px', padding: '24px', boxShadow: '0 2px 16px rgba(0,0,0,0.06)', marginBottom: '16px' }}>
      {children}
    </div>
  )
}

function BigField({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <label style={{ fontSize: '15px', fontWeight: 700, color: '#334155' }}>{label}</label>
      {children}
    </div>
  )
}

function ResultCard({ classification }: { classification: Classification }) {
  const isCrisis = classification.isCrisis
  return (
    <div style={{
      background: isCrisis ? '#fef2f2' : '#f0fdf4',
      border: `2px solid ${isCrisis ? '#ef4444' : '#22c55e'}`,
      borderRadius: '20px', padding: '20px', marginBottom: '16px',
      animation: 'slideUp 0.4s ease',
    }}>
      {isCrisis ? (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px', animation: 'pulse 1s infinite' }}>🚨</span>
            <p style={{ fontSize: '16px', fontWeight: 800, color: '#dc2626' }}>Your doctor has been notified immediately</p>
          </div>
          <p style={{ fontSize: '14px', color: '#ef4444', fontWeight: 600, marginBottom: '4px' }}>{classification.category}</p>
          <p style={{ fontSize: '14px', color: '#7f1d1d', lineHeight: 1.5 }}>{classification.recommendation}</p>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <span style={{ fontSize: '24px' }}>✅</span>
            <p style={{ fontSize: '16px', fontWeight: 800, color: '#15803d' }}>Reading saved successfully</p>
          </div>
          <p style={{ fontSize: '14px', color: '#16a34a', fontWeight: 600, marginBottom: '4px' }}>{classification.category}</p>
          <p style={{ fontSize: '14px', color: '#166534', lineHeight: 1.5 }}>{classification.recommendation}</p>
        </>
      )}
    </div>
  )
}

export default function PatientPortal() {
  return (
    <Suspense fallback={
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
        <p style={{ fontSize: '16px', color: '#94a3b8', fontFamily: 'sans-serif' }}>Loading…</p>
      </div>
    }>
      <PatientPortalInner />
    </Suspense>
  )
}
