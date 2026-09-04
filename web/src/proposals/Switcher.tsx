export default function Switcher({ active }: { active: string }) {
  const items = [
    { id: 'personal', label: '03 personal' },
    { id: 'modern', label: '01 modern' },
    { id: 'professional', label: '02 professional' },
    { id: 'app', label: '04 app' },
  ]
  return (
    <nav className="switcher" aria-label="Proposal switcher">
      <a href="#/" className={active === 'home' ? 'sw-on' : ''}>
        ⌂ all
      </a>
      {items.map((i) => (
        <a key={i.id} href={`#/${i.id}`} className={active === i.id ? 'sw-on' : ''}>
          {i.label}
        </a>
      ))}
    </nav>
  )
}
