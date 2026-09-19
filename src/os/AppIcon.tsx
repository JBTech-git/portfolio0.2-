import type { ReactNode } from 'react'
import type { AppId } from './types'

function Svg({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  )
}

const ICONS: Record<AppId, (props: { className?: string }) => ReactNode> = {
  about: ({ className }) => (
    <Svg className={className}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5.5 19.5c1.8-3.2 4-4.5 6.5-4.5s4.7 1.3 6.5 4.5" />
    </Svg>
  ),
  projects: ({ className }) => (
    <Svg className={className}>
      <path d="M4 7.5h16v11H4z" />
      <path d="M8 7.5V5.5h8v2" />
      <path d="M9 12h6M9 15.5h4" />
    </Svg>
  ),
  experience: ({ className }) => (
    <Svg className={className}>
      <path d="M8 9V6.5h8V9" />
      <rect x="4" y="9" width="16" height="11" rx="1.5" />
      <path d="M4 13.5h16" />
    </Svg>
  ),
  skills: ({ className }) => (
    <Svg className={className}>
      <path d="M8 16.5 4.5 13 8 9.5" />
      <path d="M16 9.5 19.5 13 16 16.5" />
      <path d="M13.5 7.5 10.5 16.5" />
    </Svg>
  ),
  resume: ({ className }) => (
    <Svg className={className}>
      <path d="M7 3.5h7l4 4V20.5H7z" />
      <path d="M14 3.5v4h4" />
      <path d="M9.5 11h5M9.5 14h5M9.5 17h3.5" />
    </Svg>
  ),
  contact: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="6" width="17" height="12" rx="1.5" />
      <path d="m4.5 7.5 7.5 6 7.5-6" />
    </Svg>
  ),
  ai: ({ className }) => (
    <Svg className={className}>
      <path d="M12 4.5v2M12 17.5v2M4.5 12h2M17.5 12h2" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </Svg>
  ),
  files: ({ className }) => (
    <Svg className={className}>
      <path d="M4.5 7.5h6l1.5 1.5H19.5v9.5H4.5z" />
    </Svg>
  ),
  terminal: ({ className }) => (
    <Svg className={className}>
      <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
      <path d="m7.5 9.5 3 2.5-3 2.5M12.5 14.5H16" />
    </Svg>
  ),
  architecture: ({ className }) => (
    <Svg className={className}>
      <rect x="9" y="3.5" width="6" height="4" rx="0.8" />
      <rect x="3.5" y="16.5" width="6" height="4" rx="0.8" />
      <rect x="14.5" y="16.5" width="6" height="4" rx="0.8" />
      <path d="M12 7.5v4.5M12 12H6.5v4.5M12 12h5.5v4.5" />
    </Svg>
  ),
  monitor: ({ className }) => (
    <Svg className={className}>
      <path d="M4.5 16.5V7.5h15v9z" />
      <path d="M8 19.5h8M12 16.5v3" />
      <path d="m7.5 13 3-3.5 2.5 2.5 3.5-4" />
    </Svg>
  ),
  codelab: ({ className }) => (
    <Svg className={className}>
      <path d="M8 8.5 4.5 12 8 15.5" />
      <path d="M16 8.5 19.5 12 16 15.5" />
      <path d="M13 7 11 17" />
    </Svg>
  ),
}

export function AppIcon({
  id,
  className = 'h-5 w-5',
  active = false,
  tone = 'default',
}: {
  id: AppId
  className?: string
  active?: boolean
  /** onGreen = dark icon for bright green buttons */
  tone?: 'default' | 'onGreen'
}) {
  const Icon = ICONS[id]
  const color =
    tone === 'onGreen' ? 'text-[#0A0A0A]' : active ? 'text-[#3FF23F]' : 'text-[#16C60C]'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center ${color}`}>
      {Icon({ className })}
    </span>
  )
}
