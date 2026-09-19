import { useEffect, useMemo, useRef, useState } from 'react'

type Node = {
  id: string
  label: string
  sub?: string
  x: number
  y: number
}

type Edge = {
  from: string
  to: string
  kind?: 'req' | 'res' | 'branch'
}

const NODES: Node[] = [
  { id: 'user', label: 'User', sub: 'person / device', x: 7, y: 48 },
  { id: 'client', label: 'Client App', sub: 'browser / mobile', x: 22, y: 48 },
  { id: 'ui', label: 'UI Layer', sub: 'React screens', x: 22, y: 22 },
  { id: 'state', label: 'Local State', sub: 'cache · session', x: 22, y: 74 },
  { id: 'dns', label: 'DNS', sub: 'name → IP', x: 38, y: 22 },
  { id: 'cdn', label: 'CDN / Edge', sub: 'static · TLS', x: 38, y: 48 },
  { id: 'lb', label: 'Load Balancer', sub: 'route traffic', x: 38, y: 74 },
  { id: 'gateway', label: 'API Gateway', sub: 'auth · rate limit', x: 54, y: 32 },
  { id: 'app', label: 'App Server', sub: 'Django · logic', x: 54, y: 48 },
  { id: 'services', label: 'Services', sub: 'domain modules', x: 54, y: 64 },
  { id: 'db', label: 'Database', sub: 'PostgreSQL', x: 72, y: 28 },
  { id: 'cache', label: 'Cache', sub: 'Redis', x: 72, y: 48 },
  { id: 'storage', label: 'Files / Media', sub: 'object storage', x: 72, y: 64 },
  { id: 'queue', label: 'Job Queue', sub: 'async tasks', x: 72, y: 80 },
  { id: 'worker', label: 'Workers', sub: 'email · jobs', x: 90, y: 80 },
  { id: 'logs', label: 'Logs / Metrics', sub: 'observe · debug', x: 90, y: 48 },
  { id: 'response', label: 'Response', sub: 'JSON · HTML', x: 54, y: 88 },
  { id: 'render', label: 'Render', sub: 'update UI', x: 22, y: 90 },
]

const EDGES: Edge[] = [
  { from: 'user', to: 'client', kind: 'req' },
  { from: 'client', to: 'cdn', kind: 'req' },
  { from: 'cdn', to: 'app', kind: 'req' },
  { from: 'app', to: 'cache', kind: 'req' },
  { from: 'cache', to: 'db', kind: 'req' },
  { from: 'client', to: 'ui', kind: 'branch' },
  { from: 'client', to: 'state', kind: 'branch' },
  { from: 'cdn', to: 'dns', kind: 'branch' },
  { from: 'cdn', to: 'lb', kind: 'branch' },
  { from: 'lb', to: 'gateway', kind: 'req' },
  { from: 'gateway', to: 'app', kind: 'req' },
  { from: 'app', to: 'services', kind: 'branch' },
  { from: 'app', to: 'storage', kind: 'branch' },
  { from: 'app', to: 'queue', kind: 'branch' },
  { from: 'queue', to: 'worker', kind: 'branch' },
  { from: 'app', to: 'logs', kind: 'branch' },
  { from: 'db', to: 'app', kind: 'res' },
  { from: 'app', to: 'response', kind: 'res' },
  { from: 'response', to: 'cdn', kind: 'res' },
  { from: 'cdn', to: 'render', kind: 'res' },
  { from: 'render', to: 'user', kind: 'res' },
]

const FOCUS_RADIUS = 0.09
const LERP = 0.1

function nodeById(id: string) {
  return NODES.find((n) => n.id === id)!
}

function toScreen(n: { x: number; y: number }, w: number, h: number) {
  return { x: (n.x / 100) * w, y: (n.y / 100) * h }
}

function pathFor(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2
  if (Math.abs(a.y - b.y) < 24) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
  if (Math.abs(a.x - b.x) < 24) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
  return `M ${a.x} ${a.y} L ${mx} ${a.y} L ${mx} ${b.y} L ${b.x} ${b.y}`
}

/** Soft focus strength from pointer → point in SVG % space */
function focusAt(nx: number, ny: number, px: number, py: number) {
  const d = Math.hypot(nx / 100 - px, ny / 100 - py)
  if (d >= FOCUS_RADIUS) return 0
  const t = 1 - d / FOCUS_RADIUS
  return t * t * (3 - 2 * t)
}

