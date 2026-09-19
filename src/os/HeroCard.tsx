import { useEffect, useLayoutEffect, useRef, useState, type RefObject } from 'react'
import { motion, useDragControls, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { AppIcon } from './AppIcon'
import { SIMPLE_APPS, type AppId } from './types'

const PROMPT = `${profile.hostname}:~$ ready`
const LABEL = 'Developer environment'
const BLURB =
  'Explore this interactive workspace — projects, experience, and systems thinking, with DEV-AI to help you navigate.'
const CARD_RADIUS = 16

const ACTIONS = [
  { id: 'about' as const, primary: true },
  { id: 'projects' as const, primary: false },
  { id: 'ai' as const, primary: false },
  { id: 'contact' as const, primary: false },
]

type Phase =
  | 'prompt'
  | 'label'
  | 'name'
  | 'meta'
  | 'blurb'
  | 'badges'
  | 'buttons'
  | 'border'
  | 'background'
  | 'done'

const PHASE_ORDER: Phase[] = [
  'prompt',
  'label',
  'name',
  'meta',
  'blurb',
  'badges',
  'buttons',
  'border',
  'background',
  'done',
]

function phaseRank(p: Phase) {
  return PHASE_ORDER.indexOf(p)
}

/** Two half-paths: top-left → bottom-right, and bottom-right → top-left (draw together). */
function dualBorderPaths(w: number, h: number, r: number, inset = 1) {
  const x = inset
  const y = inset
  const width = Math.max(0, w - inset * 2)
  const height = Math.max(0, h - inset * 2)
  const radius = Math.min(r, width / 2, height / 2)
  const right = x + width
  const bottom = y + height

  // Starts top-left, runs along top + right to bottom-right
  const fromTopLeft = [
    `M ${x + radius} ${y}`,
    `H ${right - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right} ${y + radius}`,
    `V ${bottom - radius}`,
    `A ${radius} ${radius} 0 0 1 ${right - radius} ${bottom}`,
  ].join(' ')

  // Starts bottom-right, runs along bottom + left to top-left
  const fromBottomRight = [
    `M ${right - radius} ${bottom}`,
    `H ${x + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x} ${bottom - radius}`,
    `V ${y + radius}`,
    `A ${radius} ${radius} 0 0 1 ${x + radius} ${y}`,
  ].join(' ')

  return { fromTopLeft, fromBottomRight }
}

function useTypewriter(text: string, active: boolean, speed = 26) {
  const [out, setOut] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active) return

    let i = 0
    setOut('')
    setDone(false)

    const id = window.setInterval(() => {
      i += 1
      setOut(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        setDone(true)
      }
    }, speed)

    return () => window.clearInterval(id)
  }, [text, active, speed])

  return { out, done }
}

function typedLine(full: string, typed: string, phase: Phase, line: Phase) {
  if (phaseRank(phase) > phaseRank(line)) return full
  if (phase === line) return typed
  return ''
}

