import { useEffect, useState } from 'react'
import Modern from './proposals/Modern'
import Professional from './proposals/Professional'
import Personal from './proposals/Personal'
import AppLayout from './proposals/AppLayout'
import Picker from './proposals/Picker'

function routeFromHash(): string {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h.startsWith('modern')) return 'modern'
  if (h.startsWith('professional')) return 'professional'
  if (h.startsWith('personal')) return 'personal'
  if (h.startsWith('app')) return 'app'
  return 'home'
}

export default function App() {
  const [route, setRoute] = useState(routeFromHash)

  useEffect(() => {
    const onHash = () => {
      setRoute(routeFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  if (route === 'modern') return <Modern />
  if (route === 'professional') return <Professional />
  if (route === 'personal') return <Personal />
  if (route === 'app') return <AppLayout />
  return <Picker />
}
