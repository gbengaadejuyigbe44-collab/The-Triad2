'use client'

// ─── Anaphylaxis Protocol ─────────────────────────────────────────────────────
// Standalone room — extracted from Special Cases because anaphylaxis
// decisions happen in seconds and cannot require scrolling.
// Adrenaline first. Always. No exceptions.

import { useState, useEffect } from 'react'

export function AnaphylaxisProtocol() {
  const [stepsDone, setStepsDone] = useState<Record<number, boolean>>({})
  const [timerActive, setTimerActive] = useState(false)
  const [timerSeconds, setTimerSeconds] = useState(0)
  const [weight, setWeight] = useState('')

  useEffect(() => {
    if (!timerActive) return
    const interval = setInterval(() => setTimerSeconds(s => s + 1), 1000)
    return () => clearInterval(interval)
  }, [timerActive])

  const formatTime = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  const weightNum = parseFloat(weight)

  const steps = [
    {
      priority: 'FIRST',
      action: 'Adrenaline 0.5 mg IM — anterolateral thigh',
      detail: weightNum && weightNum < 50
        ? `Weight ${weightNum} kg — dose: ${(weightNum * 0.01).toFixed(2)} mg (0.01 mg/kg) IM`
        : '0.5 mg (0.5 mL of 1:1000) IM into the anterolateral mid-thigh. NOT subcutaneous. NOT IV (unless cardiac arrest).',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.1)',
      warning: 'IM into thigh = fastest absorption. Never delay for IV access.',
    },
    {
      priority: 'SECOND',
      action: 'Call for help + start timer',
      detail: 'Declare anaphylaxis. Assign roles. Start resuscitation timer now.',
      color: '#d97706',
      bg: 'rgba(217,119,6,0.08)',
    },
    {
      priority: 'THIRD',
      action: 'Position the patient',
      detail: 'Hypotension/shock: supine with legs elevated. Respiratory distress: sitting up. Pregnancy: left lateral tilt. Cardiac arrest: flat.',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.08)',
    },
    {
      priority: 'FOURTH',
      action: 'High-flow oxygen',
      detail: '15 L/min via non-rebreather mask. Target SpO₂ >94%.',
      color: '#0891b2',
      bg: 'rgba(8,145,178,0.08)',
    },
    {
      priority: 'FIFTH',
      action: 'IV access + fluid bolus',
      detail: 'Large bore IV. 500–1000 mL crystalloid rapidly. Repeat as needed for persistent hypotension.',
      color: '#059669',
      bg: 'rgba(5,150,105,0.08)',
    },
    {
      priority: 'SIXTH',
      action: 'If no improvement after 5 minutes — repeat Adrenaline',
      detail: 'Repeat 0.5 mg IM adrenaline every 5 minutes until response. No maximum dose in anaphylaxis.',
      color: '#dc2626',
      bg: 'rgba(220,38,38,0.08)',
      warning: 'Timer check: has it been 5 minutes since last adrenaline?',
    },
    {
      priority: 'SEVENTH',
      action: 'Secondary drugs — AFTER adrenaline',
      detail: 'Chlorphenamine 10 mg IV (antihistamine). Hydrocortisone 200 mg IV (steroid). These do NOT treat anaphylaxis — they reduce biphasic reaction risk.',
      color: '#6b7280',
      bg: 'rgba(107,114,128,0.07)',
      warning: 'Never give antihistamine or steroid instead of or before adrenaline.',
    },
    {
      priority: 'EIGHTH',
      action: 'Bronchospasm not responding',
      detail: 'Add Salbutamol 5 mg nebuliser via oxygen-driven nebuliser. Can also give IV aminophylline if severe and not responding.',
      color: '#0891b2',
      bg: 'rgba(8,145,178,0.06)',
    },
    {
      priority: 'NINTH',
      action: 'Monitor for biphasic reaction',
      detail: 'Observe for minimum 6–12 hours after severe anaphylaxis, even after full recovery. Biphasic reaction occurs in 5–20% of cases, typically 1–8 hours after initial episode.',
      color: '#7c3aed',
      bg: 'rgba(124,58,237,0.06)',
    },
  ]

  const doneCount = Object.values(stepsDone).filter(Boolean).length

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: 600 }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Anaphylaxis Protocol
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Adrenaline first. Always. Every step below depends on this being done first.
        </p>
      </div>

      {/* Timer */}
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <div style={{
          flex: 1, padding: '12px 16px', borderRadius: '12px',
          background: timerActive ? 'rgba(220,38,38,0.08)' : 'var(--color-bg-elevated)',
          border: `1.5px solid ${timerActive ? 'rgba(220,38,38,0.3)' : 'var(--color-border)'}`,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: timerActive ? '#dc2626' : 'var(--color-text-muted)', letterSpacing: '0.05em', fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(timerSeconds)}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>
            {timerActive ? 'Repeat adrenaline at 5:00 if no improvement' : 'Start timer with first adrenaline dose'}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          <button onClick={() => setTimerActive(true)} disabled={timerActive}
            style={{ padding: '8px 14px', borderRadius: '8px', background: '#dc2626', color: 'white', border: 'none', fontSize: '0.8rem', fontWeight: 700, cursor: timerActive ? 'not-allowed' : 'pointer', opacity: timerActive ? 0.5 : 1, fontFamily: 'inherit' }}>
            Start
          </button>
          <button onClick={() => { setTimerActive(false); setTimerSeconds(0) }}
            style={{ padding: '8px 14px', borderRadius: '8px', background: 'transparent', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)', fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit' }}>
            Reset
          </button>
        </div>
      </div>

      {/* Weight (for paed dose) */}
      <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}>Patient weight (kg)</div>
        <input type="number" placeholder="adults: leave blank" value={weight} onChange={e => setWeight(e.target.value)}
          style={{ flex: 1, padding: '8px 10px', borderRadius: '8px', border: '1.5px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontSize: '0.95rem', fontFamily: 'inherit', outline: 'none' }} />
        {weightNum && weightNum < 50 && (
          <div style={{ fontSize: '0.75rem', color: '#7c3aed', fontWeight: 700, whiteSpace: 'nowrap' }}>
            Paed dose: {(weightNum * 0.01).toFixed(2)} mg IM
          </div>
        )}
      </div>

      {/* Progress */}
      <div style={{ height: 4, background: 'var(--color-border)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(doneCount / steps.length) * 100}%`, background: doneCount === steps.length ? '#059669' : '#dc2626', transition: 'width 0.3s' }} />
      </div>

      {/* Steps */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {steps.map((s, i) => (
          <div key={i} onClick={() => setStepsDone(prev => ({ ...prev, [i]: !prev[i] }))}
            style={{
              padding: '14px', borderRadius: '12px', cursor: 'pointer',
              background: stepsDone[i] ? 'rgba(5,150,105,0.06)' : s.bg,
              border: `1.5px solid ${stepsDone[i] ? 'rgba(5,150,105,0.25)' : s.color + '25'}`,
              transition: 'all 0.2s', opacity: stepsDone[i] ? 0.7 : 1,
            }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%', flexShrink: 0, marginTop: 1,
                background: stepsDone[i] ? '#059669' : s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: '0.7rem', fontWeight: 800,
              }}>
                {stepsDone[i] ? '✓' : i + 1}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: s.color, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 2 }}>
                  {s.priority}
                </div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: stepsDone[i] ? 'var(--color-text-muted)' : 'var(--color-text-primary)', marginBottom: 4, textDecoration: stepsDone[i] ? 'line-through' : 'none' }}>
                  {s.action}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  {s.detail}
                </div>
                {s.warning && (
                  <div style={{ marginTop: 6, fontSize: '0.75rem', color: s.color, fontWeight: 600, padding: '4px 8px', background: `${s.color}10`, borderRadius: 6 }}>
                    ⚠ {s.warning}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reset steps */}
      {doneCount > 0 && (
        <button onClick={() => setStepsDone({})}
          style={{ background: 'none', border: '1px solid var(--color-border)', borderRadius: '10px', padding: '10px', color: 'var(--color-text-muted)', fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit' }}>
          Reset checklist
        </button>
      )}

      {/* Reference */}
      <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border-soft)', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
        <strong>Adrenaline route:</strong> IM anterolateral mid-thigh. 1:1000 solution (1 mg/mL).
        Adult dose 0.5 mg. Child dose 0.01 mg/kg (max 0.5 mg).
        IV adrenaline only in cardiac arrest or refractory anaphylaxis in monitored setting.
        Guideline: Resuscitation Council UK 2021 / WAO 2020.
      </div>
    </div>
  )
}
