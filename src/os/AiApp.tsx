import { useMemo, useState } from 'react'
import { profile, formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillGroups } from '../data/skills'

type Msg = { role: 'user' | 'assistant'; text: string }

function answer(q: string): string {
  const s = q.toLowerCase()
  const exp = getExperienceDuration()
  const years = formatYearsStat(exp)

  if (/who is|about jayanta|who are you/.test(s)) {
    return `${profile.name} is a ${profile.role} based in ${profile.location} with ${formatExperienceLabel(exp)} of experience. Focus: ${profile.focus}. Stack: ${profile.primaryStack.join(', ')}.`
  }
  if (/technolog|stack|skills|django|react|docker|python/.test(s)) {
    return `Primary technologies: ${profile.primaryStack.join(', ')}.\n\nBackend highlights: ${skillGroups.Backend.slice(0, 5).join(', ')}.\nFrontend highlights: ${skillGroups.Frontend.slice(0, 5).join(', ')}.\nInfra: ${skillGroups.Infrastructure.join(', ')}.`
  }
  if (/project|strongest|portfolio/.test(s)) {
    return projects
      .map((p, i) => `${i + 1}. ${p.title} — ${p.desc} (${p.tags.join(', ')})${p.status === 'placeholder' ? ' [ADD PROJECT LINK]' : ''}`)
      .join('\n')
  }
  if (/experience|career|work|employ/.test(s)) {
    return experience
      .filter((e) => e.type === 'work')
      .map((e) => `${e.dates}: ${e.role} @ ${e.org} — ${e.desc}`)
      .join('\n')
  }
  if (/architect|system design|redis|postgres/.test(s)) {
    return 'Typical path Jayanta works with: Client → Nginx → Application (Django/Node) → REST API → Redis (cache/queues) → PostgreSQL. Open Architecture Lab for interactive nodes.'
  }
  if (/interview|hire|why should/.test(s)) {
    return `Jayanta brings ${years} years of hands-on full-stack delivery, real production work at Leelija Web Solution, and a product mindset (UX + maintainable code). Explore Terminal (sudo hire jayanta), Projects Lab, and Resume for evidence—not hype.`
  }
  if (/resume|cv/.test(s)) {
    return 'Open the Resume app for a structured view or Download PDF. Visitors can also create/edit an ATS-friendly AI resume for free at https://resumeiopro.vercel.app/'
  }
  if (/contact|email|reach|whatsapp|linkedin/.test(s)) {
    return `Email: ${profile.email}\nPhone: ${profile.phone}\nGitHub: ${profile.github}\nLinkedIn: ${profile.linkedin}\nWhatsApp: ${profile.whatsapp}`
  }
  if (/docker/.test(s)) {
    return 'Docker appears in Jayanta’s infrastructure skill set and project tooling (CI/CD, containerized deploys). Open Skills → Infrastructure and Architecture Lab for context.'
  }
  return `I can help with portfolio facts only (local mock — no external AI API).\nTry: Who is Jayanta? | Show projects | Django experience | Contact | Resume | Why interview him?`
}

const SUGGESTIONS = [
  'Who is Jayanta?',
  'What technologies does he use?',
  'Show me his strongest projects.',
  'Explain his experience.',
  'Why should I interview him?',
  'How can I contact him?',
]

export function AiApp() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'assistant',
      text: 'DEV-AI online (local mock). Answers are based only on portfolio data. No API keys. Ask about Jayanta’s skills, projects, experience, or contact.',
    },
  ])
  const [input, setInput] = useState('')
  const expLabel = useMemo(() => formatExperienceLabel(getExperienceDuration()), [])

  const send = (text: string) => {
    const q = text.trim()
    if (!q) return
    setMsgs((m) => [...m, { role: 'user', text: q }, { role: 'assistant', text: answer(q) }])
    setInput('')
  }

  return (
    <div className="flex h-full min-h-[320px] flex-col gap-3">
      <div className="rounded-lg border border-cyan-400/20 bg-cyan-500/5 px-3 py-2 text-xs text-cyan-100/90">
        Local portfolio assistant · Experience context: {expLabel}
      </div>
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => send(s)}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10"
          >
            {s}
          </button>
        ))}
      </div>
      <div className="min-h-0 flex-1 space-y-3 overflow-auto rounded-lg border border-white/10 bg-black/40 p-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[95%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
              m.role === 'user' ? 'ml-auto bg-indigo-500/30 text-indigo-50' : 'bg-white/5 text-slate-200'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault()
          send(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-cyan-400/50"
          placeholder="Ask DEV-AI..."
          aria-label="Ask DEV-AI"
        />
        <button type="submit" className="rounded-lg bg-cyan-500/80 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
          Send
        </button>
      </form>
    </div>
  )
}
