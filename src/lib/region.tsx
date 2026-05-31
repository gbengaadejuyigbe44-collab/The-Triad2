'use client'

// ─── The Triad 2 — Region Context System ─────────────────────────────────────
// Set once by the clinician on first use. Persists in localStorage.
// Every module reads this context and adjusts:
//   - Guideline base (ESH/ESC, NICE NG136, ACC/AHA)
//   - Formulary (Nigerian brands/costs, BNF, US formulary)
//   - Drug availability reality
//   - BP thresholds and targets
//   - Currency and cost display

import { createContext, useContext, useEffect, useState, ReactNode } from 'react'

export type Region = 'NG' | 'GB' | 'US' | 'AU' | 'AE' | 'IN' | 'ZA' | 'GH' | 'KE'

export interface RegionConfig {
  code: Region
  name: string
  flag: string
  guidelineHTN: string
  guidelineDM: string
  guidelineShock: string
  currency: string
  formularyLabel: string
  bpThresholdNote: string
  glp1Available: boolean
  sglt2Available: boolean
  noradrenalineAvailable: 'high' | 'medium' | 'low'
  nhisEquivalent: string | null
}

export const REGIONS: Record<Region, RegionConfig> = {
  NG: {
    code: 'NG',
    name: 'Nigeria',
    flag: '🇳🇬',
    guidelineHTN: 'ESH 2023 + ESC 2024',
    guidelineDM: 'ADA 2025',
    guidelineShock: 'SSC 2026',
    currency: '₦',
    formularyLabel: 'Nigerian Formulary (NHIS)',
    bpThresholdNote: 'Black African patients: CCB + thiazide-like diuretic preferred as first-line combination per ESH 2023 and BIHS.',
    glp1Available: false,
    sglt2Available: false,
    noradrenalineAvailable: 'low',
    nhisEquivalent: 'NHIS',
  },
  GB: {
    code: 'GB',
    name: 'United Kingdom',
    flag: '🇬🇧',
    guidelineHTN: 'NICE NG136',
    guidelineDM: 'ADA 2025 + NICE NG28',
    guidelineShock: 'SSC 2026',
    currency: '£',
    formularyLabel: 'BNF Formulary',
    bpThresholdNote: 'NICE NG136: initiate treatment at ≥140/90 mmHg (clinic BP) or ≥135/85 mmHg (ABPM/HBPM).',
    glp1Available: true,
    sglt2Available: true,
    noradrenalineAvailable: 'high',
    nhisEquivalent: 'NHS',
  },
  US: {
    code: 'US',
    name: 'United States',
    flag: '🇺🇸',
    guidelineHTN: 'ACC/AHA 2025',
    guidelineDM: 'ADA 2025',
    guidelineShock: 'SSC 2026',
    currency: '$',
    formularyLabel: 'US Formulary',
    bpThresholdNote: 'ACC/AHA 2025: Stage 1 HTN ≥130/80 mmHg. Treat at ≥130/80 with ASCVD risk ≥10% or existing CVD.',
    glp1Available: true,
    sglt2Available: true,
    noradrenalineAvailable: 'high',
    nhisEquivalent: null,
  },
  AU: {
    code: 'AU',
    name: 'Australia',
    flag: '🇦🇺',
    guidelineHTN: 'Heart Foundation Australia 2016 (ESH 2023 supplementary)',
    guidelineDM: 'ADA 2025 + RACGP',
    guidelineShock: 'SSC 2026',
    currency: 'A$',
    formularyLabel: 'PBS Formulary',
    bpThresholdNote: 'Initiate treatment at ≥140/90 mmHg or ≥130/80 mmHg with high cardiovascular risk.',
    glp1Available: true,
    sglt2Available: true,
    noradrenalineAvailable: 'high',
    nhisEquivalent: 'PBS/Medicare',
  },
  AE: {
    code: 'AE',
    name: 'UAE',
    flag: '🇦🇪',
    guidelineHTN: 'ESH 2023 + ACC/AHA 2025',
    guidelineDM: 'ADA 2025',
    guidelineShock: 'SSC 2026',
    currency: 'AED',
    formularyLabel: 'UAE Drug Formulary',
    bpThresholdNote: 'ESH 2023 thresholds apply. Note: Paystack not available — Flutterwave or Stripe for payments.',
    glp1Available: true,
    sglt2Available: true,
    noradrenalineAvailable: 'high',
    nhisEquivalent: 'DOHMS / Thiqa',
  },
  IN: {
    code: 'IN',
    name: 'India',
    flag: '🇮🇳',
    guidelineHTN: 'ESH 2023 + ISH 2020',
    guidelineDM: 'ADA 2025 + RSSDI',
    guidelineShock: 'SSC 2026',
    currency: '₹',
    formularyLabel: 'Indian National Formulary',
    bpThresholdNote: 'South Asian patients have higher cardiovascular risk at lower BP values. Consider earlier intervention.',
    glp1Available: true,
    sglt2Available: true,
    noradrenalineAvailable: 'medium',
    nhisEquivalent: 'Ayushman Bharat',
  },
  ZA: {
    code: 'ZA',
    name: 'South Africa',
    flag: '🇿🇦',
    guidelineHTN: 'ESH 2023 + SEMDSA',
    guidelineDM: 'ADA 2025 + SEMDSA',
    guidelineShock: 'SSC 2026',
    currency: 'R',
    formularyLabel: 'South African EML',
    bpThresholdNote: 'Black African patients: CCB + thiazide-like diuretic preferred as first-line combination per ESH 2023.',
    glp1Available: false,
    sglt2Available: true,
    noradrenalineAvailable: 'medium',
    nhisEquivalent: 'NHI (in rollout)',
  },
  GH: {
    code: 'GH',
    name: 'Ghana',
    flag: '🇬🇭',
    guidelineHTN: 'ESH 2023',
    guidelineDM: 'ADA 2025',
    guidelineShock: 'SSC 2026',
    currency: 'GH₵',
    formularyLabel: 'Ghana EML / NHIA',
    bpThresholdNote: 'Black African patients: CCB + thiazide-like diuretic preferred as first-line combination per ESH 2023.',
    glp1Available: false,
    sglt2Available: false,
    noradrenalineAvailable: 'low',
    nhisEquivalent: 'NHIA',
  },
  KE: {
    code: 'KE',
    name: 'Kenya',
    flag: '🇰🇪',
    guidelineHTN: 'ESH 2023',
    guidelineDM: 'ADA 2025',
    guidelineShock: 'SSC 2026',
    currency: 'KSh',
    formularyLabel: 'Kenya EML',
    bpThresholdNote: 'Black African patients: CCB + thiazide-like diuretic preferred as first-line combination per ESH 2023.',
    glp1Available: false,
    sglt2Available: false,
    noradrenalineAvailable: 'low',
    nhisEquivalent: 'SHA',
  },
}

