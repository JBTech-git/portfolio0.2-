import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/** JARVIS HUD reticle → resolves to bordered </> mark when ready. */
export function BrandMark({ ready }: { ready: boolean }) {
  const reduceMotion = useReducedMotion()
  const showLogo = ready || !!reduceMotion

  return (
    <span
      className={`relative flex shrink-0 items-center justify-center transition-[width,height] duration-300 ${
        showLogo ? 'h-8 w-8' : 'h-11 w-11'
      }`}
      aria-hidden
    >
      <AnimatePresence mode="wait" initial={false}>
        {!showLogo ? (
          <motion.span
            key="loader"
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.22 }}
          >
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 32 32" fill="none">
              {/* Static outer guide ring */}
              <circle cx="16" cy="16" r="14.2" stroke="#16C60C" strokeWidth="0.4" opacity="0.25" />

              {/* Tick marks around outer edge */}
              {Array.from({ length: 12 }).map((_, i) => {
                const a = (i * 30 * Math.PI) / 180
                const x1 = 16 + Math.cos(a) * 13.2
                const y1 = 16 + Math.sin(a) * 13.2
                const long = i % 3 === 0
                const x2 = 16 + Math.cos(a) * (long ? 11.4 : 12.2)
                const y2 = 16 + Math.sin(a) * (long ? 11.4 : 12.2)
                return (
                  <line
                    key={i}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke="#16C60C"
                    strokeWidth={long ? 0.7 : 0.45}
                    opacity={long ? 0.7 : 0.35}
                  />
                )
              })}

              {/* Crosshair */}
              <line x1="16" y1="3.5" x2="16" y2="6.2" stroke="#16C60C" strokeWidth="0.55" opacity="0.55" />
              <line x1="16" y1="25.8" x2="16" y2="28.5" stroke="#16C60C" strokeWidth="0.55" opacity="0.55" />
              <line x1="3.5" y1="16" x2="6.2" y2="16" stroke="#16C60C" strokeWidth="0.55" opacity="0.55" />
              <line x1="25.8" y1="16" x2="28.5" y2="16" stroke="#16C60C" strokeWidth="0.55" opacity="0.55" />

              {/* Corner brackets */}
              <path d="M7 9.5 V7.5 H9.5" stroke="#16C60C" strokeWidth="0.6" opacity="0.5" />
              <path d="M25 9.5 V7.5 H22.5" stroke="#16C60C" strokeWidth="0.6" opacity="0.5" />
              <path d="M7 22.5 V24.5 H9.5" stroke="#16C60C" strokeWidth="0.6" opacity="0.5" />
              <path d="M25 22.5 V24.5 H22.5" stroke="#16C60C" strokeWidth="0.6" opacity="0.5" />
            </svg>

            {/* Outer scanning arc — fast spin */}
            <span className="jarvis-spin absolute inset-0 block">
              <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
                <circle
                  cx="16"
                  cy="16"
                  r="12.5"
                  stroke="#16C60C"
                  strokeWidth="1.4"
                  strokeDasharray="20 58"
                  strokeLinecap="round"
                  opacity="0.95"
                />
                <circle
                  cx="16"
                  cy="16"
                  r="12.5"
                  stroke="#3FF23F"
                  strokeWidth="0.7"
                  strokeDasharray="6 72"
                  strokeLinecap="round"
                  opacity="0.85"
                  transform="rotate(90 16 16)"
                />
              </svg>
            </span>

            {/* Mid ring — reverse spin */}
            <span className="jarvis-spin-rev absolute inset-0 block">
              <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
                <circle
                  cx="16"
                  cy="16"
                  r="9"
                  stroke="#16C60C"
                  strokeWidth="0.9"
                  strokeDasharray="8 6 2 14"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>

            {/* Inner radar sweep */}
            <span className="jarvis-spin-fast absolute inset-0 block">
              <svg className="h-full w-full" viewBox="0 0 32 32" fill="none">
                <defs>
                  <linearGradient id="jarvisSweep" x1="16" y1="16" x2="16" y2="5" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#16C60C" stopOpacity="0" />
                    <stop offset="100%" stopColor="#3FF23F" stopOpacity="0.7" />
                  </linearGradient>
                </defs>
                <path d="M16 16 L16 5 A11 11 0 0 1 24.5 10.5 Z" fill="url(#jarvisSweep)" opacity="0.55" />
                <circle
                  cx="16"
                  cy="16"
                  r="5.5"
                  stroke="#3FF23F"
                  strokeWidth="1.1"
                  strokeDasharray="9 26"
                  strokeLinecap="round"
                />
              </svg>
            </span>

            {/* Pulsing core */}
            <span className="jarvis-core absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#3FF23F]" />
          </motion.span>
        ) : (
          <motion.span
            key="logo"
            className="flex h-full w-full items-center justify-center rounded-lg border border-[#16C60C]/35 bg-[#1C2E26] font-mono text-sm font-bold tracking-tight text-[#16C60C]"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={
              reduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 320, damping: 16, mass: 0.7 }
            }
          >
            {'</>'}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}