export function HeroCard({
  years,
  openApp,
  onComplete,
  constraintsRef,
  staticExtras = false,
}: {
  years: string
  openApp: (id: AppId) => void
  onComplete?: () => void
  constraintsRef?: RefObject<HTMLElement | null>
  /** Mobile: hide badges + CTA buttons in the hero card */
  staticExtras?: boolean
}) {
  const reduceMotion = useReducedMotion()
  const [phase, setPhase] = useState<Phase>(() => (reduceMotion ? 'done' : 'prompt'))
  const cardRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const completedRef = useRef(false)
  const dragControls = useDragControls()
  const canDrag = phase === 'done' || !!reduceMotion

  useEffect(() => {
    if (phase !== 'done' || completedRef.current) return
    completedRef.current = true
    onComplete?.()
  }, [phase, onComplete])

  useLayoutEffect(() => {
    const el = cardRef.current
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

  const metaText = `${profile.role} · ${years}+ yrs · ${profile.focus}`

  const promptTw = useTypewriter(PROMPT, !reduceMotion && phase === 'prompt', 22)
  const labelTw = useTypewriter(LABEL, !reduceMotion && phase === 'label', 24)
  const nameTw = useTypewriter(profile.name, !reduceMotion && phase === 'name', 30)
  const metaTw = useTypewriter(metaText, !reduceMotion && phase === 'meta', 14)
  const blurbTw = useTypewriter(BLURB, !reduceMotion && phase === 'blurb', 11)

  useEffect(() => {
    if (reduceMotion) setPhase('done')
  }, [reduceMotion])

  useEffect(() => {
    if (reduceMotion || phase === 'done') return

    const advance = (next: Phase, delay: number) => {
      const t = window.setTimeout(() => setPhase(next), delay)
      return () => window.clearTimeout(t)
    }

    if (phase === 'prompt' && promptTw.done) return advance('label', 140)
    if (phase === 'label' && labelTw.done) return advance('name', 120)
    if (phase === 'name' && nameTw.done) return advance('meta', 120)
    if (phase === 'meta' && metaTw.done) return advance('blurb', 120)
    if (phase === 'blurb' && blurbTw.done) {
      return advance(staticExtras ? 'border' : 'badges', 200)
    }
    if (phase === 'badges') return advance('buttons', 460)
    if (phase === 'buttons') return advance('border', 520)
    if (phase === 'border') return advance('background', 1150)
    if (phase === 'background') return advance('done', 520)
  }, [
    phase,
    reduceMotion,
    staticExtras,
    promptTw.done,
    labelTw.done,
    nameTw.done,
    metaTw.done,
    blurbTw.done,
  ])

  const showPrompt = reduceMotion ? PROMPT : typedLine(PROMPT, promptTw.out, phase, 'prompt')
  const showLabel = reduceMotion ? LABEL : typedLine(LABEL, labelTw.out, phase, 'label')
  const showName = reduceMotion ? profile.name : typedLine(profile.name, nameTw.out, phase, 'name')
  const showMeta = reduceMotion ? metaText : typedLine(metaText, metaTw.out, phase, 'meta')
  const showBlurb = reduceMotion ? BLURB : typedLine(BLURB, blurbTw.out, phase, 'blurb')

  const badgesVisible =
    !staticExtras && (reduceMotion || phaseRank(phase) >= phaseRank('badges'))
  const buttonsVisible =
    !staticExtras && (reduceMotion || phaseRank(phase) >= phaseRank('buttons'))
  const borderVisible = reduceMotion || phaseRank(phase) >= phaseRank('border')
  const backgroundVisible = reduceMotion || phaseRank(phase) >= phaseRank('background')
  const typing =
    !reduceMotion &&
    (phase === 'prompt' ||
      phase === 'label' ||
      phase === 'name' ||
      phase === 'meta' ||
      phase === 'blurb')

  const borderPaths =
    size.w > 0 && size.h > 0 ? dualBorderPaths(size.w, size.h, CARD_RADIUS) : null

  const borderMotion = {
    initial: false as const,
    animate: {
      pathLength: borderVisible ? 1 : 0,
      opacity: borderVisible ? 0.7 : 0,
    },
    transition: {
      pathLength: { duration: reduceMotion ? 0 : 1.15, ease: [0.22, 1, 0.36, 1] as const },
      opacity: { duration: reduceMotion ? 0 : 0.2 },
    },
  }

  return (
    <motion.div
      ref={cardRef}
      drag={canDrag}
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragElastic={0.08}
      dragConstraints={constraintsRef}
      whileDrag={{ scale: 1.015, cursor: 'grabbing' }}
      className="pointer-events-auto relative rounded-2xl border border-transparent p-6 md:p-7"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-2xl bg-[#0C0C0C]/90 shadow-[0_24px_80px_-28px_rgba(0,0,0,0.9)] backdrop-blur-md"
        initial={false}
        animate={{ opacity: backgroundVisible ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
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

      <div
        className={`relative z-[1] flex touch-none items-center justify-between gap-3 border-b border-[#16C60C]/20 pb-3 font-mono text-[11px] text-[#16C60C] select-none ${
          canDrag ? 'cursor-grab active:cursor-grabbing' : ''
        }`}
        onPointerDown={(e) => {
          if (!canDrag) return
          e.preventDefault()
          dragControls.start(e)
        }}
        title={canDrag ? 'Drag to move' : undefined}
      >
        <span className="truncate">
          {showPrompt}
          {typing && phase === 'prompt' ? <Caret /> : null}
        </span>
        <span className="flex shrink-0 items-center gap-1.5 text-[#13A10E]">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#16C60C]" />
          JAYANTA OS
        </span>
      </div>

      <p className="relative mt-4 min-h-[1rem] font-mono text-[11px] uppercase tracking-[0.22em] text-[#13A10E]">
        {showLabel}
        {typing && phase === 'label' ? <Caret /> : null}
      </p>
      <h1 className="relative mt-2 min-h-[2.5rem] text-3xl font-extrabold tracking-tight text-[#F2F2F2] md:min-h-[2.75rem] md:text-4xl">
        {showName}
        {typing && phase === 'name' ? <Caret className="text-[#F2F2F2]" /> : null}
      </h1>
      <p className="relative mt-2 min-h-[1.25rem] text-sm text-[#CCCCCC]">
        {showMeta}
        {typing && phase === 'meta' ? <Caret /> : null}
      </p>
      <p className="relative mt-3 min-h-[2.75rem] max-w-md text-sm leading-relaxed text-[#767676]">
        {showBlurb}
        {typing && phase === 'blurb' ? <Caret /> : null}
      </p>

      {!staticExtras ? (
      <div className="relative mt-4 flex min-h-[1.5rem] flex-wrap gap-1.5">
        {profile.primaryStack.slice(0, 6).map((tech, i) => (
          <motion.span
            key={tech}
            initial={false}
            animate={
              badgesVisible
                ? { opacity: 1, y: 0, scale: 1 }
                : { opacity: 0, y: 8, scale: 0.92 }
            }
            transition={{
              duration: reduceMotion || staticExtras ? 0 : 0.35,
              delay: reduceMotion || staticExtras || !badgesVisible ? 0 : i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="rounded-md border border-[#16C60C]/25 bg-[#1C2E26]/80 px-2 py-0.5 font-mono text-[10px] text-[#16C60C]"
          >
            {tech}
          </motion.span>
        ))}
      </div>
      ) : null}

      {!staticExtras ? (
      <div className="relative mt-6 flex flex-wrap gap-2">
        {ACTIONS.map(({ id, primary }, i) => {
          const app = SIMPLE_APPS.find((a) => a.id === id)!
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => openApp(id)}
              initial={false}
              animate={
                buttonsVisible
                  ? { opacity: 1, y: 0, scale: 1 }
                  : { opacity: 0, y: 10, scale: 0.94 }
              }
              transition={{
                duration: reduceMotion || staticExtras ? 0 : 0.4,
                delay: reduceMotion || staticExtras || !buttonsVisible ? 0 : i * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ pointerEvents: buttonsVisible ? 'auto' : 'none' }}
              className={
                primary
                  ? 'inline-flex items-center gap-1.5 rounded-lg bg-[#16C60C] px-3.5 py-2 text-sm font-semibold text-[#0A0A0A] hover:bg-[#3FF23F]'
                  : 'inline-flex items-center gap-1.5 rounded-lg border border-[#16C60C]/30 bg-[#1C2E26]/50 px-3.5 py-2 text-sm text-[#CCCCCC] hover:border-[#16C60C]/50 hover:bg-[#1C2E26]'
              }
            >
              <AppIcon id={id} className="h-3.5 w-3.5" tone={primary ? 'onGreen' : 'default'} />
              {app.label}
            </motion.button>
          )
        })}
      </div>
      ) : null}
    </motion.div>
  )
}

function Caret({ className = 'text-[#16C60C]' }: { className?: string }) {
  return (
    <span className={`ml-0.5 inline-block w-[0.55ch] animate-pulse ${className}`} aria-hidden>
      ▌
    </span>
  )
}
