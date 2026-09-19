import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { profile, formatYearsStat, getExperienceDuration } from '../data/profile'
import { OsWindow } from './OsWindow'
import { TerminalApp } from './TerminalApp'
import { AiApp } from './AiApp'
import { AppContent } from './AppContent'
import { CommandPalette } from './CommandPalette'
import { DesktopBackdrop } from './DesktopBackdrop'
import { AppIcon } from './AppIcon'
import { HeroCard } from './HeroCard'
import { SideDock } from './SideDock'
import { MobileAppGrid } from './MobileAppGrid'
import { BrandMark } from './BrandMark'
import { PageScanner } from './PageScanner'
import {
  DESKTOP_APPS,
  SIMPLE_APPS,
  type AppId,
  type WindowState,
} from './types'

function shuffleOrder(length: number) {
  const order = Array.from({ length }, (_, i) => i)
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[order[i], order[j]] = [order[j], order[i]]
  }
  return order
}

function centeredSize(defaultSize: { w: number; h: number }, offset = 0) {
  const sidePad = 96
  const maxW = window.innerWidth - sidePad - 32
  const maxH = window.innerHeight - 140
  const w = Math.min(defaultSize.w, maxW)
  const h = Math.min(defaultSize.h, maxH)
  const x = Math.max(sidePad, (window.innerWidth - w + sidePad) / 2 + offset)
  const y = Math.max(72, (window.innerHeight - h - 48) / 2 + Math.abs(offset) * 0.3)
  return { x, y, w, h }
}

