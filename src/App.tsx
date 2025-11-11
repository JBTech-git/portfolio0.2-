import { useEffect, useState } from 'react'
import resumePdf from './assets/Jayant Barman (Full Stack Devloper).pdf'
import { motion } from 'framer-motion'

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
            <span>Jayanta Barman</span>
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
            <div className="mt-1 text-2xl font-extrabold">Jayanta Barman</div>
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
              <li>Email: <a href="mailto:bjayanta584@gmail.com" className="hover:text-white underline decoration-slate-600">bjayanta584@gmail.com</a></li>
              <li>Phone: <a href="tel:+918388988586" className="hover:text-white">+91 8388988586</a></li>
            </ul>
          </div>
          <div>
            <div className="font-semibold text-slate-100">Follow Me</div>
            <div className="mt-3 flex gap-3">
              <a aria-label="GitHub" href="https://github.com/JBTech-git" target="_blank" rel="noreferrer noopener" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.48C19.138 20.194 22 16.44 22 12.017 22 6.486 17.523 2 12 2Z" clipRule="evenodd"/></svg>
              </a>
              <a aria-label="LinkedIn" href="https://www.linkedin.com/in/jayanta-barman-747298211" target="_blank" rel="noreferrer noopener" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.862-3.058-1.863 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.843-1.563 3.041 0 3.604 2.003 3.604 4.609v5.587z"/></svg>
              </a>
              <a aria-label="Email" href="mailto:bjayanta584@gmail.com" className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/5 ring-1 ring-white/10 hover:bg-white/10">
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
    <Section id="connect" className="pt-12 relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(700px_380px_at_12%_-10%,rgba(168,85,247,0.16),transparent_60%),radial-gradient(700px_380px_at_88%_-10%,rgba(34,211,238,0.14),transparent_60%)]" />
      <div className="relative max-w-4xl mx-auto">
        {/* top-centered violet/indigo glow with subtle stars */}
        <div
          className="pointer-events-none absolute inset-0 -z-0"
          style={{
            background: [
              'radial-gradient(620px 220px at 50% -8%, rgba(168,85,247,0.55), rgba(99,102,241,0.38) 48%, transparent 72%)',
              'radial-gradient(1px 1px at 35% 12%, rgba(255,255,255,0.6), transparent 50%)',
              'radial-gradient(1px 1px at 58% 6%, rgba(255,255,255,0.5), transparent 50%)',
              'radial-gradient(1px 1px at 44% 10%, rgba(255,255,255,0.4), transparent 50%)',
              'radial-gradient(1px 1px at 65% 14%, rgba(255,255,255,0.45), transparent 50%)',
            ].join(', '),
          }}
        />
        {/* outside-border halo */}
        <div
          className="pointer-events-none absolute -inset-10 z-10 rounded-[40px] blur-3xl opacity-95"
          style={{
            background: [
              'radial-gradient(680px 340px at 50% -12%, rgba(255,255,255,0.28), transparent 72%)',
              'radial-gradient(600px 300px at 50% -10%, rgba(168,85,247,0.30), rgba(99,102,241,0.24) 45%, transparent 78%)',
              'radial-gradient(500px 280px at -10% 18%, rgba(34,211,238,0.22), transparent 70%)',
              'radial-gradient(500px 280px at 110% 18%, rgba(236,72,153,0.20), transparent 70%)',
              'radial-gradient(520px 320px at 0% 110%, rgba(255,255,255,0.12), transparent 75%)',
              'radial-gradient(520px 320px at 100% 110%, rgba(255,255,255,0.12), transparent 75%)',
            ].join(', '),
          }}
        />
        {/* gradient border wrapper */}
        <div className="relative z-20 overflow-hidden rounded-[24px] p-[1.5px] bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,255,255,0.65),rgba(34,211,238,0.55),rgba(236,72,153,0.5),rgba(255,255,255,0.65))] shadow-[0_20px_80px_-28px_rgba(2,6,23,0.75)]">
          {/* glass inner card */}
          <div className="rounded-[22px] border border-white/10 bg-slate-950/60 ring-1 ring-white/10 backdrop-blur-md p-8 md:p-12 relative overflow-hidden">
            <div className="text-center max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-[11px] text-slate-200">
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-cyan-300" />
                Get in Touch
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-extrabold text-slate-100">Let’s Connect</h2>
              <p className="mt-3 text-slate-300">Interested in working together? I’m available for freelance projects and full‑time roles. Let’s chat about how I can help your product ship faster with great UX.</p>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-5 text-slate-300 text-sm md:text-base">
                <div className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 7 9-7" />
                  </svg>
                  <span>bjayanta584@gmail.com</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10z" />
                    <circle cx="12" cy="11" r="2.5" />
                  </svg>
                  <span>Kolkata, West Bengal, IN</span>
                </div>
              </div>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <a href="#contact" className="inline-flex h-10 min-w-[170px] items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-5 text-base font-semibold text-white !text-white hover:!text-white focus:!text-white active:!text-white visited:!text-white ring-1 ring-white/10 hover:bg-white/15">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="3" y="5" width="18" height="16" rx="2" />
                    <path d="M3 9h18" />
                    <circle cx="7" cy="7" r="1" fill="currentColor" stroke="none" />
                    <circle cx="11" cy="7" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  Schedule a call
                </a>
                <a href="mailto:bjayanta584@gmail.com?subject=Hello%20Jayanta%20-%20Hiring%20inquiry&body=Hello%20Jayanta,%0D%0A%0D%0AWe%20would%20like%20to%20explore%20hiring%20you%20for%20our%20team%2Fcompany.%20Please%20let%20me%20know%20a%20convenient%20time%20to%20connect.%20I%20can%20share%20scope,%20timeline,%20and%20budget%20details.%0D%0A%0D%0ABest%20regards,%0D%0A[Your%20Name]%0D%0A[Company]%0D%0A[Phone]" className="inline-flex h-10 min-w-[170px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 text-white !text-white hover:!text-white focus:!text-white active:!text-white visited:!text-white px-5 text-base font-semibold shadow-[inset_0_-3px_0_rgba(0,0,0,0.15)] hover:from-indigo-600 hover:via-fuchsia-600 hover:to-cyan-500">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
                    <path d="M2 6.5A2.5 2.5 0 0 1 4.5 4h15A2.5 2.5 0 0 1 22 6.5v11A2.5 2.5 0 0 1 19.5 20h-15A2.5 2.5 0 0 1 2 17.5v-11Zm2.2-.5 7.06 5.292a1 1 0 0 0 1.24 0L19.56 6H4.2Z"/>
                  </svg>
                  Send email
                </a>
              </div>
              <div className="mt-8 flex justify-center gap-4">
                <a href="https://github.com/JBTech-git" target="_blank" rel="noreferrer noopener" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white !text-white hover:!text-white focus:!text-white active:!text-white visited:!text-white ring-1 ring-white/10 hover:bg-white/15">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.48C19.138 20.194 22 16.44 22 12.017 22 6.486 17.523 2 12 2Z" clipRule="evenodd"/></svg>
                </a>
                <a href="https://www.linkedin.com/in/jayanta-barman-747298211" target="_blank" rel="noreferrer noopener" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white !text-white hover:!text-white focus:!text-white active:!text-white visited:!text-white ring-1 ring-white/10 hover:bg-white/15">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.862-3.058-1.863 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881v1.367h.041c.401-.761 1.381-1.563 2.843-1.563 3.041 0 3.604 2.003 3.604 4.609v5.587z"/></svg>
                </a>
                <a href="https://wa.me/918388988586" target="_blank" rel="noreferrer noopener" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white !text-white hover:!text-white focus:!text-white active:!text-white visited:!text-white ring-1 ring-white/10 hover:bg-white/15" title="WhatsApp">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                    <path d="M20.52 3.484A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.095.547 4.142 1.588 5.945L0 24l6.305-1.654a11.86 11.86 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 00-3.465-8.417zM12.05 22.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.257c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.114 1.03 6.971 2.888a9.825 9.825 0 012.913 6.994c-.003 5.45-4.437 9.884-9.888 9.884z"/>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.672-1.611-.922-2.21-.242-.579-.487-.5-.672-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
                  </svg>
                </a>
              </div>
            </div>
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
      desc: 'Foundation in programming, data structures, DBMS, and web fundamentals.',
      badge: 'Education',
      dates: 'Aug 2018 – Aug 2021',
      location: 'Raiganj, India'
    },
    {
      org: 'Brainware University',
      role: 'Master of Computer Applications (MCA)',
      desc: 'Advanced CS curriculum with emphasis on software engineering and modern stacks.',
      badge: 'Education',
      dates: 'Aug 2021 – Aug 2023',
      location: 'Kolkata, India'
    },
    {
      org: 'Leelija Web Solution Pvt Ltd',
      role: 'Web Developer (Intern)',
      desc: 'Hands-on exposure to real projects, UI work, and collaborative delivery.',
      badge: 'Professional',
      dates: 'Oct 2023 – Mar 2024',
      location: 'Kolkata, India'
    },
    {
      org: 'Leelija Web Solution Pvt Ltd',
      role: 'Full Stack Developer',
      desc: 'Building scalable features end-to-end across frontend and backend.',
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
          <motion.button
            type="button"
            aria-label="Previous"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white backdrop-blur-md ring-1 ring-white/10 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 transition-all"
            onClick={() => document.getElementById('journey-scroller')?.scrollBy({ left: 380, behavior: 'smooth' })}
            whileTap={{ scale: 0.9 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 transition-transform duration-200 group-hover:-translate-x-0.5"><path d="M15 6l-6 6 6 6"/></svg>
          </motion.button>
          <motion.button
            type="button"
            aria-label="Next"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 text-white backdrop-blur-md ring-1 ring-white/10 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30 hover:shadow-[0_0_18px_rgba(56,189,248,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50 transition-all"
            onClick={() => document.getElementById('journey-scroller')?.scrollBy({ left: -380, behavior: 'smooth' })}
            whileTap={{ scale: 0.9 }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5"><path d="M9 6l6 6-6 6"/></svg>
          </motion.button>
        </div>

        <div id="journey-scroller" className="relative z-10 flex flex-row-reverse gap-6 overflow-x-auto pb-4 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none]" style={{scrollBehavior:'smooth'}}>
          {items.map((it, idx) => (
            <motion.article
              key={idx}
              className="snap-center shrink-0 w-[320px] md:w-[360px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: idx * 0.06 }}
            >
              <div className={`rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-5 shadow-[0_10px_40px_-20px_rgba(2,6,23,0.5)] ring-1 ring-white/10 h-full min-h-[240px] flex flex-col`}>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-300">{it.org}</div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full text-xs px-2.5 py-0.5 ${String(it.badge).toLowerCase().includes('current')
                      ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-400/20 text-emerald-200 ring-1 ring-emerald-400/40 shadow-[0_0_18px_rgba(16,185,129,0.35)]'
                      : 'bg-white/10 text-slate-200'}`}
                    tabIndex={String(it.badge).toLowerCase().includes('current') ? 0 : -1}
                    aria-label={String(it.badge).toLowerCase().includes('current') ? 'Current role' : undefined}
                    role={String(it.badge).toLowerCase().includes('current') ? 'status' : undefined}
                  >
                    {String(it.badge).toLowerCase().includes('current') && (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-300 animate-pulse" aria-hidden />
                    )}
                    {it.badge}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-semibold text-slate-100">{it.role}</h3>
                <p className="mt-2 text-sm text-slate-300">{it.desc}</p>
                <div className="mt-auto pt-3 flex items-center justify-between text-xs text-slate-400">
                  <span>📅 {it.dates}</span>
                  <span>📍 {it.location}</span>
                </div>
              </div>
            </motion.article>
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
      <motion.div
        className="container mx-auto px-4"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
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
          <motion.a
            href={resumePdf}
            download="Jayanta_Barman_Resume.pdf"
            aria-label="Download Jayanta Barman resume (PDF)"
            title="Download Resume (PDF)"
            className="inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-lg text-white bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-400 hover:from-violet-700 hover:via-fuchsia-600 hover:to-cyan-500 active:translate-y-[1px] ring-1 ring-violet-400/30 hover:ring-violet-400/50 transition-all shadow-lg hover:shadow-violet-500/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-white">Download Resume</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6 text-white"><path d="M12 3a1 1 0 0 1 1 1v9.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4A1 1 0 1 1 8.293 11.293L10.586 13.586V4a1 1 0 0 1 1-1ZM5 20a1 1 0 0 1 0-2h14a1 1 0 1 1 0 2H5Z"/></svg>
          </motion.a>
        </div>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-slate-400 pb-20">
          <span className="text-lg font-bold">Find me on</span>
          <div className="flex items-center gap-2">
            <a aria-label="GitHub" href="https://github.com/JBTech-git" target="_blank" rel="noreferrer noopener" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.486 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.158-1.11-1.468-1.11-1.468-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.833.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.56 9.56 0 0 1 2.504.337c1.909-1.296 2.748-1.026 2.748-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.31.678.92.678 1.855 0 1.339-.012 2.419-.012 2.747 0 .268.18.579.688.48C19.138 20.194 22 16.44 22 12.017 22 6.486 17.523 2 12 2Z" clipRule="evenodd"/></svg>
            </a>
            <a aria-label="LinkedIn" href="https://www.linkedin.com/in/jayanta-barman-747298211" target="_blank" rel="noreferrer noopener" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 11.268h-3v-5.604c0-1.337-.026-3.058-1.862-3.058-1.863 0-2.149 1.454-2.149 2.957v5.705h-3v-10h2.881 v1.367h.041c.401-.761 1.381-1.563 2.843-1.563 3.041 0 3.604 2.003 3.604 4.609v5.587z"/></svg>
            </a>
            <a aria-label="WhatsApp" href="https://wa.me/918388988586" target="_blank" rel="noreferrer noopener" className="group inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-violet-500/20 to-cyan-400/20 shadow-sm hover:from-violet-500/30 hover:to-cyan-400/30">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-white" aria-hidden="true">
                <path d="M20.52 3.484A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.095.547 4.142 1.588 5.945L0 24l6.305-1.654a11.86 11.86 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.892-11.893a11.82 11.82 0 00-3.465-8.417zM12.05 22.785h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.257c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.114 1.03 6.971 2.888a9.825 9.825 0 012.913 6.994c-.003 5.45-4.437 9.884-9.888 9.884z"/>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.768.966-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.672-1.611-.922-2.21-.242-.579-.487-.5-.672-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347z"/>
              </svg>
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
  const [open, setOpen] = useState<null | { title: string; desc: string; link: string; tags: string[] }>(null)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    if (open) {
      document.addEventListener('keydown', onKey)
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.removeEventListener('keydown', onKey)
        document.body.style.overflow = prev
      }
    }
  }, [open])
  return (
    <Section id="projects" className="relative">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(520px_320px_at_15%_0%,rgba(168,85,247,0.14),transparent_60%),radial-gradient(520px_320px_at_85%_-5%,rgba(34,211,238,0.12),transparent_60%)]" />
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">Projects</h2>
        <p className="mt-2 text-slate-300">Selected work demonstrating product thinking and craft.</p>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setOpen(p)}
            className="cursor-pointer text-left group relative overflow-hidden rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-4 ring-1 ring-white/10 shadow-[0_12px_40px_-22px_rgba(2,6,23,0.6)] transition-all hover:translate-y-[-2px] hover:ring-white/20 focus:outline-none focus:ring-2 focus:ring-cyan-300/50"
            style={{
              animationDelay: `${i * 80}ms`,
              background:
                'linear-gradient(180deg, rgba(17,24,39,0.85) 0%, rgba(15,23,42,0.85) 100%), radial-gradient(150% 130% at 50% -30%, rgba(255,255,255,0.22), transparent 58%), radial-gradient(130% 110% at 50% -20%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(120% 110% at 50% 120%, rgba(34,211,238,0.18), transparent 65%)',
              boxShadow:
                'inset 0 0 0 1px rgba(255,255,255,0.14), 0 0 28px 6px rgba(255,255,255,0.10), 0 0 36px 6px rgba(99,102,241,0.18)',
            }}
          >
            <div className="relative mb-4 h-40 overflow-hidden rounded-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-fuchsia-500/20 to-cyan-400/20" />
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(240px_160px_at_20%_20%,rgba(255,255,255,0.22),transparent_60%),radial-gradient(280px_200px_at_80%_80%,rgba(255,255,255,0.16),transparent_60%)]" />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
            <div className="flex items-start justify-between gap-4">
              <h3 className="text-lg md:text-xl font-semibold text-slate-100">{p.title}</h3>
              <span className="rounded-full border border-white/10 bg-white/10 px-2 py-0.5 text-[10px] text-slate-200">Case Study</span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{p.desc}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs">
              {p.tags.map(t => (
                <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200">{t}</span>
              ))}
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          aria-modal="true"
          role="dialog"
          aria-labelledby="project-modal-title"
          onClick={(e) => { if (e.target === e.currentTarget) setOpen(null) }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div className="relative z-[61] w-full max-w-2xl overflow-hidden rounded-2xl border border-white/10 bg-white/10 ring-1 ring-white/10 shadow-[0_30px_120px_-20px_rgba(2,6,23,0.8)]">
            <div className="relative h-48 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/20 to-cyan-400/25" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            <div className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 id="project-modal-title" className="text-xl font-semibold text-slate-100">{open.title}</h3>
                  <p className="mt-1 text-sm text-slate-300">{open.desc}</p>
                </div>
                <button onClick={() => setOpen(null)} aria-label="Close" className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/10 text-slate-200 hover:bg-white/15">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M6 6l12 12M18 6L6 18"/></svg>
                </button>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {open.tags?.map(t => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-200">{t}</span>
                ))}
              </div>

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={open.link}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-sm font-medium text-slate-100 ring-1 ring-white/10 hover:bg-white/15"
                >
                  <img src="https://cdn.simpleicons.org/github/ffffff" alt="GitHub" className="h-5 w-5" />
                  View project
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
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
            {/* Use BASE_URL so it works with non-root deployments */}
            <img src={`${import.meta.env.BASE_URL}profile-pic.png`} alt="Profile" className="h-[360px] w-[280px] object-cover md:h-[420px] md:w-[320px]" onError={(e:any)=>{e.currentTarget.style.display='none'}} />
            {/* <div className="h-[360px] w-[280px] md:h-[420px] md:w-[320px] flex items-center justify-center text-slate-400" aria-hidden>Upload profile-pic.png</div> */}
          </div>
        </div>
        <div>
          <p className="text-slate-300 leading-relaxed">
            Over the last <span className="font-semibold text-white">2+ years</span>, I’ve been working as a Full Stack Developer, building and maintaining projects that balance performance, scalability, and intuitive user experience. I focus on creating products that feel seamless yet deliver a strong impact — whether it’s a complex web application or a responsive client-facing platform.
          </p>
          <p className="mt-4 text-slate-300 leading-relaxed">
            Beyond coding, I enjoy collaborating with cross-functional teams, brainstorming new product ideas, and refining small details that elevate a good experience into a great one. My approach revolves around writing clean, maintainable, and efficient code that ensures long-term stability and growth for every project I work on.          
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
          { k: 'Happy Clients', v: '1+' },
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
    'React',
    'JavaScript',
    'Tailwind CSS & Styled Components',
    'Redux & Context API',
    'Responsive Design',
    'Framer Motion & GSAP',
    'HTML5 & CSS3',
    'UI/UX Implementation',
  ]
  const backendList = [
    'Python & Django',
    'Node.js & Express',
    'REST APIs',
    'SQL & MongoDB',
    'Authentication & Authorization',
    'Caching & Queues (Redis)',
    'Testing',
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
      ? { badge: 'APIs & Services', title: 'Backend Development', desc: 'I design and build robust, scalable backend services and APIs with strong focus on security, reliability, and observability.', list: backendList, image: '/backend1.jpg', placeholder: 'Upload backend.jpg' }
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
                src={`${import.meta.env.BASE_URL}${selected.image.replace(/^\//,'')}`}
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
    { title: 'Backend APIs', desc: 'Designing REST/SQL services with best practices.', tags: ['Node', 'Express', 'SQL'] },
    { title: 'UI Engineering', desc: 'Implementing pixel‑perfect, scalable design systems.', tags: ['Design Systems', 'Tailwind', 'A11y'] },
    { title: 'Performance Tuning', desc: 'Auditing and optimizing Core Web Vitals.', tags: ['Lighthouse', 'CWV', 'Caching'] },
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
      {/* Centered nebula glow */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[560px] w-[960px] rounded-full blur-2xl"
          style={{
            background:
              'radial-gradient(700px 440px at center, rgba(168,85,247,0.28) 0%, rgba(99,102,241,0.24) 40%, rgba(34,211,238,0.18) 70%, transparent 78%)',
            opacity: 0.9,
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-60">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 h-[520px] w-[820px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_60%)]" />
        <div className="absolute -bottom-24 left-10 h-[420px] w-[420px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.16),transparent_60%)]" />
        <div className="absolute -bottom-16 right-10 h-[380px] w-[380px] rounded-full blur-3xl bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.16),transparent_60%)]" />
      </div>
      <div className="text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-100">Services</h2>
        <p className="mt-2 text-slate-300 max-w-2xl mx-auto text-sm md:text-base">How I can help your team ship great products.</p>
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-stretch relative z-10">
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
