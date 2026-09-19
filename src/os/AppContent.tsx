import { useMemo, useState } from 'react'
import resumePdf from '../assets/Jayant Barman (Full Stack Devloper).pdf'
import { profile, formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'
import { experience } from '../data/experience'
import { projects, type Project } from '../data/projects'
import { architectureNodes } from '../data/skills'
import { SkillsGitLive } from './SkillsGitLive'
import type { AppId } from './types'

const CODE_FILES: Record<string, string> = {
  'customer.py': `class Customer(models.Model):\n    name = models.CharField(max_length=120)\n    email = models.EmailField(unique=True)\n\n    def __str__(self):\n        return self.name`,
  'views.py': `@api_view(["GET"])\ndef health(_request):\n    return Response({"status": "ok", "service": "portfolio-demo"})`,
  'queries.sql': `SELECT id, email, created_at\nFROM customers\nWHERE is_active = true\nORDER BY created_at DESC\nLIMIT 50;`,
  'Dockerfile': `FROM python:3.12-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["gunicorn", "config.wsgi:application"]`,
}

function ProjectDetail({ project: active }: { project: Project }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-bold text-white">{active.title}</h3>
      <p className="text-sm text-slate-300">{active.desc}</p>
      {active.status === 'placeholder' && (
        <p className="text-xs text-amber-200/80">[ADD PROJECT LINK] · [ADD CASE STUDY DETAILS]</p>
      )}
      <div className="flex flex-wrap gap-2">
        {active.tags.map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px]">
            {t}
          </span>
        ))}
      </div>
      {active.architecture && (
        <div>
          <div className="text-xs font-semibold uppercase tracking-wide text-slate-400">Architecture</div>
          <pre className="mt-1 font-mono text-xs text-cyan-200/90">{active.architecture.join('\n ↓\n')}</pre>
        </div>
      )}
      {active.features && (
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          {active.features.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-wrap gap-2">
        <a
          href={active.github && active.github !== '#' ? active.github : profile.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-medium hover:bg-white/15"
        >
          GitHub
        </a>
        {active.demo ? (
          <a
            href={active.demo}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-cyan-500/80 px-3 py-1.5 text-xs font-semibold text-slate-950"
          >
            Live Demo
          </a>
        ) : (
          <span className="rounded-full border border-dashed border-white/20 px-3 py-1.5 text-xs text-slate-500">
            [ADD LIVE DEMO]
          </span>
        )}
      </div>
    </div>
  )
}

export function AppContent({ appId, onOpen }: { appId: AppId; onOpen: (id: AppId) => void }) {
  const exp = useMemo(() => getExperienceDuration(), [])
  const [archNode, setArchNode] = useState<(typeof architectureNodes)[number] | null>(architectureNodes[0])
  const [codeFile, setCodeFile] = useState('customer.py')
  const [projectId, setProjectId] = useState(projects[0]?.id)
  const [mobileExpandedId, setMobileExpandedId] = useState<string | null>(projects[0]?.id ?? null)

  if (appId === 'about') {
    return (
      <div className="space-y-4 text-sm">
        <pre className="overflow-auto rounded-lg border border-white/10 bg-black/50 p-3 font-mono text-[12px] text-cyan-200/90">{`USER PROFILE

Name:        ${profile.name}
Role:        ${profile.role}
Primary Focus: ${profile.focus}
Experience:  ${formatExperienceLabel(exp)} (${formatYearsStat(exp)})
Location:    ${profile.location}

Primary Stack:
${profile.primaryStack.map((s) => `  - ${s}`).join('\n')}

Infrastructure:
  - Docker, Linux, Git, CI/CD

Currently Exploring:
${profile.exploring.map((s) => `  - ${s}`).join('\n')}`}</pre>
        <div className="space-y-2 text-slate-300">
          {profile.humanAbout.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    )
  }

  if (appId === 'experience') {
    return (
      <div className="space-y-3">
        <p className="text-xs text-slate-400">Career / education system log (newest first)</p>
        <div className="relative space-y-0 border-l border-cyan-400/30 pl-4">
          {[...experience].reverse().map((e) => (
            <div key={e.id} className="relative pb-5">
              <span className="absolute -left-[21px] top-1 h-2.5 w-2.5 rounded-full bg-cyan-400 ring-4 ring-[#0c1220]" />
              <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="font-semibold text-white">{e.role}</div>
                  <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-slate-300">{e.badge}</span>
                </div>
                <div className="mt-1 text-sm text-cyan-200/80">{e.org}</div>
                <p className="mt-2 text-sm text-slate-300">{e.desc}</p>
                <div className="mt-2 text-xs text-slate-500">
                  {e.dates} · {e.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (appId === 'projects') {
    const active = projects.find((p) => p.id === projectId) ?? projects[0]

    return (
      <>
        {/* Mobile accordion — top project expanded by default */}
        <div className="space-y-2 md:hidden">
          {projects.map((p) => {
            const open = mobileExpandedId === p.id
            return (
              <div
                key={p.id}
                className={`overflow-hidden rounded-xl border ${
                  open ? 'border-cyan-400/40 bg-cyan-500/5' : 'border-white/10 bg-white/5'
                }`}
              >
                <button
                  type="button"
                  onClick={() =>
                    setMobileExpandedId((id) => (id === p.id ? null : p.id))
                  }
                  className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left"
                  aria-expanded={open}
                >
                  <span className={`text-sm font-medium ${open ? 'text-white' : 'text-slate-300'}`}>
                    {p.title}
                  </span>
                  <span
                    className={`shrink-0 text-xs text-cyan-300/80 transition-transform ${
                      open ? 'rotate-180' : ''
                    }`}
                    aria-hidden
                  >
                    ▾
                  </span>
                </button>
                {open ? (
                  <div className="border-t border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-4">
                    <ProjectDetail project={p} />
                  </div>
                ) : null}
              </div>
            )
          })}
        </div>

        {/* Desktop: list + detail panel */}
        <div className="hidden gap-4 md:grid md:grid-cols-[200px_1fr]">
          <div className="space-y-2">
            {projects.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => setProjectId(p.id)}
                className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                  active.id === p.id
                    ? 'border-cyan-400/40 bg-cyan-500/10 text-white'
                    : 'border-white/10 bg-white/5 text-slate-300'
                }`}
              >
                {p.title}
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-white/15 bg-gradient-to-br from-slate-900/80 to-slate-950/90 p-4 shadow-[0_0_40px_-16px_rgba(34,211,238,0.35)]">
            <ProjectDetail project={active} />
          </div>
        </div>
      </>
    )
  }

  if (appId === 'skills') {
    return (
      <div className="flex min-h-0 flex-1 flex-col md:h-full">
        <SkillsGitLive />
      </div>
    )
  }

  if (appId === 'architecture') {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          {architectureNodes.map((n, i) => (
            <button
              key={n.id}
              type="button"
              onClick={() => setArchNode(n)}
              className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm ${
                archNode?.id === n.id ? 'border-cyan-400/40 bg-cyan-500/10' : 'border-white/10 bg-white/5'
              }`}
            >
              <span className="font-mono text-xs text-slate-500">{i + 1}</span>
              <span>{n.label}</span>
              {i < architectureNodes.length - 1 ? <span className="ml-auto text-xs text-slate-600">↓</span> : null}
            </button>
          ))}
        </div>
        <div className="rounded-xl border border-white/10 bg-black/40 p-4">
          <h3 className="text-lg font-semibold text-white">{archNode?.label}</h3>
          <p className="mt-2 text-sm text-slate-300">{archNode?.detail}</p>
          <p className="mt-4 text-xs text-slate-500">Demo visualization — not live production metrics.</p>
        </div>
      </div>
    )
  }

  if (appId === 'monitor') {
    return (
      <div className="space-y-3 font-mono text-sm">
        <p className="text-xs text-amber-200/90">Portfolio simulation only — not real production metrics.</p>
        <pre className="rounded-lg border border-white/10 bg-black/50 p-3 text-cyan-200/90">{`SYSTEM STATUS (DEMO)

CPU        34%
MEMORY     61%
DATABASE   CONNECTED
REDIS      ONLINE
DOCKER     RUNNING
API        HEALTHY

UPTIME     127d 13h 24m
REQUESTS   1,245,823`}</pre>
      </div>
    )
  }

  if (appId === 'codelab') {
    return (
      <div className="grid gap-3 md:grid-cols-[160px_1fr]">
        <div className="space-y-1">
          {Object.keys(CODE_FILES).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setCodeFile(f)}
              className={`w-full rounded px-2 py-1.5 text-left font-mono text-xs ${
                codeFile === f ? 'bg-cyan-500/20 text-cyan-100' : 'text-slate-400 hover:bg-white/5'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
        <pre className="overflow-auto rounded-lg border border-white/10 bg-black/60 p-3 font-mono text-[12px] text-emerald-200/90">
          {CODE_FILES[codeFile]}
        </pre>
      </div>
    )
  }

  if (appId === 'resume') {
    return (
      <div className="space-y-4 text-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-lg font-bold text-white">{profile.name}</h3>
          <a
            href={resumePdf}
            download="Jayanta_Barman_Resume.pdf"
            className="no-link-tint rounded-full border border-[#16C60C]/40 bg-[#0A0A0A] px-4 py-2 text-xs font-semibold text-[#16C60C] hover:border-[#16C60C] hover:bg-[#121212] hover:text-[#3FF23F]"
          >
            Download PDF
          </a>
        </div>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Profile</h4>
          <p className="mt-1 text-slate-300">{profile.summary}</p>
        </section>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Experience</h4>
          <ul className="mt-1 space-y-2">
            {experience
              .filter((e) => e.type === 'work')
              .map((e) => (
                <li key={e.id}>
                  <div className="font-medium text-white">{e.role}</div>
                  <div className="text-xs text-slate-400">
                    {e.org} · {e.dates}
                  </div>
                </li>
              ))}
          </ul>
        </section>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Skills</h4>
          <p className="mt-1 text-slate-300">{profile.primaryStack.join(' · ')}</p>
        </section>
        <section>
          <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500">Education</h4>
          <ul className="mt-1 space-y-1 text-slate-300">
            {experience
              .filter((e) => e.type === 'education')
              .map((e) => (
                <li key={e.id}>
                  {e.role} — {e.org}
                </li>
              ))}
          </ul>
        </section>
      </div>
    )
  }

  if (appId === 'contact') {
    return (
      <div className="space-y-4 text-sm">
        <p className="text-slate-300">Communication terminal — use real channels below.</p>
        <div className="grid gap-2">
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" href={`mailto:${profile.email}`}>
            Email · {profile.email}
          </a>
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" href={`tel:${profile.phoneTel}`}>
            Phone · {profile.phone}
          </a>
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/10" href={profile.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
        <button type="button" onClick={() => onOpen('resume')} className="text-xs text-cyan-300 underline">
          Open Resume app
        </button>
      </div>
    )
  }

  if (appId === 'files') {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(
          [
            ['projects', 'projects/'],
            ['experience', 'experience.log'],
            ['skills', 'skills.json'],
            ['resume', 'resume.pdf'],
            ['about', 'README.md'],
            ['contact', 'contact.md'],
          ] as const
        ).map(([id, name]) => (
          <button
            key={id}
            type="button"
            onClick={() => onOpen(id)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-4 text-left hover:bg-white/10"
          >
            <div className="text-2xl" aria-hidden>
              {id === 'projects' ? '📁' : '📄'}
            </div>
            <div className="mt-2 font-mono text-xs text-slate-300">{name}</div>
          </button>
        ))}
      </div>
    )
  }

  return <p className="text-sm text-slate-400">Unknown application.</p>
}
