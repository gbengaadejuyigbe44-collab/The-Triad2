'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { DailyBrief } from '@/components/DailyBrief'
import { TransitionScreen } from '@/components/TransitionScreen'

type Stage = 'checking' | 'brief' | 'transition' | 'done'

interface RenderConfig {
  accentColor: string
  pauseBeforeButton: number
  buttonText: string
  buttonAction: 'dashboard' | 'patient'
  topPatientId?: string
}

const BRIEF_COOLDOWN_HOURS = 4

export default function BriefPage() {
  const router = useRouter()
  const [stage, setStage] = useState<Stage>('checking')
  const [surname, setSurname] = useState('')
  const [stableCount, setStableCount] = useState(0)
  const [flaggedCount, setFlaggedCount] = useState(0)
  const [renderConfig, setRenderConfig] = useState<RenderConfig>({
    accentColor: '#0ea5e9',
    pauseBeforeButton: 2000,
    buttonText: "I'm ready",
    buttonAction: 'dashboard',
  })

  useEffect(() => {
    async function check() {
      // Auth check
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) { router.push('/auth'); return }

      // Get clinician surname for transition screen
      const { data: clinician } = await supabase
        .from('clinicians')
        .select('full_name')
        .eq('id', session.user.id)
        .single()

      if (clinician?.full_name) {
        const parts = clinician.full_name.split(' ')
        setSurname(parts[parts.length - 1])
      }

      // Skip brief if seen within cooldown window
      const lastBriefTime = localStorage.getItem('triad_last_brief')
      if (lastBriefTime) {
        const elapsed = Date.now() - parseInt(lastBriefTime, 10)
        const hoursElapsed = elapsed / (1000 * 60 * 60)
        if (hoursElapsed < BRIEF_COOLDOWN_HOURS) {
          router.replace('/dashboard')
          return
        }
      }

      // Fetch patient counts for transition screen
      const { data: patients } = await supabase
        .from('patients')
        .select('id')
        .eq('clinician_id', session.user.id)

      if (patients) {
        // Approximate: check crisis readings in last 24h for flagged count
        const since24h = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
        const patientIds = patients.map((p: any) => p.id)

        if (patientIds.length > 0) {
          const [{ data: crisisBP }, { data: crisisBG }] = await Promise.all([
            supabase.from('bp_readings')
              .select('patient_id')
              .in('patient_id', patientIds)
              .gte('logged_at', since24h)
              .or('systolic.gte.180,diastolic.gte.120'),
            supabase.from('bg_readings')
              .select('patient_id')
              .in('patient_id', patientIds)
              .gte('logged_at', since24h)
              .or('value_mgdl.gt.400,value_mgdl.lt.54'),
          ])

          const flaggedIds = new Set([
            ...(crisisBP || []).map((r: any) => r.patient_id),
            ...(crisisBG || []).map((r: any) => r.patient_id),
          ])
          setFlaggedCount(flaggedIds.size)
          setStableCount(patients.length - flaggedIds.size)
        } else {
          setStableCount(0)
          setFlaggedCount(0)
        }
      }

      setStage('brief')
    }

    check()
  }, [router])

  function handleBriefComplete(_stable: number, _flagged: number, config: RenderConfig) {
    setRenderConfig(config)
    localStorage.setItem('triad_last_brief', Date.now().toString())
    setStage('transition')
  }

  function handleTransitionComplete() {
    if (renderConfig.buttonAction === 'patient' && renderConfig.topPatientId) {
      router.push(`/patients/${renderConfig.topPatientId}`)
    } else {
      router.push('/dashboard')
    }
  }

  // Checking auth / loading
  if (stage === 'checking') {
    return (
      <div style={{
        position: 'fixed', inset: 0, background: '#0F172A',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <style>{`@keyframes spin { to{transform:rotate(360deg)} }`}</style>
        <div style={{
          width: '32px', height: '32px',
          border: '2px solid rgba(255,255,255,0.08)',
          borderTop: '2px solid #0ea5e9',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
      </div>
    )
  }

  if (stage === 'brief') {
    return <DailyBrief onComplete={handleBriefComplete} />
  }

  if (stage === 'transition') {
    return (
      <TransitionScreen
        surname={surname}
        stableCount={stableCount}
        flaggedCount={flaggedCount}
        accentColor={renderConfig.accentColor}
        buttonText={renderConfig.buttonText}
        pauseBeforeButton={renderConfig.pauseBeforeButton}
        onEnter={handleTransitionComplete}
      />
    )
  }

  return null
}
