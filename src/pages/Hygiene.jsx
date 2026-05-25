import { useState } from 'react'

const BEREICHE = [
  { id: 1, bereich: 'Händehygiene', massnahme: 'Händedesinfektion vor/nach Patientenkontakt', freq: 'Bei jedem Kontakt', verantwort: 'Alle Mitarbeiter', letzteKontrolle: '20.05.2026', status: 'ok' },
  { id: 2, bereich: 'Flächendesinfektion', massnahme: 'Wisch-Desinfektion aller Kontaktflächen (Tische, Griffe, Geländer)', freq: 'Täglich nach Betrieb', verantwort: 'Reinigungskraft', letzteKontrolle: '24.05.2026', status: 'ok' },
  { id: 3, bereich: 'Wäsche & Textilien', massnahme: 'Bewohnerwäsche bei mind. 60°C waschen, getrennt von Dienstkleidung', freq: 'Täglich', verantwort: 'M. Schulze', letzteKontrolle: '23.05.2026', status: 'ok' },
  { id: 4, bereich: 'Abfallentsorgung', massnahme: 'Infektiöser Abfall in gelbe Säcke, tägliche Leerung', freq: 'Täglich', verantwort: 'Alle', letzteKontrolle: '24.05.2026', status: 'ok' },
  { id: 5, bereich: 'Fahrzeughygiene', massnahme: 'Desinfektion Haltegriffe, Sitze und Gurte nach Fahrt', freq: 'Nach jeder Tour', verantwort: 'T. Kranz', letzteKontrolle: '22.05.2026', status: 'warn' },
  { id: 6, bereich: 'Küchenbereich', massnahme: 'HACCP-Checkliste, Temperaturkontrollen, Reinigungsprotokoll', freq: 'Täglich', verantwort: 'Betreuung', letzteKontrolle: '24.05.2026', status: 'ok' },
  { id: 7, bereich: 'Schutzausrüstung (PSA)', massnahme: 'Handschuhe, Masken, Schutzkittel bei Bedarf bereitstellen', freq: 'Laufend', verantwort: 'C. Berg', letzteKontrolle: '15.05.2026', status: 'warn' },
  { id: 8, bereich: 'Infektionsschutz', massnahme: 'Erkrankte Mitarbeiter nicht im Dienst, Meldepflicht beachten', freq: 'Bei Bedarf', verantwort: 'Leitung', letzteKontrolle: '—', status: 'ok' },
]

const SCHULUNGEN = [
  { name: 'Händehygiene Grundschulung', datum: '15.03.2026', teilnehmer: 5, naechste: '15.09.2026', faellig: false },
  { name: 'Infektionsschutzgesetz (IfSG)', datum: '10.01.2026', teilnehmer: 5, naechste: '10.01.2027', faellig: false },
  { name: 'Umgang mit MRE (MRSA)', datum: '22.04.2025', teilnehmer: 3, naechste: '22.04.2026', faellig: true },
]

