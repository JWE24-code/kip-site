import { useEffect, useRef, useState } from 'react'
import Switcher from './Switcher'
import './applayout.css'

/* ---------- shared bits ---------- */

export function EggMark({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.22} viewBox="0 0 40 49" aria-hidden>
      <path
        d="M20 2C12.5 2 4.5 16 4.5 29.5 4.5 40 11 47 20 47s15.5-7 15.5-17.5C35.5 16 27.5 2 20 2Z"
        fill="#f6c12e"
      />
      <path
        d="M7 27.5c2.5-3 4.5-3 7 0s4.5 3 7 0 4.5-3 7 0 4 2.7 6 .5"
        stroke="#26211a"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  )
}

type Msg = { who: 'user' | 'kip'; text: React.ReactNode; src?: string }

const SUGGESTIONS = [
  'what did we decide about the timeline?',
  'summarize the Acme meetings',
  'what is still open for Q3?',
]

const MOCK_ANSWERS: { src: string; node: React.ReactNode }[] = [
  {
    src: 'answered from 3 pages in your nest',
    node: (
      <>
        The launch moved to <span className="al-linkchip">[[Q3 Planning]]</span> after the vendor delay noted in{' '}
        <span className="al-linkchip">[[Acme Meeting 06-12]]</span>. Design freeze stays on the 18th — see{' '}
        <span className="al-linkchip">[[Timeline]]</span>.
      </>
    ),
  },
  {
    src: 'answered from 2 pages in your nest',
    node: (
      <>
        Across <span className="al-linkchip">[[Acme Meeting 06-12]]</span> and{' '}
        <span className="al-linkchip">[[Acme Meeting 06-26]]</span>: budget was flagged twice, renewal pricing is still
        open, and the timeline moved to Q3.
      </>
    ),
  },
  {
    src: 'answered from 1 page in your nest',
    node: (
      <>
        Per <span className="al-linkchip">[[Q3 Planning]]</span>: renewal pricing and the vendor contract are the two
        open items. Everything else is frozen as of the 18th.
      </>
    ),
  },
]

/* ---------- screens ---------- */

function AskScreen() {
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const n = useRef(0)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [msgs, typing])

  const peck = (q: string) => {
    const question = q.trim()
    if (!question || typing) return
    setMsgs((m) => [...m, { who: 'user', text: question }])
    setInput('')
    setTyping(true)
    const answer = MOCK_ANSWERS[n.current % MOCK_ANSWERS.length]
    n.current += 1
    window.setTimeout(() => {
      setTyping(false)
      setMsgs((m) => [...m, { who: 'kip', text: answer.node, src: answer.src }])
    }, 1400)
  }

  const empty = msgs.length === 0

  return (
    <>
      <div className="al-screen">
        {empty ? (
          <>
            <div className="al-egg-hero">
              <EggMark size={44} />
            </div>
            <h2 className="al-h2">
              Don&rsquo;t browse your notes.
              <br />
              <i>Peck</i> them. Get answers.
            </h2>
            <p className="al-sub">
              Answered only from your nest, with <span className="al-linkchip">[[links]]</span> to the pages used.
            </p>
            <div className="al-chips">
              {SUGGESTIONS.map((s) => (
                <button key={s} className="al-chip" onClick={() => peck(s)}>
                  {s}
                </button>
              ))}
            </div>
            <div className="al-recent">
              <p className="al-recent-label">Recent pecks</p>
              <div className="al-peck">
                <p className="al-peck-q">❯ when is the design freeze?</p>
                <p className="al-peck-a">
                  On the 18th — see <span className="al-linkchip">[[Timeline]]</span>. The launch itself moved to Q3.
                </p>
                <p className="al-peck-foot">answered from 2 pages · yesterday 16:42</p>
              </div>
              <div className="al-peck">
                <p className="al-peck-q">❯ tell kip: Acme renewal call moved to friday 15h</p>
                <p className="al-peck-a">
                  Noted — filed under <span className="al-linkchip">[[Acme]]</span> and a reminder was set for friday
                  14:30 with a prep brief.
                </p>
                <p className="al-peck-foot">remembered · monday 09:12</p>
              </div>
            </div>
          </>
        ) : (
          <>
            {msgs.map((m, i) =>
              m.who === 'user' ? (
                <div key={i} className="al-msg-user">
                  {m.text}
                </div>
              ) : (
                <div key={i} className="al-msg-kip">
                  {m.text}
                  {m.src && <span className="al-src">{m.src} · ⌘↵</span>}
                </div>
              ),
            )}
            {typing && (
              <div className="al-msg-kip">
                <span className="al-typing">
                  <i /><i /><i />
                </span>
              </div>
            )}
            <div ref={endRef} />
          </>
        )}
      </div>
      <form
        className="al-composer"
        onSubmit={(e) => {
          e.preventDefault()
          peck(input)
        }}
      >
        <input
          className="al-input"
          placeholder="Ask your nest a question…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="al-peckbtn" type="submit">
          Peck
        </button>
      </form>
    </>
  )
}

