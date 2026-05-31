'use client'

// ─── Vasopressor Guide ────────────────────────────────────────────────────────
// SSC 2026: vasopressors may now start peripherally.
// Nigerian availability flag on every drug.
// Every drug has an if-unavailable branch.

import { useState } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'
import { useRegion } from '@/lib/region'

const VASOPRESSORS = [
  {
    id: 'noradrenaline',
    name: 'Noradrenaline',
    alias: 'Norepinephrine',
    lineLabel: 'FIRST LINE',
    lineColor: '#dc2626',
    indication: 'Septic shock, distributive shock. First-line vasopressor per SSC 2026.',
    dose: '0.01–3 mcg/kg/min IV infusion',
    preparation: 'Dilute 4 mg in 50 mL 0.9% NaCl → 80 mcg/mL. Start at 0.01 mcg/kg/min. Titrate every 5–10 min to MAP target.',
    monitoring: 'MAP every 15 min, HR, urine output hourly, IV site (peripheral)',
    sideEffects: 'Peripheral vasoconstriction, extravasation necrosis (peripheral IV — monitor site), arrhythmia, limb ischaemia at high doses.',
    ngAvailability: 'low',
    ngNote: 'Often unavailable in secondary and tertiary facilities. Check pharmacy before starting resus.',
    fallback: 'Dopamine',
    fallbackReason: 'If noradrenaline unavailable — dopamine 5–20 mcg/kg/min. Higher arrhythmia risk.',
    ssc2026: 'Can now start via peripheral IV. Do not delay for central line.',
  },
  {
    id: 'dopamine',
    name: 'Dopamine',
    alias: null,
    lineLabel: 'SECOND LINE',
    lineColor: '#d97706',
    indication: 'Fallback when noradrenaline unavailable. Cardiogenic shock (low dose for inotropy). More widely available in Nigerian facilities.',
    dose: 'Vasopressor: 5–20 mcg/kg/min. Inotropic: 2–5 mcg/kg/min.',
    preparation: 'Dilute 200 mg in 50 mL 0.9% NaCl → 4 mg/mL. Start at 5 mcg/kg/min, titrate to MAP.',
    monitoring: 'MAP every 15 min, ECG monitoring (arrhythmia risk), HR',
    sideEffects: 'Tachycardia, arrhythmias (more than noradrenaline), increased myocardial O₂ demand. Avoid in cardiogenic shock where possible.',
    ngAvailability: 'high',
    ngNote: 'Generally available in Nigerian hospitals. More affordable than noradrenaline.',
    fallback: null,
    fallbackReason: null,
    ssc2026: 'Can start peripherally. Avoid in septic shock where noradrenaline is available — higher mortality vs noradrenaline in trials.',
  },
  {
    id: 'adrenaline',
    name: 'Adrenaline',
    alias: 'Epinephrine',
    lineLabel: 'THIRD LINE / ANAPHYLAXIS',
    lineColor: '#7c3aed',
    indication: 'Anaphylactic shock (first line IM). Noradrenaline-resistant septic shock (add-on). Cardiac arrest.',
    dose: 'Anaphylaxis: 0.5 mg IM. Septic shock add-on: 0.01–1 mcg/kg/min IV. Cardiac arrest: 1 mg IV every 3–5 min.',
    preparation: 'IV infusion: dilute 1 mg in 50 mL 0.9% NaCl → 20 mcg/mL. For anaphylaxis: use undiluted 1:1000 (1 mg/mL) IM.',
    monitoring: 'MAP, HR, lactate (adrenaline raises lactate — do not use lactate alone to guide therapy), glucose',
    sideEffects: 'Tachycardia, arrhythmias, hyperglycaemia, lactic acidosis, myocardial ischaemia at high doses.',
    ngAvailability: 'high',
    ngNote: 'Available in most Nigerian hospitals. Adrenaline 1:1000 for anaphylaxis. For IV use — dilute appropriately.',
    fallback: null,
    fallbackReason: null,
    ssc2026: null,
  },
  {
    id: 'dobutamine',
    name: 'Dobutamine',
    alias: null,
    lineLabel: 'CARDIOGENIC SHOCK ONLY',
    lineColor: '#e11d48',
    indication: 'Cardiogenic shock — inotropic support when LV function is impaired. Use WITH noradrenaline, not instead of it.',
    dose: '1–20 mcg/kg/min IV infusion. Start low, titrate.',
    preparation: 'Dilute 250 mg in 50 mL 0.9% NaCl → 5 mg/mL. Start at 2.5 mcg/kg/min.',
    monitoring: 'BP, HR, ECG, signs of worsening ischaemia, signs of tolerance (tachyphylaxis after 72h)',
    sideEffects: 'Tachycardia, hypotension (vasodilator effect), arrhythmias, worsens ischaemia.',
    ngAvailability: 'low',
    ngNote: 'Often unavailable. Check pharmacy. If unavailable in cardiogenic shock — use dopamine as dual vasopressor/inotrope.',
    fallback: 'Dopamine (dual vasopressor + inotrope)',
    fallbackReason: 'Dopamine at 2–5 mcg/kg/min has inotropic effect. Less pure inotrope than dobutamine but more available.',
    ssc2026: 'Do NOT use in septic shock. Cardiogenic shock only.',
  },
  {
    id: 'vasopressin',
    name: 'Vasopressin',
    alias: 'ADH',
    lineLabel: 'ADJUNCT — REFRACTORY SHOCK',
    lineColor: '#0891b2',
    indication: 'Add-on in refractory septic shock when noradrenaline dose is >0.25 mcg/kg/min. Reduces noradrenaline requirements.',
    dose: 'Fixed dose: 0.03 units/min IV. Do not titrate.',
    preparation: 'Dilute 20 units in 100 mL 0.9% NaCl → 0.2 units/mL. Run at 9 mL/hr (0.03 units/min).',
    monitoring: 'MAP, urine output, sodium (risk of hyponatraemia), digital/limb ischaemia',
    sideEffects: 'Mesenteric ischaemia, skin necrosis, hyponatraemia, cardiac ischaemia.',
    ngAvailability: 'low',
    ngNote: 'Rarely available in Nigeria. Not a first-line consideration in resource-limited settings.',
    fallback: 'Increase noradrenaline ± add adrenaline',
    fallbackReason: 'In refractory septic shock without vasopressin — escalate noradrenaline and add adrenaline as second vasopressor.',
    ssc2026: 'SSC 2026 recommends vasopressin addition to reduce noradrenaline dose when >0.25 mcg/kg/min.',
  },
]

