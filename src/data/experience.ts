export type ExperienceItem = {
  id: string
  org: string
  role: string
  desc: string
  badge: string
  dates: string
  location: string
  type: 'education' | 'work'
}

export const experience: ExperienceItem[] = [
  {
    id: 'bca',
    org: 'Raiganj University',
    role: 'Bachelor of Computer Applications (BCA)',
    desc: 'Foundation in programming, data structures, DBMS, and web fundamentals.',
    badge: 'Education',
    dates: 'Aug 2018 – Aug 2021',
    location: 'Raiganj, India',
    type: 'education',
  },
  {
    id: 'mca',
    org: 'Brainware University',
    role: 'Master of Computer Applications (MCA)',
    desc: 'Advanced CS curriculum with emphasis on software engineering and modern stacks.',
    badge: 'Education',
    dates: 'Aug 2021 – Aug 2023',
    location: 'Kolkata, India',
    type: 'education',
  },
  {
    id: 'intern',
    org: 'Leelija Web Solution Pvt Ltd',
    role: 'Web Developer (Intern)',
    desc: 'Hands-on exposure to real projects, UI work, and collaborative delivery.',
    badge: 'Professional',
    dates: 'Oct 2023 – Mar 2024',
    location: 'Kolkata, India',
    type: 'work',
  },
  {
    id: 'fullstack',
    org: 'Leelija Web Solution Pvt Ltd',
    role: 'Full Stack Developer',
    desc: 'Building scalable features end-to-end across frontend and backend.',
    badge: 'Current',
    dates: 'Apr 2024 – Current',
    location: 'Kolkata, India',
    type: 'work',
  },
]