export function JayantaOS({
  technical: _technical = false,
  onModeChange,
}: {
  technical?: boolean
  onModeChange: (mode: 'recruiter' | 'classic' | 'explore' | 'technical') => void
}) {
  const [windows, setWindows] = useState<WindowState[]>([])
  const [zTop, setZTop] = useState(10)
  const [palette, setPalette] = useState(false)
  const [mobileApp, setMobileApp] = useState<AppId | null>(null)
  const [heroDone, setHeroDone] = useState(false)
  const [shellDone, setShellDone] = useState(false)
  const [logoReady, setLogoReady] = useState(false)
  const [scanning, setScanning] = useState(false)
  const [backdropReady, setBackdropReady] = useState(false)
  const reduceMotion = useReducedMotion()
  const years = formatYearsStat(getExperienceDuration())
  const navReady = heroDone || !!reduceMotion
  const brandReady = shellDone || !!reduceMotion
  const navAppearOrder = useMemo(() => shuffleOrder(SIMPLE_APPS.length), [])
  const heroBoundsRef = useRef<HTMLDivElement>(null)
  const mobileBoundsRef = useRef<HTMLDivElement>(null)
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  )

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const sync = () => setIsDesktop(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  // After left text + right buttons appear, start page scan (Jarvis keeps loading)
  useEffect(() => {
    if (reduceMotion) {
      setLogoReady(true)
      setBackdropReady(true)
      return
    }
    if (!shellDone) return
    const t = window.setTimeout(() => setScanning(true), 1050)
    return () => window.clearTimeout(t)
  }, [shellDone, reduceMotion])

  // Scan done → stop Jarvis loader, show logo, reveal background
  const finishScan = useCallback(() => {
    setScanning(false)
    setLogoReady(true)
    setBackdropReady(true)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPalette((p) => !p)
      }
      if (e.key === 'Escape') {
        setPalette(false)
        setMobileApp(null)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openApp = useCallback(
    (appId: AppId) => {
      const meta = DESKTOP_APPS.find((a) => a.id === appId)
      if (!meta) return

      if (window.matchMedia('(max-width: 767px)').matches) {
        setMobileApp(appId)
        return
      }

      setWindows((prev) => {
        const existing = prev.find((w) => w.appId === appId)
        if (existing) {
          return prev.map((w) =>
            w.id === existing.id ? { ...w, minimized: false, z: zTop + 1 } : w
          )
        }
        const offset = (prev.length % 5) * 28
        const size = centeredSize(meta.defaultSize, offset)
        const nextZ = zTop + 1
        setZTop(nextZ)
        return [
          ...prev,
          {
            id: `${appId}-${Date.now()}`,
            appId,
            title: meta.title,
            x: size.x,
            y: size.y,
            w: size.w,
            h: size.h,
            z: nextZ,
            minimized: false,
            maximized: false,
          },
        ]
      })
    },
    [zTop]
  )

  const focus = (id: string) => {
    setZTop((z) => {
      const next = z + 1
      setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, z: next, minimized: false } : w)))
      return next
    })
  }

  const renderApp = (appId: AppId) => {
    if (appId === 'terminal') return <TerminalApp onOpenAi={() => openApp('ai')} />
    if (appId === 'ai') return <AiApp />
    return <AppContent appId={appId} onOpen={openApp} />
  }

  const activeAppId =
    mobileApp ??
    [...windows]
      .filter((w) => !w.minimized)
      .sort((a, b) => b.z - a.z)[0]?.appId ??
    null

  const navBtnClass = (id: AppId, side = false) => {
    const on = activeAppId === id
    if (side) {
      return on
        ? 'flex w-full flex-col items-center gap-0.5 rounded-xl bg-[#16C60C]/15 px-1.5 py-2 ring-1 ring-[#16C60C]/40'
        : 'flex w-full flex-col items-center gap-0.5 rounded-xl px-1.5 py-2 hover:bg-white/5'
    }
    return on
      ? 'inline-flex shrink-0 items-center gap-1 rounded-full bg-[#16C60C]/15 px-2.5 py-1 text-xs font-medium text-[#3FF23F] ring-1 ring-[#16C60C]/40'
      : 'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-xs text-[#CCCCCC] hover:bg-white/5 hover:text-[#F2F2F2]'
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0A0A0A] text-[#CCCCCC]">
      <motion.div
        className="absolute inset-0 z-0"
        initial={false}
        animate={{ opacity: backdropReady ? 1 : 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ pointerEvents: backdropReady ? 'auto' : 'none' }}
      >
        <DesktopBackdrop />
      </motion.div>

      <PageScanner active={scanning} onComplete={finishScan} />

      {/* Single top navbar */}
      <header className="relative z-40 border-b border-[#16C60C]/20 bg-[#0C0C0C]/95 backdrop-blur">
        <div className="flex h-12 items-center gap-2 px-3 md:gap-3 md:px-4">
          <button
            type="button"
            onClick={() => openApp('about')}
            className="flex min-w-0 shrink-0 items-center gap-2.5 rounded-lg px-1 py-0.5 text-left hover:bg-[#1C2E26]/60"
            aria-label={`${profile.name} home`}
          >
            <BrandMark ready={logoReady} />
            <span className="min-w-0 overflow-hidden">
              <motion.span
                className="block truncate text-sm font-semibold text-[#F2F2F2]"
                initial={false}
                animate={brandReady ? { opacity: 1, x: 0 } : { opacity: 0, x: -14 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.55,
                  delay: reduceMotion || !brandReady ? 0 : 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {profile.name}
              </motion.span>
              <motion.span
                className="hidden truncate text-[10px] text-[#767676] lg:block"
                initial={false}
                animate={
                  brandReady
                    ? { opacity: 1, letterSpacing: '0.01em', y: 0 }
                    : { opacity: 0, letterSpacing: '0.28em', y: 6 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.5,
                  delay: reduceMotion || !brandReady ? 0 : 0.28,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {profile.role} · {years}+ years
              </motion.span>
            </span>
          </button>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto md:flex"
            aria-label="Main sections"
          >
            {SIMPLE_APPS.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => openApp(item.id)}
                className={navBtnClass(item.id)}
                initial={false}
                animate={
                  navReady
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: -18 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.4,
                  delay: reduceMotion || !navReady ? 0 : navAppearOrder[i] * 0.075,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ pointerEvents: navReady ? 'auto' : 'none' }}
              >
                <AppIcon id={item.id} className="h-3.5 w-3.5" active={activeAppId === item.id} />
                {item.label}
              </motion.button>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 md:ml-0">
            <motion.button
              type="button"
              onClick={() => setPalette(true)}
              className="rounded-lg border border-[#16C60C]/25 bg-[#0C0C0C] px-2.5 py-1.5 text-xs text-[#CCCCCC] hover:bg-[#1C2E26]"
              initial={false}
              animate={
                brandReady
                  ? { opacity: 1, scale: 1, rotate: 0 }
                  : { opacity: 0, scale: 0.4, rotate: -8 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 320, damping: 16, delay: brandReady ? 0.05 : 0 }
              }
              style={{ pointerEvents: brandReady ? 'auto' : 'none' }}
            >
              Search
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onModeChange('recruiter')}
              className="rounded-lg bg-[#16C60C] px-2.5 py-1.5 text-xs font-semibold text-[#0A0A0A] hover:bg-[#3FF23F]"
              initial={false}
              animate={
                brandReady
                  ? { opacity: 1, scale: 1, y: 0 }
                  : { opacity: 0, scale: 0.35, y: 12 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : {
                      type: 'spring',
                      stiffness: 400,
                      damping: 12,
                      mass: 0.65,
                      delay: brandReady ? 0.16 : 0,
                    }
              }
              style={{ pointerEvents: brandReady ? 'auto' : 'none' }}
            >
              Hiring?
            </motion.button>
            <motion.button
              type="button"
              onClick={() => onModeChange('classic')}
              className="hidden rounded-lg px-2.5 py-1.5 text-xs text-[#767676] hover:bg-[#1C2E26] hover:text-[#CCCCCC] sm:inline"
              initial={false}
              animate={brandReady ? { opacity: 1, x: 0 } : { opacity: 0, x: 18 }}
              transition={{
                duration: reduceMotion ? 0 : 0.45,
                delay: reduceMotion || !brandReady ? 0 : 0.28,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ pointerEvents: brandReady ? 'auto' : 'none' }}
            >
              Simple site
            </motion.button>
          </div>
        </div>
      </header>

      {/* Desktop */}
      {isDesktop ? (
      <div
        ref={heroBoundsRef}
        className="relative z-10 h-[calc(100vh-3rem)] p-4 pl-24"
      >
        <div className="pointer-events-none absolute left-1/2 top-[14%] w-[min(560px,88%)] -translate-x-1/2">
          <HeroCard
            years={years}
            openApp={openApp}
            onComplete={() => setHeroDone(true)}
            constraintsRef={heroBoundsRef}
          />
        </div>

        {windows.map((w) => {
          return (
            <OsWindow
              key={w.id}
              title={w.title}
              appId={w.appId}
              z={w.z}
              x={w.x}
              y={w.y}
              w={w.w}
              h={w.h}
              maximized={w.maximized}
              minimized={w.minimized}
              onFocus={() => focus(w.id)}
              onClose={() => setWindows((prev) => prev.filter((x) => x.id !== w.id))}
              onMinimize={() =>
                setWindows((prev) => prev.map((x) => (x.id === w.id ? { ...x, minimized: true } : x)))
              }
              onToggleMaximize={() =>
                setWindows((prev) =>
                  prev.map((x) => (x.id === w.id ? { ...x, maximized: !x.maximized } : x))
                )
              }
              onMove={(x, y) =>
                setWindows((prev) =>
                  prev.map((win) =>
                    win.id === w.id ? { ...win, x: Math.max(0, x), y: Math.max(40, y) } : win
                  )
                )
              }
            >
              {renderApp(w.appId)}
            </OsWindow>
          )
        })}
      </div>
      ) : (
      /* Mobile home — same step animation sequence */
      <div ref={mobileBoundsRef} className="relative z-10 px-4 py-5">
        <div className="mb-5">
          <HeroCard
            years={years}
            openApp={openApp}
            onComplete={() => setHeroDone(true)}
            constraintsRef={mobileBoundsRef}
            staticExtras
          />
        </div>
        <MobileAppGrid
          start={heroDone}
          openApp={openApp}
          onComplete={() => setShellDone(true)}
        />
        <motion.button
          type="button"
          onClick={() => onModeChange('classic')}
          className="mt-4 w-full py-2 text-center text-sm text-[#767676] underline-offset-2 hover:text-[#CCCCCC] hover:underline"
          initial={false}
          animate={shellDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
          transition={{ duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.15 }}
          style={{ pointerEvents: shellDone ? 'auto' : 'none' }}
        >
          Open as a normal website
        </motion.button>
      </div>
      )}

      {/* Side dock — desktop only, after hero */}
      {isDesktop ? (
        <SideDock
          start={heroDone}
          activeAppId={activeAppId}
          openApp={openApp}
          itemClassName={(id) => navBtnClass(id, true)}
          onComplete={() => setShellDone(true)}
        />
      ) : null}

      {/* Mobile sheet */}
      {mobileApp && (
        <div className="fixed inset-0 z-50 flex flex-col bg-[#0A0A0A] md:hidden">
          <div className="flex items-center justify-between border-b border-[#16C60C]/20 px-3 py-3">
            <span className="text-sm font-semibold text-[#F2F2F2]">
              {DESKTOP_APPS.find((a) => a.id === mobileApp)?.title}
            </span>
            <button
              type="button"
              className="flex items-center gap-2 rounded-xl border border-rose-400/30 bg-rose-500/15 px-4 py-2 text-sm font-semibold text-rose-100"
              onClick={() => setMobileApp(null)}
            >
              <span aria-hidden>×</span> Close
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-auto p-4">{renderApp(mobileApp)}</div>
        </div>
      )}

      <CommandPalette
        open={palette}
        onClose={() => setPalette(false)}
        onSelect={(id) => {
          if (id === 'home') return
          openApp(id)
        }}
      />
    </div>
  )
}
