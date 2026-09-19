import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { AppIcon } from './AppIcon'
import { SIMPLE_APPS, type AppId } from './types'

const CARD_RADIUS = 16

type Phase = 'idle' | 'items' | 'border' | 'background' | 'done'

function shuffleOrder(length: number) {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

function dualBorderPaths(w: number, h: number, r: number, inset = 1) {
  const x = inset
  const y = inset
  const width = Math.max(0, w - inset * 2)
  const height = Math.max(0, h - inset * 2)
  const radius = Math.min(r, width / 2, height / 2)
  const right = x + width
  const bottom = y + height

  const fromTopLeft = [
    `M ${x + radius} ${y}`,
    `H ${right - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right} ${y + radius}`,
    `V ${bottom - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
  ].join(' ')

  const fromBottomRight = [
    `M ${right - radius} ${bottom}`,
    `H ${x + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x} ${bottom - radius}`,
    `V ${y + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`,
  ].join(' ')

  return { fromTopLeft, fromBottomRight }
}

export function SideDock({
  start,
  activeAppId,
  openApp,
  itemClassName,
  onComplete,
  instant = false,
}: {
  start: boolean
  activeAppId: AppId | null
  openApp: (id: AppId) => void
  itemClassName: (id: AppId) => string
  onComplete?: () => void
  instant?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(() => (instant || reduceMotion ? 'done' : 'idle'))
  const shellRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const appearOrder = useMemo(() => shuffleOrder(SIMPLE_APPS.length), [])
  const completedRef = useRef(false)

  useEffect(() => {
    if (!start) return
    if (reduceMotion || instant) {
      setPhase('done')
      return
    }
    setPhase((p) => (p === 'idle' ? 'items' : p))
  }, [start, reduceMotion, instant])

  useEffect(() => {
    if (phase !== 'done' || completedRef.current) return
    completedRef.current = true
    onComplete?.()
  }, [phase, onComplete])

  useEffect(() => {
    if (reduceMotion || phase === 'idle' || phase === 'done') return

    const advance = (next: Phase, delay: number) => {
      const t = window.setTimeout(() => setPhase(next), delay)
      return () => window.clearTimeout(t)
    }

    if (phase === 'items') return advance('border', SIMPLE_APPS.length * 75 + 380)
    if (phase === 'border') return advance('background', 1050)
    if (phase === 'background') return advance('done', 420)
  }, [phase, reduceMotion])

  useLayoutEffect(() => {
    const el = shellRef.current
    if (!el) return
    const measure = () => {
      const rect = el.getBoundingClientRect()
      setSize({ w: Math.round(rect.width), h: Math.round(rect.height) })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const itemsVisible = reduceMotion || phase !== 'idle'
  const borderVisible =
    reduceMotion || phase === 'border' || phase === 'background' || phase === 'done'
  const backgroundVisible = reduceMotion || phase === 'background' || phase === 'done'
  const revealed = itemsVisible

  const borderPaths =
    size.w > 0 && size.h > 0 ? dualBorderPaths(size.w, size.h, CARD_RADIUS) : null

  const borderMotion = {
    initial: false as const,
    animate: {
      pathLength: borderVisible ? 1 : 0,
      opacity: borderVisible ? 0.7 : 0,
    },
    transition: {
      pathLength: { duration: reduceMotion ? 0 : 1.05, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: reduceMotion ? 0 : 0.2 },
    },
  }

  return (
    <nav
      className="fixed left-3 top-1/2 z-40 hidden -translate-y-1/2 md:block"
      aria-label="Quick open"
      aria-hidden={!revealed}
    >
      <div
        ref={shellRef}
        className="relative flex w-[4.75rem] flex-col gap-0.5 rounded-2xl border border-transparent px-1.5 py-2"
        style={{ pointerEvents: revealed ? 'auto' : 'none' }}
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[#0C0C0C]/90 backdrop-blur-md"
          initial={false}
          animate={{ opacity: backgroundVisible ? 1 : 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        />

        {borderPaths ? (
          <svg
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full overflow-visible"
            width={size.w}
            height={size.h}
            viewBox={`0 0 ${size.w} ${size.h}`}
            aria-hidden
          >
            <motion.path
              d={borderPaths.fromTopLeft}
              fill="none"
              stroke="#16C60C"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              {...borderMotion}
            />
            <motion.path
              d={borderPaths.fromBottomRight}
              fill="none"
              stroke="#16C60C"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              {...borderMotion}
            />
          </svg>
        ) : null}

        <div className="relative z-[1] flex flex-col gap-0.5">
          {SIMPLE_APPS.map((a, i) => (
            <motion.button
              key={a.id}
              type="button"
              onClick={() => openApp(a.id)}
              className={itemClassName(a.id)}
              aria-current={activeAppId === a.id ? 'page' : undefined}
              title={a.label}
              initial={false}
              animate={
                itemsVisible
                  ? { opacity: 1, x: 0 }
                  : { opacity: 0, x: -28 }
              }
              transition={{
                duration: reduceMotion ? 0 : 0.4,
                delay: reduceMotion || !itemsVisible ? 0 : appearOrder[i] * 0.075,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ pointerEvents: itemsVisible ? 'auto' : 'none' }}
            >
              <AppIcon id={a.id} className="h-5 w-5" active={activeAppId === a.id} />
              <span
                className={`w-full truncate text-center text-[9px] leading-tight ${
                  activeAppId === a.id ? 'text-[#3FF23F]' : 'text-[#767676]'
                }`}
              >
                {a.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </nav>
  )
}