function mix(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function rgba(r: number, g: number, b: number, a: number) {
  return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, a)).toFixed(3)})`
}

export function DesktopBackdrop() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.45 })
  const [heat, setHeat] = useState<Record<string, number>>(() =>
    Object.fromEntries(NODES.map((n) => [n.id, 0]))
  )
  const [active, setActive] = useState(false)
  const [size, setSize] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : 1280,
    h: typeof window !== 'undefined' ? window.innerHeight : 800,
  }))

  const targetPos = useRef({ x: 0.5, y: 0.45 })
  const heatRef = useRef<Record<string, number>>(heat)
  const posRef = useRef(pos)
  const activeRef = useRef(false)
  const neighbors = useMemo(() => {
    const map = new Map<string, Set<string>>()
    for (const e of EDGES) {
      if (!map.has(e.from)) map.set(e.from, new Set())
      if (!map.has(e.to)) map.set(e.to, new Set())
      map.get(e.from)!.add(e.to)
      map.get(e.to)!.add(e.from)
    }
    return map
  }, [])

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [])

  useEffect(() => {
    const applyPointer = (clientX: number, clientY: number) => {
      activeRef.current = true
      targetPos.current = {
        x: clientX / window.innerWidth,
        y: clientY / window.innerHeight,
      }
    }

    const onPointer = (e: PointerEvent) => applyPointer(e.clientX, e.clientY)
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0]
      if (t) applyPointer(t.clientX, t.clientY)
    }

    window.addEventListener('pointermove', onPointer, { passive: true })
    window.addEventListener('pointerdown', onPointer, { passive: true })
    window.addEventListener('touchstart', onTouch, { passive: true })
    window.addEventListener('touchmove', onTouch, { passive: true })

    let raf = 0
    const tick = () => {
      const tp = targetPos.current
      const p = posRef.current
      const nextPos = {
        x: mix(p.x, tp.x, LERP),
        y: mix(p.y, tp.y, LERP),
      }
      posRef.current = nextPos

      const nextHeat: Record<string, number> = {}
      for (const n of NODES) {
        nextHeat[n.id] = activeRef.current ? focusAt(n.x, n.y, nextPos.x, nextPos.y) : 0
      }
      // Soft bleed to neighbors of the hottest node
      let maxId: string | null = null
      let maxV = 0
      for (const n of NODES) {
        const v = nextHeat[n.id] ?? 0
        if (v > maxV) {
          maxV = v
          maxId = n.id
        }
      }
      if (maxId && maxV > 0.12) {
        for (const nb of neighbors.get(maxId) ?? []) {
          nextHeat[nb] = Math.max(nextHeat[nb] ?? 0, maxV * 0.25)
        }
      }

      const smoothed: Record<string, number> = {}
      let changed = Math.hypot(nextPos.x - p.x, nextPos.y - p.y) > 0.0002
      for (const n of NODES) {
        const prev = heatRef.current[n.id] ?? 0
        const target = nextHeat[n.id] ?? 0
        const v = mix(prev, target, 0.12)
        smoothed[n.id] = v < 0.008 ? 0 : v
        if (Math.abs(v - prev) > 0.002) changed = true
      }
      heatRef.current = smoothed

      if (changed || activeRef.current) {
        setPos(nextPos)
        setHeat({ ...smoothed })
        setActive(activeRef.current)
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('pointerdown', onPointer)
      window.removeEventListener('touchstart', onTouch)
      window.removeEventListener('touchmove', onTouch)
      cancelAnimationFrame(raf)
    }
  }, [neighbors])

  const px = (pos.x - 0.5) * 14
  const py = (pos.y - 0.5) * 10

  const columns = [
    { title: 'People', x: 7 },
    { title: 'Client', x: 22 },
    { title: 'Network', x: 38 },
    { title: 'Backend', x: 54 },
    { title: 'Data', x: 72 },
    { title: 'Ops', x: 90 },
  ]

  // Base faded opacity; rises near the pointer
  const nodeOp = (h: number) => (active ? mix(0.28, 1, h) : 0.32)
  const edgeOp = (h: number, base: number) => (active ? mix(base * 0.55, 0.9, h * h) : base * 0.65)

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-[#0A0A0A]" />

      {/* Base graph grid (x + y) — always faintly visible */}
      <div
        className="absolute inset-0 opacity-[0.11]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(22,198,12,0.28) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22,198,12,0.28) 1px, transparent 1px)
          `,
          backgroundSize: '28px 28px',
          transform: `translate(${px * 0.12}px, ${py * 0.12}px)`,
        }}
      />

      {/* Focused graph grid — soft faded lift near mouse / touch */}
      {active && (
        <div
          className="absolute inset-0 opacity-55"
          style={{
            backgroundImage: `
              linear-gradient(rgba(22,198,12,0.35) 1px, transparent 1px),
              linear-gradient(90deg, rgba(22,198,12,0.35) 1px, transparent 1px)
            `,
            backgroundSize: '28px 28px',
            transform: `translate(${px * 0.12}px, ${py * 0.12}px)`,
            WebkitMaskImage: `radial-gradient(circle 11vmax at ${pos.x * 100}% ${pos.y * 100}%, #000 0%, rgba(0,0,0,0.5) 40%, transparent 72%)`,
            maskImage: `radial-gradient(circle 11vmax at ${pos.x * 100}% ${pos.y * 100}%, #000 0%, rgba(0,0,0,0.5) 40%, transparent 72%)`,
          }}
        />
      )}

      {/* Screen-mapped roadmap — every node/line fits the full viewport */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox={`0 0 ${size.w} ${size.h}`}
        preserveAspectRatio="xMidYMid meet"
        width={size.w}
        height={size.h}
      >
        {columns.map((c) => {
          const x = (c.x / 100) * size.w
          return (
            <text
              key={c.title}
              x={x}
              y={Math.max(28, size.h * 0.055)}
              textAnchor="middle"
              fill="rgba(22,198,12,0.32)"
              style={{
                fontSize: Math.max(10, size.w * 0.009),
                fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                letterSpacing: '0.14em',
              }}
            >
              {c.title.toUpperCase()}
            </text>
          )
        })}

        <text
          x={size.w / 2}
          y={Math.max(16, size.h * 0.028)}
          textAnchor="middle"
          fill="rgba(22,198,12,0.38)"
          style={{
            fontSize: Math.max(11, size.w * 0.01),
            fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          }}
        >
          $ software-lifecycle — move mouse / touch to focus
        </text>

        {EDGES.map((e, i) => {
          const a = toScreen(nodeById(e.from), size.w, size.h)
          const b = toScreen(nodeById(e.to), size.w, size.h)
          const midFocus = active
            ? focusAt((nodeById(e.from).x + nodeById(e.to).x) / 2, (nodeById(e.from).y + nodeById(e.to).y) / 2, pos.x, pos.y)
            : 0
          const h = Math.max(heat[e.from] ?? 0, heat[e.to] ?? 0, midFocus)
          const baseRgb =
            e.kind === 'res' ? [63, 242, 63] : e.kind === 'req' ? [22, 198, 12] : [19, 161, 14]
          const alpha = edgeOp(h, e.kind === 'branch' ? 0.22 : 0.28)
          return (
            <path
              key={`${e.from}-${e.to}-${i}`}
              d={pathFor(a, b)}
              fill="none"
              stroke={rgba(baseRgb[0], baseRgb[1], baseRgb[2], alpha)}
              strokeWidth={mix(1, 2.2, h)}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={e.kind === 'branch' ? '4 5' : e.kind === 'res' ? '6 4' : undefined}
            />
          )
        })}

        {NODES.map((n) => {
          const h = heat[n.id] ?? 0
          const op = nodeOp(h)
          const p = toScreen(n, size.w, size.h)
          const boxW = Math.min(118, size.w * 0.09)
          const boxH = Math.min(40, size.h * 0.055)

          return (
            <g key={n.id} transform={`translate(${p.x} ${p.y})`} opacity={op}>
              <rect
                x={-boxW / 2}
                y={-boxH / 2}
                width={boxW}
                height={boxH}
                rx={8}
                fill={rgba(28, 46, 38, 0.85)}
                stroke={rgba(22, 198, 12, mix(0.35, 0.85, h))}
                strokeWidth={mix(1, 1.6, h)}
              />
              <text
                y={-3}
                textAnchor="middle"
                fill={rgba(204, 204, 204, mix(0.55, 1, h))}
                style={{
                  fontSize: Math.max(10, Math.min(13, size.w * 0.009)),
                  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  fontWeight: 600,
                }}
              >
                {n.label}
              </text>
              {n.sub && (
                <text
                  y={11}
                  textAnchor="middle"
                  fill={rgba(22, 198, 12, mix(0.35, 0.8, h))}
                  style={{
                    fontSize: Math.max(8, Math.min(10, size.w * 0.007)),
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                  }}
                >
                  {n.sub}
                </text>
              )}
            </g>
          )
        })}

        <g transform={`translate(${size.w * 0.04} ${size.h * 0.96})`} opacity={active ? 0.65 : 0.38}>
          <line x1="0" y1="0" x2="28" y2="0" stroke="rgba(22,198,12,0.7)" strokeWidth="1.2" />
          <text
            x="34"
            y="4"
            fill="rgba(22,198,12,0.65)"
            style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
          >
            request
          </text>
          <line
            x1="110"
            y1="0"
            x2="138"
            y2="0"
            stroke="rgba(63,242,63,0.7)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
          />
          <text
            x="144"
            y="4"
            fill="rgba(22,198,12,0.65)"
            style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
          >
            response
          </text>
          <line
            x1="230"
            y1="0"
            x2="258"
            y2="0"
            stroke="rgba(19,161,14,0.65)"
            strokeWidth="1.2"
            strokeDasharray="4 5"
          />
          <text
            x="264"
            y="4"
            fill="rgba(22,198,12,0.65)"
            style={{ fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
          >
            branch
          </text>
        </g>
      </svg>
    </div>
  )
}
