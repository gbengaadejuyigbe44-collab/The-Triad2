'use client'

// ─── AbbreviationTooltip ──────────────────────────────────────────────────────
// Usage: <Abbr term="HMOD" /> or <Abbr term="MAP" />
// First appearance per session → renders full expansion inline: HMOD (Hypertension-Mediated Organ Damage)
// Subsequent appearances → underlined abbreviation with click/hover tooltip

import { useState, useEffect, useRef } from 'react'
import { getAbbreviation, hasBeenShown, markAsShown } from '@/lib/abbreviations'

interface AbbrProps {
  term: string
  forceExpand?: boolean // always show full expansion regardless of session
}

export function Abbr({ term, forceExpand = false }: AbbrProps) {
  const def = getAbbreviation(term)
  const [isFirstTime, setIsFirstTime] = useState(false)
  const [tooltipOpen, setTooltipOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const tooltipRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    setMounted(true)
    if (!def) return
    if (forceExpand || !hasBeenShown(term)) {
      setIsFirstTime(true)
      markAsShown(term)
    }
  }, [term, forceExpand, def])

  // Close tooltip on outside click
  useEffect(() => {
    if (!tooltipOpen) return
    const handler = (e: MouseEvent) => {
      if (
        tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
        triggerRef.current && !triggerRef.current.contains(e.target as Node)
      ) {
        setTooltipOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [tooltipOpen])

  if (!def) return <span>{term}</span>
  if (!mounted) return <span>{term}</span>

  // First appearance: inline expansion
  if (isFirstTime || forceExpand) {
    return (
      <span
        className="abbr-inline"
        style={{
          display: 'inline',
          fontWeight: 500,
        }}
      >
        {term}{' '}
        <span
          style={{
            color: 'var(--color-text-secondary)',
            fontWeight: 400,
            fontSize: '0.92em',
          }}
        >
          ({def.full})
        </span>
      </span>
    )
  }

  // Subsequent appearances: interactive tooltip trigger
  return (
    <span style={{ position: 'relative', display: 'inline' }}>
      <span
        ref={triggerRef}
        onClick={() => setTooltipOpen(v => !v)}
        onMouseEnter={() => setTooltipOpen(true)}
        onMouseLeave={() => {
          // Small delay so user can move mouse to tooltip
          setTimeout(() => {
            if (!tooltipRef.current?.matches(':hover')) setTooltipOpen(false)
          }, 100)
        }}
        style={{
          borderBottom: '1px dashed var(--color-accent-blue)',
          cursor: 'help',
          color: 'inherit',
          display: 'inline',
        }}
        aria-label={`${term}: ${def.full}`}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setTooltipOpen(v => !v) }}
      >
        {term}
      </span>

      {tooltipOpen && (
        <div
          ref={tooltipRef}
          onMouseLeave={() => setTooltipOpen(false)}
          style={{
            position: 'absolute',
            bottom: 'calc(100% + 8px)',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 9999,
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderRadius: '10px',
            padding: '10px 14px',
            minWidth: '220px',
            maxWidth: '300px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            fontSize: '0.82rem',
            lineHeight: 1.5,
            pointerEvents: 'auto',
          }}
          role="tooltip"
        >
          {/* Arrow */}
          <div style={{
            position: 'absolute',
            bottom: '-5px',
            left: '50%',
            transform: 'translateX(-50%) rotate(45deg)',
            width: '10px',
            height: '10px',
            background: 'var(--color-bg-elevated)',
            border: '1px solid var(--color-border)',
            borderTop: 'none',
            borderLeft: 'none',
          }} />

          <div style={{ fontWeight: 600, color: 'var(--color-accent-blue)', marginBottom: '2px' }}>
            {term}
          </div>
          <div style={{ color: 'var(--color-text-primary)', marginBottom: def.note ? '6px' : 0 }}>
            {def.full}
          </div>
          {def.note && (
            <div style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.78rem',
              borderTop: '1px solid var(--color-border-soft)',
              paddingTop: '6px',
              marginTop: '4px',
            }}>
              {def.note}
            </div>
          )}
          <div style={{
            fontSize: '0.7rem',
            color: 'var(--color-text-muted)',
            marginTop: '4px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {def.category}
          </div>
        </div>
      )}
    </span>
  )
}

// ── AbbrText: parse a string and auto-wrap known abbreviations ─────────────────
// Usage: <AbbrText text="MAP target is 65 mmHg in SSC 2026" />
// Automatically wraps MAP and SSC with <Abbr />

interface AbbrTextProps {
  text: string
  className?: string
}

export function AbbrText({ text, className }: AbbrTextProps) {
  // Split text by known abbreviations and wrap each one
  const knownAbbrs = Object.keys({
    HMOD: 1, MAP: 1, SBP: 1, DBP: 1, DKA: 1, HHS: 1, ASCVD: 1,
    CVD: 1, CKD: 1, AKI: 1, LVH: 1, AF: 1, ACS: 1, PE: 1, APO: 1,
    T1DM: 1, T2DM: 1, HTN: 1, DM: 1, CVA: 1, TIA: 1, ARDS: 1,
    CCB: 1, ACEi: 1, ARB: 1, BB: 1, HCTZ: 1, GTN: 1, MgSO4: 1,
    SGLT2: 1, NPH: 1, eGFR: 1, ACR: 1, HbA1c: 1, BG: 1, BP: 1,
    ECG: 1, INR: 1, FBC: 1, GCS: 1, AVPU: 1, BMI: 1, SpO2: 1,
    HR: 1, RR: 1, IV: 1, IM: 1, SC: 1, PO: 1, BD: 1, TDS: 1,
    OD: 1, PRN: 1, STAT: 1, CGM: 1, ANC: 1, ESH: 1, ESC: 1,
    ADA: 1, SSC: 1, AHA: 1, BIHS: 1, NICE: 1, NHIS: 1, SCORE2: 1,
    SBAR: 1, NEWS: 1, GLP1: 1,
  })

  const pattern = new RegExp(`\\b(${knownAbbrs.join('|')})\\b`, 'g')
  const parts: Array<{ text: string; isAbbr: boolean }> = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isAbbr: false })
    }
    parts.push({ text: match[0], isAbbr: true })
    lastIndex = pattern.lastIndex
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isAbbr: false })
  }

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.isAbbr
          ? <Abbr key={i} term={part.text} />
          : <span key={i}>{part.text}</span>
      )}
    </span>
  )
}
