import { useState } from 'react'
import Login from './pages/Login'
import NotificationBell from './components/NotificationBell'
import GlobalSearch from './components/GlobalSearch'
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
import Vitaldaten from './pages/Vitaldaten'
import Vorfaelle from './pages/Vorfaelle'
import Kalender from './pages/Kalender'
import Hygiene from './pages/Hygiene'
import './App.css'

// ─── Rollenbasierte Navigation ───────────────────────────────────────────────
// leitung  = Einrichtungsleitung — voller Zugriff
// pdl      = Pflegedienstleitung — Pflege + Qualität, kein Finanz-Detail/Benutzer
// pflege   = Pflegekraft         — nur tägliche Pflegearbeit, kein Management
// betreuung= Betreuungskraft     — Aktivitäten, Verpflegung, Dokumentation
// fahrer   = Fahrer              — nur Fahrtdienst + Gästeliste
// ─────────────────────────────────────────────────────────────────────────────

const NAV_BY_ROLE = {

  leitung: [
    {
      label: 'Tagesbetrieb',
      items: [
        { id: 'dashboard',    label: 'Übersicht',       icon: '▦' },
        { id: 'belegung',     label: 'Belegungsplan',   icon: '◫' },
        { id: 'fahrtdienst',  label: 'Fahrtdienst',     icon: '◈' },
        { id: 'aktivitaeten', label: 'Aktivitäten',     icon: '◉' },
        { id: 'verpflegung',  label: 'Verpflegung',     icon: '◎' },
        { id: 'aufgaben',     label: 'Aufgaben',         icon: '◱' },
      ]
    },
    {
      label: 'Gäste & Pflege',
      items: [
        { id: 'guests',       label: 'Stammdaten',       icon: '◎' },
        { id: 'biographie',   label: 'Biographie',       icon: '◈' },
        { id: 'sis',          label: 'Pflegeplanung (SIS)', icon: '✦' },
        { id: 'dokumentation',label: 'KI-Protokoll',     icon: '◈' },
        { id: 'medikamente',  label: 'Medikamente',      icon: '⊕' },
        { id: 'angehoerige',  label: 'Angehörige',       icon: '◉' },
        { id: 'vitaldaten',   label: 'Vitaldaten',       icon: '❤️' },
        { id: 'vorfaelle',    label: 'Vorfälle',         icon: '⚠️' },
        { id: 'warteliste',   label: 'Warteliste',       icon: '◌' },
      ]
    },
    {
      label: 'Personal',
      items: [
        { id: 'dienstplan',   label: 'Dienstplan & Team', icon: '◷' },
        { id: 'kalender',     label: 'Kalender',          icon: '📅' },
      ]
    },
    {
      label: 'Finanzen',
      items: [
        { id: 'abrechnung',   label: 'Auswertung',        icon: '◇' },
        { id: 'rechnung',     label: 'Rechnungen & GKV',  icon: '◈' },
        { id: 'foerderung',   label: 'Förderantrag',      icon: '◎' },
      ]
    },
    {
      label: 'Qualität & System',
      items: [
        { id: 'qualitaet',    label: 'MDK & Qualität',    icon: '◈' },
        { id: 'hygiene',      label: 'Hygieneplan',       icon: '🧼' },
        { id: 'statistik',    label: 'Statistik',         icon: '◇' },
        { id: 'einstellungen',label: 'KI-Analyse',        icon: '✦' },
        { id: 'benutzer',     label: 'Benutzer & Rollen', icon: '◎' },
      ]
    },
  ],

  pdl: [
    {
      label: 'Tagesbetrieb',
      items: [
        { id: 'dashboard',    label: 'Übersicht',         icon: '▦' },
        { id: 'belegung',     label: 'Belegungsplan',     icon: '◫' },
        { id: 'aktivitaeten', label: 'Aktivitäten',       icon: '◉' },
        { id: 'verpflegung',  label: 'Verpflegung',       icon: '◎' },
        { id: 'aufgaben',     label: 'Aufgaben',          icon: '◱' },
      ]
    },
    {
      label: 'Gäste & Pflege',
      items: [
        { id: 'guests',       label: 'Stammdaten',        icon: '◎' },
        { id: 'biographie',   label: 'Biographie',        icon: '◈' },
        { id: 'sis',          label: 'Pflegeplanung (SIS)', icon: '✦' },
        { id: 'dokumentation',label: 'KI-Protokoll',      icon: '◈' },
        { id: 'medikamente',  label: 'Medikamente',       icon: '⊕' },
        { id: 'angehoerige',  label: 'Angehörige',        icon: '◉' },
        { id: 'warteliste',   label: 'Warteliste',        icon: '◌' },
      ]
    },
    {
      label: 'Personal',
      items: [
        { id: 'dienstplan',   label: 'Dienstplan & Team', icon: '◷' },
      ]
    },
    {
      // PDL sieht Auswertung aber nicht Rechnungsdetails / Förderantrag
      label: 'Finanzen',
      items: [
        { id: 'abrechnung',   label: 'Auswertung',        icon: '◇' },
      ]
    },
    {
      label: 'Qualität',
      items: [
        { id: 'qualitaet',    label: 'MDK & Qualität',    icon: '◈' },
        { id: 'statistik',    label: 'Statistik',         icon: '◇' },
        { id: 'einstellungen',label: 'KI-Pflegegrad-Analyse', icon: '✦' },
      ]
    },
  ],

  pflege: [
    {
      label: 'Mein Tag',
      items: [
        { id: 'dashboard',    label: 'Übersicht',         icon: '▦' },
        { id: 'fahrtdienst',  label: 'Fahrtdienst',       icon: '◈' },
        { id: 'aktivitaeten', label: 'Aktivitäten',       icon: '◉' },
        { id: 'verpflegung',  label: 'Verpflegung',       icon: '◎' },
        { id: 'aufgaben',     label: 'Meine Aufgaben',    icon: '◱' },
      ]
    },
    {
      label: 'Gäste',
      items: [
        { id: 'guests',       label: 'Gäste',             icon: '◎' },
        { id: 'biographie',   label: 'Biographie',        icon: '◈' },
        { id: 'dokumentation',label: 'KI-Protokoll',      icon: '◈' },
        { id: 'medikamente',  label: 'Medikamente',       icon: '⊕' },
        { id: 'angehoerige',  label: 'Angehörige',        icon: '◉' },
      ]
    },
    // Keine Finanzen, keine Qualität/System, kein Dienstplan, keine Warteliste, kein SIS (PDL-Aufgabe)
  ],

  betreuung: [
    {
      label: 'Mein Tag',
      items: [
        { id: 'dashboard',    label: 'Übersicht',         icon: '▦' },
        { id: 'aktivitaeten', label: 'Aktivitäten',       icon: '◉' },
        { id: 'verpflegung',  label: 'Verpflegung',       icon: '◎' },
        { id: 'aufgaben',     label: 'Aufgaben',          icon: '◱' },
      ]
    },
    {
      label: 'Gäste',
      items: [
        { id: 'guests',       label: 'Gäste',             icon: '◎' },
        { id: 'biographie',   label: 'Biographie',        icon: '◈' },
        { id: 'dokumentation',label: 'KI-Protokoll',      icon: '◈' },
        { id: 'angehoerige',  label: 'Angehörige',        icon: '◉' },
      ]
    },
  ],

  fahrer: [
    {
      label: 'Fahrtdienst',
      items: [
        { id: 'fahrtdienst',  label: 'Meine Route',       icon: '◈' },
        { id: 'guests',       label: 'Gästeliste',        icon: '◎' },
      ]
    },
  ],
}

