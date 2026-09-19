import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { experience } from '../data/experience'
import { skillGroups } from '../data/skills'
import { formatExperienceLabel, formatYearsStat, getExperienceDuration } from '../data/profile'

const COMMANDS = [
  'help',
  'about',
  'experience',
  'projects',
  'skills',
  'architecture',
  'education',
  'contact',
  'github',
  'resume',
  'clear',
  'ai',
  'whoami',
  'sudo hire jayanta',
] as const

function runCommand(raw: string): string[] {
  const input = raw.trim()
  const cmd = input.toLowerCase()
  const exp = getExperienceDuration()

  if (!cmd) return []
  if (cmd === 'help') {
    return [
      'Available commands:',
      '',
      ...COMMANDS.filter((c) => c !== 'sudo hire jayanta').map((c) => `  ${c}`),
      '',
      'Tip: use Up/Down for history. Tab for autocomplete.',
    ]
  }
  if (cmd === 'clear') return ['__CLEAR__']
  if (cmd === 'whoami' || cmd === 'about') {
    return [
      `${profile.name}`,
      `Role: ${profile.role}`,
      `Focus: ${profile.focus}`,
      `Experience: ${formatExperienceLabel(exp)} (${formatYearsStat(exp)} years)`,
      `Location: ${profile.location}`,
      `Stack: ${profile.primaryStack.join(' · ')}`,
      '',
      ...profile.humanAbout,
    ]
  }
  if (cmd === 'experience') {
    return experience
      .slice()
      .reverse()
      .flatMap((e) => [`${e.dates}  ${e.role}`, `  @ ${e.org} — ${e.desc}`, ''])
  }
  if (cmd === 'education') {
    return experience
      .filter((e) => e.type === 'education')
      .flatMap((e) => [`${e.dates}  ${e.role}`, `  ${e.org} (${e.location})`, ''])
  }
  if (cmd === 'projects') {
    return [
      'Loading projects...',
      '',
      ...projects.flatMap((p, i) => [
        `${String(i + 1).padStart(2, '0')}  ${p.title}`,
        `    ${p.tags.join(' · ')}`,
        `    ${p.desc}`,
        p.status === 'placeholder' ? '    [ADD PROJECT LINK / CASE STUDY]' : '',
        '',
      ]),
    ]
  }
  if (cmd === 'skills') {
    return Object.entries(skillGroups).flatMap(([group, items]) => [
      `## ${group}`,
      ...items.map((s) => `  - ${s}`),
      '',
    ])
  }
  if (cmd === 'architecture') {
    return [
      'Typical request path (demo):',
      '',
      'Client → Nginx → Application → REST API → Redis → PostgreSQL',
      '',
      'Open the Architecture app for interactive nodes.',
    ]
  }
  if (cmd === 'contact') {
    return [
      `Email: ${profile.email}`,
      `Phone: ${profile.phone}`,
      `GitHub: ${profile.github}`,
      `LinkedIn: ${profile.linkedin}`,
      `WhatsApp: ${profile.whatsapp}`,
    ]
  }
  if (cmd === 'github') return [`Opening: ${profile.github}`, '(Use the Contact / Resume apps for quick links.)']
  if (cmd === 'resume') return ['Open the Resume app, or use Download PDF from Recruiter Mode.']
  if (cmd === 'ai') return ['DEV-AI online. Open the DEV-AI app, or ask: who is Jayanta?']
  if (cmd === 'sudo hire jayanta') {
    return [
      'Permission evaluation started...',
      '',
      'Skills ............... PASS',
      'Problem Solving ...... PASS',
      'System Design ........ PASS',
      'Full Stack ............ PASS',
      'Docker ................ PASS',
      '',
      'Recommendation:',
      'Start a conversation.',
      '',
      '$ ./contact-jayanta',
      `→ ${profile.email}`,
    ]
  }
  return [`Command not found: ${input}`, "Type 'help' for available commands."]
}

export function TerminalApp({ onOpenAi }: { onOpenAi?: () => void }) {
  const [lines, setLines] = useState<string[]>([
    `${profile.hostname}:~$ Welcome to JAYANTA OS`,
    "Type 'help' to list commands.",
    '',
  ])
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const endRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  const submit = (raw: string) => {
    const next = [...lines, `${profile.hostname}:~$ ${raw}`]
    const out = runCommand(raw)
    if (out[0] === '__CLEAR__') {
      setLines([])
    } else {
      setLines([...next, ...out, ''])
    }
    if (raw.trim()) {
      setHistory((h) => [...h, raw])
      setHistIdx(-1)
    }
    setValue('')
    if (raw.trim().toLowerCase() === 'ai') onOpenAi?.()
  }

  return (
    <div
      className="flex h-full min-h-[280px] flex-col rounded-lg border border-[#16C60C]/25 bg-[#0A0A0A] font-mono text-[12px] text-[#16C60C] sm:text-[13px]"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex-1 space-y-0.5 overflow-auto p-3">
        {lines.map((l, i) => (
          <div key={i} className="whitespace-pre-wrap break-words text-[#16C60C]/95">
            {l}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form
        className="flex items-center gap-2 border-t border-[#16C60C]/20 px-3 py-2"
        onSubmit={(e) => {
          e.preventDefault()
          submit(value)
        }}
      >
        <span className="shrink-0 text-[#3FF23F]">{profile.hostname}:~$</span>
        <input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              const next = histIdx < 0 ? history.length - 1 : Math.max(0, histIdx - 1)
              if (history[next] != null) {
                setHistIdx(next)
                setValue(history[next])
              }
            }
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              if (histIdx < 0) return
              const next = histIdx + 1
              if (next >= history.length) {
                setHistIdx(-1)
                setValue('')
              } else {
                setHistIdx(next)
                setValue(history[next])
              }
            }
            if (e.key === 'Tab') {
              e.preventDefault()
              const match = COMMANDS.find((c) => c.startsWith(value.toLowerCase()))
              if (match) setValue(match)
            }
          }}
          className="min-w-0 flex-1 bg-transparent text-[#CCCCCC] outline-none placeholder:text-[#767676]"
          placeholder="help"
          aria-label="Terminal input"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
        />
        <span className="inline-block h-4 w-2 animate-pulse bg-[#16C60C]/80" aria-hidden />
      </form>
    </div>
  )
}
