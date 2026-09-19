export type Project = {
  id: string
  title: string
  desc: string
  tags: string[]
  github?: string
  demo?: string
  architecture?: string[]
  features?: string[]
  status: 'placeholder' | 'live'
}

/** Replace placeholders when real case studies are ready. */
export const projects: Project[] = [
  {
    id: 'project-one',
    title: 'Project One',
    desc: 'A performant SPA focused on UX and a11y.',
    tags: ['React', 'Tailwind', 'Vite'],
    github: '#',
    demo: undefined,
    architecture: ['Client (React)', 'Vite build', 'Static hosting'],
    features: ['Responsive UI', 'Accessibility focus', 'Fast client navigation'],
    status: 'placeholder',
  },
  {
    id: 'project-two',
    title: 'Project Two',
    desc: 'Full-stack app with API integration and CI/CD.',
    tags: ['Next.js', 'TypeScript'],
    github: '#',
    architecture: ['Frontend', 'API layer', 'Database', 'CI/CD'],
    features: ['API integration', 'Typed codebase', 'Deploy pipeline'],
    status: 'placeholder',
  },
  {
    id: 'project-three',
    title: 'Project Three',
    desc: 'Design system components and docs.',
    tags: ['Storybook', 'UI'],
    github: '#',
    architecture: ['Component library', 'Docs site'],
    features: ['Reusable UI', 'Documentation'],
    status: 'placeholder',
  },
]
