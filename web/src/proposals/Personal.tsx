import { useEffect } from 'react'
import Switcher from './Switcher'
import './personal.css'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.ps-reveal')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('ps-in')),
      { threshold: 0.12 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Dot({ c }: { c: string }) {
  return <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />
}

/* 5x5 crossword easter egg: KIP / EGG / NEST / PECK hidden in the grid */
const CROSS: (string | null)[] = [
  'P', 'E', 'C', 'K', null,
  null, 'G', null, 'I', null,
  'N', 'E', 'S', 'T', null,
  null, 'G', null, 'P', null,
  'E', 'G', 'G', null, null,
]

export default function Personal() {
  useReveal()
  const today = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

  return (
    <div className="ps-root">
      {/* masthead */}
      <header className="ps-masthead">
        <div className="ps-masthead-top">
          <span>Vol. 0 — No. 42</span>
          <span>{today}</span>
          <span>Price: free · AGPL-3.0</span>
        </div>
        <div className="ps-masthead-main">
          <div className="ps-wordmark">
            The Kip <i>Gazette</i>
          </div>
          <nav className="ps-mastnav">
            <a href="#ps-how">How it works</a>
            <a href="#ps-inside">Inside the shell</a>
            <a href="#ps-install">Install</a>
            <a href="#ps-letters">Letters</a>
            <a className="ps-nav-cta" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="ps-hero">
        <div className="ps-reveal ps-in">
          <p className="ps-vol">Late edition · v0.4.2 · a fork of Logseq with an LLM retrieval layer</p>
          <h1 className="ps-h1">
            Don&rsquo;t browse your notes. <span className="ps-italic">Peck</span> them. <span className="ps-mark">Get answers.</span>
          </h1>
          <p className="ps-lede">
            Kip is the full Logseq editor — Markdown notes, journals, whiteboards, block references, unchanged — plus a
            layer that turns documents you drop in into a <b>cross-linked wiki you can ask questions of</b>. It opens
            straight into a chat prompt; the editor is a mode you toggle into.
          </p>
          <div className="ps-ctas">
            <a className="ps-btn ps-btn-acc" href="#ps-install">Download Kip</a>
            <a className="ps-btn ps-btn-line" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Star on GitHub ↗</a>
          </div>
          <p className="ps-fine">windows 10/11 x64 · linux x64 · free · agpl-3.0</p>
        </div>

        <div className="ps-chat-wrap">
          <div className="ps-chat">
            <div className="ps-chat-bar">
              <Dot c="#ff5f57" /><Dot c="#febc2e" /><Dot c="#28c840" />
              <span className="ps-mono">kip — peck</span>
            </div>
            <div className="ps-chat-body">
              <div className="ps-chat-q">❯ what did we decide about the timeline?</div>
              The launch moved to <span className="ps-link">[[Q3 Planning]]</span> after the vendor delay noted in{' '}
              <span className="ps-link">[[Acme Meeting 06-12]]</span>. Design freeze stays on the 18th — see{' '}
              <span className="ps-link">[[Timeline]]</span>.
            </div>
            <div className="ps-chat-foot">
              <span>answered from 3 pages in your nest</span>
              <span>⌘↵</span>
            </div>
          </div>
          <div className="ps-chip ps-chip-1"><b>peck</b> — ask · tell · delegate</div>
          <div className="ps-chip ps-chip-2"><b>groom</b> — read-only health checks</div>
        </div>
      </section>

      {/* 01 — lifecycle, newspaper columns */}
      <section className="ps-section" id="ps-how">
        <div className="ps-rule-head">
          <h2>The lifecycle of an idea</h2>
          <span className="ps-mono">Section 01</span>
        </div>
        <p className="ps-sec-intro">
          Drop an egg. Hatch a nest. Peck for answers. Every document you feed Kip becomes part of a cross-linked wiki —
          &ldquo;the nest&rdquo; — built from entity, concept and source pages that cite each other.
        </p>
        <div className="ps-cols ps-reveal">
          <div className="ps-col-item">
            <span className="ps-col-verb">Egg — drop it in</span>
            <h3>Feed it anything</h3>
            <p className="ps-dropcap">
              Drag a Markdown, text, Word, Excel, PowerPoint or PDF file onto the window — or drop it in <code>eggs/</code>.
              Office and PDF files are converted to Markdown on the way in.
            </p>
          </div>
          <div className="ps-col-item">
            <span className="ps-col-verb">Hatch — it becomes pages</span>
            <h3>Hatch sources</h3>
            <p>
              Hatch sources turns each document into a set of linked <code>entity</code>, <code>concept</code> and{' '}
              <code>source</code> pages — the nest. The wiki builds itself; you just keep feeding it.
            </p>
          </div>
          <div className="ps-col-item">
            <span className="ps-col-verb">Peck — ask the nest</span>
            <h3>Answers with a pedigree</h3>
            <p>
              Type a question; answers cite the <code>[[pages]]</code> they came from. Or tell Kip a fact, or about an
              upcoming meeting — it files everything where it belongs.
            </p>
          </div>
          <div className="ps-col-item">
            <span className="ps-col-verb">Groom — keep it tidy</span>
            <h3>A trustworthy nest</h3>
            <p>
              Read-only health checks run over the generated wiki, so the nest stays trustworthy as it grows. Groom
              reports; it never edits.
            </p>
          </div>
        </div>
      </section>

      {/* 02 — inside the shell */}
      <section className="ps-section" id="ps-inside">
        <div className="ps-rule-head">
          <h2>What&rsquo;s inside the shell</h2>
          <span className="ps-mono">Section 02</span>
        </div>

        <div className="ps-spread ps-reveal">
          <div className="ps-spread-text">
            <span className="ps-spread-kicker">The editor</span>
            <h3>The whole Logseq, unchanged.</h3>
            <p>
              Kip doesn&rsquo;t reinvent your notes — it inherits them. Everything you know from Logseq works exactly as
              you expect. Chat-first, editor always one key away: Ctrl/⌘ + 1.
            </p>
            <ul className="ps-stars">
              <li>Markdown notes &amp; journals, outliner and all</li>
              <li>Whiteboards for when text runs out</li>
              <li>Block references and backlinks, untouched</li>
            </ul>
          </div>
          <pre className="ps-tree">
{`your graph/
├─ `}<span className="ps-acc">eggs/</span>{`    `}<span className="ps-dim">← drop documents here</span>{`
├─ `}<span className="ps-acc">nest/</span>{`    `}<span className="ps-dim">← hatched wiki pages</span>{`
│  ├─ entity___Acme.md
│  ├─ concept___Timeline.md
│  └─ source___q3-plan.md
├─ `}<span className="ps-acc">clucks/</span>{`  `}<span className="ps-dim">← Kip&rsquo;s working notes</span>{`
├─ journals/
└─ pages/`}
          </pre>
        </div>

        <div className="ps-spread ps-flip ps-reveal">
          <div className="ps-spread-text">
            <span className="ps-spread-kicker">The skill loop</span>
            <h3>Pecks that do things.</h3>
            <p>
              Mid-answer, a bounded skill loop can run real tasks against the real world — then fold the result back
              into the reply. Bounded by design — your own skills run with your privileges, so treat them like shell
              scripts.
            </p>
            <ul className="ps-stars">
              <li>Search the web while answering you</li>
              <li>Read a spreadsheet from your disk</li>
              <li>Build a Word doc or a deck from your notes</li>
            </ul>
          </div>
          <div className="ps-panel">
            <div className="ps-panel-hd"><span>peck — with skills</span><span>❯</span></div>
            <div className="ps-panel-bd">
              <p className="ps-mono" style={{ margin: '0 0 12px', color: 'var(--ink)' }}>❯ make a deck of the Acme decisions</p>
              <p className="ps-mono" style={{ margin: 0 }}>
                → reading <span className="ps-link">[[Acme Meeting 06-12]]</span>
                <br />→ reading <span className="ps-link">[[Q3 Planning]]</span>
                <br />→ skill: build-slides (node subprocess)
                <br /><span style={{ color: '#2e7d32' }}>✓ acme-decisions.pptx — 9 slides, every claim cited to a page</span>
              </p>
            </div>
          </div>
        </div>

        <div className="ps-spread ps-reveal">
          <div className="ps-spread-text">
            <span className="ps-spread-kicker">Reminders &amp; calendar</span>
            <h3>It remembers before you need it.</h3>
            <p>
              Tell Kip what&rsquo;s coming in plain words — it sets an OS notification and, when the moment approaches,
              hands you a prep brief pulled from your own notes. Google / Outlook / Fastmail ICS links pull your events
              in the same way.
            </p>
          </div>
          <div className="ps-panel" style={{ transform: 'rotate(-1deg)' }}>
            <div className="ps-panel-hd"><span>🐤 notification — friday 14:30</span><span>kip · reminder</span></div>
            <div className="ps-panel-bd">
              <b style={{ fontFamily: "'Playfair Display', serif", fontSize: 17 }}>Acme meeting in 30 min</b>
              <p className="ps-mono" style={{ margin: '10px 0 0' }}>
                Prep brief from your nest:
                <br />• Timeline moved to Q3 (<span className="ps-link">[[Q3 Planning]]</span>)
                <br />• Budget flagged twice (<span className="ps-link">[[Acme Meeting 06-12]]</span>)
                <br />• Open question: renewal pricing
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* pull quote */}
      <div className="ps-pull ps-reveal">
        <blockquote>
          &ldquo;Your nest, <span>your machine</span>. Your notes and questions go to whichever LLM provider you
          configure — don&rsquo;t want that? You don&rsquo;t have to have it.&rdquo;
        </blockquote>
        <cite>— the privacy column: local via ollama, plain markdown, optional dropbox sync</cite>
      </div>

      {/* install */}
      <section className="ps-section" id="ps-install">
        <div className="ps-rule-head">
          <h2>A real installer. No account.</h2>
          <span className="ps-mono">Section 03</span>
        </div>
        <div className="ps-install ps-reveal">
          <div className="ps-install-row">
            <h3>Windows 10 / 11 · x64</h3>
            <p>
              Download the installer and run it — per-user, no admin prompt, start-menu shortcut. Updates itself from
              there.
              <span className="ps-mono">Self-issued certificate: SmartScreen says &ldquo;Windows protected your PC&rdquo; → More info → Run anyway.</span>
            </p>
            <a className="ps-btn ps-btn-acc" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">↓ Kip-Setup.exe</a>
          </div>
          <div className="ps-install-row">
            <h3>Linux · x64 · AppImage</h3>
            <p>
              Make it executable and run — it updates itself. A portable tar.gz is on the releases page too.
              <span className="ps-mono">chmod +x Kip-*.AppImage && ./Kip-*.AppImage · Wayland: --ozone-platform-hint=auto</span>
            </p>
            <a className="ps-btn ps-btn-acc" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">↓ Kip-*.AppImage</a>
          </div>
        </div>
      </section>

      {/* letters to the editor — the honest bit */}
      <section className="ps-section" id="ps-letters">
        <div className="ps-rule-head">
          <h2>Said plainly</h2>
          <span className="ps-mono">Section 04 · letters to the editor</span>
        </div>
        <p className="ps-sec-intro">
          v0.4: early, rough, and looking for feedback. Kip is a personal project at the beginning of its life.
          Here&rsquo;s exactly what that means, so you can decide with open eyes.
        </p>
        <div className="ps-letters ps-reveal">
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Windows + Linux x64 only.</b> No macOS build, no mobile.</p></div>
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Self-issued signing certificate.</b> There&rsquo;s an installer and in-app updates now, but SmartScreen still warns until there&rsquo;s a real cert.</p></div>
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Needs an LLM provider configured</b> — without one, Hatch and Peck don&rsquo;t work.</p></div>
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Skills run unsandboxed with your privileges</b> — one you add yourself is like running a shell script.</p></div>
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Expect bugs and breaking changes.</b> It&rsquo;s v0.4, and it means it.</p></div>
          <div className="ps-letter"><span className="ps-x">✕</span><p><b>Honest bit:</b> .henhouse/llm.json stores API keys in plaintext — keep that folder out of synced locations and version control.</p></div>
        </div>
        <p className="ps-reveal" style={{ maxWidth: 720, margin: '28px auto 0', fontSize: 13.5, lineHeight: 1.7 }}>
          → Which is where you come in. Bugs and ideas go to{' '}
          <a href="https://github.com/JWE24-code/kip-app/issues" target="_blank" rel="noreferrer" style={{ color: 'var(--acc)' }}>Issues</a>;
          questions and general feedback to{' '}
          <a href="https://github.com/JWE24-code/kip-app/discussions" target="_blank" rel="noreferrer" style={{ color: 'var(--acc)' }}>Discussions</a>.
        </p>
      </section>

      {/* final */}
      <section className="ps-final">
        <h2 className="ps-reveal">Come <i>peck</i> around.</h2>
        <p className="ps-reveal">
          Free, open source (AGPL-3.0), and one folder away from knowing what your notes would say back.
        </p>
        <div className="ps-ctas ps-reveal" style={{ justifyContent: 'center' }}>
          <a className="ps-btn ps-btn-acc" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Download Kip</a>
          <a className="ps-btn ps-btn-line" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">View the repo ↗</a>
        </div>
      </section>

      {/* footer with crossword */}
      <footer className="ps-footer">
        <div className="ps-foot-grid">
          <div className="ps-foot-brand">
            <div className="ps-wordmark" style={{ color: 'var(--paper)', fontSize: 24, marginBottom: 12 }}>
              The Kip <i>Gazette</i>
            </div>
            <p>
              A pecking-first knowledge base. The Logseq editor, plus an LLM retrieval layer that turns documents into a
              cross-linked wiki you can ask questions of.
            </p>
          </div>
          <div>
            <h5>get kip</h5>
            <a href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Download v0.4.2</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Source code</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Getting-started guide</a>
          </div>
          <div>
            <h5>community</h5>
            <a href="https://github.com/JWE24-code/kip-app/issues" target="_blank" rel="noreferrer">Report a bug</a>
            <a href="https://github.com/JWE24-code/kip-app/discussions" target="_blank" rel="noreferrer">Discussions</a>
            <a href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Changelog</a>
          </div>
          <div>
            <h5>under the shell</h5>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Security policy</a>
            <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">License — AGPL-3.0</a>
          </div>
          <div>
            <h5>today&rsquo;s puzzle</h5>
            <div className="ps-cross">
              {CROSS.map((c, i) =>
                c ? <span key={i}>{c}</span> : <span key={i} className="ps-blk" />,
              )}
            </div>
            <p className="ps-cross-note">1-across: what kip does best</p>
          </div>
        </div>
        <div className="ps-foot-base">
          <span>Kip is a fork of Logseq © Logseq, under GNU AGPL-3.0. Not affiliated with or endorsed by Logseq.</span>
          <span>made with 🥚 by JWE24-code</span>
        </div>
      </footer>

      <Switcher active="personal" />
    </div>
  )
}
