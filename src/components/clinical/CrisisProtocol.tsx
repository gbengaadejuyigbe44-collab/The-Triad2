'use client'

// ─── Crisis Protocol ──────────────────────────────────────────────────────────
// 2024 AHA terminology throughout — "urgency" does not appear anywhere.
// Hypertensive Emergency vs Asymptomatic Markedly Elevated BP.
// MAP reduction targets with visual timeline.
// Drug-by-organ-system table.
// Sublingual nifedipine red flag — unmissable.

import { useState } from 'react'
import { Abbr } from '@/components/clinical/AbbreviationTooltip'

const DRUG_BY_ORGAN = [
  {
    organ: 'Neurological',
    condition: 'Hypertensive encephalopathy, intracranial haemorrhage',
    drug: 'IV Labetalol or IV Nicardipine',
    notes: 'Avoid sudden drops. In stroke: do NOT lower BP unless >220/120 (ischaemic) or >180/105 (haemorrhagic if thrombolysis planned). Nicardipine preferred if Labetalol unavailable.',
    color: '#7c3aed',
    bg: 'rgba(124,58,237,0.08)',
  },
  {
    organ: 'Cardiac',
    condition: 'Acute coronary syndrome, acute pulmonary oedema',
    drug: 'IV GTN ± IV Labetalol',
    notes: 'GTN for APO and ACS. Labetalol for rate and pressure control. Avoid in severe LV dysfunction without vasopressor support. Target SBP 160 initially.',
    color: '#dc2626',
    bg: 'rgba(220,38,38,0.08)',
  },
  {
    organ: 'Renal',
    condition: 'Hypertensive nephropathy, AKI',
    drug: 'IV Labetalol',
    notes: 'Avoid ACEi/ARB acutely in new AKI. Monitor creatinine and urine output closely. MAP reduction 20–25% over 2–6 hours.',
    color: '#0891b2',
    bg: 'rgba(8,145,178,0.08)',
  },
  {
    organ: 'Obstetric',
    condition: 'Eclampsia, severe pre-eclampsia',
    drug: 'IV Hydralazine + IV MgSO4',
    notes: 'MgSO4 for seizure prevention and treatment. Hydralazine 5mg IV bolus, repeat every 20 min. Target BP <160/110. Labetalol is an acceptable alternative. Delivery is the definitive treatment.',
    color: '#059669',
    bg: 'rgba(5,150,105,0.08)',
  },
  {
    organ: 'Aortic',
    condition: 'Aortic dissection',
    drug: 'IV Labetalol (rate + pressure)',
    notes: 'Target SBP <120 mmHg with Labetalol. Never vasodilators alone — reflex tachycardia worsens dissection. Surgical emergency — activate cardiothoracic team immediately.',
    color: '#ca8a04',
    bg: 'rgba(202,138,4,0.08)',
  },
]

const REDUCTION_STEPS = [
  { time: 'First hour', target: '≤25% MAP reduction', note: 'No more. Overshoot causes stroke, blindness, MI.', color: '#dc2626' },
  { time: 'Hours 2–6', target: '160/100 mmHg', note: 'Gradual titration to this intermediate target.', color: '#d97706' },
  { time: 'Hours 6–24', target: '140–160/90–100 mmHg', note: 'Continue oral agents. Do not rush to normal.', color: '#0891b2' },
  { time: '24–48 hours', target: 'Gradual normalisation', note: 'Only when clinically stable. Oral therapy established.', color: '#059669' },
]

