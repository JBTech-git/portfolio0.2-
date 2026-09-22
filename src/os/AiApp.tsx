import { useRef, useState } from 'react'
import { profile, formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillGroups } from '../data/skills'
import { askGemini, hasGeminiKey } from '../lib/gemini'

type Msg = { role: 'user' | 'assistant'; text: string }

const DEV_AI_SCOPE =
  'skills, projects, experience, qualifications, education, background, interests, resume, contact, and other portfolio-related topics'

const OFF_TOPIC = `DEV-AI only answers questions about Jayanta Barman — his ${DEV_AI_SCOPE}.`

function isGreeting(q: string) {
  const s = q.trim().toLowerCase().replace(/[!?.…]+$/g, '')
  return /^(hi|hello|hey|hiya|howdy|greetings|yo|sup|what'?s up|good\s+(morning|afternoon|evening|night)|how\s+are\s+you|how\s+r\s+u|how\s+do\s+you\s+do|nice\s+to\s+meet\s+you)$/.test(
    s,
  )
}

function greetingReply(q: string): string {
  const s = q.trim().toLowerCase()

  if (/how are you|how r u|how do you do/.test(s)) {
    return `I'm doing great, thanks for asking! I'm DEV-AI — ${profile.name}'s portfolio assistant. Happy to help you explore his skills, qualifications, projects, experience, or how to reach him. What would you like to know?`
  }
  if (/good morning/.test(s)) {
    return `Good morning! ☀️ Welcome to ${profile.name}'s portfolio. I'm DEV-AI — ask me about his stack, qualifications, projects, career, or contact info.`
  }
  if (/good afternoon/.test(s)) {
    return `Good afternoon! Welcome — I'm DEV-AI. I can tell you about ${profile.name}'s skills, education, projects, experience, or how to get in touch.`
  }
  if (/good evening|good night/.test(s)) {
    return `Good evening! Glad you're here. I'm DEV-AI — happy to walk you through ${profile.name}'s work, qualifications, tech stack, or resume. What interests you?`
  }
  if (/nice to meet you/.test(s)) {
    return `Nice to meet you too! I'm DEV-AI. Ask me anything about ${profile.name} — his qualifications, projects, experience, skills, or contact details.`
  }

  const welcomes = [
    `Hey! 👋 Welcome — I'm DEV-AI, ${profile.name}'s portfolio assistant. Ask me about his skills, qualifications, education, projects, experience, resume, or contact info.`,
    `Hello! Nice to have you here. I can help you learn about ${profile.name}'s background, stack, career, and more. What would you like to know?`,
    `Hi there! Glad you stopped by. I'm DEV-AI — tell me what you'd like to explore: his qualifications, experience, technologies, projects, or how to reach him.`,
  ]
  return welcomes[Math.floor(Math.random() * welcomes.length)]
}

function isJayantaRelated(q: string) {
  const s = q.toLowerCase()
  return /\bjayanta\b|\bbarman\b|\b(he|his|him)\b|who is|who are you|tell me about|about him|skill|technolog|stack|project|portfolio|experience|career|employ|hire|interview|resume|\bcv\b|contact|email|phone|whatsapp|linkedin|github|docker|architect|education|qualif|degree|\bbca\b|\bmca\b|universit|college|stud(y|ied|ies)|background|bio|summary|where.*(live|based|from)|location|kolkata|interest|explor|soft.?skill|strength|leelija|intern|company|employer|role|developer|full.?stack|backend|django|react|fastapi|postgres|\bsql\b|python|node\.?js|javascript|typescript|client|delivered/.test(
    s,
  )
}

