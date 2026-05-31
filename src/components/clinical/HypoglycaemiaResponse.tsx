'use client'

// ─── Hypoglycaemia Response ───────────────────────────────────────────────────
// Standalone room. One-hand usable. 2am-proof.
// Dextrose 50% vs 10% decision.
// Oral glucose if conscious.
// Glucagon with Nigerian availability flag.
// Recovery monitoring checklist.
// ADA 2025.

import { useState } from 'react'

type Consciousness = 'conscious' | 'impaired' | 'unconscious' | null

export function HypoglycaemiaResponse() {
  const [bg, setBg] = useState('')
  const [consciousness, setConsciousness] = useState<Consciousness>(null)
  const [dextrAvail, setDextrAvail] = useState<'50' | '10' | 'none'>('50')
  const [glucagonAvail, setGluconAvail] = useState(false)
  const [step, setStep] = useState(0)

  const bgNum = parseFloat(bg)
  const isSevere = !isNaN(bgNum) && bgNum < 2.8
  const isHypo = !isNaN(bgNum) && bgNum < 4.0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', maxWidth: 600 }}>
      <div>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 6px' }}>
          Hypoglycaemia Response
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.5 }}>
          Guideline: <strong>ADA 2025</strong> &nbsp;·&nbsp; Threshold: BG &lt;4.0 mmol/L
        </p>
      </div>

      {/* BG input */}
      <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
        <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-text-secondary)', display: 'block', marginBottom: 8 }}>
          Blood glucose (mmol/L)
        </label>
        <input
          type="number" step="0.1" placeholder="e.g. 2.1" value={bg}
          onChange={e => setBg(e.target.value)}
          style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `2px solid ${isSevere ? '#dc2626' : isHypo ? '#d97706' : 'var(--color-border)'}`, background: 'var(--color-bg)', color: 'var(--color-text-primary)', fontSize: '1.4rem', fontWeight: 800, fontFamily: 'inherit', outline: 'none', boxSizing: 'border-box', textAlign: 'center' }}
        />
        {isSevere && <div style={{ marginTop: 6, fontSize: '0.82rem', color: '#dc2626', fontWeight: 700 }}>⚠ Severe hypoglycaemia — BG &lt;2.8 mmol/L. IV dextrose required.</div>}
        {isHypo && !isSevere && <div style={{ marginTop: 6, fontSize: '0.82rem', color: '#d97706', fontWeight: 600 }}>Hypoglycaemia confirmed. Level of consciousness determines route.</div>}
      </div>

      {/* Consciousness */}
      <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
          Level of consciousness
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { value: 'conscious', label: 'Conscious and able to swallow', sub: 'Oral route safe', color: '#059669' },
            { value: 'impaired', label: 'Conscious but confused / drowsy', sub: 'Caution with oral route — aspiration risk', color: '#d97706' },
            { value: 'unconscious', label: 'Unconscious or unable to swallow', sub: 'IV or IM route only', color: '#dc2626' },
          ].map(opt => (
            <button key={opt.value} onClick={() => setConsciousness(opt.value as Consciousness)}
              style={{ padding: '12px 14px', borderRadius: '10px', border: `1.5px solid ${consciousness === opt.value ? opt.color : 'var(--color-border)'}`, background: consciousness === opt.value ? `${opt.color}12` : 'transparent', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: consciousness === opt.value ? opt.color : 'var(--color-text-primary)' }}>{opt.label}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', marginTop: 2 }}>{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Available agents */}
      <div style={{ padding: '16px', borderRadius: '14px', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--color-text-secondary)', marginBottom: 10 }}>
          What is available in your facility?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
          {[
            { value: '50', label: 'Dextrose 50%' },
            { value: '10', label: 'Dextrose 10%' },
            { value: 'none', label: 'No IV dextrose' },
          ].map(opt => (
            <button key={opt.value} onClick={() => setDextrAvail(opt.value as typeof dextrAvail)}
              style={{ padding: '8px 14px', borderRadius: '20px', border: `1.5px solid ${dextrAvail === opt.value ? 'var(--color-accent-blue)' : 'var(--color-border)'}`, background: dextrAvail === opt.value ? 'rgba(14,165,233,0.1)' : 'transparent', color: dextrAvail === opt.value ? 'var(--color-accent-blue)' : 'var(--color-text-muted)', fontWeight: dextrAvail === opt.value ? 700 : 400, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s' }}>
              {opt.label}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <input type="checkbox" id="glucagon" checked={glucagonAvail} onChange={e => setGluconAvail(e.target.checked)} style={{ accentColor: 'var(--color-accent-blue)', width: 16, height: 16 }} />
          <label htmlFor="glucagon" style={{ fontSize: '0.82rem', color: 'var(--color-text-secondary)', cursor: 'pointer' }}>
            Glucagon available
            <span style={{ marginLeft: 6, fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>(rarely stocked in Nigerian facilities)</span>
          </label>
        </div>
      </div>

      {/* PROTOCOL OUTPUT */}
      {consciousness && (
        <div style={{ borderRadius: '16px', overflow: 'hidden', border: '1.5px solid var(--color-border)' }}>
          <div style={{ padding: '14px 18px', background: 'rgba(14,165,233,0.08)', borderBottom: '1px solid rgba(14,165,233,0.15)' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-accent-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 2 }}>Treatment Protocol</div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--color-text-primary)' }}>
              {consciousness === 'conscious' ? 'Oral glucose — give immediately' : consciousness === 'impaired' ? 'Buccal glucose or IV dextrose — avoid oral' : 'IV dextrose — only safe route'}
            </div>
          </div>

          <div style={{ padding: '16px 18px', background: 'var(--color-bg-elevated)', display: 'flex', flexDirection: 'column', gap: 12 }}>

            {/* Step by step */}
            {consciousness === 'conscious' && (
              <div>
                {[
                  { step: '1', text: '15–20g fast-acting carbohydrate: 150 mL fruit juice, 3–4 glucose tablets, or 6 jelly babies', color: '#059669' },
                  { step: '2', text: 'Recheck BG after 15 minutes. If still <4.0 mmol/L — repeat 15–20g carbohydrate.', color: '#059669' },
                  { step: '3', text: 'Once BG >4.0 mmol/L — give long-acting carbohydrate snack to prevent recurrence (biscuits, bread).', color: '#0891b2' },
                  { step: '4', text: 'Continue monitoring BG every 15–30 minutes until stable for 1 hour.', color: '#0891b2' },
                ].map(item => (
                  <div key={item.step} style={{ display: 'flex', gap: 10, marginBottom: 8, alignItems: 'flex-start' }}>
                    <div style={{ width: 22, height: 22, borderRadius: '50%', background: item.color, color: 'white', fontSize: '0.7rem', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>{item.step}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>{item.text}</div>
                  </div>
                ))}
              </div>
            )}

            {(consciousness === 'impaired' || consciousness === 'unconscious') && (
              <div>
                {dextrAvail === '50' && (
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', marginBottom: 10 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-accent-blue)', marginBottom: 4 }}>Dextrose 50% — IV push</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <strong>50 mL (25g)</strong> IV over 3–5 minutes.<br />
                      ⚠ Highly concentrated — use large vein, flush with 10 mL normal saline after.<br />
                      Can cause tissue necrosis if extravasation. Monitor IV site closely.
                    </div>
                  </div>
                )}
                {dextrAvail === '10' && (
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(14,165,233,0.08)', border: '1px solid rgba(14,165,233,0.2)', marginBottom: 10 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--color-accent-blue)', marginBottom: 4 }}>Dextrose 10% — IV infusion</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <strong>150–200 mL</strong> IV over 15 minutes.<br />
                      Safer peripheral access than 50%. Preferred in paediatrics and elderly.<br />
                      Monitor BG every 15 minutes during infusion.
                    </div>
                  </div>
                )}
                {dextrAvail === 'none' && !glucagonAvail && (
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', marginBottom: 10 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dc2626', marginBottom: 4 }}>⚠ No IV dextrose or glucagon available</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      If patient has any swallowing: apply glucose gel or honey to buccal mucosa (under the cheek).<br />
                      Position on side (recovery position) to prevent aspiration.<br />
                      Transfer to facility with IV dextrose immediately — this is a medical emergency.
                    </div>
                  </div>
                )}
                {glucagonAvail && (consciousness === 'unconscious' || dextrAvail === 'none') && (
                  <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)', marginBottom: 10 }}>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#7c3aed', marginBottom: 4 }}>Glucagon — IM or SC</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <strong>1 mg IM</strong> (adults). Onset 10–15 minutes.<br />
                      Ineffective if patient has been starving — no glycogen stores to mobilise.<br />
                      Position patient on side — glucagon causes nausea and vomiting. Have IV access ready.
                    </div>
                  </div>
                )}

                {/* Steps after IV treatment */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 4 }}>
                  {[
                    'Recheck BG 15 minutes after treatment. Target BG >4.0 mmol/L.',
                    'Once conscious and able to swallow — give 20g long-acting carbohydrate (biscuits, bread).',
                    'Monitor BG every 30 minutes until stable above 6.0 mmol/L for 1 hour.',
                    'Identify and address cause — missed meal, excess insulin, renal impairment, alcohol.',
                    'Review insulin/sulfonylurea doses before next administration.',
                  ].map((item, i) => (
                    <div key={i} style={{ display: 'flex', gap: 8, fontSize: '0.82rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                      <span style={{ color: 'var(--color-accent-blue)', fontWeight: 700, flexShrink: 0 }}>{i + 1}.</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sulfonylurea warning */}
            <div style={{ padding: '10px 12px', borderRadius: '8px', background: 'rgba(245,158,11,0.07)', border: '1px solid rgba(245,158,11,0.2)', fontSize: '0.78rem', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              <strong style={{ color: '#d97706' }}>If on sulfonylurea (Glibenclamide):</strong>{' '}
              Hypoglycaemia can recur for 24–72 hours after initial treatment. Admit for observation and IV dextrose infusion. Do not discharge after single BG correction.
            </div>
          </div>
        </div>
      )}

      {/* Reference */}
      <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--color-bg)', border: '1px solid var(--color-border-soft)', fontSize: '0.75rem', color: 'var(--color-text-muted)', lineHeight: 1.5 }}>
        <strong>ADA 2025 — Rule of 15:</strong> 15g carbohydrate, recheck in 15 minutes, repeat if still &lt;4.0 mmol/L.
        Hypoglycaemia threshold: BG &lt;4.0 mmol/L (clinically actionable) / BG &lt;3.0 mmol/L (significant) / BG &lt;2.8 mmol/L (severe).
      </div>
    </div>
  )
}
