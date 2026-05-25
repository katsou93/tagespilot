import { useState } from 'react'
import Login from './pages/Login'
import Onboarding from './pages/Onboarding'
import NotificationBell from './components/NotificationBell'
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
import Biographie from './pages/Biographie'
import Dienstplan from './pages/Dienstplan'
import Abrechnung from './pages/Abrechnung'
import Rechnung from './pages/Rechnung'
import Qualitaet from './pages/Qualitaet'
import Foerderung from './pages/Foerderung'
import Einstellungen from './pages/Einstellungen'
import Statistik from './pages/Statistik'
import Benutzer from './pages/Benutzer'
import Aufgaben from './pages/Aufgaben'
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
      { id: 'aufgaben', label: 'Aufgaben', icon: '◱' },
    ]
  },
  {
    label: 'Gäste & Pflege',
    items: [
      { id: 'guests', label: 'Stammdaten', icon: '◎' },
      { id: 'biographie', label: 'Biographie', icon: '◈' },
      { id: 'sis', label: 'Pflegeplanung (SIS)', icon: '✦' },
      { id: 'dokumentation', label: 'KI-Protokoll', icon: '◈' },
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
    label: 'Qualität & System',
    items: [
      { id: 'qualitaet', label: 'MDK & Qualität', icon: '◈' },
      { id: 'statistik', label: 'Statistik & Berichte', icon: '◇' },
      { id: 'einstellungen', label: 'KI-Analyse', icon: '✦' },
      { id: 'benutzer', label: 'Benutzer & Rollen', icon: '◎' },
    ]
  },
]

const ALL_PAGES = {
  dashboard: Dashboard, guests: Guests, belegung: Belegung,
  warteliste: Warteliste, fahrtdienst: Fahrtdienst,
  dokumentation: Dokumentation, sis: SIS, medikamente: Medikamente,
  angehoerige: Angehoerige, aktivitaeten: Aktivitaeten,
  verpflegung: Verpflegung, biographie: Biographie,
  dienstplan: Dienstplan, abrechnung: Abrechnung,
  rechnung: Rechnung, qualitaet: Qualitaet,
  foerderung: Foerderung, einstellungen: Einstellungen,
  statistik: Statistik, benutzer: Benutzer, aufgaben: Aufgaben,
}

export default function App() {
  const [user, setUser] = useState(null)
  const [onboarded, setOnboarded] = useState(false)
  const [page, setPage] = useState('dashboard')
  const [sideOpen, setSideOpen] = useState(true)

  if (!user) return <Login onLogin={(u) => setUser(u)} />
  if (!onboarded && user.email === 'leitung@sonnenschein.de') {
    // Skip onboarding for demo — go straight to app
    setOnboarded(true)
  }

  const Page = ALL_PAGES[page]

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sideOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span className="logo-mark">CV</span>
          {sideOpen && <span className="logo-name">Carevera</span>}
        </div>
        <nav className="nav-list" style={{ paddingTop: 8, overflowY: 'auto', flex: 1 }}>
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
            <div className="facility-pill" style={{ marginBottom: 6 }}>
              <span className="facility-dot"></span>
              <span>Tagespflege Sonnenschein</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: 'var(--bg3)', borderRadius: 7 }}>
              <div style={{ width: 24, height: 24, borderRadius: '50%', background: 'rgba(124,111,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 600, color: 'var(--accent2)', flexShrink: 0 }}>
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                <div style={{ fontSize: 9, color: 'var(--text3)' }}>{user.rolle}</div>
              </div>
              <button onClick={() => setUser(null)} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 12, padding: '2px 4px', borderRadius: 4 }} title="Abmelden">⏻</button>
            </div>
          </div>
        )}
      </aside>
      <main className="main-content">
        {/* Top bar */}
        <div style={{ position: 'fixed', top: 0, right: 0, left: sideOpen ? 'var(--sidebar-w)' : 'var(--sidebar-closed)', zIndex: 50, background: 'rgba(12,12,15,0.85)', backdropFilter: 'blur(8px)', borderBottom: '1px solid var(--border)', padding: '10px 32px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, transition: 'left 0.2s' }}>
          <button onClick={() => setPage('aufgaben')} className="btn" style={{ fontSize: 12, padding: '5px 12px', position: 'relative' }}>
            ◱ Aufgaben
          </button>
          <NotificationBell />
        </div>
        <div style={{ paddingTop: 52 }}>
          <Page />
        </div>
      </main>
    </div>
  )
}