export default function Hygiene() {
  const [tab, setTab] = useState('plan')
  const [editing, setEditing] = useState(null)

  const offen = BEREICHE.filter(b => b.status === 'warn').length

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Hygieneplan</h1>
          <p className="page-sub">HACCP · Infektionsschutz · Schulungsnachweise · MDK-konform</p>
        </div>
        <div className="flex gap8">
          <button className="btn">📥 Hygieneplan PDF exportieren</button>
          <button className="btn btn-primary">+ Maßnahme hinzufügen</button>
        </div>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Maßnahmen gesamt</p>
          <p className="stat-value" style={{ color: 'var(--accent2)' }}>{BEREICHE.length}</p>
          <p className="stat-sub">dokumentiert</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Aktuell & erfüllt</p>
          <p className="stat-value" style={{ color: 'var(--green)' }}>{BEREICHE.filter(b => b.status === 'ok').length}</p>
          <span className="stat-badge badge-green">MDK-ready</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Nachzuprüfen</p>
          <p className="stat-value" style={{ color: offen > 0 ? 'var(--amber)' : 'var(--green)' }}>{offen}</p>
          {offen > 0 && <span className="stat-badge badge-amber">Kontrolle nötig</span>}
        </div>
        <div className="stat-card">
          <p className="stat-label">Schulungen fällig</p>
          <p className="stat-value" style={{ color: SCHULUNGEN.filter(s => s.faellig).length > 0 ? 'var(--red)' : 'var(--green)' }}>
            {SCHULUNGEN.filter(s => s.faellig).length}
          </p>
          {SCHULUNGEN.filter(s => s.faellig).length > 0 && <span className="stat-badge badge-red">Jetzt planen!</span>}
        </div>
      </div>

      <div className="flex gap8 mb16">
        {['plan', 'schulungen', 'protokoll'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'plan' ? 'Hygieneplan' : t === 'schulungen' ? 'Schulungsnachweise' : 'Prüfprotokoll'}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{ paddingLeft: 16 }}>Bereich</th>
                <th>Maßnahme</th>
                <th>Häufigkeit</th>
                <th>Verantwortlich</th>
                <th>Letzte Kontrolle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {BEREICHE.map(b => (
                <tr key={b.id} style={{ cursor: 'pointer' }} onClick={() => setEditing(editing === b.id ? null : b.id)}>
                  <td style={{ paddingLeft: 16, fontWeight: 600, color: 'var(--text)', fontSize: 13 }}>{b.bereich}</td>
                  <td style={{ fontSize: 12, color: 'var(--text2)', maxWidth: 280 }}>
                    <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{b.massnahme}</div>
                    {editing === b.id && (
                      <div className="fade-in" style={{ marginTop: 6, whiteSpace: 'normal', color: 'var(--text3)', fontSize: 11 }}>{b.massnahme}</div>
                    )}
                  </td>
                  <td style={{ fontSize: 11, color: 'var(--text3)' }}>{b.freq}</td>
                  <td style={{ fontSize: 12 }}>{b.verantwort}</td>
                  <td style={{ fontSize: 12, color: 'var(--text3)' }}>{b.letzteKontrolle}</td>
                  <td>
                    <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: b.status === 'ok' ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)', color: b.status === 'ok' ? 'var(--green)' : 'var(--amber)' }}>
                      {b.status === 'ok' ? '✓ OK' : '⚠ Prüfen'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'schulungen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {SCHULUNGEN.map((s, i) => (
            <div key={i} className="card" style={{ borderLeft: `3px solid ${s.faellig ? 'var(--red)' : 'var(--green)'}` }}>
              <div className="flex-between">
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 3 }}>{s.name}</p>
                  <p style={{ fontSize: 11, color: 'var(--text3)' }}>Durchgeführt: {s.datum} · {s.teilnehmer} Mitarbeiter · Nächste Fälligkeit: {s.naechste}</p>
                </div>
                <div className="flex gap8" style={{ alignItems: 'center' }}>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: s.faellig ? 'rgba(248,113,113,0.12)' : 'rgba(74,222,128,0.12)', color: s.faellig ? 'var(--red)' : 'var(--green)' }}>
                    {s.faellig ? '⚠ Fällig' : '✓ Aktuell'}
                  </span>
                  {s.faellig && <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 10px' }}>Termin planen</button>}
                </div>
              </div>
            </div>
          ))}
          <button className="btn" style={{ fontSize: 12, alignSelf: 'flex-start' }}>+ Schulung dokumentieren</button>
        </div>
      )}

      {tab === 'protokoll' && (
        <div className="card">
          <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 14 }}>Tägliches Hygieneprotokoll — 25.05.2026</p>
          {BEREICHE.filter(b => ['Flächendesinfektion', 'Fahrzeughygiene', 'Küchenbereich', 'Wäsche & Textilien'].includes(b.bereich)).map((b, i) => (
            <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${i < 2 ? 'var(--green)' : 'var(--border2)'}`, background: i < 2 ? 'rgba(74,222,128,0.15)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, color: 'var(--green)' }}>
                {i < 2 ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500 }}>{b.bereich}</p>
                <p style={{ fontSize: 11, color: 'var(--text3)' }}>{b.massnahme}</p>
              </div>
              <span style={{ fontSize: 11, color: i < 2 ? 'var(--green)' : 'var(--text3)' }}>{i < 2 ? 'Erledigt 08:30' : 'Ausstehend'}</span>
            </div>
          ))}
          <button className="btn btn-primary" style={{ marginTop: 14, fontSize: 12 }}>Protokoll abzeichnen (PDL)</button>
        </div>
      )}
    </div>
  )
}
