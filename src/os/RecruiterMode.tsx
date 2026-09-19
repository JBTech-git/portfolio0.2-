import resumePdf from '../assets/Jayant Barman (Full Stack Devloper).pdf'
import { profile, formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'
import { experience } from '../data/experience'
import { projects } from '../data/projects'
import type { AppId } from './types'

type HiringSection = Extract<AppId, 'skills' | 'experience' | 'projects'>

export function RecruiterMode({
  onExplore,
  onOpenSection,
}: {
  onExplore: () => void
  onOpenSection: (id: HiringSection) => void
}) {
  const exp = getExperienceDuration()
  const years = formatYearsStat(exp)
  const work = experience.filter((e) => e.type === 'work')
  const education = experience.filter((e) => e.type === 'education')

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#CCCCCC]">
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(22,198,12,0.35) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,198,12,0.35) 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />

      <div className="relative mx-auto max-w-3xl px-4 py-8 sm:py-12">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-[#16C60C]/20 pb-4">
          <div className="font-mono text-[11px] text-[#16C60C]">
            <span className="text-[#767676]">{profile.hostname}</span>
            <span className="text-[#767676]">:~$</span> hiring --brief
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={onExplore}
              className="rounded-lg bg-[#16C60C] px-3 py-1.5 text-xs font-semibold text-[#0A0A0A] hover:bg-[#3FF23F]"
            >
              Full portfolio
            </button>
          </div>
        </header>

        <section className="mb-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-[#13A10E]">
            Hiring briefing · JAYANTA PORTFOLIO
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-[#F2F2F2] sm:text-4xl">
            {profile.name}
          </h1>
          <p className="mt-2 text-sm text-[#CCCCCC] sm:text-base">
            {profile.role}
            <span className="text-[#767676]"> · </span>
            <span className="text-[#767676]">{years}+ yrs</span>
            <span className="text-[#767676]"> · </span>
            <span className="text-[#767676]">{profile.focus}</span>
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#767676]">{profile.summary}</p>
        </section>

        <section className="mb-10 grid grid-cols-3 gap-px overflow-hidden rounded-xl border border-[#16C60C]/25 bg-[#16C60C]/20">
          {[
            { value: years, label: 'Years', sub: formatExperienceLabel(exp) },
            { value: profile.stats.projectsDelivered, label: 'Projects', sub: 'Delivered' },
            { value: profile.stats.happyClients, label: 'Clients', sub: 'Happy' },
          ].map((s) => (
            <div key={s.label} className="bg-[#0C0C0C] px-3 py-4 text-center sm:px-4">
              <div className="text-2xl font-extrabold text-[#3FF23F] sm:text-3xl">{s.value}</div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#16C60C]">
                {s.label}
              </div>
              <div className="mt-0.5 text-[10px] text-[#767676]">{s.sub}</div>
            </div>
          ))}
        </section>

        {/* Primary stack → Skills */}
        <section className="mb-10">
          <button
            type="button"
            onClick={() => onOpenSection('skills')}
            className="group flex w-full items-center justify-between gap-2 text-left"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#13A10E] group-hover:text-[#3FF23F]">
              Primary stack
            </h2>
            <span className="font-mono text-[10px] text-[#16C60C]/60 group-hover:text-[#16C60C]">
              open Skills →
            </span>
          </button>
          <div className="mt-3 flex flex-wrap gap-2">
            {profile.primaryStack.map((tech) => (
              <button
                key={tech}
                type="button"
                onClick={() => onOpenSection('skills')}
                className="rounded-md border border-[#16C60C]/25 bg-[#1C2E26]/80 px-2.5 py-1 font-mono text-[11px] text-[#16C60C] transition hover:border-[#16C60C]/55 hover:bg-[#1C2E26] hover:text-[#3FF23F]"
              >
                {tech}
              </button>
            ))}
          </div>
        </section>

        {/* Key experience → Experience */}
        <section className="mb-10">
          <button
            type="button"
            onClick={() => onOpenSection('experience')}
            className="group flex w-full items-center justify-between gap-2 text-left"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#13A10E] group-hover:text-[#3FF23F]">
              Key experience
            </h2>
            <span className="font-mono text-[10px] text-[#16C60C]/60 group-hover:text-[#16C60C]">
              open Experience →
            </span>
          </button>
          <ul className="mt-3 divide-y divide-[#16C60C]/15 border-y border-[#16C60C]/15">
            {work.map((e) => (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => onOpenSection('experience')}
                  className="flex w-full flex-wrap items-baseline justify-between gap-2 py-3 text-left transition hover:bg-[#1C2E26]/30"
                >
                  <div>
                    <div className="font-medium text-[#F2F2F2]">{e.role}</div>
                    <div className="text-xs text-[#767676]">{e.org}</div>
                  </div>
                  <div className="font-mono text-[11px] text-[#16C60C]/80">{e.dates}</div>
                </button>
              </li>
            ))}
          </ul>
          {education.length > 0 ? (
            <button
              type="button"
              onClick={() => onOpenSection('experience')}
              className="mt-4 w-full text-left transition hover:opacity-90"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-wider text-[#767676]">Education</h3>
              <ul className="mt-2 space-y-1 text-sm text-[#CCCCCC]">
                {education.map((e) => (
                  <li key={e.id}>
                    {e.role} — <span className="text-[#767676]">{e.org}</span>
                  </li>
                ))}
              </ul>
            </button>
          ) : null}
        </section>

        {/* Key projects → Projects */}
        <section className="mb-10">
          <button
            type="button"
            onClick={() => onOpenSection('projects')}
            className="group flex w-full items-center justify-between gap-2 text-left"
          >
            <h2 className="font-mono text-[11px] uppercase tracking-[0.18em] text-[#13A10E] group-hover:text-[#3FF23F]">
              Key projects
            </h2>
            <span className="font-mono text-[10px] text-[#16C60C]/60 group-hover:text-[#16C60C]">
              open Projects →
            </span>
          </button>
          <ul className="mt-3 space-y-3">
            {projects.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  onClick={() => onOpenSection('projects')}
                  className="w-full border-l-2 border-[#16C60C]/40 pl-3 text-left transition hover:border-[#16C60C] hover:bg-[#1C2E26]/25"
                >
                  <div className="font-medium text-[#F2F2F2]">{p.title}</div>
                  <p className="mt-0.5 text-xs text-[#767676]">{p.desc}</p>
                  <div className="mt-1.5 font-mono text-[10px] text-[#16C60C]/70">
                    {p.tags.join(' · ')}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap gap-2 border-t border-[#16C60C]/20 pt-6">
          <a
            href={resumePdf}
            download="Jayanta_Barman_Resume.pdf"
            className="no-link-tint inline-flex items-center rounded-lg border border-[#16C60C]/40 bg-[#0A0A0A] px-4 py-2.5 text-sm font-semibold text-[#16C60C] hover:border-[#16C60C] hover:bg-[#121212] hover:text-[#3FF23F]"
          >
            Download Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center rounded-lg border border-[#16C60C]/25 bg-[#1C2E26]/50 px-4 py-2.5 text-sm text-[#CCCCCC] hover:border-[#16C60C]/50 hover:bg-[#1C2E26]"
          >
            Email
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-[#16C60C]/25 bg-[#1C2E26]/50 px-4 py-2.5 text-sm text-[#CCCCCC] hover:border-[#16C60C]/50 hover:bg-[#1C2E26]"
          >
            LinkedIn
          </a>
          <a
            href={profile.whatsapp}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center rounded-lg border border-[#16C60C]/25 bg-[#1C2E26]/50 px-4 py-2.5 text-sm text-[#CCCCCC] hover:border-[#16C60C]/50 hover:bg-[#1C2E26]"
          >
            WhatsApp
          </a>
        </section>

        <p className="mt-8 text-center font-mono text-[10px] text-[#767676]">
          JAYANTA PORTFOLIO · recruiter briefing
        </p>
      </div>
    </div>
  )
}