const NEST: { kind: string; name: string; meta: string }[] = [
  { kind: 'entity', name: 'Acme', meta: '12 blocks' },
  { kind: 'entity', name: 'JWE24-code', meta: '4 blocks' },
  { kind: 'concept', name: 'Timeline', meta: '8 blocks' },
  { kind: 'concept', name: 'Renewal pricing', meta: '3 blocks' },
  { kind: 'source', name: 'q3-plan.md', meta: 'hatched 06-28' },
  { kind: 'source', name: 'acme-meeting-06-12.md', meta: 'hatched 06-12' },
  { kind: 'source', name: 'acme-meeting-06-26.md', meta: 'hatched 06-26' },
]

function ReadScreen() {
  const [q, setQ] = useState('')
  const groups = ['entity', 'concept', 'source']
  return (
    <div className="al-screen">
      <div className="al-search">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8a7d6b" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        <input placeholder="Search the nest…" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      {groups.map((g) => {
        const pages = NEST.filter((p) => p.kind === g && p.name.toLowerCase().includes(q.toLowerCase()))
        if (pages.length === 0) return null
        return (
          <div key={g}>
            <p className="al-group-label">{g} pages</p>
            {pages.map((p) => (
              <div className="al-page" key={p.name}>
                <span className="al-page-kind">[[{p.kind}]]</span>
                <span className="al-page-name">{p.name}</span>
                <span className="al-page-meta">{p.meta}</span>
              </div>
            ))}
          </div>
        )
      })}
      <p className="al-foot-note">
        nest/ · 7 pages · groomed today 08:00
        <br />
        all health checks passing
      </p>
    </div>
  )
}

