import { useEffect, useState } from 'react'

function Nav() {
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const onResize = () => setOpen(false)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 items-center h-14">
          <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
            <a href="#home" className="hover:text-white">Home</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#services" className="hover:text-white">Services</a>
            <a href="#projects" className="hover:text-white">Projects</a>
          </nav>
          <a href="#home" className="justify-self-center font-semibold text-slate-100 flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-sm text-white">JB</span>
            <span>Jayanta</span>
          </a>
          <div className="justify-self-end flex items-center gap-2">
            <button onClick={() => setOpen(!open)} aria-label="Toggle Menu" className="md:hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200 shadow-sm hover:bg-white/10">Menu</button>
            <a href="#contact" className="hidden md:inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-100 shadow-sm hover:bg-white/10 ring-1 ring-white/10">Contact</a>
          </div>
        </div>
        {open && (
          <div className="md:hidden pb-3">
            <div className="flex flex-col gap-2 text-sm rounded-xl border border-white/10 bg-white/5 p-3 text-slate-200">
              <a onClick={() => setOpen(false)} href="#home" className="hover:text-white">Home</a>
              <a onClick={() => setOpen(false)} href="#about" className="hover:text-white">About</a>
              <a onClick={() => setOpen(false)} href="#services" className="hover:text-white">Services</a>
              <a onClick={() => setOpen(false)} href="#projects" className="hover:text-white">Projects</a>
              <a onClick={() => setOpen(false)} href="#contact" className="hover:text-white">Contact</a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="mt-12 border-t border-transparent bg-gradient-to-b from-slate-900 to-black text-slate-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="text-sm text-slate-400">Best regards</div>
            <div className="mt-1 text-2xl font-extrabold">Jayanta</div>
            <p className="mt-3 max-w-xs text-sm text-slate-400">Reach out and let’s discuss how I can contribute to your team or product.</p>
          </div>
          <div>
            <div className="font-semibold text-slate-100">Quick Links</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li><a className="hover:text-white" href="#home">Home</a></li>
              <li><a className="hover:text-white" href="#about">About</a></li>
              <li><a className="hover:text-white" href="#services">Services</a></li>
              <li><a className="hover:text-white" href="#journey">Experience</a></li>
              <li><a className="hover:text-white" href="#projects">Projects</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-100">Contact Me</div>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>Kolkata, West Bengal, India</li>
              <li>Email: <a href="mailto:you@example.com" className="hover:text-white underline decoration-slate-600">you@example.com</a></li>
              <li>Phone: <a href="tel:+910000000000" className="hover:text-white">+91 0000000000</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-100">Follow Me</div>
            <div className="mt-3 flex gap-3">
              <a aria-label="GitHub" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.48C19.138 20.194 22 16.44 22 12.017 22 6.486 17.523 2 12 2Z" clipRule="evenodd"/></svg>
              </a>
              <a aria-label="LinkedIn" href="#" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.862-3.058-1.863 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.843-1.563 3.041 0 3.604 2.003 3.604 4.609v5.587z"/></svg>
              </a>
              <a aria-label="Email" href="mailto:you@example.com" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.06 5.292a1 1 0 0 0 1.24 0L19.56 6H4.2Z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <hr className="my-8 border-white/10" />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between text-xs text-slate-400">
          <div>© {new Date().getFullYear()} Jayanta. All rights reserved.</div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-200">Privacy Policy</a>
            <a href="#" className="hover:text-slate-200">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

function Connect() {
  return (
    <Section id="connect" className="pt-8">
      <div className="rounded-[24px] border border-slate-200 bg-gradient-to-b from-rose-50 via-indigo-50 to-blue-50 shadow-[0_20px_60px_-30px_rgba(2,6,23,0.3)] p-8 md:p-12">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex rounded-full border border-slate-200 bg-white/60 px-3 py-1 text-xs text-slate-700">Get in Touch</span>
          <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-900">Let’s Connect</h2>
          <p className="mt-3 text-slate-600">Interested in working together? I’m available for freelance projects and full‑time roles. Reach out and let’s discuss how I can contribute to your team or product.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-slate-700">
            <div className="inline-flex items-center gap-2"><span>✉️</span><a href="mailto:you@example.com" className="underline decoration-slate-300 hover:text-slate-900">you@example.com</a></div>
            <div className="inline-flex items-center gap-2"><span>📍</span><span>Kolkata, West Bengal, IN</span></div>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <a href="#contact" className="inline-flex items-center rounded-full border border-slate-300 bg-white px-5 py-2.5 text-sm shadow-sm hover:bg-slate-50">Schedule a call</a>
            <a href="mailto:you@example.com" className="inline-flex items-center rounded-full bg-gradient-to-r from-indigo-500 to-blue-600 text-white px-5 py-2.5 text-sm shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] hover:from-indigo-600 hover:to-blue-700">Send email →</a>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Journey() {
  const items = [
    {
      org: 'Raiganj University',
      role: 'Bachelor of Computer Applications (BCA)',
      desc: '',
      badge: 'Education',
      dates: 'Aug 2018 – Aug 2021',
      location: 'Raiganj, India'
    },
    {
      org: 'Brainware University',
      role: 'Master of Computer Applications (MCA)',
      desc: '',
      badge: 'Education',
      dates: 'Aug 2021 – Aug 2023',
      location: 'Kolkata, India'
    },
    {
      org: 'Leelija Web Solution Pvt Ltd',
      role: 'Web Developer (Intern)',
      desc: '',
      badge: 'Professional',
      dates: 'Oct 2023 – Mar 2024',
      location: 'Kolkata, India'
    },
    {
      org: 'Leelija Web Solution Pvt Ltd',
      role: 'Full Stack Developer',
      desc: '',
      badge: 'Current',
      dates: 'Apr 2024 – Current',
      location: 'Kolkata, India'
    }
  ]
  return (
    <Section id="journey" className="pt-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">The Journey</h2>
        <p className="mt-2 text-slate-300">A brief overview of my career path and experiences.</p>
      </div>

      <div className="relative mt-8">
        {/* edge fade masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-[#0b1220] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-[#0b1220] to-transparent" />
        {/* timeline center line */}
        <div className="pointer-events-none absolute left-0 right-0 top-1/2 -z-10 h-px bg-white/10" />

        {/* carousel controls (bottom-right) */}
        <div className="absolute right-2 bottom-2 z-20 flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white backdrop-blur-md ring-1 ring-white/10 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 transition-all"
            onClick={() => document.getElementById('journey-scroller')?.scrollBy({ left: -380, behavior: 'smooth' })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5"><path d="M15 6l-6 6 6 6"/></svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white backdrop-blur-md ring-1 ring-white/10 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 transition-all"
            onClick={() => document.getElementById('journey-scroller')?.scrollBy({ left: 380, behavior: 'smooth' })}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>

        <div id="journey-scroller" className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]" style={{scrollBehavior:'smooth'}}>
          {items.map((it, idx) => (
            <article key={idx} className="snap-center shrink-0 w-[320px] md:w-[360px]">
              <div className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5 shadow-[0_10px_40px_-20px_rgba(2,6,23,0.5)] ring-1 ring-white/10 h-full min-h-[240px] flex flex-col`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300">{it.org}</div>
                  <span className="rounded-full bg-white/10 text-xs px-2 py-0.5 text-slate-200">{it.badge}</span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-100">{it.role}</h3>
                <p className="mt-2 text-sm text-slate-300">{it.desc}</p>
                <div className="mt-auto pt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>📅 {it.dates}</span>
                  <span>📍 {it.location}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </Section>
  )
}

function Section({ id, children, className = '' }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative overflow-hidden scroll-mt-20 py-16 md:py-24 ${className}`}>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_0%_0%,rgba(255,255,255,0.06),transparent_60%),radial-gradient(60%_40%_at_100%_100%,rgba(255,255,255,0.05),transparent_60%)]" />
      <div className="container mx-auto px-4">{children}</div>
    </section>
  )
}

function Hero() {
  const skills = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Express', 'REST APIs', 'GraphQL',
    'PostgreSQL', 'MongoDB', 'Prisma', 'Tailwind CSS', 'Redux', 'Jest', 'CI/CD', 'Docker', 'AWS'
  ]
  // Map skills to Simple Icons slugs
  const skillSlug = (name: string) => {
    switch (name) {
      case 'React': return 'react'
      case 'Next.js': return 'nextdotjs'
      case 'TypeScript': return 'typescript'
      case 'JavaScript': return 'javascript'
      case 'Node.js': return 'nodedotjs'
      case 'Express': return 'express'
      case 'REST APIs': return 'swagger'
      case 'GraphQL': return 'graphql'
      case 'PostgreSQL': return 'postgresql'
      case 'MongoDB': return 'mongodb'
      case 'Prisma': return 'prisma'
      case 'Tailwind CSS': return 'tailwindcss'
      case 'Redux': return 'redux'
      case 'Jest': return 'jest'
      case 'CI/CD': return 'git'
      case 'Docker': return 'docker'
      case 'AWS': return 'amazonaws'
      default: return ''
    }
  }
  const skillIconUrls = (name: string) => {
    const slug = skillSlug(name)
    if (!slug) return null
    return {
      white: `https://cdn.simpleicons.org/${slug}/ffffff`,
      brand: `https://cdn.simpleicons.org/${slug}`,
    }
  }
  const skillIcon = (name: string) => {
    switch (name) {
      case 'React':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-cyan-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="12" cy="12" r="2.1" fill="currentColor" stroke="none" className="opacity-90" />
            <ellipse cx="12" cy="12" rx="9" ry="4.2" />
            <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="9" ry="4.2" transform="rotate(-60 12 12)" />
          </svg>
        )
      case 'Next.js':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-slate-200 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M4.5 6.5h15v11h-15z" className="opacity-30" />
            <path d="M7 16l10-8" />
            <path d="M11 8v8" className="opacity-70" />
          </svg>
        )
      case 'TypeScript':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-blue-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="5" width="16" height="14" rx="2" className="opacity-40" />
            <path d="M8 10h4M10 10v6" />
          </svg>
        )
      case 'JavaScript':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-yellow-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="5" width="16" height="14" rx="2" className="opacity-40" />
            <path d="M9 10v6M15 10c1.8 0 3 1 3 2.6 0 1.4-1.2 2.4-3 2.4" />
          </svg>
        )
      case 'Node.js':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-emerald-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <polygon points="12,3 21,8 21,16 12,21 3,16 3,8" className="opacity-70" />
          </svg>
        )
      case 'Express':
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white group-hover:text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="6" width="16" height="12" rx="2" className="opacity-50" />
            <path d="M8 12h8" />
          </svg>
        )
      case 'REST APIs':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-cyan-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="7" cy="12" r="2.5" />
            <circle cx="17" cy="12" r="2.5" />
            <path d="M9.5 12H14.5" />
          </svg>
        )
      case 'GraphQL':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-fuchsia-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <polygon points="12,4 20,8 20,16 12,20 4,16 4,8" className="opacity-60" />
            <line x1="12" y1="4" x2="12" y2="20" />
            <line x1="4" y1="8" x2="20" y2="16" />
            <line x1="20" y1="8" x2="4" y2="16" />
          </svg>
        )
      case 'PostgreSQL':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-sky-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <ellipse cx="12" cy="7" rx="7" ry="3" />
            <path d="M5 7v6c0 1.7 3.1 3 7 3s7-1.3 7-3V7" />
          </svg>
        )
      case 'MongoDB':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-emerald-300 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
            <path d="M12 3c2 3 3 6 3 9s-1 6-3 9c-2-3-3-6-3-9s1-6 3-9z" />
          </svg>
        )
      case 'Prisma':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-cyan-200 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <polygon points="6,18 14,3 18,21" />
          </svg>
        )
      case 'Tailwind CSS':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-cyan-300 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
            <path d="M12 7c-2 0-3 .9-4 2 1-1 2-1 3-.5C12 9 13 11 15 11c2 0 3-.9 4-2-1 1-2 1-3 .5C14 8 13 7 12 7zM7 13c-2 0-3 .9-4 2 1-1 2-1 3-.5C7 15 8 17 10 17c2 0 3-.9 4-2-1 1-2 1-3 .5C9 14 8 13 7 13z" />
          </svg>
        )
      case 'Redux':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-violet-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="8" cy="12" r="2" />
            <circle cx="16" cy="9" r="2" />
            <circle cx="14" cy="16" r="2" />
            <path d="M9.5 13.5c1.5 2 3.5 3 6 2.5M14.5 7.5c-2-1-4.5-.5-6 1.5M6.5 11.5c-.5 2.2 1 4.3 3.2 5.3" />
          </svg>
        )
      case 'Jest':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-rose-300 transition-transform duration-200 group-hover:scale-110" fill="currentColor">
            <path d="M7 5l2 5 3-3 3 3 2-5-5 2-5-2z" />
          </svg>
        )
      case 'CI/CD':
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white group-hover:text-slate-200" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 7h6l3 3-3 3H8l-3-3 3-3z" className="opacity-60" />
            <path d="M10 4v3M14 17v3" />
          </svg>
        )
      case 'Docker':
        return (
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-white group-hover:text-sky-300" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="6" y="11" width="3" height="3" />
            <rect x="10" y="11" width="3" height="3" />
            <rect x="14" y="11" width="3" height="3" />
            <rect x="10" y="7" width="3" height="3" />
            <path d="M4 15c0 2.2 2 4 6 4h5c3 0 5-2 5-4" />
          </svg>
        )
      case 'AWS':
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white group-hover:text-orange-300 transition-transform duration-200 group-hover:scale-110" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M6 14a5 5 0 0 1 4-7 6 6 0 0 1 11 3c0 .3 0 .6-.1.9A4 4 0 0 1 19 18H8a4 4 0 0 1-2-4z" />
          </svg>
        )
      default:
        return (
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
        )
    }
  }
  return (
    <Section id="home" className="relative overflow-hidden min-h-[90vh] md:min-h-screen flex items-center">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60%_40%_at_50%_10%,rgba(99,102,241,0.08),transparent_60%)]" />
      <div className="mx-auto text-center">
        <p className="text-base text-indigo-300/90">Namaste 🙏, I'm <span className="font-semibold text-white">Jayanta Barman</span>. A passionate software developer</p>
        <h1 className="mt-4 text-[4.2em] leading-[1.1] font-extrabold tracking-tight text-slate-100">
          Building Scalable Digital
          <br className="hidden sm:block" />
          Experiences with 
          <br className="hidden sm:block" />
          <span className="font-['Playfair_Display'] text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 drop-shadow-[0_2px_14px_rgba(99,102,241,0.45)]">Clean Code &amp; Seamless UX</span>
        </h1>
        <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
          A multidisciplinary engineer crafting digital experiences that resonate with culture, emotion, and efficiency.
        </p>
        <div className="mt-8 flex justify-center">
          <a
            href="/Jayanta_Barman_Resume.pdf"
            download
            aria-label="Download Jayanta Barman resume (PDF)"
            title="Download Resume (PDF)"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-lg text-white bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 hover:from-violet-700 hover:via-fuchsia-600 hover:to-cyan-500 active:translate-y-[1px] ring-1 ring-violet-400/30 hover:ring-violet-400/50 transition-all shadow-lg hover:shadow-violet-500/20"
          >
            <span className="text-white">Download Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 8.293 11.293L10.586 13.586V4a1 1 0 0 1 1-1ZM5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5Z"/></svg>
          </a>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-slate-400 pb-20">
          <span className="text-lg font-bold">Find me on</span>
          <div className="flex items-center gap-2">
            <a aria-label="GitHub" href="#" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.48C19.138 20.194 22 16.44 22 12.017 22 6.486 17.523 2 12 2Z" clipRule="evenodd"/></svg>
            </a>
            <a aria-label="LinkedIn" href="#" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.862-3.058-1.863 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881 v1.367h.041c.401-.761 1.381-1.563 2.843-1.563 3.041 0 3.604 2.003 3.604 4.609v5.587z"/></svg>
            </a>
            <a aria-label="Twitter" href="#" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path d="M17.316 6.246c-1.104.654-2.327 1.13-3.628 1.387a3.17 3.17 0 0 0-5.402 2.168c0 .248.03.49.085.722-2.634-.132-4.971-1.396-6.533-3.319a3.18 3.18 0 0 0-.43 1.595 3.17 3.17 0 0 0 1.41 2.641 3.155 3.155 0 0 1-1.437-.401v.04 a3.18 3.18 0 0 0 2.545 3.114 3.2 3.2 0 0 1-1.43.055 3.18 3.18 0 0 0 2.961 2.205 6.367 6.367 0 0 1-3.95 1.37c-.255 0-.507-.014-.754-.044a8.985 8.985 0 0 0 4.86 1.43c5.833 0 9.023-4.821 9.023-9.004 0-.137-.004-.274-.01-.41a6.421 6.421 0 0 0 1.575-1.627"/></svg>
            </a>
          </div>
        </div>
        <div className="mt-10 marquee">
          <div className="marquee-inner gap-3">
            {[...skills, ...skills].map((s, i) => (
              <span
                key={`${s}-${i}`}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-lg text-slate-100 whitespace-nowrap"
              >
                {(() => {
                  const urls = skillIconUrls(s)
                  return urls ? (
                    <span className="relative inline-flex h-6 w-6 items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
                      <img src={urls.white} alt="" className="absolute inset-0 h-6 w-6 opacity-100 group-hover:opacity-0 transition-opacity duration-200" loading="lazy" />
                      <img src={urls.brand} alt="" className="absolute inset-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200" loading="lazy" />
                    </span>
                  ) : (
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400" />
                  )
                })()}
                <span>{s}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}

function Projects() {
  const items = [
    { title: 'Project One', desc: 'A performant SPA focused on UX and a11y.', link: '#', tags: ['React','Tailwind','Vite'] },
    { title: 'Project Two', desc: 'Full‑stack app with API integration and CI/CD.', link: '#', tags: ['Next.js','TypeScript'] },
    { title: 'Project Three', desc: 'Design system components and docs.', link: '#', tags: ['Storybook','UI'] },
  ]
  return (
    <Section id="projects">
      <h2 className="text-3xl font-bold">Projects</h2>
      <p className="mt-2 text-slate-600">Selected work demonstrating product thinking and craft.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {items.map(p => (
          <a key={p.title} href={p.link} className="group block rounded-xl border border-slate-200 p-5 hover:shadow-sm transition bg-white">
            <div className="h-40 rounded-lg bg-slate-100 mb-4" />
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-xl font-semibold group-hover:underline">{p.title}</h3>
              <span className="text-xs opacity-60">Case Study</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {p.tags.map(t => (
                <span key={t} className="rounded-full border border-slate-200 px-2 py-0.5">{t}</span>
              ))}
            </div>
          </a>
        ))}
      </div>
    </Section>
  )
}

function About() {
  return (
    <Section id="about" className="relative overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-blue-950">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(600px_300px_at_0%_0%,rgba(99,102,241,0.18),transparent_60%),radial-gradient(600px_300px_at_100%_100%,rgba(59,130,246,0.14),transparent_60%)]" />
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">About Me</h2>
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto">I'm a full stack developer passionate about building user-focused digital experiences that balance design, functionality, and performance.</p>
      </div>
      <div className="mt-10 grid gap-8 md:grid-cols-2 md:items-center">
        <div className="justify-self-center">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_10px_30px_-20px_rgba(255,255,255,0.25)]">
            {/* Replace /profile.jpg with your photo in public/ */}
            <img src="/profile.jpg" alt="Profile" className="h-[360px] w-[280px] object-cover md:h-[420px] md:w-[320px]" onError={(e:any)=>{e.currentTarget.style.display='none'}} />
            <div className="h-[360px] w-[280px] md:h-[420px] md:w-[320px] flex items-center justify-center text-slate-400" aria-hidden>Upload profile.jpg</div>
          </div>
        </div>
        <div>
          <p className="text-slate-300 leading-relaxed">
            Over the last <span className="font-semibold text-white">2+ years</span>, I've worked on projects that balance performance, accessibility, and intuitive design. My goal is to make products that feel effortless yet impactful for users.
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Beyond coding, I enjoy collaborating with teams, brainstorming product ideas, and refining details that turn a good experience into a great one. Whether it's a marketing site or a scalable app, I strive for clean, maintainable, and elegant solutions.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-4 gap-3">
            {[
              {
                label: 'Frontend Development',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M9 7L5.5 12 9 17" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 7l3.5 5L15 17" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 5l-2 14" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                label: 'Backend Development',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="4" y="5" width="16" height="4" rx="1" className="opacity-70" />
                    <rect x="4" y="10" width="16" height="4" rx="1" className="opacity-70" />
                    <rect x="4" y="15" width="16" height="4" rx="1" className="opacity-70" />
                    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
                    <circle cx="7" cy="12" r="1" fill="currentColor" stroke="none" />
                    <circle cx="7" cy="17" r="1" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
              {
                label: 'UI/UX Design',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <rect x="4" y="5" width="16" height="12" rx="2" className="opacity-70" />
                    <rect x="6" y="7" width="6" height="4" fill="currentColor" stroke="none" className="opacity-25" />
                    <path d="M14.2 9.2l2.8 2.8-1.8.6-.6 1.8-2.8-2.8z" fill="currentColor" stroke="none" className="opacity-90" />
                  </svg>
                ),
              },
              {
                label: 'Team Collaboration',
                icon: (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" className="opacity-30" />
                    <circle cx="7" cy="10.5" r="1.8" fill="currentColor" stroke="none" className="opacity-25" />
                    <circle cx="17" cy="10.5" r="1.8" fill="currentColor" stroke="none" className="opacity-25" />
                    <path d="M4.5 17.5c.7-2 3-3.2 5.3-3.2h4.4c2.3 0 4.6 1.2 5.3 3.2" strokeLinecap="round" className="opacity-70" />
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <div key={label} className="flex flex-col justify-center items-center text-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-300">
                  {icon}
                </span>
                <span className="text-sm font-medium text-slate-100">{label}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          { k: 'Years Experience', v: '2+' },
          { k: 'Projects Delivered', v: '10+' },
          { k: 'Happy Clients', v: '5+' },
        ].map(({k,v}) => (
          <div key={k} className="text-center">
            <div className="text-3xl font-extrabold text-white">{v}</div>
            <div className="mt-1 text-sm text-slate-400">{k}</div>
          </div>
        ))}
      </div>
        </div>
      </div>
    </Section>
  )
}

function Skills() {
  const tabs = ['Frontend','Backend','Soft Skills']
  const [activeTab, setActiveTab] = useState<'Frontend' | 'Backend' | 'Soft Skills'>('Frontend')
  const [imageError, setImageError] = useState(false)
  const frontendList = [
    'React & Next.js',
    'TypeScript & JavaScript',
    'Tailwind CSS & Styled Components',
    'Redux & Context API',
    'Responsive Design',
    'Framer Motion & GSAP',
    'HTML5 & CSS3',
    'UI/UX Implementation',
  ]
  const backendList = [
    'Node.js & Express',
    'REST & GraphQL APIs',
    'PostgreSQL & MongoDB',
    'Authentication & Authorization',
    'ORMs (Prisma/Sequelize/Mongoose)',
    'Caching & Queues (Redis)',
    'Testing (Jest/Supertest)',
    'Deployment & CI/CD',
  ]
  const softSkillsList = [
    'Team Collaboration',
    'Communication',
    'Problem Solving',
    'Agile & Scrum',
    'Mentoring & Knowledge Sharing',
    'Stakeholder Management',
    'Ownership & Accountability',
    'Documentation',
  ]

  const selected =
    activeTab === 'Frontend'
      ? { badge: 'User Interface', title: 'Frontend Development', desc: 'I specialize in creating responsive, accessible, and performant user interfaces using modern frontend technologies and frameworks.', list: frontendList, image: '/frontend.jpg', placeholder: 'Upload frontend.jpg' }
      : activeTab === 'Backend'
      ? { badge: 'APIs & Services', title: 'Backend Development', desc: 'I design and build robust, scalable backend services and APIs with strong focus on security, reliability, and observability.', list: backendList, image: '/backend.jpg', placeholder: 'Upload backend.jpg' }
      : { badge: 'Collaboration', title: 'Soft Skills', desc: 'I value clear communication, teamwork, and process that help teams deliver quality software efficiently.', list: softSkillsList, image: '/soft-skill.png', placeholder: 'Upload soft-skill.png' }

  const colors =
    activeTab === 'Frontend'
      ? { badge: 'border-indigo-200 text-indigo-700', dot: 'bg-indigo-500' }
      : activeTab === 'Backend'
      ? { badge: 'border-emerald-200 text-emerald-700', dot: 'bg-emerald-500' }
      : { badge: 'border-rose-200 text-rose-700', dot: 'bg-rose-500' }

  useEffect(() => {
    // reset image error when tab changes so new image attempts to load
    setImageError(false)
  }, [activeTab])

  return (
    <Section id="skills" className="pt-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(10,15,26,0)_0%,rgba(10,15,26,0.28)_60%,rgba(10,15,26,0.4)_100%),radial-gradient(700px_500px_at_50%_0%,rgba(147,51,234,0.32),transparent_70%),radial-gradient(900px_600px_at_50%_110%,rgba(56,189,248,0.22),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.4] bg-[radial-gradient(2px_2px_at_30%_15%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(1.5px_1.5px_at_70%_12%,rgba(255,255,255,0.6),transparent_40%),radial-gradient(1.5px_1.5px_at_60%_45%,rgba(255,255,255,0.6),transparent_40%)]" />
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">Skills &amp; Specializations</h2>
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">A comprehensive overview of my technical skills and areas of expertise</p>
        <div className="mt-5 flex justify-center gap-2" role="tablist" aria-label="Skills tabs">
          {tabs.map((t)=> (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={activeTab===t}
              id={`tab-${t.replace(/\s+/g,'-').toLowerCase()}`}
              aria-controls={`panel-${t.replace(/\s+/g,'-').toLowerCase()}`}
              onClick={() => setActiveTab(t as typeof activeTab)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/60 focus-visible:ring-offset-0 ${activeTab===t
                ? 'bg-gradient-to-r from-violet-500/60 via-fuchsia-500/60 to-cyan-400/60 text-white border-transparent shadow hover:from-violet-500/70 hover:via-fuchsia-500/70 hover:to-cyan-400/70'
                : 'bg-white/5 text-slate-200 border-white/10 hover:bg-white/10'}`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div
        id={`panel-${activeTab.replace(/\s+/g,'-').toLowerCase()}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.replace(/\s+/g,'-').toLowerCase()}`}
        className="relative overflow-hidden mt-8 rounded-3xl border border-white/10 bg-white/10 backdrop-blur-md shadow-[0_12px_50px_-20px_rgba(2,6,23,0.5)] p-6 md:p-8 ring-1 ring-white/10"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_12%_0%,rgba(99,102,241,0.22),transparent_60%),radial-gradient(500px_340px_at_88%_8%,rgba(168,85,247,0.2),transparent_60%),radial-gradient(700px_520px_at_50%_115%,rgba(56,189,248,0.18),transparent_70%)]" />
        <div key={activeTab} className="grid gap-8 md:grid-cols-2 md:items-center animate-fade-in-up">
          <div>
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs ${colors.badge}`}>{selected.badge}</span>
            <h3 className="mt-3 text-2xl md:text-3xl font-bold text-slate-100">{selected.title}</h3>
            <p className="mt-2 text-slate-300 text-sm md:text-base">{selected.desc}</p>
            <div className="mt-5 grid grid-cols-2 gap-y-2 md:gap-x-6">
              {selected.list.map(item => (
                <div key={item} className="flex items-start gap-2 text-slate-200">
                  <span className={`mt-1 inline-block h-1.5 w-1.5 rounded-full ${colors.dot}`}></span>
                  <span className="text-sm md:text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-rose-50 via-indigo-50 to-blue-50 shadow-sm">
              <img
                key={selected.image}
                src={selected.image}
                alt={`${selected.title} preview`}
                className={`aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-[1.02] ${imageError ? 'hidden' : ''}`}
                onLoad={() => setImageError(false)}
                onError={() => setImageError(true)}
              />
              {imageError && (
                <div className="aspect-[4/3] w-full flex items-center justify-center text-slate-400" aria-hidden>
                  {selected.placeholder}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function Services() {
  const services = [
    { title: 'Web Development', desc: 'Building fast, accessible, and responsive web apps.', tags: ['React', 'Next.js', 'TypeScript'] },
    { title: 'UI Engineering', desc: 'Implementing pixel‑perfect, scalable design systems.', tags: ['Design Systems', 'Tailwind', 'A11y'] },
    { title: 'Performance Tuning', desc: 'Auditing and optimizing Core Web Vitals.', tags: ['Lighthouse', 'CWV', 'Caching'] },
    { title: 'Backend APIs', desc: 'Designing REST/SQL services with best practices.', tags: ['Node', 'Express', 'SQL'] },
    { title: 'Cross-browser Compatibility', desc: 'Consistent UX across Chrome, Firefox, Safari, and Edge with thorough testing.', tags: ['Chrome', 'Firefox', 'Safari', 'Edge'] },
    { title: 'SEO Optimization', desc: 'Improve discoverability with technical SEO, structured data, and fast performance.', tags: ['Meta Tags', 'Sitemap', 'Structured Data', 'Performance'] },
  ]
  const serviceIcon = (title: string) => {
    switch (title) {
      case 'Web Development':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-cyan-300">
            <circle cx="12" cy="12" r="9" className="opacity-60" />
            <path d="M3 12h18M12 3a17 17 0 0 0 0 18M12 3a17 17 0 0 1 0 18" />
          </svg>
        )
      case 'UI Engineering':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-fuchsia-300">
            <rect x="4" y="6" width="16" height="12" rx="2" />
            <path d="M4 10h16M8 14h4" />
          </svg>
        )
      case 'Performance Tuning':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-emerald-300">
            <circle cx="12" cy="12" r="8" />
            <path d="M12 12l4-3M7 15a7 7 0 0 1 10 0" />
          </svg>
        )
      case 'Backend APIs':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-indigo-300">
            <rect x="4" y="6" width="16" height="12" rx="2" className="opacity-70" />
            <path d="M8 12h8M6 9h12M6 15h12" />
          </svg>
        )
      case 'Cross-browser Compatibility':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-sky-300">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 9h18" className="opacity-70" />
            <circle cx="7" cy="7" r=".8" fill="currentColor" />
            <circle cx="10" cy="7" r=".8" fill="currentColor" />
            <path d="M8 14l2 2 4-4" />
          </svg>
        )
      case 'SEO Optimization':
        return (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-7 w-7 text-white transition-transform duration-200 group-hover:scale-110 group-hover:text-amber-300">
            <circle cx="10" cy="10" r="5" />
            <path d="M14.5 14.5L20 20" />
            <path d="M7.5 10h5M10 7.5v5" className="opacity-70" />
          </svg>
        )
      default:
        return (
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-white" />
        )
    }
  }
  return (
    <Section id="services" className="relative bg-[linear-gradient(180deg,#0b1220_0%,#0f1b33_50%,#0b1220_100%)]">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_12%_0%,rgba(99,102,241,0.14),transparent_60%),radial-gradient(500px_340px_at_88%_8%,rgba(168,85,247,0.12),transparent_60%),radial-gradient(700px_520px_at_50%_115%,rgba(56,189,248,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(255,255,255,0)_40%),radial-gradient(600px_300px_at_20%_10%,rgba(147,51,234,0.12),transparent_60%),radial-gradient(700px_360px_at_80%_0%,rgba(56,189,248,0.10),transparent_65%)]" />
      {/* Centered white-blue-pink light */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[14%] -translate-x-1/2 h-[560px] w-[900px] rounded-full blur-2xl opacity-90 bg-[radial-gradient(800px_520px_at_center,rgba(255,255,255,0.24)_0%,rgba(59,130,246,0.22)_42%,rgba(236,72,153,0.20)_75%,rgba(255,255,255,0)_78%)]" />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute -bottom-24 left-10 h-[420px] w-[420px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_60%)]" />
        <div className="absolute -bottom-16 right-10 h-[380px] w-[380px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_60%)]" />
      </div>
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">Services</h2>
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">How I can help your team ship great products.</p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch">
        {services.map((s, i) => (
          <div
            key={s.title}
            className="group relative h-full min-h-[200px] overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-6 shadow-[0_12px_50px_-20px_rgba(2,6,23,0.5)] ring-1 ring-white/10 transition-all hover:translate-y-[-2px] hover:ring-white/20 hover:shadow-[0_20px_60px_-20px_rgba(34,211,238,0.25)] animate-fade-in-up flex flex-col"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(420px_240px_at_0%_0%,rgba(99,102,241,0.08),transparent_60%),radial-gradient(420px_240px_at_100%_100%,rgba(34,211,238,0.08),transparent_60%)]" />
            <div className="pointer-events-none absolute -inset-px -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[radial-gradient(120px_120px_at_20%_15%,rgba(255,255,255,0.18),transparent_60%),radial-gradient(180px_140px_at_80%_85%,rgba(255,255,255,0.12),transparent_60%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="flex flex-col items-center text-center gap-3">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500/25 via-fuchsia-500/20 to-cyan-400/25 ring-1 ring-white/10">
                {serviceIcon(s.title)}
              </span>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-slate-100">{s.title}</h3>
                <p className="mt-1 text-sm md:text-base text-slate-300">{s.desc}</p>
              </div>
            </div>
            <div className="mt-2" />
          </div>
        ))}
      </div>
    </Section>
  )
}


export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth'
  }, [])
  return (
    <div className="min-h-screen aurora-bg text-slate-100">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Journey />
        <Projects />
        <Connect />
        {/* <Contact /> */}
      </main>
      <Footer />
    </div>
  )
}
