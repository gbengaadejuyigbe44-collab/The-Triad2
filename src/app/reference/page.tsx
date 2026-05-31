'use client'

import { useState } from 'react'
import { RegionProvider, useRegion, type Region } from '@/lib/region'
import { clearSession } from '@/lib/abbreviations'
import { BPTriage } from '@/components/clinical/BPTriage'
import { HMODScreen } from '@/components/clinical/HMODScreen'
import { CrisisProtocol } from '@/components/clinical/CrisisProtocol'
import { ShockSplitter } from '@/components/clinical/ShockSplitter'
import { FluidMAPCalculator } from '@/components/clinical/FluidMAPCalculator'
import { VasopressorGuide } from '@/components/clinical/VasopressorGuide'
import { AnaphylaxisProtocol } from '@/components/clinical/AnaphylaxisProtocol'
import { GlycaemicSplitter } from '@/components/clinical/GlycaemicSplitter'
import { HypoglycaemiaResponse } from '@/components/clinical/HypoglycaemiaResponse'

// ── Module + tab structure ─────────────────────────────────────────────────────

interface Tab { id: string; label: string; icon: string; placeholder?: string }
interface TabGroup { id: string; label: string; tabs: Tab[] }
interface Module { id: string; label: string; shortLabel: string; color: string; bg: string; icon: string; groups: TabGroup[] }

