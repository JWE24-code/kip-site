import { useEffect, useRef, useState } from 'react'
import Switcher from './Switcher'
import './modern.css'

/* ---------- hooks ---------- */

function useScrolled() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return scrolled
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.md-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('md-in')),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* Ember particle field — canvas 2D, gentle drift + glow */
function Embers() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)
    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number; ph: number }
    const ps: P[] = Array.from({ length: 42 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + Math.random() * 2.1,
      vx: (Math.random() - 0.5) * 0.0006,
      vy: -0.0002 - Math.random() * 0.0009,
      a: 0.15 + Math.random() * 0.5,
      ph: Math.random() * Math.PI * 2,
    }))
    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const p of ps) {
        p.x += p.vx + Math.sin(t / 2400 + p.ph) * 0.0003
        p.y += p.vy
        if (p.y < -0.05) { p.y = 1.05; p.x = Math.random() }
        if (p.x < -0.05) p.x = 1.05
        if (p.x > 1.05) p.x = -0.05
        const tw = 0.65 + 0.35 * Math.sin(t / 900 + p.ph)
        const x = p.x * w
        const y = p.y * h
        const g = ctx.createRadialGradient(x, y, 0, x, y, p.r * 6)
        g.addColorStop(0, `rgba(255,140,50,${p.a * tw})`)
        g.addColorStop(1, 'rgba(255,107,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(x, y, p.r * 6, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = `rgba(255,190,120,${p.a * tw})`
        ctx.beginPath()
        ctx.arc(x, y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={ref} className="md-embers" aria-hidden />
}

/* ---------- terminal typing ---------- */

type Seg = { t: string; link?: boolean }
const ANSWER: Seg[] = [
  { t: 'The launch moved to ' },
  { t: '[[Q3 Planning]]', link: true },
  { t: ' after the vendor delay noted in ' },
  { t: '[[Acme Meeting 06-12]]', link: true },
  { t: '. Design freeze stays on the 18th — see ' },
  { t: '[[Timeline]]', link: true },
  { t: '.' },
]

function Terminal() {
  const [progress, setProgress] = useState(0) // chars typed
  const total = ANSWER.reduce((n, s) => n + s.t.length, 0)
  useEffect(() => {
    let i = 0
    const id = window.setInterval(() => {
      i += 1 + Math.floor(Math.random() * 2)
      setProgress(Math.min(i, total))
      if (i >= total) window.clearInterval(id)
    }, 26)
    return () => window.clearInterval(id)
  }, [total])

  let used = 0
  const rendered = ANSWER.map((s, idx) => {
    const start = used
    used += s.t.length
    const visible = Math.max(0, Math.min(progress - start, s.t.length))
    if (visible === 0) return null
    return (
      <span key={idx} className={`md-chunk ${s.link ? 'md-link' : ''}`}>
        {s.t.slice(0, visible)}
      </span>
    )
  })

  return (
    <div className="md-term-wrap md-reveal">
      <div className="md-term">
        <div className="md-term-bar">
          <span className="md-dot" style={{ background: '#ff5f57' }} />
          <span className="md-dot" style={{ background: '#febc2e' }} />
          <span className="md-dot" style={{ background: '#28c840' }} />
          <span className="md-term-title">kip — peck</span>
        </div>
        <div className="md-term-body">
          <div className="md-term-q">what did we decide about the timeline?</div>
          <div className="md-term-a">
            {rendered}
            <span className="md-cursor" />
          </div>
        </div>
        <div className="md-term-foot">
          <span>answered from 3 pages in your nest</span>
          <span>⌘↵</span>
        </div>
      </div>
    </div>
  )
}

/* ---------- page ---------- */

const TICKER = ['eggs/', 'nest/', 'clucks/', 'hatch', 'peck', 'groom', 'the henhouse', 'ctrl+1 to write']

export default function Modern() {
  const scrolled = useScrolled()
  useReveal()

  return (
    <div className="md-root">
      <header className={`md-nav ${scrolled ? 'md-scrolled' : ''}`}>
        <div className="md-nav-logo">
          <EggMark />
          kip
        </div>
        <nav className="md-nav-links">
          <a href="#modern-how">How it works</a>
          <a href="#modern-inside">Inside</a>
          <a href="#modern-install">Install</a>
          <a href="#modern-honest">v0.4 honesty</a>
          <a className="md-nav-cta" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="md-hero">
        <Embers />
        <p className="md-kicker">v0.4.2 · a fork of Logseq with an LLM retrieval layer</p>
        <h1 className="md-h1">
          Don&rsquo;t browse
          <br />
          your notes.
          <br />
          <span className="md-yolk">Peck</span> them.
        </h1>
        <p className="md-sub">
          Kip is the full Logseq editor — Markdown notes, journals, whiteboards, block references, unchanged — plus a
          layer that turns documents you drop in into a <b>cross-linked wiki you can ask questions of</b>. It opens
          straight into a chat prompt; the editor is a mode you toggle into.
        </p>
        <div className="md-ctas">
          <a className="md-btn md-btn-primary" href="#modern-install">
            ↓ Download Kip
          </a>
          <a className="md-btn md-btn-ghost" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">
            Star on GitHub ↗
          </a>
        </div>
        <p className="md-meta">windows 10/11 x64 · linux x64 · free · agpl-3.0</p>
        <Terminal />
      </section>

      {/* TICKER */}
      <div className="md-ticker" aria-hidden>
        <div className="md-ticker-track">
          {[...TICKER, ...TICKER].map((t, i) => (
            <span key={i}>
              {t}
              <i>·</i>
            </span>
          ))}
        </div>
      </div>

      {/* 01 — LIFECYCLE */}
      <section className="md-section" id="modern-how">
        <div className="md-sec-head md-reveal">
          <span className="md-sec-no">01</span>
          <h2 className="md-sec-title">The lifecycle of an idea</h2>
          <span className="md-sec-line" />
        </div>
        <div className="md-bento">
          <article className="md-cell md-cell-lg md-reveal">
            <span className="md-cell-num">1</span>
            <span className="md-cell-verb">egg — drop it in</span>
            <h3>Feed it anything</h3>
            <p>
              Drag a Markdown, text, Word, Excel, PowerPoint or PDF file onto the window — or drop it in{' '}
              <code>eggs/</code>. Office and PDF files are converted to Markdown on the way in.
            </p>
            <svg className="md-egg-svg" width="54" height="68" viewBox="0 0 54 68" fill="none" aria-hidden>
              <path
                d="M27 3C16 3 6 24 6 42c0 13 9.4 23 21 23s21-10 21-23C48 24 38 3 27 3Z"
                stroke="#ff6b00"
                strokeWidth="2"
                strokeDasharray="5 6"
              />
            </svg>
          </article>
          <article className="md-cell md-cell-sm md-reveal">
            <span className="md-cell-num">2</span>
            <span className="md-cell-verb">hatch — it becomes pages</span>
            <h3>Hatch sources</h3>
            <p>
              Each document turns into a set of linked <code>entity</code>, <code>concept</code> and{' '}
              <code>source</code> pages — the nest.
            </p>
          </article>
          <article className="md-cell md-cell-sm md-reveal">
            <span className="md-cell-num">3</span>
            <span className="md-cell-verb">peck — ask the nest</span>
            <h3>Answers with citations</h3>
            <p>
              Type a question; answers cite the <code>[[pages]]</code> they came from. Or tell Kip a fact, or about an
              upcoming meeting.
            </p>
          </article>
          <article className="md-cell md-cell-lg md-reveal">
            <span className="md-cell-num">4</span>
            <span className="md-cell-verb">groom — keep it tidy</span>
            <h3>A nest that stays trustworthy</h3>
            <p>
              Read-only health checks run over the generated wiki, so the nest stays trustworthy as it grows. Groom
              never edits — it reports.
            </p>
          </article>
        </div>
      </section>

      {/* 02 — INSIDE */}
      <section className="md-section" id="modern-inside">
        <div className="md-sec-head md-reveal">
          <span className="md-sec-no">02</span>
          <h2 className="md-sec-title">What&rsquo;s inside the shell</h2>
          <span className="md-sec-line" />
        </div>

        <div className="md-row md-reveal">
          <div className="md-row-text">
            <p className="md-row-tag">the editor</p>
            <h3>The whole Logseq, unchanged.</h3>
            <p>
              Kip doesn&rsquo;t reinvent your notes — it inherits them. Everything you know from Logseq works exactly as
              you expect. Kip opens into a chat prompt — press Ctrl/⌘ + 1 to toggle the editor.
            </p>
            <ul className="md-list">
              <li>Markdown notes &amp; journals, outliner and all</li>
              <li>Whiteboards for when text runs out</li>
              <li>Block references and backlinks, untouched</li>
            </ul>
          </div>
          <pre className="md-tree">
{`your `}<span className="t-dir">graph/</span>{`
├─ `}<span className="t-acc">eggs/</span>{`     `}<span className="t-note">← drop documents here</span>{`
├─ `}<span className="t-acc">nest/</span>{`     `}<span className="t-note">← hatched wiki pages</span>{`
│  ├─ entity___Acme.md
│  ├─ concept___Timeline.md
│  └─ source___q3-plan.md
├─ `}<span className="t-acc">clucks/</span>{`   `}<span className="t-note">← Kip&rsquo;s working notes</span>{`
├─ journals/
└─ pages/`}
          </pre>
        </div>

        <div className="md-row md-flip md-reveal">
          <div className="md-row-text">
            <p className="md-row-tag">the skill loop</p>
            <h3>Pecks that do things.</h3>
            <p>
              Mid-answer, a bounded skill loop can run real tasks against the real world — then fold the result back
              into the reply. Bounded by design — and your own skills run with your privileges, so treat them like
              shell scripts.
            </p>
            <ul className="md-list">
              <li>Search the web while answering you</li>
              <li>Read a spreadsheet from your disk</li>
              <li>Build a Word doc or a deck from your notes</li>
            </ul>
          </div>
          <div className="md-term">
            <div className="md-term-bar">
              <span className="md-dot" style={{ background: '#ff5f57' }} />
              <span className="md-dot" style={{ background: '#febc2e' }} />
              <span className="md-dot" style={{ background: '#28c840' }} />
              <span className="md-term-title">peck — with skills</span>
            </div>
            <div className="md-term-body" style={{ fontSize: 12.5 }}>
              <div className="md-term-q">make a deck of the Acme decisions</div>
              <div style={{ color: '#8a857a' }}>
                → reading <span className="md-link" style={{ color: '#8ab2d1' }}>[[Acme Meeting 06-12]]</span>
                <br />→ reading <span className="md-link" style={{ color: '#8ab2d1' }}>[[Q3 Planning]]</span>
                <br />→ skill: build-slides (node subprocess)
                <br />
                <span style={{ color: '#aaf7b3' }}>✓ acme-decisions.pptx — 9 slides, every claim cited to a page</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md-row md-reveal">
          <div className="md-row-text">
            <p className="md-row-tag">reminders &amp; calendar</p>
            <h3>It remembers before you need it.</h3>
            <p>
              Tell Kip what&rsquo;s coming in plain words — it sets an OS notification and, when the moment approaches,
              hands you a prep brief pulled from your own notes. Or subscribe a calendar: a Google / Outlook /
              Fastmail ICS link pulls your events in the same way.
            </p>
          </div>
          <div className="md-notif">
            <div className="md-notif-head">
              <EggMark small />
              <span>notification — friday 14:30</span>
            </div>
            <b>Acme meeting in 30 min</b>
            <ul>
              <li>• Timeline moved to Q3 (<i>[[Q3 Planning]]</i>)</li>
              <li>• Budget flagged twice (<i>[[Acme Meeting 06-12]]</i>)</li>
              <li>• Open question: renewal pricing</li>
            </ul>
          </div>
        </div>

        <div className="md-row md-flip md-reveal">
          <div className="md-row-text">
            <p className="md-row-tag">privacy</p>
            <h3>Your nest, your machine.</h3>
            <p>
              Your notes and questions go to whichever LLM provider you configure — Anthropic, OpenAI and DeepSeek are
              hosted services that receive that content. Don&rsquo;t want that? You don&rsquo;t have to have it.
            </p>
            <ul className="md-list">
              <li>Local provider (Ollama) keeps everything on-device</li>
              <li>Your graph is a plain folder — plain Markdown, no lock-in</li>
              <li>Optional Dropbox sync — notes sync; cache and keys stay on-device</li>
            </ul>
          </div>
          <div className="md-cell" style={{ padding: 26 }}>
            <p className="md-mono" style={{ fontSize: 11, color: 'var(--faint)', letterSpacing: '0.15em', margin: '0 0 14px' }}>
              SETTINGS → LLM PROVIDER
            </p>
            {['anthropic', 'openai', 'deepseek'].map((p) => (
              <div className="md-radio-row" key={p}>
                <span className="md-radio" />
                {p}
                <span className="md-mono">api key</span>
              </div>
            ))}
            <div className="md-radio-row">
              <span className="md-radio on" />
              local — ollama
              <span className="md-mono">on-device</span>
            </div>
            <p className="md-ok">✓ connection tested — all traffic stays on this machine</p>
          </div>
        </div>
      </section>

      {/* 03 — INSTALL */}
      <section className="md-section" id="modern-install">
        <div className="md-sec-head md-reveal">
          <span className="md-sec-no">03</span>
          <h2 className="md-sec-title">A real installer. No account.</h2>
          <span className="md-sec-line" />
        </div>
        <div className="md-install-grid">
          <article className="md-os md-reveal">
            <span className="md-os-tag">Windows 10 / 11 · x64</span>
            <h3>Download and run</h3>
            <p>
              Per-user, no admin prompt, start-menu shortcut. Updates itself from there via the in-app banner.
            </p>
            <a className="md-dl" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">
              ↓ Kip-Setup.exe
            </a>
            <p className="md-warn">
              Signed with a self-issued certificate, so SmartScreen still says{' '}
              <b>&ldquo;Windows protected your PC&rdquo;</b>. Click More info → Run anyway.
            </p>
          </article>
          <article className="md-os md-reveal">
            <span className="md-os-tag">Linux · x64 · AppImage</span>
            <h3>Make it executable, run it</h3>
            <p>It updates itself. Prefer portable? The plain tar.gz is on the releases page too.</p>
            <a className="md-dl" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">
              ↓ Kip-*.AppImage
            </a>
            <p className="md-warn">
              <span className="md-code">chmod +x Kip-*.AppImage && ./Kip-*.AppImage</span>
              <br />
              Wayland (Hyprland etc.): <span className="md-code">--ozone-platform-hint=auto</span>
            </p>
          </article>
        </div>
      </section>

      {/* 04 — HONESTY */}
      <section className="md-section" id="modern-honest">
        <div className="md-honest">
          <div className="md-sec-head md-reveal">
            <span className="md-sec-no">04</span>
            <h2 className="md-sec-title">Said plainly</h2>
            <span className="md-sec-line" />
          </div>
          <p className="md-reveal" style={{ color: 'var(--mut)', fontSize: 16, lineHeight: 1.7, margin: '0 0 20px' }}>
            v0.4: early, rough, and looking for feedback. Kip is a personal project at the beginning of its life.
            Here&rsquo;s exactly what that means, so you can decide with open eyes.
          </p>
          <ul className="md-x-list md-reveal">
            <li><span className="md-x">✕</span><span><b>Windows + Linux x64 only.</b> No macOS build, no mobile.</span></li>
            <li><span className="md-x">✕</span><span><b>Self-issued signing certificate.</b> SmartScreen still warns until there&rsquo;s a real cert.</span></li>
            <li><span className="md-x">✕</span><span><b>Needs an LLM provider configured</b> — without one, Hatch and Peck don&rsquo;t work.</span></li>
            <li><span className="md-x">✕</span><span><b>Skills run unsandboxed</b> with your privileges — one you add yourself is like running a shell script.</span></li>
            <li><span className="md-x">✕</span><span><b>Expect bugs and breaking changes.</b> It&rsquo;s v0.4, and it means it.</span></li>
            <li><span className="md-x">✕</span><span><b>Honest bit:</b> <span className="md-code">.henhouse/llm.json</span> stores API keys in plaintext — keep that folder out of synced locations and version control.</span></li>
          </ul>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="md-final">
        <h2 className="md-reveal">Come peck around.</h2>
        <p className="md-reveal">
          Free, open source (AGPL-3.0), and one folder away from knowing what your notes would say back.
        </p>
        <div className="md-ctas md-reveal">
          <a className="md-btn md-btn-primary" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">
            ↓ Download Kip
          </a>
          <a className="md-btn md-btn-ghost" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">
            View the repo ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="md-footer">
        <div className="md-footer-grid">
          <div className="md-footer-brand">
            <div className="md-nav-logo" style={{ marginBottom: 14 }}>
              <EggMark /> kip
            </div>
            <p>
              A pecking-first knowledge base. The Logseq editor, plus an LLM retrieval layer that turns documents into
              a cross-linked wiki you can ask questions of.
            </p>
          </div>
          <div>
            <h4>get kip</h4>
            <a href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Download v0.4.2</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Source code</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Getting-started guide</a>
          </div>
          <div>
            <h4>community</h4>
            <a href="https://github.com/JWE24-code/kip-app/issues" target="_blank" rel="noreferrer">Report a bug</a>
            <a href="https://github.com/JWE24-code/kip-app/discussions" target="_blank" rel="noreferrer">Discussions</a>
            <a href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Changelog</a>
          </div>
          <div>
            <h4>under the shell</h4>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Security policy</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">License — AGPL-3.0</a>
          </div>
        </div>
        <div className="md-footer-base">
          <span>Kip is a fork of Logseq © Logseq, under GNU AGPL-3.0. Not affiliated with or endorsed by Logseq.</span>
          <span>made with 🥚 by JWE24-code</span>
        </div>
      </footer>

      <Switcher active="modern" />
    </div>
  )
}

export function EggMark({ small }: { small?: boolean }) {
  const s = small ? 18 : 24
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2C8.5 2 4.5 9 4.5 14.5 4.5 19 7.8 22 12 22s7.5-3 7.5-7.5C19.5 9 15.5 2 12 2Z"
        fill="#ff6b00"
        fillOpacity="0.18"
        stroke="#ff6b00"
        strokeWidth="1.6"
      />
      <circle cx="12" cy="14.5" r="3.2" fill="#ff6b00" />
    </svg>
  )
}
