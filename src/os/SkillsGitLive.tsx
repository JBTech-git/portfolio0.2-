import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { profile } from '../data/profile'
import { skillGroups } from '../data/skills'

type Commit = {
  hash: string
  branch: string
  scope: string
  message: string
  files: string[]
  time: string
}

function shortHash(seed: string) {
  let h = 0
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) >>> 0
  return h.toString(16).padStart(7, '0').slice(0, 7)
}

function buildCommits(): Commit[] {
  const groups = Object.entries(skillGroups)
  const times = ['just now', '2m ago', '8m ago', '21m ago', '1h ago', '3h ago', 'yesterday']
  return groups.map(([group, items], i) => {
    const scope = group === 'SoftSkills' ? 'soft-skills' : group.toLowerCase()
    return {
      hash: shortHash(group + items.join(',')),
      branch: i === 0 ? 'main' : i === 1 ? 'develop' : 'skills',
      scope,
      message: `ship ${group.toLowerCase()} stack`,
      files: [...items],
      time: times[i % times.length],
    }
  })
}

/** Live git commit feed for Skills (mobile sheet + desktop OS window). */
export function SkillsGitLive() {
  const reduceMotion = useReducedMotion()
  const commits = useMemo(() => buildCommits(), [])
  const [visible, setVisible] = useState(reduceMotion ? commits.length : 0)
  const [livePulse, setLivePulse] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(commits[0]?.hash ?? null)

  useEffect(() => {
    if (reduceMotion) {
      setVisible(commits.length)
      return
    }
    setVisible(0)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setVisible(i)
      setExpanded(commits[i - 1]?.hash ?? null)
      if (i >= commits.length) {
        window.clearInterval(id)
        setLivePulse(false)
      }
    }, 720)
    return () => window.clearInterval(id)
  }, [commits, reduceMotion])

  const shown = commits.slice(0, visible)

  return (
    <div className="flex h-[calc(100dvh-8.5rem)] min-h-[280px] flex-col overflow-hidden rounded-xl border border-[#16C60C]/25 bg-[#0A0A0A] font-mono text-[12px] md:h-full md:min-h-0 md:flex-1">
      <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#16C60C]/20 bg-[#0C0C0C] px-3 py-2">
        <div className="flex min-w-0 items-center gap-2 text-[#16C60C]">
          <span className="truncate">{profile.hostname}:~/skills</span>
          <span className="text-[#767676]">(git log)</span>
        </div>
        <span className="flex shrink-0 items-center gap-1.5 text-[10px] uppercase tracking-wider text-[#3FF23F]">
          <span
            className={`h-1.5 w-1.5 rounded-full bg-[#16C60C] ${
              livePulse ? 'animate-pulse' : ''
            }`}
          />
          {livePulse ? 'Live' : 'Synced'}
        </span>
      </div>

      <div className="shrink-0 border-b border-[#16C60C]/15 px-3 py-1.5 text-[10px] text-[#767676]">
        <span className="text-[#16C60C]">$</span> git log --oneline --decorate --stat
      </div>

      <div className="min-h-0 flex-1 space-y-0 overflow-y-auto p-2 md:p-3 md:text-[13px]">
        <AnimatePresence initial={false}>
          {shown.map((c, idx) => {
            const isHead = idx === 0
            const open = expanded === c.hash
            return (
              <motion.article
                key={c.hash}
                initial={reduceMotion ? false : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="relative border-b border-[#16C60C]/10 py-2 last:border-b-0 md:py-2.5"
              >
                <div className="absolute bottom-0 left-[11px] top-5 w-px bg-[#16C60C]/25" aria-hidden />
                <button
                  type="button"
                  onClick={() => setExpanded((h) => (h === c.hash ? null : c.hash))}
                  className="relative flex w-full gap-2.5 text-left"
                >
                  <span className="relative z-[1] mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border border-[#16C60C]/50 bg-[#0A0A0A]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#16C60C]" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
                      <span className="text-[#F2F2F2]">{c.hash}</span>
                      {isHead ? (
                        <span className="rounded bg-[#16C60C]/20 px-1 text-[10px] text-[#3FF23F]">
                          HEAD → {c.branch}
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#767676]">({c.branch})</span>
                      )}
                      <span className="ml-auto text-[10px] text-[#767676]">{c.time}</span>
                    </span>
                    <span className="mt-0.5 block text-[#CCCCCC]">
                      <span className="text-[#16C60C]">feat({c.scope}):</span> {c.message}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-[#767676]">
                      Author: {profile.shortName} &lt;{profile.email}&gt;
                    </span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-6 mt-2 space-y-1 rounded-lg border border-[#16C60C]/15 bg-[#1C2E26]/40 px-2.5 py-2 md:grid md:grid-cols-2 md:gap-x-4 md:gap-y-1">
                        <div className="text-[10px] uppercase tracking-wide text-[#13A10E] md:col-span-2">
                          {c.files.length} files changed
                        </div>
                        {c.files.map((f) => (
                          <div key={f} className="flex items-start gap-2 text-[11px] md:text-[12px]">
                            <span className="text-[#3FF23F]">+</span>
                            <span className="text-[#CCCCCC]">{f}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </AnimatePresence>

        {livePulse && !reduceMotion ? (
          <div className="flex items-center gap-2 px-2 py-3 text-[11px] text-[#767676]">
            <span className="inline-block h-3 w-3 animate-spin rounded-full border border-[#16C60C]/40 border-t-[#16C60C]" />
            Receiving commits…
          </div>
        ) : null}
      </div>
    </div>
  )
}
