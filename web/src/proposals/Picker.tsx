const proposals = [
  {
    id: 'personal',
    no: '03',
    name: 'The Kip Gazette',
    tag: 'Personal',
    desc: 'Warm paper, a 90s editorial serif, issue numbers and a crossword in the footer. Keeps the chicken charm and the maker\u2019s voice front and center.',
    palette: ['#ece4d9', '#fffbf5', '#f54001', '#4f483e'],
    font: 'Playfair Display + Inter + JetBrains Mono',
  },
  {
    id: 'modern',
    no: '01',
    name: 'Night Henhouse',
    tag: 'Modern',
    desc: 'Near-black developer-tool aesthetic. Terminal typing, ember particles, a single yolk-orange accent. Feels like the app itself.',
    palette: ['#0a0a0a', '#181412', '#ff6b00', '#cbc6b9'],
    font: 'Space Grotesk + JetBrains Mono',
  },
  {
    id: 'professional',
    no: '02',
    name: 'Split Roost',
    tag: 'Professional',
    desc: 'Swiss split-screen with a sticky index sidebar, cobalt accent, dark/light toggle. Docs-grade restraint for a tool you trust with your notes.',
    palette: ['#e1dedc', '#0148c6', '#000000', '#2e3a40'],
    font: 'Inter + JetBrains Mono',
  },
  {
    id: 'app',
    no: '04',
    name: 'Kip PWA',
    tag: 'App layout',
    desc: 'A new interactive shell for the mobile app in the same cream-and-egg style: ask, read the nest, capture eggs, settings — in a phone frame.',
    palette: ['#f7f0e1', '#f6c12e', '#e0703c', '#26211a'],
    font: 'Playfair Display + Inter + JetBrains Mono',
  },
]

export default function Picker() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#111',
        color: '#e8e4dc',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          padding: '28px 5vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: '1px solid #2a2a26',
        }}
      >
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, letterSpacing: '0.12em' }}>
          🐤 kip — redesign proposals
        </div>
        <a
          href="https://www.kip-ai.be"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#8a857a', fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}
        >
          current site ↗
        </a>
      </header>

      <main style={{ flex: 1, padding: '8vh 5vw', maxWidth: 1100, margin: '0 auto', width: '100%' }}>
        <p
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 12,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#8a857a',
            marginBottom: 18,
          }}
        >
          Three directions for kip-ai.be
        </p>
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(34px, 5vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            margin: '0 0 16px',
            fontWeight: 600,
          }}
        >
          One knowledge base,
          <br />
          three personalities.
        </h1>
        <p style={{ color: '#a39e92', maxWidth: 560, fontSize: 16, lineHeight: 1.6, marginBottom: '7vh' }}>
          Each proposal is a complete landing page using the real content of kip-ai.be. Open one, scroll it end to
          end, then come back here with the switcher in the corner.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {proposals.map((p) => (
            <a
              key={p.id}
              href={`#/${p.id}`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                border: '1px solid #2a2a26',
                borderRadius: 14,
                padding: 24,
                background: '#161613',
                transition: 'border-color 200ms, transform 200ms',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#57534a'
                e.currentTarget.style.transform = 'translateY(-3px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a26'
                e.currentTarget.style.transform = 'none'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: '#8a857a',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: 22,
                }}
              >
                <span>proposal {p.no}</span>
                <span style={{ color: '#e8e4dc' }}>{p.tag}</span>
              </div>
              <div style={{ display: 'flex', gap: 6, marginBottom: 22 }}>
                {p.palette.map((c) => (
                  <span
                    key={c}
                    style={{
                      width: 22,
                      height: 22,
                      borderRadius: 6,
                      background: c,
                      border: '1px solid rgba(255,255,255,0.12)',
                    }}
                  />
                ))}
              </div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, margin: '0 0 8px', fontWeight: 600 }}>
                {p.name}
              </h2>
              <p style={{ color: '#a39e92', fontSize: 13.5, lineHeight: 1.6, margin: '0 0 18px' }}>{p.desc}</p>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: '#6d6a60' }}>{p.font}</div>
              <div style={{ marginTop: 18, fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: '#e8e4dc' }}>
                open proposal →
              </div>
            </a>
          ))}
        </div>
      </main>

      <footer
        style={{
          padding: '22px 5vw',
          borderTop: '1px solid #2a2a26',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: '#6d6a60',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>free · agpl-3.0 · windows + linux</span>
        <span>github.com/JWE24-code/kip-app</span>
      </footer>
    </div>
  )
}