export function CrisisProtocol() {
  const [mapSbp, setMapSbp] = useState('')
  const [mapDbp, setMapDbp] = useState('')

  const sbpNum = parseFloat(mapSbp)
  const dbpNum = parseFloat(mapDbp)
  const currentMap = (!isNaN(sbpNum) && !isNaN(dbpNum))
    ? Math.round(dbpNum + (sbpNum - dbpNum) / 3)
    : null
  const maxReduction = currentMap ? Math.round(currentMap * 0.75) : null
  const maxReductionSbp = sbpNum ? Math.round(sbpNum * 0.75) : null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: 620 }}>

      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Crisis Protocol
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Guideline: <strong>2024 AHA / ESH 2023</strong>
        </p>
      </div>

      {/* TERMINOLOGY — 2024 AHA update */}
      <div style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'rgba(14,165,233,0.06)',
        border: '1.5px solid rgba(14,165,233,0.2)',
      }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>
          2024 AHA Terminology Update
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Hypertensive Emergency
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              BP ≥180/110–120 mmHg <strong>WITH</strong> new or worsening organ damage (<Abbr term="HMOD" />)
            </div>
            <div style={{ fontSize: '0.75rem', color: '#dc2626', fontWeight: 600, marginTop: 6 }}>
              → IV therapy, ICU/HDU admission
            </div>
          </div>
          <div style={{ padding: '12px', borderRadius: '10px', background: 'rgba(217,119,6,0.08)', border: '1px solid rgba(217,119,6,0.2)' }}>
            <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>
              Asymptomatic Markedly Elevated BP
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Same BP <strong>WITHOUT</strong> organ damage
            </div>
            <div style={{ fontSize: '0.75rem', color: '#d97706', fontWeight: 600, marginTop: 6 }}>
              → Oral agents, outpatient follow-up
            </div>
          </div>
        </div>
        <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', marginTop: 10, padding: '8px 10px', background: 'var(--color-bg)', borderRadius: 8 }}>
          <strong style={{ color: 'var(--color-text-secondary)' }}>Note:</strong> The term "hypertensive urgency" has been retired by the 2024 AHA. Do not use it. The distinction is now entirely based on the presence or absence of organ damage.
        </div>
      </div>

      {/* RED FLAG — sublingual nifedipine */}
      <div style={{
        padding: '16px',
        borderRadius: '14px',
        background: 'rgba(220,38,38,0.07)',
        border: '2px solid rgba(220,38,38,0.35)',
        display: 'flex',
        gap: 14,
        alignItems: 'flex-start',
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          background: '#dc2626',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          flexShrink: 0,
          color: 'white',
        }}>
          🚫
        </div>
        <div>
          <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#dc2626', marginBottom: 4 }}>
            Sublingual nifedipine is contraindicated
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
            Causes unpredictable, uncontrolled rapid BP drop. Consequences: stroke, MI, acute blindness.
            Still used in some Nigerian facilities. <strong>Do not give under any circumstances.</strong>
          </div>
        </div>
      </div>

      {/* MAP REDUCTION CALCULATOR */}
      <div style={{
        padding: '18px',
        borderRadius: '14px',
        background: 'var(--color-bg-elevated)',
        border: '1px solid var(--color-border)',
      }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 12 }}>
          MAP Reduction Calculator — enter presenting BP
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'flex-end', marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>SBP (mmHg)</label>
            <input type="number" placeholder="e.g. 210" value={mapSbp} onChange={e => setMapSbp(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#dc2626')} onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
          </div>
          <div style={{ fontSize: '1.3rem', color: 'var(--color-text-muted)', paddingBottom: 8 }}>/</div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '0.72rem', color: 'var(--color-text-muted)', display: 'block', marginBottom: 4 }}>DBP (mmHg)</label>
            <input type="number" placeholder="e.g. 130" value={mapDbp} onChange={e => setMapDbp(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid var(--color-border)', background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontSize: '1.1rem', fontWeight: 700, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box' }}
              onFocus={e => (e.target.style.borderColor = '#dc2626')} onBlur={e => (e.target.style.borderColor = 'var(--color-border)')} />
          </div>
        </div>

        {currentMap && maxReduction && maxReductionSbp && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Current MAP</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>{currentMap}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>mmHg</div>
            </div>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(220,38,38,0.06)', border: '1px solid rgba(220,38,38,0.2)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.62rem', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: 2 }}>Max 1hr reduction</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#dc2626' }}>{maxReduction}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>MAP target</div>
            </div>
            <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)', textAlign: 'center' }}>
              <div style={{ fontSize: '0.62rem', color: '#d97706', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700, marginBottom: 2 }}>SBP after 1hr</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#d97706' }}>≥{maxReductionSbp}</div>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-muted)' }}>do not go below</div>
            </div>
          </div>
        )}
      </div>

      {/* REDUCTION TIMELINE */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          BP Reduction Timeline
        </div>
        <div style={{ position: 'relative', paddingLeft: 28 }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: 10, top: 16, bottom: 16, width: 2, background: 'var(--color-border)', borderRadius: 1 }} />
          {REDUCTION_STEPS.map((step, i) => (
            <div key={i} style={{ position: 'relative', marginBottom: i < REDUCTION_STEPS.length - 1 ? 16 : 0 }}>
              <div style={{ position: 'absolute', left: -22, top: 10, width: 12, height: 12, borderRadius: '50%', background: step.color, border: '2px solid var(--color-bg)', boxShadow: `0 0 0 2px ${step.color}40` }} />
              <div style={{ padding: '12px 14px', borderRadius: '12px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: '0.72rem', fontWeight: 700, color: step.color, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{step.time}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-text-primary)' }}>{step.target}</span>
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', lineHeight: 1.4 }}>{step.note}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, padding: '10px 14px', borderRadius: '10px', background: 'rgba(220,38,38,0.05)', border: '1px solid rgba(220,38,38,0.15)', fontSize: '0.82rem', color: '#dc2626', fontWeight: 600, lineHeight: 1.5 }}>
          ⚠ Never reduce BP rapidly to normal. Sudden normalisation causes cerebral, coronary, and renal hypoperfusion.
        </div>
      </div>

      {/* DRUG BY ORGAN TABLE */}
      <div>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 10 }}>
          Drug selection by organ threatened
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {DRUG_BY_ORGAN.map((row, i) => (
            <div key={i} style={{ padding: '14px', borderRadius: '12px', background: row.bg, border: `1px solid ${row.color}25` }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 6 }}>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, color: row.color, textTransform: 'uppercase', letterSpacing: '0.06em', minWidth: 80, paddingTop: 1 }}>{row.organ}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--color-text-muted)', flex: 1, lineHeight: 1.4 }}>{row.condition}</div>
              </div>
              <div style={{ fontSize: '0.95rem', fontWeight: 700, color: row.color, marginBottom: 4 }}>{row.drug}</div>
              <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{row.notes}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ASYMPTOMATIC BRANCH */}
      <div style={{ padding: '16px', borderRadius: '14px', background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.2)' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#059669', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>
          Asymptomatic Markedly Elevated BP — management
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[
            'Oral antihypertensives — do not give IV',
            'Target gradual reduction over 24–48 hours',
            'No hospital admission required unless social concern',
            'Review current medications and adherence',
            'Arrange outpatient follow-up within 48–72 hours',
            'Restart or intensify existing medication regimen',
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <span style={{ color: '#059669', fontWeight: 700, flexShrink: 0 }}>✓</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
