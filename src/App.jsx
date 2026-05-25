import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Guests from './pages/Guests'
import Belegung from './pages/Belegung'
import Warteliste from './pages/Warteliste'
import Fahrtdienst from './pages/Fahrtdienst'
import Dokumentation from './pages/Dokumentation'
import Medikamente from './pages/Medikamente'
import Angehoerige from './pages/Angehoerige'
import Dienstplan from './pages/Dienstplan'
import Abrechnung from './pages/Abrechnung'
import Rechnung from './pages/Rechnung'
import './App.css'

const NAV_GROUPS = [
  {
    label: 'Tagesbetrieb',
    items: [
      { id: 'dashboard', label: 'Übersicht', icon: '▦' },
      { id: 'belegung', label: 'Belegungsplan', icon: '◫' },
      { id: 'fahrtdienst', label: 'Fahrtdienst', icon: '◈' },
    ]
  },
  {
    label: 'Gäste',
    items: [
      { id: 'guests', label: 'Stammdaten', icon: '◎' },
      { id: 'medikamente', label: 'Medikamente', icon: '⊕' },
      { id: 'dokumentation', label: 'KI-Doku', icon: '✦' },
      { id: 'angehoerige', label: 'Angehörige', icon: '◉' },
      { id: 'warteliste', label: 'Warteliste', icon: '◌' },
    ]
  },
  {
    label: 'Personal',
    items: [
      { id: 'dienstplan', label: 'Dienstplan', icon: '◷' },
    ]
  },
  {
    label: 'Finanzen',
    items: [
      { id: 'abrechnung', label: 'Auswertung', icon: '◇' },
      { id: 'rechnung', label: 'Rechnungen', icon: '◈' },
    ]
  },
]

const ALL_PAGES = {
  dashboard: Dashboard, guests: Guests, belegung: Belegung,
  warteliste: Warteliste, fahrtdienst: Fahrtdienst,
  dokumentation: Dokumentation, medikamente: Medikamente,
  angehoerige: Angehoerige, dienstplan: Dienstplan,
  abrechnung: Abrechnung, rechnung: Rechnung
}

export default function App() {
  const [page, setPage] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(true)
  const Page = ALL_PAGES[page]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sideOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span className="logo-mark">CV</span>
          {sideOpen && <span className="logo-name">Carevera</span>}
        </div>
        <nav className="nav-list" style={{paddingTop:8}}>
          {NAV_GROUPS.map(group => (
            <div key={group.label} style={{marginBottom:4}}>
              {sideOpen && (
                <div style={{fontSize:9,fontWeight:600,letterSpacing:'0.1em',textTransform:'uppercase',color:'var(--text3)',padding:'8px 12px 4px',opacity:0.7}}>
                  {group.label}
                </div>
              )}
              {group.items.map(n => (
                <button key={n.id} className={`nav-item ${page === n.id ? 'active' : ''}`} onClick={() => setPage(n.id)}>
                  <span className="nav-icon">{n.icon}</span>
                  {sideOpen && <span className="nav-label">{n.label}</span>}
                </button>
              ))}
            </div>
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
