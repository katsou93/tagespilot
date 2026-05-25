import { useState } from 'react'

const ROLLEN = {
  leitung: { label: 'Einrichtungsleitung', color: '#f87171', bg: 'rgba(248,113,113,0.12)', rechte: ['Alle Bereiche', 'Finanzen', 'Personalverwaltung', 'Systemeinstellungen', 'Berichte'] },
  pdl: { label: 'Pflegedienstleitung', color: '#7c6fff', bg: 'rgba(124,111,255,0.12)', rechte: ['SIS & Pflegeplanung', 'Dokumentation', 'Medikamente', 'Qualität', 'Berichte'] },
  pflege: { label: 'Pflegekraft', color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)', rechte: ['Dokumentation', 'Medikamente', 'Aktivitäten', 'Gästestammdaten lesen'] },
  betreuung: { label: 'Betreuungskraft', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', rechte: ['Aktivitäten', 'Tagesprotokoll', 'Angehörigen-Updates'] },
  fahrer: { label: 'Fahrer', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', rechte: ['Fahrtdienst', 'Gästeliste (eingeschränkt)'] },
}

const BENUTZER = [
  { id: 1, name: 'Claudia Berg', email: 'c.berg@sonnenschein.de', rolle: 'leitung', aktiv: true, letzterLogin: 'Heute, 07:45' },
  { id: 2, name: 'Maria Schulze', email: 'm.schulze@sonnenschein.de', rolle: 'pflege', aktiv: true, letzterLogin: 'Heute, 08:12' },
  { id: 3, name: 'Reza Ahmadi', email: 'r.ahmadi@sonnenschein.de', rolle: 'pdl', aktiv: true, letzterLogin: 'Gestern, 16:30' },
  { id: 4, name: 'Sabine Müller', email: 's.mueller@sonnenschein.de', rolle: 'betreuung', aktiv: true, letzterLogin: 'Heute, 08:30' },
  { id: 5, name: 'Thomas Kranz', email: 't.kranz@sonnenschein.de', rolle: 'fahrer', aktiv: true, letzterLogin: 'Heute, 07:50' },
]

const AKTIVITÄTS_LOG = [
  { user: 'Maria Schulze', aktion: 'KI-Dokumentation erstellt', gast: 'Hildegard Meier', zeit: 'Heute, 09:45' },
  { user: 'Reza Ahmadi', aktion: 'SIS-Einschätzung aktualisiert', gast: 'Erna Hoffmann', zeit: 'Heute, 09:20' },
  { user: 'Claudia Berg', aktion: 'Förderantrag generiert', gast: '—', zeit: 'Heute, 08:55' },
  { user: 'Thomas Kranz', aktion: 'Route Fahrtdienst bestätigt', gast: '4 Gäste', zeit: 'Heute, 07:52' },
  { user: 'Sabine Müller', aktion: 'Aktivitätsplan aktualisiert', gast: '—', zeit: 'Heute, 08:35' },
]

export default function Benutzer() {
  const [tab, setTab] = useState('benutzer')
  const [selected, setSelected] = useState(null)

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Benutzer & Rollen</h1>
          <p className="page-sub">{BENUTZER.length} Nutzer · Rollen & Berechtigungen · Aktivitätslog</p>
        </div>
        <button className="btn btn-primary">+ Nutzer einladen</button>
      </div>

      <div className="grid4 mb20">
        {[
          { label: 'Aktive Nutzer', val: BENUTZER.filter(b => b.aktiv).length, color: 'var(--green)' },
          { label: 'Rollen', val: Object.keys(ROLLEN).length, color: 'var(--accent2)' },
          { label: 'Aktionen heute', val: AKTIVITÄTS_LOG.length, color: 'var(--teal)' },
          { label: 'Letzte Anmeldung', val: 'Heute', color: 'var(--amber)' },
        ].map((k, i) => (
          <div key={i} className="stat-card">
            <p className="stat-label">{k.label}</p>
            <p className="stat-value" style={{ color: k.color }}>{k.val}</p>
          </div>
        ))}
      </div>

      <div className="flex gap8 mb16">
        {['benutzer', 'rollen', 'log'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'benutzer' ? 'Nutzerverwaltung' : t === 'rollen' ? 'Rollen & Rechte' : 'Aktivitätslog'}
          </button>
        ))}
      </div>

      {tab === 'benutzer' && (
        <div className="grid2 gap16">
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="data-table">
              <thead><tr>
                <th style={{ paddingLeft: 16 }}>Name</th>
                <th>Rolle</th>
                <th>Letzter Login</th>
                <th>Status</th>
              </tr></thead>
              <tbody>
                {BENUTZER.map(b => {
                  const rolle = ROLLEN[b.rolle]
                  return (
                    <tr key={b.id} style={{ cursor: 'pointer', background: selected === b.id ? 'rgba(124,111,255,0.05)' : 'transparent' }} onClick={() => setSelected(selected === b.id ? null : b.id)}>
                      <td style={{ paddingLeft: 16 }}>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{b.name}</div>
                          <div style={{ fontSize: 11, color: 'var(--text3)' }}>{b.email}</div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: rolle.bg, color: rolle.color }}>
                          {rolle.label}
                        </span>
                      </td>
                      <td style={{ fontSize: 11, color: 'var(--text3)' }}>{b.letzterLogin}</td>
                      <td>
                        <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: 'rgba(74,222,128,0.12)', color: 'var(--green)' }}>
                          ● Aktiv
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {selected ? (
            <div className="card fade-in">
              {(() => {
                const b = BENUTZER.find(x => x.id === selected)
                const rolle = ROLLEN[b.rolle]
                return <>
                  <h3 style={{ fontSize: 16, fontFamily: 'var(--font-head)', marginBottom: 4 }}>{b.name}</h3>
                  <p style={{ fontSize: 12, color: 'var(--text2)', marginBottom: 14 }}>{b.email}</p>
                  <div className="divider" />
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Aktuelle Rolle</p>
                    <span style={{ fontSize: 13, fontWeight: 500, padding: '4px 12px', borderRadius: 6, background: rolle.bg, color: rolle.color }}>{rolle.label}</span>
                  </div>
                  <div style={{ marginBottom: 14 }}>
                    <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Berechtigungen</p>
                    {rolle.rechte.map((r, i) => (
                      <div key={i} style={{ display: 'flex', gap: 8, padding: '4px 0', fontSize: 12, color: 'var(--text2)' }}>
                        <span style={{ color: 'var(--green)' }}>✓</span>{r}
                      </div>
                    ))}
                  </div>
                  <div className="divider" />
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn" style={{ fontSize: 12 }}>Rolle ändern</button>
                    <button className="btn" style={{ fontSize: 12 }}>Passwort reset</button>
                  </div>
                </>
              })()}
            </div>
          ) : (
            <div className="card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200 }}>
              <p style={{ fontSize: 13, color: 'var(--text3)' }}>Nutzer auswählen für Details</p>
            </div>
          )}
        </div>
      )}

      {tab === 'rollen' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {Object.entries(ROLLEN).map(([key, rolle]) => (
            <div key={key} className="card" style={{ borderLeft: `3px solid ${rolle.color}` }}>
              <div className="flex-between mb10">
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{rolle.label}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>
                  {BENUTZER.filter(b => b.rolle === key).length} Nutzer
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {rolle.rechte.map((r, i) => (
                  <div key={i} style={{ display: 'flex', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
                    <span style={{ color: rolle.color }}>✓</span>{r}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'log' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead><tr>
              <th style={{ paddingLeft: 16 }}>Nutzer</th>
              <th>Aktion</th>
              <th>Betreff</th>
              <th>Zeit</th>
            </tr></thead>
            <tbody>
              {AKTIVITÄTS_LOG.map((e, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: 16, fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{e.user}</td>
                  <td style={{ fontSize: 12, color: 'var(--text2)' }}>{e.aktion}</td>
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>{e.gast}</td>
                  <td style={{ fontSize: 11, color: 'var(--text3)' }}>{e.zeit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
