import resumePdf from '../assets/Jayant Barman (Full Stack Devloper).pdf'
import { profile, formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'
import { experience } from '../data/experience'
import { projects } from '../data/projects'

export function RecruiterMode({ onExplore, onClassic }: { onExplore: () => void; onClassic: () => void }) {
  const exp = getExperienceDuration()
  return (
    <div className="min-h-screen bg-[#0A0A0A] px-4 py-10 text-[#CCCCCC]">
      <div className="mx-auto max-w-2xl space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#16C60C]">Recruiter Mode</p>
            <h1 className="mt-1 text-3xl font-bold text-[#F2F2F2]">{profile.name}</h1>
            <p className="text-[#767676]">{profile.role}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={onExplore} className="rounded-full border border-[#16C60C]/30 px-3 py-1.5 text-xs hover:bg-[#1C2E26]">
              Full portfolio
            </button>
            <button type="button" onClick={onClassic} className="rounded-full border border-[#16C60C]/20 px-3 py-1.5 text-xs text-[#767676] hover:bg-[#1C2E26]">
              Simple website
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-3xl font-extrabold text-white">{formatYearsStat(exp)}</div>
            <div className="text-xs text-slate-400">Years Experience</div>
            <div className="mt-1 text-[11px] text-slate-500">{formatExperienceLabel(exp)}</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-3xl font-extrabold">{profile.stats.projectsDelivered}</div>
            <div className="text-xs text-slate-400">Projects Delivered</div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
            <div className="text-3xl font-extrabold">{profile.stats.happyClients}</div>
            <div className="text-xs text-slate-400">Happy Clients</div>
          </div>
        </div>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Primary Skills</h2>
          <p className="mt-2 text-slate-200">{profile.primaryStack.join(' · ')}</p>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Key Experience</h2>
          <ul className="mt-2 space-y-2">
            {experience
              .filter((e) => e.type === 'work')
              .map((e) => (
                <li key={e.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                  <div className="font-medium">{e.role}</div>
                  <div className="text-xs text-slate-400">
                    {e.org} · {e.dates}
                  </div>
                </li>
              ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Key Projects</h2>
          <ul className="mt-2 space-y-2">
            {projects.map((p) => (
              <li key={p.id} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <div className="font-medium">{p.title}</div>
                <div className="text-xs text-slate-400">{p.tags.join(' · ')}</div>
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-wrap gap-3">
          <a href={resumePdf} download="Jayanta_Barman_Resume.pdf" className="no-link-tint rounded-full border border-[#16C60C]/40 bg-[#0A0A0A] px-5 py-2.5 text-sm font-semibold text-[#16C60C] hover:border-[#16C60C] hover:bg-[#121212] hover:text-[#3FF23F]">
            Download Resume
          </a>
          <a href={`mailto:${profile.email}`} className="rounded-full border border-white/15 px-5 py-2.5 text-sm">
            Email
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-5 py-2.5 text-sm">
            LinkedIn
          </a>
        </section>
      </div>
    </div>
  )
}
