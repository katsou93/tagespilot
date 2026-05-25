import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Guests from './pages/Guests'
import Belegung from './pages/Belegung'
import Warteliste from './pages/Warteliste'
import Fahrtdienst from './pages/Fahrtdienst'
import Dokumentation from './pages/Dokumentation'
import SIS from './pages/SIS'
import Medikamente from './pages/Medikamente'
import Angehoerige from './pages/Angehoerige'
import Aktivitaeten from './pages/Aktivitaeten'
import Verpflegung from './pages/Verpflegung'
import Dienstplan from './pages/Dienstplan'
import Abrechnung from './pages/Abrechnung'
import Rechnung from './pages/Rechnung'
import Qualitaet from './pages/Qualitaet'
import Foerderung from './pages/Foerderung'
import Einstellungen from './pages/Einstellungen'
import './App.css'

const NAV_GROUPS = [
  {
    label: 'Tagesbetrieb',
    items: [
      { id: 'dashboard', label: 'Übersicht', icon: '▦' },
      { id: 'belegung', label: 'Belegungsplan', icon: '◫' },
      { id: 'fahrtdienst', label: 'Fahrtdienst', icon: '◈' },
      { id: 'aktivitaeten', label: 'Aktivitäten', icon: '◉' },
      { id: 'verpflegung', label: 'Verpflegung', icon: '◎' },
    ]
  },
  {
    label: 'Gäste & Pflege',
    items: [
      { id: 'guests', label: 'Stammdaten', icon: '◎' },
      { id: 'sis', label: 'Pflegeplanung (SIS)', icon: '✦' },
      { id: 'dokumentation', label: 'KI-Tagesprotokoll', icon: '◈' },
      { id: 'medikamente', label: 'Medikamente', icon: '⊕' },
      { id: 'angehoerige', label: 'Angehörige', icon: '◉' },
      { id: 'warteliste', label: 'Warteliste', icon: '◌' },
    ]
  },
  {
    label: 'Personal',
    items: [
      { id: 'dienstplan', label: 'Dienstplan & Team', icon: '◷' },
    ]
  },
  {
    label: 'Finanzen',
    items: [
      { id: 'abrechnung', label: 'Auswertung', icon: '◇' },
      { id: 'rechnung', label: 'Rechnungen & GKV', icon: '◈' },
      { id: 'foerderung', label: 'Förderantrag', icon: '◎' },
    ]
  },
  {
    label: 'Qualität & Setup',
    items: [
      { id: 'qualitaet', label: 'MDK & Qualität', icon: '◈' },
      { id: 'einstellungen', label: 'KI-Analyse & Setup', icon: '◎' },
    ]
  },
]

const ALL_PAGES = {
  dashboard: Dashboard, guests: Guests, belegung: Belegung,
  warteliste: Warteliste, fahrtdienst: Fahrtdienst,
  dokumentation: Dokumentation, sis: SIS, medikamente: Medikamente,
  angehoerige: Angehoerige, aktivitaeten: Aktivitaeten,
  verpflegung: Verpflegung, dienstplan: Dienstplan,
  abrechnung: Abrechnung, rechnung: Rechnung,
  qualitaet: Qualitaet, foerderung: Foerderung,
  einstellungen: Einstellungen
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
        <nav className="nav-list" style={{ paddingTop: 8 }}>
          {NAV_GROUPS.map(group => (
            <div key={group.label} style={{ marginBottom: 4 }}>
              {sideOpen && (
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', padding: '8px 12px 4px', opacity: 0.7 }}>
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
