import { useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const CYCLES = 3
const HALF_MS = 1200
const CYCLE_MS = HALF_MS * 2
const SCAN_MS = CYCLES * CYCLE_MS

type SweepProps = {
  delay: number
  duration: number
  axis: 'y' | 'x'
  /** true = forward (down / right), false = reverse (up / left) */
  forward: boolean
}

function ScanBeam({ delay, duration, axis, forward }: SweepProps) {
  const isY = axis === 'y'
  const from = forward ? '-2%' : '102%'
  const to = forward ? '102%' : '-2%'
  const trailFrom = forward ? '-16%' : '100%'
  const trailTo = forward ? '100%' : '-16%'

  const beamStyle = isY
    ? {
        left: 0,
        right: 0,
        height: 2,
        background:
          'linear-gradient(90deg, transparent 0%, #16C60C 12%, #3FF23F 50%, #16C60C 88%, transparent 100%)',
        boxShadow:
          '0 0 14px 2px rgba(22,198,12,0.8), 0 0 40px 10px rgba(22,198,12,0.35)',
      }
    : {
        top: 0,
        bottom: 0,
        width: 2,
        background:
          'linear-gradient(180deg, transparent 0%, #16C60C 12%, #3FF23F 50%, #16C60C 88%, transparent 100%)',
        boxShadow:
          '0 0 14px 2px rgba(22,198,12,0.8), 0 0 40px 10px rgba(22,198,12,0.35)',
      }

  const trailStyle = isY
    ? {
        left: 0,
        right: 0,
        height: '14%',
        background: forward
          ? 'linear-gradient(180deg, transparent 0%, rgba(22,198,12,0.14) 45%, rgba(22,198,12,0.03) 100%)'
          : 'linear-gradient(0deg, transparent 0%, rgba(22,198,12,0.14) 45%, rgba(22,198,12,0.03) 100%)',
      }
    : {
        top: 0,
        bottom: 0,
        width: '10%',
        background: forward
          ? 'linear-gradient(90deg, transparent 0%, rgba(22,198,12,0.14) 45%, rgba(22,198,12,0.03) 100%)'
          : 'linear-gradient(270deg, transparent 0%, rgba(22,198,12,0.14) 45%, rgba(22,198,12,0.03) 100%)',
      }

  const beamAnim = isY
    ? { top: [from, to], opacity: [0, 1, 1, 0] }
    : { left: [from, to], opacity: [0, 1, 1, 0] }

  const trailAnim = isY
    ? { top: [trailFrom, trailTo], opacity: [0, 0.75, 0.45, 0] }
    : { left: [trailFrom, trailTo], opacity: [0, 0.75, 0.45, 0] }

  const beamInitial = isY ? { top: from, opacity: 0 } : { left: from, opacity: 0 }
  const trailInitial = isY
    ? { top: trailFrom, opacity: 0 }
    : { left: trailFrom, opacity: 0 }

  return (
    <>
      <motion.div
        className="absolute"
        style={beamStyle}
        initial={beamInitial}
        animate={beamAnim}
        transition={{
          duration,
          delay,
          ease: [0.35, 0.1, 0.25, 1],
          times: [0, 0.12, 0.88, 1],
        }}
      />
      <motion.div
        className="absolute"
        style={trailStyle}
        initial={trailInitial}
        animate={trailAnim}
        transition={{
          duration,
          delay,
          ease: [0.35, 0.1, 0.25, 1],
          times: [0, 0.15, 0.85, 1],
        }}
      />
    </>
  )
}

/** Bidirectional slow scan: down↔up and left↔right, three full cycles. */
export function PageScanner({
  active,
  onComplete,
}: {
  active: boolean
  onComplete: () => void
}) {
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!active) return
    if (reduceMotion) {
      onComplete()
      return
    }
    const t = window.setTimeout(onComplete, SCAN_MS)
    return () => window.clearTimeout(t)
  }, [active, reduceMotion, onComplete])

  if (!active || reduceMotion) return null

  const half = HALF_MS / 1000
  const sweeps: SweepProps[] = []

  for (let c = 0; c < CYCLES; c += 1) {
    const base = (c * CYCLE_MS) / 1000
    // Vertical: down then up
    sweeps.push({ delay: base, duration: half, axis: 'y', forward: true })
    sweeps.push({ delay: base + half, duration: half, axis: 'y', forward: false })
    // Horizontal: right then left
    sweeps.push({ delay: base, duration: half, axis: 'x', forward: true })
    sweeps.push({ delay: base + half, duration: half, axis: 'x', forward: false })
  }

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] overflow-hidden"
      aria-hidden
    >
      <motion.div
        className="absolute inset-0 bg-[#0A0A0A]/35"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0 }}
        transition={{ duration: SCAN_MS / 1000, ease: 'linear' }}
      />

      {sweeps.map((s, i) => (
        <ScanBeam key={i} {...s} />
      ))}

      <span className="absolute left-3 top-3 h-4 w-4 border-l border-t border-[#16C60C]/50" />
      <span className="absolute right-3 top-3 h-4 w-4 border-r border-t border-[#16C60C]/50" />
      <span className="absolute bottom-3 left-3 h-4 w-4 border-b border-l border-[#16C60C]/50" />
      <span className="absolute bottom-3 right-3 h-4 w-4 border-b border-r border-[#16C60C]/50" />
    </div>
  )
}