const MODULES: Module[] = [
  {
    id: 'htn', label: 'Hypertension Complex', shortLabel: 'HTN',
    color: '#dc2626', bg: 'rgba(220,38,38,0.08)', icon: '🫀',
    groups: [
      { id: 'triage', label: 'Triage', tabs: [
        { id: 'bp-triage', label: 'BP Triage', icon: '🩺' },
        { id: 'hmod-screen', label: 'HMOD Screen', icon: '🔍' },
      ]},
      { id: 'protocols', label: 'Protocols', tabs: [
        { id: 'crisis-protocol', label: 'Crisis Protocol', icon: '⚡' },
        { id: 'special-pops', label: 'Special Populations', icon: '👥', placeholder: 'Special Populations — pregnancy, elderly, CKD, DM — coming next' },
        { id: 'bp-measurement', label: 'BP Measurement', icon: '📏', placeholder: 'Three-reading protocol reference — coming next' },
      ]},
      { id: 'core', label: 'Core', tabs: [
        { id: 'detection', label: 'Detection', icon: '📊', placeholder: 'Detection — ESC 2024 elevated BP category — in build' },
        { id: 'treatment', label: 'Treatment', icon: '💊', placeholder: 'Treatment — Nigerian formulary — in build' },
        { id: 'evaluation', label: 'Evaluation', icon: '📋', placeholder: 'Evaluation — secondary HTN flags — in build' },
      ]},
      { id: 'tools', label: 'Tools', tabs: [
        { id: 'ascvd-risk', label: 'ASCVD Risk', icon: '📈', placeholder: 'ASCVD Risk — SCORE2 + African correction — in build' },
        { id: 'med-checker', label: 'Med Checker', icon: '✅', placeholder: 'Medication checker — migrating from existing' },
        { id: 'bp-tracker', label: 'BP Tracker', icon: '📉', placeholder: 'BP Tracker — migrating from existing' },
        { id: 'lifestyle', label: 'Lifestyle', icon: '🥗', placeholder: 'Lifestyle modifications' },
      ]},
      { id: 'antenatal', label: 'Antenatal', tabs: [
        { id: 'anc', label: 'ANC Assessment', icon: '🤰', placeholder: 'Antenatal Care Assessment — migrating from existing' },
      ]},
    ],
  },
  {
    id: 'dm', label: 'Diabetes Complex', shortLabel: 'DM',
    color: '#7c3aed', bg: 'rgba(124,58,237,0.08)', icon: '🩸',
    groups: [
      { id: 'emergencies', label: 'Emergencies', tabs: [
        { id: 'glycaemic-splitter', label: 'Glycaemic Splitter', icon: '⚡' },
        { id: 'hypoglycaemia', label: 'Hypoglycaemia Response', icon: '🍬' },
      ]},
      { id: 'core', label: 'Core', tabs: [
        { id: 'dm-detection', label: 'Detection', icon: '📊', placeholder: 'DM Detection — diagnostic thresholds — in build' },
        { id: 'dm-evaluation', label: 'Evaluation', icon: '📋', placeholder: 'Evaluation — distress + hypoglycaemia fear screening (ADA 2025) — in build' },
        { id: 'complications', label: 'Complications Checklist', icon: '✅', placeholder: 'Annual complications checklist — Tracker integration — in build' },
      ]},
      { id: 'treatment', label: 'Treatment', tabs: [
        { id: 't2-treatment', label: 'Type 2 Treatment', icon: '💊', placeholder: 'T2DM — ADA 2025 + Nigerian pathway — in build' },
        { id: 't1-dm', label: 'Type 1 DM', icon: '💉', placeholder: 'T1DM — CGM update ADA 2025 — in build' },
        { id: 'hba1c', label: 'HbA1c & Targets', icon: '🎯', placeholder: 'HbA1c & Targets — migrating from existing' },
        { id: 'insulin-guide', label: 'Insulin Guide', icon: '🧪', placeholder: 'Insulin Guide — cold chain notes — in build' },
      ]},
      { id: 'tools', label: 'Tools', tabs: [
        { id: 'insulin-chart', label: 'Insulin Chart', icon: '📊', placeholder: 'Insulin Chart — migrating from existing' },
        { id: 'bg-tracker', label: 'BG Tracker', icon: '📉', placeholder: 'BG Tracker — migrating from existing' },
      ]},
    ],
  },
  {
    id: 'hypotension', label: 'Hypotension Complex', shortLabel: 'Shock',
    color: '#0891b2', bg: 'rgba(8,145,178,0.08)', icon: '📉',
    groups: [
      { id: 'triage', label: 'Triage', tabs: [
        { id: 'shock-splitter', label: 'Shock Splitter', icon: '⚡' },
        { id: 'fluid-map', label: 'Fluid & MAP Calc', icon: '🧮' },
      ]},
      { id: 'management', label: 'Management', tabs: [
        { id: 'vasopressor-guide', label: 'Vasopressor Guide', icon: '💉' },
        { id: 'shock-protocol', label: 'Shock Protocol', icon: '📋', placeholder: 'Shock Protocol — SSC 2026 upgrade — in build' },
        { id: 'anaphylaxis', label: 'Anaphylaxis', icon: '⚡' },
      ]},
      { id: 'reference', label: 'Reference', tabs: [
        { id: 'special-cases', label: 'Special Cases', icon: '📘', placeholder: 'Neurogenic, obstructive shock — in build' },
        { id: 'evaluation', label: 'Evaluation', icon: '📋', placeholder: 'Monitoring parameters — in build' },
      ]},
    ],
  },
  {
    id: 'drugs', label: 'Drug Reference', shortLabel: 'Drugs',
    color: '#059669', bg: 'rgba(5,150,105,0.08)', icon: '💊',
    groups: [
      { id: 'triad-rapid', label: 'Triad Rapid Access', tabs: [
        { id: 'iv-emergency', label: 'IV Emergency Guide', icon: '⚡', placeholder: 'IV Emergency Guide — 12 critical drugs — in build' },
        { id: 'ng-formulary', label: 'Nigerian Formulary', icon: '🇳🇬', placeholder: 'Nigerian Formulary — brands, costs, NHIS, substitution chains — in build' },
        { id: 'triad-interactions', label: 'Triad Interactions', icon: '⚠', placeholder: 'Triad-specific drug interactions — in build' },
      ]},
      { id: 'cv-metabolic', label: 'Cardiovascular & Metabolic', tabs: [
        { id: 'antihypertensives', label: 'Antihypertensives', icon: '💊', placeholder: 'Antihypertensives — migrating from existing' },
        { id: 'vasopressors', label: 'Vasopressors', icon: '💉', placeholder: 'Vasopressors monograph — migrating from existing' },
        { id: 'antidiabetics', label: 'Antidiabetics', icon: '🩸', placeholder: 'Antidiabetics — migrating from existing' },
        { id: 'insulin-calc', label: 'Insulin Calc', icon: '🧮', placeholder: 'Insulin Calculator — migrating from existing' },
        { id: 'cardio-endocrine', label: 'Cardio & Endocrine', icon: '❤️', placeholder: 'Migrating from existing' },
      ]},
      { id: 'emergency-critical', label: 'Emergency & Critical Care', tabs: [
        { id: 'emergency-meds', label: 'Emergency Meds', icon: '🚨', placeholder: 'Migrating from existing' },
        { id: 'iv-fluids', label: 'IV Fluids', icon: '💧', placeholder: 'Migrating from existing' },
        { id: 'analgesics', label: 'Analgesics', icon: '💊', placeholder: 'Migrating from existing' },
        { id: 'electrolytes', label: 'Electrolytes', icon: '⚡', placeholder: 'Migrating from existing' },
      ]},
      { id: 'infection', label: 'Infection & Tropical', tabs: [
        { id: 'antibiotics', label: 'Antibiotics', icon: '🦠', placeholder: 'Migrating from existing' },
        { id: 'tb-hiv', label: 'TB & HIV', icon: '🔬', placeholder: 'Migrating from existing' },
        { id: 'antimalarials', label: 'Antimalarials', icon: '🦟', placeholder: 'Migrating from existing' },
      ]},
      { id: 'specialty', label: 'Specialty Drugs', tabs: [
        { id: 'resp-gi', label: 'Resp & GI', icon: '🫁', placeholder: 'Migrating from existing' },
        { id: 'neuro-msk', label: 'Neuro & MSK', icon: '🧠', placeholder: 'Migrating from existing' },
        { id: 'obs-gynae', label: 'Obs & Gynae', icon: '🤰', placeholder: 'Migrating from existing' },
        { id: 'haematology', label: 'Haematology', icon: '🩸', placeholder: 'Migrating from existing' },
        { id: 'dermatology', label: 'Dermatology', icon: '🩹', placeholder: 'Migrating from existing' },
        { id: 'ophthalmology', label: 'Ophthalmology', icon: '👁', placeholder: 'Migrating from existing' },
        { id: 'ent', label: 'ENT', icon: '👂', placeholder: 'Migrating from existing' },
        { id: 'oncology', label: 'Oncology Support', icon: '🔬', placeholder: 'Migrating from existing' },
        { id: 'palliative', label: 'Palliative Care', icon: '🕊', placeholder: 'Migrating from existing' },
      ]},
      { id: 'reference', label: 'Reference', tabs: [
        { id: 'interactions', label: 'Interactions', icon: '⚠', placeholder: 'Migrating from existing' },
        { id: 'drugs-pregnancy', label: 'Drugs in Pregnancy', icon: '🤰', placeholder: 'Migrating from existing' },
        { id: 'psychiatry', label: 'Psychiatry', icon: '🧠', placeholder: 'Migrating from existing' },
      ]},
    ],
  },
]

