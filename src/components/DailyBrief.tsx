'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

type Urgency = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRISIS'
type StreamState = 'loading' | 'streaming' | 'done' | 'error'

interface RenderConfig {
  accentColor: string
  pauseBeforeButton: number
  buttonText: string
  buttonAction: 'dashboard' | 'patient'
  topPatientId?: string
}

const RENDER_CONFIGS: Record<Urgency, Omit<RenderConfig, 'topPatientId'>> = {
  CRISIS:  { accentColor: '#dc2626', pauseBeforeButton: 3000, buttonText: 'Call them now',  buttonAction: 'patient' },
  HIGH:    { accentColor: '#d97706', pauseBeforeButton: 2500, buttonText: "I'm ready",       buttonAction: 'dashboard' },
  MEDIUM:  { accentColor: '#d97706', pauseBeforeButton: 2000, buttonText: "I'm ready",       buttonAction: 'dashboard' },
  LOW:     { accentColor: '#16a34a', pauseBeforeButton: 1000, buttonText: 'Open dashboard',  buttonAction: 'dashboard' },
}

interface DailyBriefProps {
  onComplete: (stableCount: number, flaggedCount: number, config: RenderConfig) => void
}

export function DailyBrief({ onComplete }: DailyBriefProps) {
  const [streamState, setStreamState] = useState<StreamState>('loading')
  const [briefText, setBriefText] = useState('')
  const [config, setConfig] = useState<RenderConfig>({ ...RENDER_CONFIGS.LOW, accentColor: '#0ea5e9' })
  const [showButton, setShowButton] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)
  const abortRef = useRef<AbortController | null>(null)
  const hasStarted = useRef(false)
  const signalParsed = useRef(false)
  const router = useRouter()

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    fetchBrief()
    return () => abortRef.current?.abort()
  }, [])

  async function fetchBrief() {
    setStreamState('loading')
    setBriefText('')
    setShowButton(false)
    setButtonVisible(false)
    signalParsed.current = false

    try {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { setStreamState('error'); return }

      const ctrl = new AbortController()
      abortRef.current = ctrl

      const res = await fetch('/api/daily-brief', {
        headers: { Authorization: `Bearer ${session.access_token}` },
        signal: ctrl.signal,
      })

      if (!res.ok || !res.body) { setStreamState('error'); return }

      setStreamState('streaming')
      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value)
        buffer += chunk

        // Parse the JSON signal line from the first chunk
        if (!signalParsed.current && buffer.includes('\n\n')) {
          const separatorIdx = buffer.indexOf('\n\n')
          const signalLine = buffer.slice(0, separatorIdx).trim()
          const rest = buffer.slice(separatorIdx + 2)

          try {
            const signal = JSON.parse(signalLine)
            const urgency: Urgency = signal.urgency || 'LOW'
            const resolved: RenderConfig = { ...RENDER_CONFIGS[urgency] }

            // If crisis, try to find the patient ID for direct navigation
            if (urgency === 'CRISIS' && signal.topPatientName) {
              const { data: patient } = await supabase
                .from('patients')
                .select('id')
                .ilike('full_name', `%${signal.topPatientName.split(' ')[0]}%`)
                .limit(1)
                .single()
              if (patient) resolved.topPatientId = patient.id
            }

            setConfig(resolved)
            signalParsed.current = true
            buffer = rest
            if (rest) setBriefText(rest)
          } catch {
            // Signal parse failed — use defaults, treat all as text
            signalParsed.current = true
            setBriefText(buffer)
          }
        } else if (signalParsed.current) {
          setBriefText(prev => prev + chunk)
        }
      }

      setStreamState('done')
    } catch (err: any) {
      if (err?.name !== 'AbortError') setStreamState('error')
    }
  }

  // After streaming done, wait then show button
  useEffect(() => {
    if (streamState !== 'done') return
    const t1 = setTimeout(() => setShowButton(true), config.pauseBeforeButton)
    return () => clearTimeout(t1)
  }, [streamState, config.pauseBeforeButton])

  useEffect(() => {
    if (!showButton) return
    const t2 = setTimeout(() => setButtonVisible(true), 80)
    return () => clearTimeout(t2)
  }, [showButton])

  function handleEnter() {
    // Derive counts from brief text for transition screen
    // We approximate — the transition screen will re-query if needed
    // For now pass config forward; parent handles transition
    onComplete(0, 0, config)
  }

  // Render brief text — replace ───── with a visual rule
  function renderText(text: string) {
    const parts = text.split('─────')
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && (
          <span style={{
            display: 'block',
            height: '1px',
            background: `linear-gradient(90deg, transparent, ${config.accentColor}40, transparent)`,
            margin: '20px 0',
          }} />
        )}
      </span>
    ))
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0F172A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
      overflowY: 'auto',
    }}>
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeIn { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.4;transform:scale(1)} 50%{opacity:1;transform:scale(1.15)} }
        @keyframes spin { to{transform:rotate(360deg)} }
      `}</style>

      {/* Top accent line */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
        background: `linear-gradient(90deg, transparent, ${config.accentColor}, transparent)`,
        opacity: streamState === 'streaming' ? 1 : 0.5,
        transition: 'opacity 0.5s',
      }} />

      {/* Loading */}
      {streamState === 'loading' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '32px', height: '32px',
            border: '2px solid rgba(255,255,255,0.08)',
            borderTop: `2px solid ${config.accentColor}`,
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }} />
          <p style={{ fontSize: '13px', color: '#475569', letterSpacing: '0.05em' }}>
            Analysing your practice data…
          </p>
        </div>
      )}

      {/* Brief text */}
      {(streamState === 'streaming' || streamState === 'done') && (
        <div style={{ width: '100%', maxWidth: '680px', animation: 'fadeIn 0.5s ease' }}>

          {/* Label */}
          <p style={{
            fontSize: '10px', fontWeight: 700, color: config.accentColor,
            letterSpacing: '0.15em', textTransform: 'uppercase',
            marginBottom: '32px', textAlign: 'center',
          }}>
            Daily Brief
          </p>

          {/* Text */}
          <p style={{
            fontSize: '17px',
            lineHeight: 1.85,
            color: '#E2E8F0',
            fontFamily: "'Georgia', 'Times New Roman', serif",
            whiteSpace: 'pre-wrap',
            margin: 0,
          }}>
            {renderText(briefText)}
            {streamState === 'streaming' && (
              <span style={{
                display: 'inline-block', width: '2px', height: '18px',
                background: config.accentColor,
                marginLeft: '2px', verticalAlign: 'text-bottom',
                animation: 'blink 0.8s step-end infinite',
              }} />
            )}
          </p>

          {/* Enter button */}
          {showButton && (
            <div style={{
              marginTop: '52px', display: 'flex', justifyContent: 'center',
              opacity: buttonVisible ? 1 : 0,
              transition: 'opacity 0.6s ease',
            }}>
              <button
                onClick={handleEnter}
                style={{
                  background: 'transparent',
                  border: `1px solid ${config.accentColor}`,
                  color: config.accentColor,
                  fontSize: '13px', fontWeight: 700,
                  padding: '12px 36px', borderRadius: '100px',
                  cursor: 'pointer', fontFamily: 'inherit',
                  letterSpacing: '0.05em',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => {
                  const b = e.currentTarget
                  b.style.background = config.accentColor
                  b.style.color = '#fff'
                }}
                onMouseLeave={e => {
                  const b = e.currentTarget
                  b.style.background = 'transparent'
                  b.style.color = config.accentColor
                }}
              >
                {config.buttonText}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {streamState === 'error' && (
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
            Could not generate your Daily Brief.
          </p>
          <button
            onClick={() => { hasStarted.current = false; fetchBrief() }}
            style={{
              background: 'none', border: '1px solid rgba(255,255,255,0.15)',
              color: '#94a3b8', fontSize: '13px', fontWeight: 600,
              padding: '10px 24px', borderRadius: '8px',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Try again
          </button>
          <br />
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              marginTop: '12px',
              background: 'none', border: 'none',
              color: '#475569', fontSize: '12px',
              cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            Skip to dashboard →
          </button>
        </div>
      )}
    </div>
  )
}
