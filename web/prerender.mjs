// Prerender step (run after `vite build` + `vite build --ssr src/prerender.tsx`).
// Renders the React app to a static HTML string and inlines it into the built
// index.html, so crawlers that don't execute JS still see the full content.
import { readFileSync, writeFileSync } from 'node:fs'

const { render } = await import('./dist-ssr/prerender.js')

const html = render()
const template = readFileSync('dist/index.html', 'utf8')
const out = template.replace('<div id="root"></div>', `<div id="root">${html}</div>`)
writeFileSync('dist/index.html', out)
console.log('prerendered index.html (%d bytes)', out.length)
