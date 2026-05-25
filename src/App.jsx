import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Guests from './pages/Guests'
import Fahrtdienst from './pages/Fahrtdienst'
import Dokumentation from './pages/Dokumentation'
import Abrechnung from './pages/Abrechnung'
import './App.css'

const NAV = [
  { id: 'dashboard', label: 'Übersicht', icon: '▦' },
  { id: 'guests', label: 'Tagesgäste', icon: '◎' },
  { id: 'fahrtdienst', label: 'Fahrtdienst', icon: '◈' },
  { id: 'dokumentation', label: 'KI-Doku', icon: '✦' },
  { id: 'abrechnung', label: 'Abrechnung', icon: '◇' },
]

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(true)

  const pages = { dashboard: Dashboard, guests: Guests, fahrtdienst: Fahrtdienst, dokumentation: Dokumentation, abrechnung: Abrechnung }
  const Page = pages[page]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sideOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span className="logo-mark">TP</span>
          {sideOpen && <span className="logo-name">TagesPilot</span>}
        </div>
        <nav className="nav-list">
          {NAV.map(n => (
            <button key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
              <span className="nav-icon">{n.icon}</span>
              {sideOpen && <span className="nav-label">{n.label}</span>}
            </button>
          ))}
        </nav>
        <button className="sidebar-toggle" onClick={() => setSideOpen(v => !v)}>
          {sideOpen ? '‹' : '›'}
        </button>
        {sideOpen && (
          <div className="sidebar-bottom">
            <div className="facility-pill">
              <span className="facility-dot"></span>
              <span>Tagespflege Sonnenschein</span>
            </div>
          </div>
        )}
      </aside>
      <main className="main-content">
        <Page />
      </main>
    </div>
  )
}
