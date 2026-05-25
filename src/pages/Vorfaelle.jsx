import { useState } from 'react'
import { GUESTS } from '../data/mock'

const VORFALL_TYPEN = {
  sturz: { label: 'Sturz', icon: '⚠️', color: '#f87171', bg: 'rgba(248,113,113,0.1)' },
  medikament: { label: 'Medikamentenfehler', icon: '💊', color: '#fbbf24', bg: 'rgba(251,191,36,0.1)' },
  verhalten: { label: 'Verhaltensauffälligkeit', icon: '🧠', color: '#7c6fff', bg: 'rgba(124,111,255,0.1)' },
  gesundheit: { label: 'Gesundheitlicher Vorfall', icon: '🏥', color: '#2dd4bf', bg: 'rgba(45,212,191,0.1)' },
  sonstiges: { label: 'Sonstiges', icon: '📋', color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
}

const SCHWERE = {
  leicht: { label: 'Leicht', color: '#4ade80' },
  mittel: { label: 'Mittel', color: '#fbbf24' },
  schwer: { label: 'Schwer', color: '#f87171' },
}

const VORFAELLE = [
  { id: 1, datum: '22.05.2026', uhrzeit: '10:15', gastId: 3, typ: 'sturz', schwere: 'leicht', beschreibung: 'Gast rutschte beim Aufstehen vom Stuhl aus. Keine Verletzungen. Sofort abgesichert, Pflegekraft informiert.', massnahmen: 'Rutschfeste Socken angepasst, Stuhl gesichert, Sturzkissen angeordnet.', gemeldet: 'M. Schulze', arzt: false, angehoerige: true },
  { id: 2, datum: '18.05.2026', uhrzeit: '13:30', gastId: 1, typ: 'gesundheit', schwere: 'mittel', beschreibung: 'Kurzeitige Verwirrtheit und Unruhe nach dem Mittagessen. Blutdruck 165/98 mmHg erhöht gemessen.', massnahmen: 'Hausarzt informiert, Ruhe verordnet, Blutdruck engmaschig kontrolliert. 30 Min später normalisiert auf 138/85.', gemeldet: 'R. Ahmadi', arzt: true, angehoerige: true },
  { id: 3, datum: '10.05.2026', uhrzeit: '09:00', gastId: 5, typ: 'verhalten', schwere: 'leicht', beschreibung: 'Gast zeigte starke Ablehnung bei der Morgenrunde, wollte Einrichtung verlassen.', massnahmen: 'Einfühlsam begleitet, beruhigt durch vertraute Musik. Nach 20 Min ruhig und kooperativ.', gemeldet: 'S. Müller', arzt: false, angehoerige: false },
]

export default function Vorfaelle() {
  const [tab, setTab] = useState('liste')
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ gastId: '', typ: 'sturz', schwere: 'leicht', beschreibung: '', massnahmen: '', arzt: false, angehoerige: false })
  const [generating, setGenerating] = useState(false)
  const [savedReport, setSavedReport] = useState(false)

  const guestName = id => GUESTS.find(g => g.id === parseInt(id))?.name || '—'
  const guestColor = id => GUESTS.find(g => g.id === parseInt(id))?.color || 'av-gray'
  const guestInitials = id => GUESTS.find(g => g.id === parseInt(id))?.initials || '?'

  const generateReport = async () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setSavedReport(true) }, 1500)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Vorfälle & Unfallprotokoll</h1>
          <p className="page-sub">Sturzdokumentation · Meldepflicht · Maßnahmenkatalog</p>
        </div>
        <div className="flex gap8">
          <button className="btn" onClick={generateReport} disabled={generating}>
            {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /></> : '✦ KI-Monatsauswertung'}
          </button>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>+ Vorfall erfassen</button>
        </div>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Vorfälle Mai</p>
          <p className="stat-value" style={{ color: 'var(--amber)' }}>{VORFAELLE.length}</p>
          <p className="stat-sub">dokumentiert</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Stürze</p>
          <p className="stat-value" style={{ color: 'var(--red)' }}>{VORFAELLE.filter(v => v.typ === 'sturz').length}</p>
          <p className="stat-sub">ohne Verletzung</p>
          <span className="stat-badge badge-green">Alle leicht</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Arzt informiert</p>
          <p className="stat-value" style={{ color: 'var(--teal)' }}>{VORFAELLE.filter(v => v.arzt).length}</p>
          <p className="stat-sub">von {VORFAELLE.length} Vorfällen</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Angehörige informiert</p>
          <p className="stat-value" style={{ color: 'var(--accent2)' }}>{VORFAELLE.filter(v => v.angehoerige).length}</p>
          <p className="stat-sub">Fälle rückgemeldet</p>
        </div>
      </div>

      {savedReport && (
        <div className="fade-in" style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: '10px 16px', marginBottom: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ color: 'var(--green)' }}>✓</span>
          <span style={{ fontSize: 12, color: 'var(--text2)' }}>KI-Monatsauswertung Mai 2026 erstellt — 3 Vorfälle, 1 Maßnahme umgesetzt, Sturzrisiko: stabil</span>
          <button className="btn" style={{ fontSize: 11, marginLeft: 'auto' }}>📥 PDF</button>
        </div>
      )}

      {showForm && (
        <div className="card fade-in" style={{ marginBottom: 14 }}>
          <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Neuen Vorfall dokumentieren</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 10 }}>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Gast</label>
              <select className="inp" style={{ appearance: 'none' }} value={form.gastId} onChange={e => setForm(f => ({ ...f, gastId: e.target.value }))}>
                <option value="">Gast auswählen…</option>
                {GUESTS.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Art des Vorfalls</label>
              <select className="inp" style={{ appearance: 'none' }} value={form.typ} onChange={e => setForm(f => ({ ...f, typ: e.target.value }))}>
                {Object.entries(VORFALL_TYPEN).map(([k, v]) => <option key={k} value={k}>{v.icon} {v.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Schwere</label>
              <select className="inp" style={{ appearance: 'none' }} value={form.schwere} onChange={e => setForm(f => ({ ...f, schwere: e.target.value }))}>
                {Object.entries(SCHWERE).map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
              </select>
            </div>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Beschreibung</label>
            <textarea className="inp" placeholder="Was ist passiert? Wann, wo, wie?" style={{ minHeight: 70 }} value={form.beschreibung} onChange={e => setForm(f => ({ ...f, beschreibung: e.target.value }))} />
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Maßnahmen</label>
            <textarea className="inp" placeholder="Welche Maßnahmen wurden ergriffen?" style={{ minHeight: 60 }} value={form.massnahmen} onChange={e => setForm(f => ({ ...f, massnahmen: e.target.value }))} />
          </div>
          <div className="flex gap16 mb12" style={{ gap: 16 }}>
            {[['arzt', 'Arzt informiert'], ['angehoerige', 'Angehörige informiert']].map(([k, l]) => (
              <label key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--text2)', cursor: 'pointer' }}>
                <input type="checkbox" checked={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.checked }))} />
                {l}
              </label>
            ))}
          </div>
          <div className="flex gap8">
            <button className="btn btn-primary" style={{ fontSize: 12 }}>Vorfall speichern</button>
            <button className="btn" style={{ fontSize: 12 }} onClick={() => setShowForm(false)}>Abbrechen</button>
          </div>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {VORFAELLE.map(v => {
          const typ = VORFALL_TYPEN[v.typ]
          const sw = SCHWERE[v.schwere]
          return (
            <div key={v.id} className="card" style={{ borderLeft: `3px solid ${typ.color}` }}>
              <div className="flex-between mb10">
                <div className="flex gap10" style={{ alignItems: 'center' }}>
                  <span style={{ fontSize: 20 }}>{typ.icon}</span>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)', marginBottom: 2 }}>{typ.label}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)' }}>{v.datum} · {v.uhrzeit} Uhr · gemeldet von {v.gemeldet}</p>
                  </div>
                </div>
                <div className="flex gap6" style={{ gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: `${sw.color}18`, color: sw.color }}>{sw.label}</span>
                  {v.arzt && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 3, background: 'rgba(45,212,191,0.1)', color: 'var(--teal)' }}>🏥 Arzt</span>}
                  {v.angehoerige && <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 3, background: 'rgba(124,111,255,0.1)', color: 'var(--accent2)' }}>👥 Angehörige</span>}
                </div>
              </div>
              <div className="flex gap8 mb10" style={{ alignItems: 'center' }}>
                <div className={`avatar ${guestColor(v.gastId)}`} style={{ width: 26, height: 26, fontSize: 10 }}>{guestInitials(v.gastId)}</div>
                <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{guestName(v.gastId)}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Vorfall</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{v.beschreibung}</p>
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Maßnahmen</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{v.massnahmen}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
