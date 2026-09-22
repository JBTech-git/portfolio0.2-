export const CAREER_START = new Date(2023, 9, 1) // 01-10-2023

export const profile = {
  name: 'Jayanta Barman',
  shortName: 'Jayanta',
  hostname: 'jayanta@dev-machine',
  role: 'Software Developer',
  location: 'Kolkata, West Bengal, India',
  email: 'bjayanta584@gmail.com',
  phone: '+91 8388988586',
  phoneTel: '+918388988586',
  whatsapp: 'https://wa.me/918388988586',
  github: 'https://github.com/JBTech-git',
  linkedin: 'https://www.linkedin.com/in/jayanta-barman-747298211',
  site: 'https://jayanta-barman.vercel.app/',
  resumeBuilder: 'https://resumeiopro.vercel.app/',
  primaryStack: ['Python', 'Django', 'FastAPI', 'SQL', 'PostgreSQL', 'Docker', 'JavaScript', 'React'],
  focus: 'Backend / Full Stack Development',
  summary:
    'Full stack developer building user-focused digital experiences that balance design, functionality, and performance.',
  humanAbout: [
    'I build and maintain projects that balance performance, scalability, and intuitive UX.',
    'I enjoy collaborating with cross-functional teams, refining product details, and writing clean, maintainable code.',
    'Currently exploring AI-assisted development, system design, and scalable backend architecture.',
  ],
  exploring: [
    'AI-assisted software development',
    'System Design',
    'Cloud Infrastructure',
    'Scalable backend architecture',
  ],
  stats: {
    projectsDelivered: '10+',
    happyClients: '1+',
  },
} as const

export function getExperienceDuration(from = CAREER_START, to = new Date()) {
  if (to < from) return { years: 0, months: 0 }
  let years = to.getFullYear() - from.getFullYear()
  let months = to.getMonth() - from.getMonth()
  if (to.getDate() - from.getDate() < 0) months -= 1
  if (months < 0) {
    years -= 1
    months += 12
  }
  return { years: Math.max(0, years), months: Math.max(0, months) }
}

export function formatExperienceLabel({ years, months }: { years: number; months: number }) {
  if (years === 0 && months === 0) return 'less than a month'
  const parts: string[] = []
  if (years > 0) parts.push(`${years} year${years === 1 ? '' : 's'}`)
  if (months > 0) parts.push(`${months} month${months === 1 ? '' : 's'}`)
  return parts.length === 1 ? parts[0] : `${parts[0]} and ${parts[1]}`
}

export function formatYearsStat({ years, months }: { years: number; months: number }) {
  const total = years * 12 + months
  if (total < 12) return '< 1'
  const full = Math.floor(total / 12)
  return total % 12 > 0 ? `${full}+` : String(full)
}
