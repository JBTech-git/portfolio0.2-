import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AppIcon } from './AppIcon'
import { SIMPLE_APPS, type AppId } from './types'

type Phase = 'idle' | 'items' | 'done'

function shuffleOrder(length: number) {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

/** Mobile app grid — no card chrome; items animate in after hero. */
export function MobileAppGrid({
  start,
  openApp,
  onComplete,
}: {
  start: boolean
  openApp: (id: AppId) => void
  onComplete?: () => void
}) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>('idle')
  const appearOrder = useMemo(() => shuffleOrder(SIMPLE_APPS.length), [])
  const completedRef = useRef(false)

  useEffect(() => {
    if (!start) return
    if (reduceMotion) {
      setPhase('done')
      return
    }
    setPhase((p) => (p === 'idle' ? 'items' : p))
  }, [start, reduceMotion])

  useEffect(() => {
    if (phase !== 'done' || completedRef.current) return
    completedRef.current = true
    onComplete?.()
  }, [phase, onComplete])

  useEffect(() => {
    if (reduceMotion || phase === 'idle' || phase === 'done') return
    if (phase === 'items') {
      const t = window.setTimeout(
        () => setPhase('done'),
        SIMPLE_APPS.length * 75 + 380
      )
      return () => window.clearTimeout(t)
    }
  }, [phase, reduceMotion])

  const itemsVisible = reduceMotion || phase !== 'idle'

  return (
    <div
      className="relative"
      style={{ pointerEvents: itemsVisible ? 'auto' : 'none' }}
      aria-hidden={!itemsVisible}
    >
      <div className="grid grid-cols-2 gap-3">
        {SIMPLE_APPS.map((a, i) => (
          <motion.button
            key={a.id}
            type="button"
            onClick={() => openApp(a.id)}
            initial={false}
            animate={
              itemsVisible
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 14, scale: 0.94 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.4,
              delay: reduceMotion || !itemsVisible ? 0 : appearOrder[i] * 0.075,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ pointerEvents: itemsVisible ? 'auto' : 'none' }}
            className="flex items-center gap-3 rounded-2xl border border-[#16C60C]/25 bg-[#1C2E26]/80 px-4 py-4 text-left hover:bg-[#1C2E26]"
          >
            <AppIcon id={a.id} className="h-6 w-6" />
            <span className="text-sm font-medium text-[#CCCCCC]">{a.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  )
}
