import { useEffect, useState } from 'react'
import './professional.css'

function useFade() {
  useEffect(() => {
    const els = document.querySelectorAll('.pf-fade')
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('pf-in')),
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

function Dot({ c }: { c: string }) {
  return <span style={{ width: 10, height: 10, borderRadius: '50%', background: c, display: 'inline-block' }} />
}

function EggLogo({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="6" fill="var(--acc)" />
      <path
        d="M12 5.2c-2.2 0-4.6 3.4-4.6 7 0 2.8 2 4.6 4.6 4.6s4.6-1.8 4.6-4.6c0-3.6-2.4-7-4.6-7Z"
        fill="#fff"
        fillOpacity="0.92"
      />
      <circle cx="12" cy="12.4" r="1.7" fill="var(--acc)" />
    </svg>
  )
}

export default function Professional() {
  const [dark, setDark] = useState(false)
  useFade()

  return (
    <div className={`pf-root ${dark ? 'pf-dark' : ''}`}>
      <div className="pf-layout">
        {/* ===== sticky sidebar ===== */}
        <aside className="pf-side">
          <div>
            <div className="pf-logo">
              <EggLogo size={22} />
              kip
            </div>
            <p className="pf-tagline">
              A pecking-first knowledge base. The Logseq editor, plus an LLM retrieval layer that turns documents into a
              cross-linked wiki you can ask questions of.
            </p>
          </div>

          <nav className="pf-index">
            <span className="pf-index-label">Index</span>
            <a href="#pf-how"><span className="pf-no">01</span> How it works</a>
            <a href="#pf-inside"><span className="pf-no">02</span> What&rsquo;s inside</a>
            <a href="#pf-install"><span className="pf-no">03</span> Install</a>
            <a href="#pf-start"><span className="pf-no">04</span> First five minutes</a>
            <a href="#pf-honest"><span className="pf-no">05</span> Said plainly</a>
          </nav>

          <div className="pf-side-foot">
            <div className="pf-toggle-row">
              <button className="pf-toggle" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">
                <span className="pf-knob">{dark ? '🌙' : '☀️'}</span>
              </button>
              <span className="pf-toggle-label">{dark ? 'dark' : 'light'}</span>
            </div>
            <div className="pf-ver">
              v0.5 · free · agpl-3.0
              <br />
              windows 10/11 x64 · linux x64
              <br />
              <a href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">github↗</a>
            </div>
          </div>
        </aside>

        {/* ===== main column ===== */}
        <main className="pf-main">
          {/* hero */}
          <section className="pf-block pf-imgfade">
            <span className="pf-eyebrow">Kip · knowledge base with an LLM retrieval layer</span>
            <h1 className="pf-h1">
              Don&rsquo;t browse your notes. <em>Peck</em> them. Get answers.
            </h1>
            <p className="pf-lead">
              Every document you feed Kip becomes part of a cross-linked wiki — <b>the nest</b> — built from entity,
              concept, source and person pages that cite each other. It opens straight into a chat prompt; the editor is
              a mode you toggle into.
            </p>
            <div className="pf-pills">
              <a className="pf-pill pf-pill-acc" href="#pf-install">↓ Download Kip</a>
              <a className="pf-pill" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">Star on GitHub ↗</a>
              <a className="pf-pill" href="#pf-how">How it works</a>
            </div>
            <p className="pf-meta">windows 10/11 x64 · linux x64 · free · agpl-3.0 · no account</p>
          </section>

          {/* 01 how it works */}
          <section className="pf-block" id="pf-how">
            <div className="pf-fade">
              <span className="pf-sec-no">01</span>
              <h2 className="pf-h2">Drop an egg. Hatch a nest. Peck for answers.</h2>
              <p className="pf-h2-sub">
                The lifecycle of an idea in Kip: four verbs, one folder. Documents go in, a queryable wiki comes out —
                and read-only health checks keep it trustworthy as it grows.
              </p>
            </div>
            <div className="pf-rows pf-fade">
              <div className="pf-row">
                <span className="pf-row-no">EGG</span>
                <h3>Drop it in</h3>
                <p>
                  Drag a Markdown, text, Word, Excel, PowerPoint or PDF file onto the window — or drop it in{' '}
                  <code>pages/</code>. Office and PDF files are converted to Markdown on the way in.
                </p>
              </div>
              <div className="pf-row">
                <span className="pf-row-no">HATCH</span>
                <h3>It becomes pages</h3>
                <p>
                  Hatch sources turns each document into a set of linked <code>entity</code>, <code>concept</code>,{' '}
                  <code>source</code> and <code>person</code> pages — the nest. A named person becomes a{' '}
                  <code>person</code> page with their email, role and org, and shows up in the People panel — your
                  addressbook.
                </p>
              </div>
              <div className="pf-row">
                <span className="pf-row-no">PECK</span>
                <h3>Ask the nest</h3>
                <p>
                  Type a question; answers cite the <code>[[pages]]</code> they came from. Or tell Kip a fact, or about
                  an upcoming meeting.
                </p>
              </div>
              <div className="pf-row">
                <span className="pf-row-no">GROOM</span>
                <h3>Keep it tidy</h3>
                <p>Read-only health checks run over the generated wiki, so the nest stays trustworthy as it grows.</p>
              </div>
            </div>

            <div className="pf-split pf-fade">
              <div className="pf-panel">
                <div className="pf-panel-bar">
                  <Dot c="#ff5f57" /><Dot c="#febc2e" /><Dot c="#28c840" />
                  <span className="pf-panel-title">kip — peck</span>
                </div>
                <div className="pf-panel-body">
                  <div className="pf-q">❯ what did we decide about the timeline?</div>
                  The launch moved to <span className="pf-link">[[Q3 Planning]]</span> after the vendor delay noted in{' '}
                  <span className="pf-link">[[Acme Meeting 06-12]]</span>. Design freeze stays on the 18th — see{' '}
                  <span className="pf-link">[[Timeline]]</span>.
                </div>
                <div className="pf-panel-foot">
                  <span>answered from 3 pages in your nest</span>
                  <span>⌘↵</span>
                </div>
              </div>
              <div>
                <h3>Chat-first, editor always one key away</h3>
                <p>
                  Kip doesn&rsquo;t reinvent your notes — it inherits them. Everything you know from Logseq works
                  exactly as you expect: Markdown notes &amp; journals, whiteboards, block references and backlinks,
                  untouched. Press Ctrl/⌘ + 1 to toggle the editor.
                </p>
                <p>
                  Mid-answer, a bounded skill loop can run real tasks — search the web, read a spreadsheet from your
                  disk, build a Word doc or a deck from your notes — then fold the result back into the reply.
                </p>
              </div>
            </div>
          </section>

          {/* 02 inside */}
          <section className="pf-block" id="pf-inside">
            <div className="pf-fade">
              <span className="pf-sec-no">02</span>
              <h2 className="pf-h2">Your nest, your machine</h2>
              <p className="pf-h2-sub">
                Privacy is a configuration, not a promise. Pick a hosted provider, or keep every byte on-device.
              </p>
            </div>
            <div className="pf-split pf-fade">
              <div>
                <h3>Reminders &amp; calendar</h3>
                <p>
                  Tell Kip what&rsquo;s coming in plain words — <em>&ldquo;I have a meeting with Acme on Friday at
                  15h&rdquo;</em> — done, that&rsquo;s the whole interface. It sets an OS notification and hands you a
                  prep brief assembled from the relevant pages in your nest. Google / Outlook / Fastmail ICS links pull
                  events in the same way.
                </p>
              </div>
              <div>
                <h3>Provider choice</h3>
                <p>
                  Anthropic, OpenAI and DeepSeek are hosted services that receive your content. Don&rsquo;t want that?
                  Local via Ollama keeps everything on-device. Your graph is a plain folder — plain Markdown, no
                  lock-in — with optional Dropbox sync across machines.
                </p>
                <ul className="pf-checklist">
                  <li>Local provider (Ollama) keeps everything on-device</li>
                  <li>Plain Markdown graph — no lock-in</li>
                  <li>Notes sync; search cache and API keys stay on-device</li>
                </ul>
              </div>
              <div>
                <h3>People &amp; the addressbook</h3>
                <p>
                  Kip recognises the people in what you read and file them as <code>person</code> pages — name, email,
                  org, role — deduped by email. The People panel is a filterable addressbook, and a follow-up like
                  &ldquo;check back with Joeri on Friday&rdquo; links straight back to the person&rsquo;s page.
                </p>
              </div>
            </div>
          </section>

          {/* 03 install */}
          <section className="pf-block" id="pf-install">
            <div className="pf-fade">
              <span className="pf-sec-no">03</span>
              <h2 className="pf-h2">A real installer. No account.</h2>
              <p className="pf-h2-sub">
                A signed Windows installer or a self-updating Linux AppImage — the in-app banner updates you to the next
                release in place.
              </p>
            </div>
            <div className="pf-split pf-fade">
              <div>
                <h3>Windows 10 / 11 · x64</h3>
                <p>Download the installer and run it — per-user, no admin prompt, start-menu shortcut. Updates itself from there.</p>
                <div className="pf-pills">
                  <a className="pf-pill pf-pill-acc" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">↓ Kip-Setup.exe</a>
                </div>
                <p className="pf-meta" style={{ maxWidth: '44ch', lineHeight: 1.7 }}>
                  Signed with a self-issued certificate: SmartScreen still says &ldquo;Windows protected your PC&rdquo;.
                  Click More info → Run anyway.
                </p>
              </div>
              <div>
                <h3>Linux · x64 · AppImage</h3>
                <p>Make it executable and run — it updates itself. A portable tar.gz is on the releases page too.</p>
                <div className="pf-pills">
                  <a className="pf-pill pf-pill-acc" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">↓ Kip-*.AppImage</a>
                </div>
                <p className="pf-meta" style={{ maxWidth: '44ch', lineHeight: 1.7 }}>
                  chmod +x Kip-*.AppImage && ./Kip-*.AppImage
                  <br />
                  Wayland (Hyprland etc.): --ozone-platform-hint=auto
                </p>
              </div>
            </div>
          </section>

          {/* 04 first five minutes */}
          <section className="pf-block" id="pf-start">
            <div className="pf-fade">
              <span className="pf-sec-no">04</span>
              <h2 className="pf-h2">From zero to first peck</h2>
              <p className="pf-h2-sub">The first five minutes, in order.</p>
            </div>
            <div className="pf-steps pf-fade">
              <div className="pf-step"><div><h4>Open a folder as your graph</h4><p>Everything Kip creates — <code>pages/</code>, <code>nest/</code>, <code>clucks/</code> — lives inside it.</p></div></div>
              <div className="pf-step"><div><h4>Set an LLM provider</h4><p>Settings → LLM: Anthropic, OpenAI or DeepSeek (API key), or Local via Ollama. Hit <code>Test connection</code>.</p></div></div>
              <div className="pf-step"><div><h4>Drop a document</h4><p>Put a <code>.md</code> or <code>.txt</code> file into <code>&lt;graph&gt;/pages/</code>.</p></div></div>
              <div className="pf-step"><div><h4>Hatch it</h4><p>Header &ldquo;…&rdquo; menu → Hatch sources → Start. It becomes pages under The Nest.</p></div></div>
              <div className="pf-step"><div><h4>Peck</h4><p>Type a question in the prompt. Answers link back to the pages they came from.</p></div></div>
              <div className="pf-step"><div><h4>Toggle the editor</h4><p><code>Ctrl/⌘ + 1</code> whenever you want to read or write notes directly.</p></div></div>
            </div>
          </section>

          {/* 05 said plainly */}
          <section className="pf-block" id="pf-honest">
            <div className="pf-fade">
              <span className="pf-sec-no">05</span>
              <h2 className="pf-h2">v0.5: early, rough, and looking for feedback</h2>
              <p className="pf-h2-sub">
                Kip is a personal project at the beginning of its life. Here&rsquo;s exactly what that means, so you can
                decide with open eyes.
              </p>
            </div>
            <div className="pf-table pf-fade">
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Windows + Linux x64 only.</b> No macOS build, no mobile.</span></div>
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Self-issued signing certificate.</b> There&rsquo;s an installer and in-app updates now, but SmartScreen still warns until there&rsquo;s a real cert.</span></div>
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Needs an LLM provider configured</b> — without one, Hatch and Peck don&rsquo;t work.</span></div>
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Skills run unsandboxed with your privileges</b> — one you add yourself is like running a shell script.</span></div>
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Expect bugs and breaking changes.</b> It&rsquo;s v0.5, and it means it.</span></div>
              <div className="pf-tr"><span className="pf-x">✕</span><span><b>Honest bit:</b> <span className="pf-inline-code">.henhouse/llm.json</span> stores API keys in plaintext — keep that folder out of synced locations and version control.</span></div>
            </div>
            <p className="pf-fade" style={{ color: 'var(--mut)', fontSize: 14, marginTop: 24, lineHeight: 1.7 }}>
              → Which is where you come in. Bugs and ideas go to{' '}
              <a href="https://github.com/JWE24-code/kip-app/issues" target="_blank" rel="noreferrer" style={{ color: 'var(--acc)' }}>Issues</a>;
              questions and general feedback to{' '}
              <a href="https://github.com/JWE24-code/kip-app/discussions" target="_blank" rel="noreferrer" style={{ color: 'var(--acc)' }}>Discussions</a>.
            </p>
          </section>

          {/* cobalt band */}
          <section className="pf-block pf-band">
            <span className="pf-eyebrow" style={{ color: 'rgba(255,255,255,0.7)' }}>Free · open source · AGPL-3.0</span>
            <h2 className="pf-h2">Come peck around.</h2>
            <p>One folder away from knowing what your notes would say back.</p>
            <div className="pf-pills">
              <a className="pf-pill" href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">↓ Download Kip</a>
              <a className="pf-pill pf-pill-ghost" href="https://github.com/JWE24-code/kip-app" target="_blank" rel="noreferrer">View the repo ↗</a>
            </div>
          </section>

          {/* footer */}
          <footer className="pf-footer">
            <div className="pf-foot-grid">
              <div className="pf-foot-brand">
                <div className="pf-logo" style={{ marginBottom: 12 }}>
                  <EggLogo size={20} />
                  kip
                </div>
                <p>A pecking-first knowledge base. The Logseq editor, plus an LLM retrieval layer.</p>
              </div>
              <div>
                <h5>get kip</h5>
                <a href="https://github.com/JWE24-code/kip-app/releases" target="_blank" rel="noreferrer">Download</a>
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
            </div>
            <div className="pf-foot-base">
              <span>Kip is a fork of Logseq © Logseq, under GNU AGPL-3.0. Not affiliated with or endorsed by Logseq.</span>
              <span>made with 🥚 by JWE24-code</span>
            </div>
          </footer>
        </main>
      </div>
    </div>
  )
}