function AvailabilityBadge({ level }: { level: 'high' | 'medium' | 'low' }) {
  const config = {
    high: { label: 'Usually available', color: '#059669', bg: 'rgba(5,150,105,0.1)' },
    medium: { label: 'Sometimes available', color: '#d97706', bg: 'rgba(217,119,6,0.1)' },
    low: { label: 'Often unavailable', color: '#dc2626', bg: 'rgba(220,38,38,0.1)' },
  }[level]
  return (
    <span style={{ fontSize: '0.68rem', fontWeight: 700, color: config.color, background: config.bg, padding: '2px 8px', borderRadius: '10px' }}>
      🇳🇬 {config.label}
    </span>
  )
}

export function VasopressorGuide() {
  const { region } = useRegion()
  const [expanded, setExpanded] = useState<string>('noradrenaline')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: 620 }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Vasopressor Guide
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0 }}>
          Guideline: <strong>{region.guidelineShock}</strong>
        </p>
      </div>

      {/* SSC 2026 key update */}
      <div style={{ padding: '12px 16px', borderRadius: '12px', background: 'rgba(14,165,233,0.08)', border: '1.5px solid rgba(14,165,233,0.22)' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>
          SSC 2026 — Critical Update
        </div>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: 4 }}>
          Vasopressors can now start via peripheral IV
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
          Do not delay vasopressor therapy waiting for central line insertion.
          Start via large peripheral IV. Monitor site for extravasation every 15 minutes.
          Place central line when opportunity arises — not as a prerequisite.
        </div>
      </div>

      {/* Vasopressor cards */}
      {VASOPRESSORS.map(vp => (
        <div key={vp.id} style={{
          borderRadius: '14px',
          border: `1.5px solid ${expanded === vp.id ? vp.lineColor + '40' : 'var(--color-border)'}`,
          overflow: 'hidden',
          transition: 'border-color 0.2s',
        }}>
          {/* Card header */}
          <button onClick={() => setExpanded(expanded === vp.id ? '' : vp.id)}
            style={{ width: '100%', padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 10, background: expanded === vp.id ? `${vp.lineColor}08` : 'var(--color-bg-elevated)', border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: '0.65rem', fontWeight: 700, color: vp.lineColor, background: `${vp.lineColor}15`, padding: '2px 8px', borderRadius: '10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {vp.lineLabel}
                </span>
                {region.code === 'NG' && (
                  <AvailabilityBadge level={vp.ngAvailability as 'high' | 'medium' | 'low'} />
                )}
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
                {vp.name}
                {vp.alias && <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--color-text-muted)', marginLeft: 6 }}>({vp.alias})</span>}
              </div>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)', transform: expanded === vp.id ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</div>
          </button>

          {/* Expanded content */}
          {expanded === vp.id && (
            <div style={{ padding: '16px', borderTop: `1px solid ${vp.lineColor}20`, background: 'var(--color-bg-elevated)', display: 'flex', flexDirection: 'column', gap: 12 }}>

              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>{vp.indication}</p>

              {/* Dose + prep */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Dose</div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: vp.lineColor }}>{vp.dose}</div>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Preparation</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{vp.preparation}</div>
                </div>
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)' }}>
                  <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>Monitoring</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{vp.monitoring}</div>
                </div>
              </div>

              {/* Side effects */}
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5, padding: '8px 10px', background: 'rgba(220,38,38,0.04)', borderRadius: 8 }}>
                <strong style={{ color: 'var(--color-text-secondary)' }}>Side effects:</strong> {vp.sideEffects}
              </div>

              {/* Nigerian context */}
              {region.code === 'NG' && (
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(16,185,129,0.07)', border: '1px solid rgba(16,185,129,0.2)', fontSize: '0.8rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-accent-green)' }}>🇳🇬 Nigerian context:</strong> {vp.ngNote}
                </div>
              )}

              {/* Fallback */}
              {vp.fallback && (
                <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'rgba(217,119,6,0.07)', border: '1px solid rgba(217,119,6,0.2)', fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#d97706' }}>If unavailable → {vp.fallback}:</strong> {vp.fallbackReason}
                </div>
              )}

              {/* SSC 2026 note */}
              {vp.ssc2026 && (
                <div style={{ padding: '8px 10px', borderRadius: '8px', background: 'rgba(14,165,233,0.06)', border: '1px solid rgba(14,165,233,0.18)', fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  <strong style={{ color: 'var(--color-accent-blue)' }}>SSC 2026:</strong> {vp.ssc2026}
                </div>
              )}
            </div>
          )}
        </div>
      ))}

      {/* MAP target reminder */}
      <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border-soft)', fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        <strong style={{ color: 'var(--color-text-secondary)' }}><Abbr term="MAP" /> target:</strong> ≥65 mmHg standard.
        For age ≥65: permissive target 60–65 mmHg — aggressive targeting did not improve mortality in elderly (SSC 2026).
        Use Fluid & MAP Calculator to monitor in real time.
      </div>
    </div>
  )
}