function localAnswer(q: string): string {
  const s = q.toLowerCase()
  const exp = getExperienceDuration()
  const years = formatYearsStat(exp)

  if (/who is|about jayanta|who are you|tell me about|background|bio|summary/.test(s)) {
    return `${profile.name} is a ${profile.role} based in ${profile.location} with ${formatExperienceLabel(exp)} of experience.\n\nFocus: ${profile.focus}\nStack: ${profile.primaryStack.join(', ')}\n\n${profile.summary}\n\n${profile.humanAbout.join('\n')}`
  }
  if (/qualif|education|degree|\bbca\b|\bmca\b|universit|college|stud(y|ied|ies)/.test(s)) {
    return experience
      .filter((e) => e.type === 'education')
      .map((e) => `${e.dates}: ${e.role} @ ${e.org} (${e.location}) — ${e.desc}`)
      .join('\n')
  }
  if (/where.*(live|based|from)|location|kolkata/.test(s)) {
    return `${profile.name} is based in ${profile.location}.`
  }
  if (/interest|explor/.test(s)) {
    return `Currently exploring:\n${profile.exploring.map((item) => `• ${item}`).join('\n')}`
  }
  if (/soft.?skill|strength|collaborat|communicat|problem.?solv/.test(s)) {
    return `Soft skills: ${skillGroups.SoftSkills.join(', ')}.`
  }
  if (/leelija|company|employer|intern/.test(s)) {
    return experience
      .filter((e) => e.type === 'work')
      .map((e) => `${e.dates}: ${e.role} @ ${e.org} (${e.location}) — ${e.desc}`)
      .join('\n')
  }
  if (/stat|delivered|client/.test(s)) {
    return `Projects delivered: ${profile.stats.projectsDelivered}\nHappy clients: ${profile.stats.happyClients}`
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
  return `I can help with portfolio facts about Jayanta.\nTry: Who is Jayanta? | His qualifications | Show projects | Work experience | Contact | Resume | Why interview him?`
}

const SUGGESTIONS = [
  'Who is Jayanta?',
  'What are his qualifications?',
  'What technologies does he use?',
  'Show me his strongest projects.',
  'Explain his experience.',
  'Why should I interview him?',
  'How can I contact him?',
]

const geminiReady = hasGeminiKey()

export function AiApp() {
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      role: 'assistant',
      text: geminiReady
        ? `DEV-AI online. Ask about Jayanta’s ${DEV_AI_SCOPE}.`
        : `DEV-AI online. Ask about Jayanta’s ${DEV_AI_SCOPE}.`,
    },
  ])
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)

  const send = async (text: string) => {
    const q = text.trim()
    if (!q || busy) return

    setInput('')
    setBusy(true)
    setMsgs((m) => [...m, { role: 'user', text: q }, { role: 'assistant', text: 'Thinking…' }])

    queueMicrotask(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    })

    let reply: string
    if (isGreeting(q)) {
      reply = greetingReply(q)
    } else if (!isJayantaRelated(q)) {
      reply = OFF_TOPIC
    } else try {
      if (geminiReady) {
        const history = msgs
          .filter((m) => m.role === 'user' || (m.role === 'assistant' && !m.text.startsWith('DEV-AI online')))
          .slice(-8)
          .map((m) => ({
            role: (m.role === 'user' ? 'user' : 'model') as 'user' | 'model',
            text: m.text,
          }))
        reply = await askGemini(q, history)
      } else {
        reply = localAnswer(q)
      }
    } catch (err) {
      const reason = err instanceof Error ? err.message : 'Please try again later.'
      const note = reason.replace(/gemini/gi, 'Dev AI')
      reply = `${localAnswer(q)}\n\n(Dev AI: ${note})`
    }

    setMsgs((m) => {
      const next = [...m]
      const last = next.length - 1
      if (last >= 0 && next[last].role === 'assistant') {
        next[last] = { role: 'assistant', text: reply }
      } else {
        next.push({ role: 'assistant', text: reply })
      }
      return next
    })
    setBusy(false)
    queueMicrotask(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  return (
    <div className="flex h-full min-h-[320px] flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            disabled={busy}
            onClick={() => void send(s)}
            className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300 hover:bg-white/10 disabled:opacity-50"
          >
            {s}
          </button>
        ))}
      </div>
      <div ref={listRef} className="min-h-0 flex-1 space-y-3 overflow-auto rounded-lg border border-white/10 bg-black/40 p-3">
        {msgs.map((m, i) => (
          <div
            key={i}
            className={`max-w-[60%] whitespace-pre-wrap rounded-lg px-3 py-2 text-sm ${
              m.role === 'user' ? 'ml-auto bg-[#16C60C]/25 text-[#E8FFE8]' : 'bg-white/5 text-slate-200'
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
          void send(input)
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={busy}
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:ring-1 focus:ring-[#16C60C]/50 disabled:opacity-60"
          placeholder="Ask DEV-AI..."
          aria-label="Ask DEV-AI"
        />
        <button
          type="submit"
          disabled={busy || !input.trim()}
          className="rounded-lg bg-[#16C60C]/85 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-[#3FF23F] disabled:opacity-50"
        >
          {busy ? '…' : 'Send'}
        </button>
      </form>
    </div>
  )
}
