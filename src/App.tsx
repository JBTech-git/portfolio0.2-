import { useCallback, useEffect, useState } from 'react'
import ClassicPortfolio from './ClassicPortfolio'
import { BootOnboarding } from './os/BootOnboarding'
import { JayantaOS } from './os/JayantaOS'
import { RecruiterMode } from './os/RecruiterMode'
import { STORAGE_MODE_KEY, STORAGE_ONBOARD_KEY, type ExperienceMode } from './os/types'

export default function App() {
  const [ready, setReady] = useState(false)
  const [showBoot, setShowBoot] = useState(true)
  const [mode, setMode] = useState<ExperienceMode>('explore')
  const [returning, setReturning] = useState(false)

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
    const onboarded = localStorage.getItem(STORAGE_ONBOARD_KEY) === '1'
    const saved = localStorage.getItem(STORAGE_MODE_KEY) as ExperienceMode | null
    if (onboarded && saved) {
      setMode(saved)
      setReturning(true)
    }
    setReady(true)
  }, [])

  const finishBoot = useCallback((m?: ExperienceMode) => {
    setMode((prev) => {
      const next = m ?? prev
      localStorage.setItem(STORAGE_ONBOARD_KEY, '1')
      localStorage.setItem(STORAGE_MODE_KEY, next)
      return next
    })
    setShowBoot(false)
  }, [])

  const changeMode = (m: ExperienceMode) => {
    setMode(m)
    localStorage.setItem(STORAGE_MODE_KEY, m)
  }

  if (!ready) {
    return <div className="min-h-screen bg-[#0A0A0A]" />
  }

  if (showBoot) {
  return (
      <BootOnboarding
        returning={returning}
        onChoose={(m) => finishBoot(m)}
        onContinue={() => finishBoot()}
      />
    )
  }

  if (mode === 'classic') {
  return (
      <div className="relative">
        <div className="sticky top-0 z-[70] flex items-center justify-between border-b border-white/10 bg-slate-950/90 px-3 py-2 text-xs text-slate-300 backdrop-blur">
          <span>Simple website view</span>
          <button type="button" onClick={() => changeMode('explore')} className="rounded-full border border-white/15 px-3 py-1 hover:bg-white/10">
            Back to menu
          </button>
        </div>
        <ClassicPortfolio />
      </div>
    )
  }

  if (mode === 'recruiter') {
  return (
      <RecruiterMode
        onExplore={() => changeMode('explore')}
        onClassic={() => changeMode('classic')}
      />
    )
  }

  return (
    <JayantaOS
      technical={mode === 'technical'}
      onModeChange={changeMode}
    />
  )
}
