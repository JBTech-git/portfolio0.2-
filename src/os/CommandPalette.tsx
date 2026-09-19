import { useEffect, useMemo, useState } from 'react'
import { SIMPLE_APPS, type AppId } from './types'

type Props = {
  open: boolean
  onClose: () => void
  onSelect: (appId: AppId | 'home') => void
}

export function CommandPalette({ open, onClose, onSelect }: Props) {
  const [q, setQ] = useState('')
  const items = useMemo(() => {
    const base = [
      { id: 'home' as const, label: 'Home', hint: 'Desktop' },
      ...SIMPLE_APPS.map((a) => ({ id: a.id, label: a.label, hint: a.title })),
    ]
    const qq = q.trim().toLowerCase()
    if (!qq) return base
    return base.filter((i) => i.label.toLowerCase().includes(qq) || i.hint.toLowerCase().includes(qq))
  }, [q])

  useEffect(() => {
    if (!open) setQ('')
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/60 p-4 pt-[12vh]" onClick={onClose}>
      <div
        role="dialog"
        aria-label="Command palette"
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-[#16C60C]/25 bg-[#0C0C0C] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type to find a section… (About, Projects, Contact)"
          className="w-full border-b border-white/10 bg-transparent px-4 py-3 text-sm text-white outline-none"
          aria-label="Search sections"
        />
        <ul className="max-h-72 overflow-auto p-2">
          {items.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm text-slate-200 hover:bg-white/10"
                onClick={() => {
                  onSelect(item.id)
                  onClose()
                }}
              >
                <span>{item.label}</span>
                <span className="text-xs text-slate-500">{item.hint}</span>
              </button>
            </li>
          ))}
          {items.length === 0 && <li className="px-3 py-4 text-sm text-slate-500">No matches</li>}
        </ul>
      </div>
    </div>
  )
}