function CaptureScreen() {
  const [laid, setLaid] = useState<string[]>([])
  const [note, setNote] = useState('')
  const lay = (what: string) => setLaid((l) => [what, ...l].slice(0, 3))
  return (
    <div className="al-screen">
      <button className="al-drop" onClick={() => lay('vendor-contract.pdf')}>
        <EggMark size={40} />
        <h3>Drop an egg</h3>
        <p>
          Markdown, text, Word, Excel, PowerPoint or PDF.
          <br />
          Office and PDF files are converted to Markdown on the way in.
        </p>
        <p className="al-mono" style={{ marginTop: 12 }}>tap to simulate a drop</p>
      </button>
      <div className="al-quick">
        <button className="al-quickbtn" onClick={() => lay('photo — whiteboard sketch')}>
          <svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="14" rx="2" /><circle cx="12" cy="13" r="3.5" /><path d="M8 6l1.5-2.5h5L16 6" /></svg>
          Photo
        </button>
        <button className="al-quickbtn" onClick={() => lay('voice memo 00:42')}>
          <svg viewBox="0 0 24 24"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
          Voice memo
        </button>
        <button className="al-quickbtn" onClick={() => lay('link — vendor press release')}>
          <svg viewBox="0 0 24 24"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5" /><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5" /></svg>
          Save a link
        </button>
        <button className="al-quickbtn" onClick={() => lay('file — q3-budget.xlsx')}>
          <svg viewBox="0 0 24 24"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" /><path d="M14 3v5h5" /></svg>
          Pick a file
        </button>
      </div>
      <textarea
        className="al-note"
        placeholder="Or just tell Kip something — “I have a meeting with Acme on Friday at 15h”…"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey && note.trim()) {
            e.preventDefault()
            lay(`note — “${note.trim().slice(0, 34)}${note.trim().length > 34 ? '…' : ''}”`)
            setNote('')
          }
        }}
      />
      {laid.map((l, i) => (
        <div className="al-laid" key={l + i}>
          <EggMark size={22} />
          <div>
            <span>{l}</span>
            <p className="al-mono" style={{ margin: '2px 0 0' }}>laid in eggs/ · ready to hatch</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function SettingsScreen() {
  const [provider, setProvider] = useState('local')
  const providers = [
    { id: 'anthropic', label: 'Anthropic', meta: 'api key' },
    { id: 'openai', label: 'OpenAI', meta: 'api key' },
    { id: 'deepseek', label: 'DeepSeek', meta: 'api key' },
    { id: 'local', label: 'Local — Ollama', meta: 'on-device' },
  ]
  return (
    <div className="al-screen">
      <div className="al-set-group">
        <p className="al-set-label">LLM provider</p>
        {providers.map((p) => (
          <div
            key={p.id}
            className={`al-radio ${provider === p.id ? 'al-on' : ''}`}
            onClick={() => setProvider(p.id)}
          >
            <span className="al-radio-dot" />
            {p.label}
            <span className="al-mono">{p.meta}</span>
          </div>
        ))}
        {provider === 'local' && <p className="al-ok">✓ connection tested — all traffic stays on this device</p>}
      </div>
      <div className="al-set-group">
        <p className="al-set-label">Nest</p>
        <div className="al-set-row"><span>Graph folder</span><span className="al-mono">~/kip-graph</span></div>
        <div className="al-set-row"><span>Dropbox sync</span><span className="al-mono">off</span></div>
        <div className="al-set-row"><span>Groom schedule</span><span className="al-mono">daily 08:00</span></div>
      </div>
      <div className="al-set-group">
        <p className="al-set-label">Reminders</p>
        <div className="al-set-row"><span>OS notifications</span><span className="al-mono">on</span></div>
        <div className="al-set-row"><span>Calendar (ICS)</span><span className="al-mono">not subscribed</span></div>
      </div>
      <p className="al-foot-note">
        kip v0.4.2 · free · agpl-3.0
        <br />
        made with 🥚 by JWE24-code
      </p>
    </div>
  )
}

/* ---------- shell ---------- */

const TABS = [
  {
    id: 'ask', label: 'ASK',
    icon: <svg viewBox="0 0 24 24"><path d="M4 6h16M4 12h10M4 18h7" /></svg>,
  },
  {
    id: 'read', label: 'READ',
    icon: <svg viewBox="0 0 24 24"><path d="M12 5c-2-1.5-5-2-8-2v15c3 0 6 .5 8 2 2-1.5 5-2 8-2V3c-3 0-6 .5-8 2Z" /><path d="M12 5v15" /></svg>,
  },
  {
    id: 'capture', label: 'CAPTURE',
    icon: <svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14" /></svg>,
  },
  {
    id: 'settings', label: 'SETTINGS',
    icon: <svg viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="3" /><circle cx="12" cy="12" r="3" /></svg>,
  },
]

export default function AppLayout() {
  const [tab, setTab] = useState('ask')
  const titles: Record<string, string> = { ask: 'ASK', read: 'THE NEST', capture: 'CAPTURE', settings: 'SETTINGS' }

  return (
    <div className="al-root">
      <div className="al-stage-head">
        <span className="al-mono">🐤 kip pwa — new app layout</span>
        <a href="#/">← all proposals</a>
      </div>
      <p className="al-stage-sub">
        A redesigned shell for the Kip mobile app, in the same cream-and-egg style as the current PWA.{' '}
        <b>It&rsquo;s interactive</b> — peck a question, search the nest, drop an egg, switch providers. On a phone it
        goes full-bleed.
      </p>

      <div className="al-phone">
        <div className="al-status">
          <span>21:57</span>
          <span>kip · pwa</span>
        </div>
        <header className="al-apphead">
          <div className="al-apphead-left">
            <EggMark size={24} />
            <span className="al-apphead-title">{titles[tab]}</span>
          </div>
          <div className="al-sync">
            <span className={`al-sync-dot ${tab === 'ask' ? 'al-warn' : ''}`} />
            {tab === 'ask' ? 'not synced' : 'synced'}
          </div>
        </header>

        {tab === 'ask' && <AskScreen />}
        {tab === 'read' && <ReadScreen />}
        {tab === 'capture' && <CaptureScreen />}
        {tab === 'settings' && <SettingsScreen />}

        <nav className="al-tabs">
          {TABS.map((t) => (
            <button key={t.id} className={`al-tab ${tab === t.id ? 'al-on' : ''}`} onClick={() => setTab(t.id)}>
              {t.icon}
              {t.label}
              <span className="al-tab-dot" />
            </button>
          ))}
        </nav>
      </div>

      <Switcher active="app" />
    </div>
  )
}