// ── Context ───────────────────────────────────────────────────────────────────
interface RegionContextValue {
  region: RegionConfig
  setRegion: (code: Region) => void
  allRegions: RegionConfig[]
}

const RegionContext = createContext<RegionContextValue | null>(null)

const STORAGE_KEY = 'triad2_region'
const DEFAULT_REGION: Region = 'NG'

export function RegionProvider({ children }: { children: ReactNode }) {
  const [regionCode, setRegionCode] = useState<Region>(DEFAULT_REGION)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Region | null
    if (stored && REGIONS[stored]) {
      setRegionCode(stored)
    }
  }, [])

  const setRegion = (code: Region) => {
    setRegionCode(code)
    localStorage.setItem(STORAGE_KEY, code)
  }

  return (
    <RegionContext.Provider
      value={{
        region: REGIONS[regionCode],
        setRegion,
        allRegions: Object.values(REGIONS),
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext)
  if (!ctx) throw new Error('useRegion must be used within RegionProvider')
  return ctx
}

// ── Utility: get region-aware guideline label ─────────────────────────────────
export function getGuidelineLabel(module: 'htn' | 'dm' | 'shock', region: RegionConfig): string {
  switch (module) {
    case 'htn': return region.guidelineHTN
    case 'dm': return region.guidelineDM
    case 'shock': return region.guidelineShock
  }
}
