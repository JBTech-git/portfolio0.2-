import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AppIcon } from './AppIcon'
import type { AppId } from './types'

type Props = {
  title: string
  appId?: AppId
  z: number
  x: number
  y: number
  w: number
  h: number
  maximized: boolean
  minimized: boolean
  onFocus: () => void
  onClose: () => void
  onMinimize: () => void
  onToggleMaximize: () => void
  onMove: (x: number, y: number) => void
  children: ReactNode
}

export function OsWindow({
  title,
  appId,
  z,
  x,
  y,
  w,
  h,
  maximized,
  minimized,
  onFocus,
  onClose,
  onMinimize,
  onToggleMaximize,
  onMove,
  children,
}: Props) {
  const drag = useRef<{ ox: number; oy: number } | null>(null)
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    if (!dragging) return
    const onMovePtr = (e: PointerEvent) => {
      if (!drag.current || maximized) return
      onMove(e.clientX - drag.current.ox, e.clientY - drag.current.oy)
    }
    const onUp = () => {
      drag.current = null
      setDragging(false)
    }
    window.addEventListener('pointermove', onMovePtr)
    window.addEventListener('pointerup', onUp)
    return () => {
      window.removeEventListener('pointermove', onMovePtr)
      window.removeEventListener('pointerup', onUp)
    }
  }, [dragging, maximized, onMove])

  if (minimized) return null

  const style = maximized
    ? {
        left: 12,
        top: 56,
        width: 'calc(100% - 24px)',
        height: 'calc(100% - 140px)',
        zIndex: z,
      }
    : { left: x, top: y, width: w, height: h, zIndex: z }

  return (
    <div
      role="dialog"
      aria-label={title}
      aria-modal="false"
      className="absolute flex flex-col overflow-hidden rounded-2xl border border-[#16C60C]/25 bg-[#0C0C0C]/96 shadow-[0_32px_100px_-20px_rgba(0,0,0,0.95),0_0_0_1px_rgba(22,198,12,0.08)] backdrop-blur-xl animate-[osWindowIn_0.28s_ease-out]"
      style={style}
      onMouseDown={onFocus}
    >
      {/* Soft AI-era top glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-80"
        style={{
          background:
            'radial-gradient(ellipse 80% 100% at 50% -20%, rgba(22,198,12,0.12), transparent 70%)',
        }}
      />

      <div
        className="relative flex h-12 shrink-0 cursor-grab items-center gap-3 border-b border-[#16C60C]/20 bg-[#1C2E26]/40 px-3 active:cursor-grabbing sm:px-4"
        onPointerDown={(e) => {
          if (maximized) return
          const target = e.target as HTMLElement
          if (target.closest('button')) return
          onFocus()
          drag.current = { ox: e.clientX - x, oy: e.clientY - y }
          setDragging(true)
        }}
      >
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          {appId ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#1C2E26] ring-1 ring-[#16C60C]/25">
              <AppIcon id={appId} className="h-4 w-4" />
            </span>
          ) : null}
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold tracking-tight text-[#F2F2F2]">{title}</div>
            <div className="hidden text-[10px] text-[#767676] sm:block">Drag to move · click Close anytime</div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            type="button"
            aria-label="Minimize"
            title="Minimize"
            onClick={(e) => {
              e.stopPropagation()
              onMinimize()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              <path d="M2 6h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label={maximized ? 'Restore' : 'Maximize'}
            title={maximized ? 'Restore' : 'Maximize'}
            onClick={(e) => {
              e.stopPropagation()
              onToggleMaximize()
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
              {maximized ? (
                <path
                  d="M3.5 4.5h4v4h-4v-4Zm1-1.5h5v5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              ) : (
                <rect x="2.5" y="2.5" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
              )}
            </svg>
          </button>
          <button
            type="button"
            aria-label="Close"
            title="Close"
            onClick={(e) => {
              e.stopPropagation()
              onClose()
            }}
            className="flex h-8 items-center gap-1.5 rounded-lg border border-rose-400/30 bg-rose-500/15 px-3 text-xs font-semibold text-rose-200 transition hover:border-rose-300/50 hover:bg-rose-500/30 hover:text-white"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path d="M2 2l6 6M8 2L2 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
            Close
          </button>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col overflow-auto bg-[#0A0A0A]/80 p-5 text-[#CCCCCC] sm:p-6">
        {children}
      </div>
    </div>
  )
}