// ── Component router ──────────────────────────────────────────────────────────
function getComponent(moduleId: string, tabId: string, nav: (g: string, t: string) => void): React.ReactNode {
  if (moduleId === 'htn') {
    if (tabId === 'bp-triage') return <BPTriage onGoToHMOD={() => nav('triage', 'hmod-screen')} />
    if (tabId === 'hmod-screen') return <HMODScreen />
    if (tabId === 'crisis-protocol') return <CrisisProtocol />
  }
  if (moduleId === 'dm') {
    if (tabId === 'glycaemic-splitter') return <GlycaemicSplitter />
    if (tabId === 'hypoglycaemia') return <HypoglycaemiaResponse />
  }
  if (moduleId === 'hypotension') {
    if (tabId === 'shock-splitter') return <ShockSplitter />
    if (tabId === 'fluid-map') return <FluidMAPCalculator />
    if (tabId === 'vasopressor-guide') return <VasopressorGuide />
    if (tabId === 'anaphylaxis') return <AnaphylaxisProtocol />
  }
  return null
}

// ── Region switcher ───────────────────────────────────────────────────────────
function RegionSwitcher() {
  const { region, setRegion, allRegions } = useRegion()
  const [open, setOpen] = useState(false)
  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(v => !v)}
        style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '6px 10px', borderRadius: '8px', border: '1px solid var(--color-border)', background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}>
        <span>{region.flag}</span><span>{region.code}</span><span style={{ fontSize: '0.55rem' }}>▼</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
          <div style={{ position: 'absolute', top: 'calc(100% + 6px)', right: 0, zIndex: 999, background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '8px', minWidth: 200, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', gap: 2 }}>
            <div style={{ fontSize: '0.62rem', fontWeight: 700, color: 'var(--color-text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '4px 8px 6px', borderBottom: '1px solid var(--color-border-soft)', marginBottom: 4 }}>Region</div>
            {allRegions.map(r => (
              <button key={r.code} onClick={() => { setRegion(r.code as Region); setOpen(false); clearSession() }}
                style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: '8px', border: 'none', background: region.code === r.code ? 'rgba(14,165,233,0.1)' : 'transparent', color: region.code === r.code ? 'var(--color-accent-blue)' : 'var(--color-text-secondary)', fontWeight: region.code === r.code ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.83rem', textAlign: 'left', width: '100%' }}>
                <span>{r.flag}</span><span style={{ flex: 1 }}>{r.name}</span>
                {region.code === r.code && <span style={{ fontSize: '0.7rem' }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// ── Placeholder ───────────────────────────────────────────────────────────────
function Placeholder({ message }: { message: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '60px 20px', textAlign: 'center', gap: 12 }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--color-bg-elevated)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>🔧</div>
      <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-secondary)' }}>{message}</div>
    </div>
  )
}

// ── Main shell ────────────────────────────────────────────────────────────────
function Shell() {
  const [activeModule, setActiveModule] = useState('htn')
  const [activeGroup, setActiveGroup] = useState('triage')
  const [activeTab, setActiveTab] = useState('bp-triage')
  const { region } = useRegion()

  const module = MODULES.find(m => m.id === activeModule)!
  const group = module.groups.find(g => g.id === activeGroup) ?? module.groups[0]
  const tab = group.tabs.find(t => t.id === activeTab) ?? group.tabs[0]

  function switchModule(id: string) {
    const mod = MODULES.find(m => m.id === id)!
    setActiveModule(id)
    setActiveGroup(mod.groups[0].id)
    setActiveTab(mod.groups[0].tabs[0].id)
  }

  function switchGroup(id: string) {
    const g = module.groups.find(gr => gr.id === id)!
    setActiveGroup(id)
    setActiveTab(g.tabs[0].id)
  }

  function navigate(groupId: string, tabId: string) {
    setActiveGroup(groupId)
    setActiveTab(tabId)
  }

  const content = getComponent(activeModule, activeTab, navigate)
  const guidelineLabel = activeModule === 'htn' ? region.guidelineHTN : activeModule === 'dm' ? region.guidelineDM : activeModule === 'hypotension' ? region.guidelineShock : 'Full Monograph'

  const btn = (active: boolean, color: string, bg: string, border: string, onClick: () => void, children: React.ReactNode, extra?: React.CSSProperties) => (
    <button onClick={onClick} style={{ border: `${active ? '1.5' : '1'}px solid ${active ? border : 'var(--color-border)'}`, background: active ? bg : 'transparent', color: active ? color : 'var(--color-text-muted)', fontWeight: active ? 700 : 400, cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s', flexShrink: 0, ...extra }}>
      {children}
    </button>
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: 'var(--color-bg)' }}>

      {/* Top nav */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, background: 'var(--color-bg)', borderBottom: '1px solid var(--color-border)' }}>

        {/* App bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 16px', borderBottom: '1px solid var(--color-border-soft)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.01em' }}>The Triad 2</div>
            <div style={{ fontSize: '0.62rem', color: 'var(--color-text-muted)' }}>Clinical Decision Support</div>
          </div>
          <RegionSwitcher />
        </div>

        {/* Module pills */}
        <div style={{ display: 'flex', gap: 6, padding: '10px 16px', overflowX: 'auto', scrollbarWidth: 'none', borderBottom: '1px solid var(--color-border-soft)' }}>
          {MODULES.map(m => btn(
            activeModule === m.id, m.color, m.bg, m.color,
            () => switchModule(m.id),
            <><span style={{ fontSize: '0.9rem' }}>{m.icon}</span> <span style={{ fontSize: '0.82rem' }}>{m.shortLabel}</span></>,
            { display: 'flex', alignItems: 'center', gap: 6, padding: '7px 14px', borderRadius: '20px', whiteSpace: 'nowrap' }
          ))}
        </div>

        {/* Module name + group pills */}
        <div style={{ padding: '8px 16px 8px' }}>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, color: module.color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>{module.label}</div>
          <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
            {module.groups.map(g => btn(
              activeGroup === g.id, module.color, module.bg, module.color,
              () => switchGroup(g.id),
              <span style={{ fontSize: '0.74rem' }}>{g.label}</span>,
              { padding: '5px 12px', borderRadius: '16px', whiteSpace: 'nowrap' }
            ))}
          </div>
        </div>

        {/* Tab row */}
        <div style={{ display: 'flex', overflowX: 'auto', scrollbarWidth: 'none', borderTop: '1px solid var(--color-border-soft)', padding: '0 16px' }}>
          {group.tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)}
              style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '10px 14px', borderBottom: `2px solid ${activeTab === t.id ? module.color : 'transparent'}`, background: 'transparent', border: 'none', borderBottomStyle: 'solid', borderBottomWidth: 2, borderBottomColor: activeTab === t.id ? module.color : 'transparent', color: activeTab === t.id ? module.color : 'var(--color-text-muted)', fontWeight: activeTab === t.id ? 700 : 400, fontSize: '0.8rem', cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap', transition: 'all 0.15s', flexShrink: 0 }}>
              <span>{t.icon}</span><span>{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px 16px 60px', maxWidth: 720, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {content ?? (tab.placeholder ? <Placeholder message={tab.placeholder} /> : <Placeholder message={`${tab.label} — coming soon`} />)}
      </div>

      {/* Bottom bar */}
      <div style={{ position: 'sticky', bottom: 0, background: 'var(--color-bg)', borderTop: '1px solid var(--color-border-soft)', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
        <span>{region.flag}</span>
        <span>{region.name}</span>
        <span style={{ color: 'var(--color-border)' }}>·</span>
        <span>{tab.label}</span>
        <span style={{ color: 'var(--color-border)' }}>·</span>
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{guidelineLabel}</span>
      </div>
    </div>
  )
}

export default function ReferencePage() {
  return <RegionProvider><Shell /></RegionProvider>
}
