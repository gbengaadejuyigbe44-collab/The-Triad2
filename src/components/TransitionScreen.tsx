'use client'

import { useEffect, useState } from 'react'

interface TransitionScreenProps {
  surname: string
  stableCount: number
  flaggedCount: number
  accentColor: string
  buttonText: string
  pauseBeforeButton: number
  onEnter: () => void
}

export function TransitionScreen({
  surname,
  stableCount,
  flaggedCount,
  accentColor,
  buttonText,
  pauseBeforeButton,
  onEnter,
}: TransitionScreenProps) {
  const [showNumbers, setShowNumbers] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [buttonVisible, setButtonVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowNumbers(true), 800)
    const t2 = setTimeout(() => setShowButton(true), 800 + pauseBeforeButton)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [pauseBeforeButton])

  useEffect(() => {
    if (!showButton) return
    const t = setTimeout(() => setButtonVisible(true), 80)
    return () => clearTimeout(t)
  }, [showButton])

  const allStable = flaggedCount === 0

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: '#0F172A',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px',
    }}>
      <style>{`
        @keyframes fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heartbeat {
          0%,100%{transform:scale(1);opacity:0.7}
          14%{transform:scale(1.08);opacity:1}
          28%{transform:scale(1);opacity:0.7}
          42%{transform:scale(1.05);opacity:0.9}
          70%{transform:scale(1);opacity:0.7}
        }
      `}</style>

      <div style={{ maxWidth: '520px', width: '100%', textAlign: 'center' }}>

        {/* Sentence */}
        <p style={{
          fontSize: '18px',
          color: '#94A3B8',
          fontFamily: "'Georgia', serif",
          lineHeight: 1.6,
          marginBottom: '52px',
          animation: 'fadeUp 0.6s ease',
        }}>
          Dr. {surname}, here is how your patients are doing today.
        </p>

        {/* Numbers */}
        {showNumbers && (
          <div style={{
            display: 'flex', flexDirection: 'column', gap: '20px',
            alignItems: 'center',
            animation: 'fadeUp 0.5s ease',
          }}>
            {allStable ? (
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                <span style={{
                  fontSize: '72px', fontWeight: 800,
                  color: '#16a34a', letterSpacing: '-0.04em', lineHeight: 1,
                  animation: 'heartbeat 2s ease-in-out infinite',
                  display: 'inline-block',
                }}>
                  {stableCount}
                </span>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>All patients stable</p>
                  <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>No action required today</p>
                </div>
              </div>
            ) : (
              <>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span style={{
                    fontSize: '72px', fontWeight: 800,
                    color: '#16a34a', letterSpacing: '-0.04em', lineHeight: 1,
                  }}>
                    {stableCount}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Stable</p>
                    <p style={{ fontSize: '13px', color: '#475569', margin: '4px 0 0' }}>No action required</p>
                  </div>
                </div>

                <div style={{
                  width: '40px', height: '1px',
                  background: 'rgba(255,255,255,0.08)',
                }} />

                <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px' }}>
                  <span style={{
                    fontSize: '72px', fontWeight: 800,
                    color: accentColor, letterSpacing: '-0.04em', lineHeight: 1,
                    animation: 'heartbeat 1.8s ease-in-out infinite',
                    display: 'inline-block',
                  }}>
                    {flaggedCount}
                  </span>
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '16px', fontWeight: 700, color: '#f1f5f9', margin: 0 }}>Need Your Attention</p>
                    <p style={{ fontSize: '13px', color: accentColor, margin: '4px 0 0', fontWeight: 600 }}>
                      {flaggedCount === 1 ? 'Review this patient today' : 'Review these patients today'}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Button */}
        {showButton && (
          <div style={{
            marginTop: '60px',
            opacity: buttonVisible ? 1 : 0,
            transition: 'opacity 0.6s ease',
          }}>
            <button
              onClick={onEnter}
              style={{
                background: 'transparent',
                border: `1px solid ${allStable ? '#16a34a' : accentColor}`,
                color: allStable ? '#16a34a' : accentColor,
                fontSize: '13px', fontWeight: 700,
                padding: '12px 40px', borderRadius: '100px',
                cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => {
                const b = e.currentTarget
                b.style.background = allStable ? '#16a34a' : accentColor
                b.style.color = '#fff'
              }}
              onMouseLeave={e => {
                const b = e.currentTarget
                b.style.background = 'transparent'
                b.style.color = allStable ? '#16a34a' : accentColor
              }}
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
