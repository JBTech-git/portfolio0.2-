import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { profile } from '../data/profile'
import type { ExperienceMode } from './types'

const BOOT_LINES = [
  'Initializing developer environment...',
  'Loading kernel modules...',
  'Connecting to DEV-AI (local mock)...',
  'Mounting projects/',
  'Loading experience.log...',
  'Loading system architecture...',
  'System ready.',
  '',
  `${profile.hostname}:~$`,
]

type Props = {
  onChoose: (mode: ExperienceMode) => void
  onContinue: () => void
  returning?: boolean
}

export function BootOnboarding({ onChoose, onContinue, returning }: Props) {
  const [phase, setPhase] = useState<'boot' | 'choose'>('boot')
  const [visible, setVisible] = useState(0)

  useEffect(() => {
    if (phase !== 'boot') return
    if (visible >= BOOT_LINES.length) {
      const t = window.setTimeout(() => {
        if (returning) onContinue()
        else setPhase('choose')
      }, 550)
      return () => clearTimeout(t)
    }
    const t = window.setTimeout(() => setVisible((v) => v + 1), 260)
    return () => clearTimeout(t)
  }, [phase, visible, returning, onContinue])

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0A0A0A] px-4">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            'linear-gradient(rgba(22,198,12,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(22,198,12,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <AnimatePresence mode="wait">
        {phase === 'boot' ? (
          <motion.div
            key="boot"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 w-full max-w-xl"
          >
            <pre className="font-mono text-sm text-[#16C60C]">
              {BOOT_LINES.slice(0, visible).map((l, i) => (
                <div key={i}>{l || ' '}</div>
              ))}
              <span className="inline-block h-4 w-2 animate-pulse bg-[#16C60C] align-middle" />
            </pre>
            {visible >= 3 && (
              <button
                type="button"
                onClick={() => (returning ? onContinue() : setPhase('choose'))}
                className="mt-6 text-xs text-[#767676] underline-offset-2 hover:text-[#CCCCCC] hover:underline"
              >
                Skip loading →
              </button>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="choose"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10 w-full max-w-md rounded-2xl border border-[#16C60C]/25 bg-[#0C0C0C]/95 p-6 shadow-2xl backdrop-blur sm:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#16C60C]">JAYANTA PORTFOLIO</p>
            <h1 className="mt-2 text-2xl font-bold text-[#F2F2F2] sm:text-3xl">{profile.name}</h1>
            <p className="mt-1 text-sm text-[#767676]">{profile.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-[#CCCCCC]">
              Welcome. Tap a section to learn about my work — no technical knowledge needed.
            </p>

            <div className="mt-6 flex flex-col gap-3">
              <button
                type="button"
                onClick={() => onChoose('explore')}
                className="rounded-xl bg-[#16C60C] px-4 py-3.5 text-center text-base font-semibold text-[#0A0A0A] hover:bg-[#3FF23F]"
              >
                Start browsing
              </button>
              <button
                type="button"
                onClick={() => onChoose('recruiter')}
                className="rounded-xl border border-[#16C60C]/25 bg-[#1C2E26]/50 px-4 py-3 text-left hover:border-[#16C60C]/45 hover:bg-[#1C2E26]"
              >
                <div className="font-semibold text-[#F2F2F2]">Hiring? Quick summary</div>
                <div className="text-xs text-[#767676]">Skills, resume, and contact in one page</div>
              </button>
              <button
                type="button"
                onClick={() => onChoose('classic')}
                className="rounded-xl border border-[#16C60C]/15 px-4 py-2.5 text-sm text-[#767676] hover:bg-[#1C2E26]/40 hover:text-[#CCCCCC]"
              >
                Prefer a normal website →
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