// Fallback: unbekannte Rollen → Pflege-View
const getRoleKey = (rolle) => {
  if (!rolle) return 'pflege'
  const r = rolle.toLowerCase()
  if (r.includes('leitung') && !r.includes('pflege')) return 'leitung'
  if (r.includes('pflege') && r.includes('dienst')) return 'pdl'
  if (r.includes('fahrer')) return 'fahrer'
  if (r.includes('betreuung')) return 'betreuung'
  return 'pflege'
}

const ROLE_BADGE = {
  leitung:   { label: 'Einrichtungsleitung', color: '#f87171' },
  pdl:       { label: 'Pflegedienstleitung', color: '#7c6fff' },
  pflege:    { label: 'Pflegekraft',         color: '#2dd4bf' },
  betreuung: { label: 'Betreuungskraft',     color: '#4ade80' },
  fahrer:    { label: 'Fahrer',              color: '#fbbf24' },
}

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
  vitaldaten: Vitaldaten, vorfaelle: Vorfaelle, kalender: Kalender, hygiene: Hygiene,
}

export default function App() {
  const [user, setUser] = useState(null)
  const [sideOpen, setSideOpen] = useState(true)
  const [page, setPage] = useState('dashboard')

  if (!user) return <Login onLogin={(u) => { setUser(u); setPage('dashboard') }} />

  const roleKey = getRoleKey(user.rolle)
  const navGroups = NAV_BY_ROLE[roleKey] || NAV_BY_ROLE.pflege
  const badge = ROLE_BADGE[roleKey]

  // If current page not accessible for this role, redirect to dashboard
  const allAllowed = navGroups.flatMap(g => g.items.map(i => i.id))
  const activePage = allAllowed.includes(page) ? page : 'dashboard'
  const Page = ALL_PAGES[activePage]

  const initials = user.name.split(' ').map(n => n[0]).join('')

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sideOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <span className="logo-mark">CV</span>
          {sideOpen && <span className="logo-name">Carevera</span>}
        </div>

        <nav className="nav-list" style={{ paddingTop: 8, overflowY: 'auto', flex: 1 }}>
          {navGroups.map(group => (
            <div key={group.label} style={{ marginBottom: 4 }}>
              {sideOpen && (
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text3)', padding: '8px 12px 4px', opacity: 0.7 }}>
                  {group.label}
                </div>
              )}
              {group.items.map(n => (
                <button
                  key={n.id}
                  className={`nav-item ${activePage === n.id ? 'active' : ''}`}
                  onClick={() => setPage(n.id)}
                >
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
              <span className="facility-dot" />
              <span>Tagespflege Sonnenschein</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', background: 'var(--bg3)', borderRadius: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${badge.color}22`, border: `1.5px solid ${badge.color}44`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: badge.color, flexShrink: 0 }}>
                {initials}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user.name}</div>
                <div style={{ fontSize: 10, color: badge.color, fontWeight: 500 }}>{badge.label}</div>
              </div>
              <button
                onClick={() => { setUser(null); setPage('dashboard') }}
                style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 14, padding: '2px 4px', borderRadius: 4, flexShrink: 0 }}
                title="Abmelden"
              >⏻</button>
            </div>
          </div>
        )}
      </aside>

      <main className="main-content">
        {/* Topbar */}
        <div style={{
          position: 'fixed', top: 0, right: 0,
          left: sideOpen ? 'var(--sidebar-w)' : 'var(--sidebar-closed)',
          zIndex: 50, background: 'rgba(12,12,15,0.9)',
          backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--border)',
          padding: '9px 32px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          transition: 'left 0.2s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 11, color: 'var(--text3)' }}>
              {navGroups.flatMap(g => g.items).find(i => i.id === activePage)?.label || 'Übersicht'}
            </span>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <GlobalSearch onNavigate={(id) => setPage(id)} />
            {allAllowed.includes('aufgaben') && (
              <button onClick={() => setPage('aufgaben')} className="btn" style={{ fontSize: 11, padding: '4px 11px' }}>
                ◱ Aufgaben
              </button>
            )}
            <NotificationBell />
          </div>
        </div>

        <div style={{ paddingTop: 52 }}>
          <Page />
        </div>
      </main>
    </div>
  )
}
