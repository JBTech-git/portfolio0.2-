export type AppId =
  | 'terminal'
  | 'ai'
  | 'projects'
  | 'experience'
  | 'skills'
  | 'architecture'
  | 'monitor'
  | 'about'
  | 'contact'
  | 'resume'
  | 'codelab'
  | 'files'

export type WindowState = {
  id: string
  appId: AppId
  title: string
  x: number
  y: number
  w: number
  h: number
  z: number
  minimized: boolean
  maximized: boolean
}

export type ExperienceMode = 'explore' | 'recruiter' | 'technical' | 'classic'

export const DESKTOP_APPS: {
  id: AppId
  label: string
  title: string
  defaultSize: { w: number; h: number }
  /** Shown in the simple everyday menu */
  simple?: boolean
}[] = [
  { id: 'about', label: 'About Me', title: 'About Me', defaultSize: { w: 860, h: 640 }, simple: true },
  { id: 'projects', label: 'Projects', title: 'Projects', defaultSize: { w: 980, h: 700 }, simple: true },
  { id: 'experience', label: 'Experience', title: 'Experience', defaultSize: { w: 900, h: 680 }, simple: true },
  { id: 'skills', label: 'Skills', title: 'Skills', defaultSize: { w: 900, h: 640 }, simple: true },
  { id: 'resume', label: 'Resume', title: 'Resume', defaultSize: { w: 860, h: 700 }, simple: true },
  { id: 'contact', label: 'Contact', title: 'Contact', defaultSize: { w: 780, h: 620 }, simple: true },
  { id: 'ai', label: 'Ask AI', title: 'Ask about Jayanta', defaultSize: { w: 820, h: 700 }, simple: true },
  { id: 'files', label: 'Files', title: 'Files', defaultSize: { w: 760, h: 560 } },
  { id: 'terminal', label: 'Terminal', title: 'Terminal', defaultSize: { w: 900, h: 620 } },
  { id: 'architecture', label: 'Architecture', title: 'Architecture', defaultSize: { w: 960, h: 680 } },
  { id: 'monitor', label: 'Monitor', title: 'System Monitor (Demo)', defaultSize: { w: 760, h: 560 } },
  { id: 'codelab', label: 'Code Lab', title: 'Code Lab', defaultSize: { w: 900, h: 640 } },
]

export const SIMPLE_APPS = DESKTOP_APPS.filter((a) => a.simple)
export const ADVANCED_APPS = DESKTOP_APPS.filter((a) => !a.simple)

export const STORAGE_MODE_KEY = 'jayanta-os-mode'
export const STORAGE_ONBOARD_KEY = 'jayanta-os-onboarded-v2'
export const STORAGE_MOTION_KEY = 'jayanta-os-reduce-motion'
