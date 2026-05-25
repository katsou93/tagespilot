import { useState } from 'react'
import { TODAY_GUESTS } from '../data/mock'

const AKTIVITAETEN_TYPEN = [
  { id: 'kognitiv', label: 'Kognitiv', color: '#7c6fff', bg: 'rgba(124,111,255,0.12)', icon: '🧩' },
  { id: 'bewegt', label: 'Bewegung', color: '#4ade80', bg: 'rgba(74,222,128,0.12)', icon: '🤸' },
  { id: 'sozial', label: 'Sozial', color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)', icon: '👥' },
  { id: 'kreativ', label: 'Kreativ', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', icon: '🎨' },
  { id: 'ruhe', label: 'Ruhe', color: '#f87171', bg: 'rgba(248,113,113,0.12)', icon: '😌' },
  { id: 'pflege', label: 'Pflege', color: '#378ADD', bg: 'rgba(55,138,221,0.12)', icon: '💊' },
]

const TAGESPLAN = [
  { zeit: '08:00', titel: 'Ankommen & Begrüßung', typ: 'sozial', dauer: 30, teilnehmer: 'alle', erledigt: true, notiz: 'Jeder Gast wird persönlich begrüßt' },
  { zeit: '08:30', titel: 'Morgenrunde', typ: 'kognitiv', dauer: 30, teilnehmer: 'alle', erledigt: true, notiz: 'Datum, Wetter, Tagesplan besprechen' },
  { zeit: '09:00', titel: 'Stuhlgymnastik', typ: 'bewegt', dauer: 30, teilnehmer: 'alle', erledigt: true, notiz: 'Angepasst an Mobilität der Gäste' },
  { zeit: '09:30', titel: 'Einzelbetreuung Erna H.', typ: 'sozial', dauer: 20, teilnehmer: 'Erna Hoffmann', erledigt: false, notiz: 'Biographiearbeit mit Fotoalbum' },
  { zeit: '10:00', titel: 'Gedächtnistraining', typ: 'kognitiv', dauer: 45, teilnehmer: 'alle', erledigt: false, notiz: 'Wortfindungsspiele, Zeitungsrunde' },
  { zeit: '10:45', titel: 'Kaffeepause', typ: 'sozial', dauer: 30, teilnehmer: 'alle', erledigt: false, notiz: '' },
  { zeit: '11:15', titel: 'Kreativgruppe — Malen', typ: 'kreativ', dauer: 45, teilnehmer: '3 Gäste', erledigt: false, notiz: 'Aquarellfarben, Frühlingsmotiv' },
  { zeit: '12:00', titel: 'Mittagessen', typ: 'pflege', dauer: 45, teilnehmer: 'alle', erledigt: false, notiz: '1× Diabetiker, 1× Weichkost, 1× Püriert' },
  { zeit: '13:00', titel: 'Ruhezeit / Einzelbetreuung', typ: 'ruhe', dauer: 60, teilnehmer: 'alle', erledigt: false, notiz: '' },
  { zeit: '14:00', titel: 'Musiktherapie', typ: 'kreativ', dauer: 45, teilnehmer: 'alle', erledigt: false, notiz: 'Schlager aus den 50ern/60ern' },
  { zeit: '15:00', titel: 'Kaffee & Kuchen', typ: 'sozial', dauer: 30, teilnehmer: 'alle', erledigt: false, notiz: '' },
  { zeit: '15:30', titel: 'Spielrunde / Spaziersimulation', typ: 'bewegt', dauer: 30, teilnehmer: 'mobile Gäste', erledigt: false, notiz: '' },
  { zeit: '16:00', titel: 'Abschlussrunde & Verabschiedung', typ: 'sozial', dauer: 30, teilnehmer: 'alle', erledigt: false, notiz: '' },
  { zeit: '16:30', titel: 'Fahrtdienst Rückfahrt', typ: 'pflege', dauer: 0, teilnehmer: 'alle', erledigt: false, notiz: '' },
]

const WOCHEN_PLAN = {
  Mo: ['Morgenrunde', 'Stuhlgymnastik', 'Gedächtnistraining', 'Musiktherapie', 'Spielrunde'],
  Di: ['Morgenrunde', 'Yoga im Sitzen', 'Zeitungsrunde', 'Kreativgruppe', 'Vorlesen'],
  Mi: ['Morgenrunde', 'Tanzen', 'Kochgruppe', 'Kinozeit', 'Gesellschaftsspiele'],
  Do: ['Morgenrunde', 'Wassergymnastik', 'Biographiearbeit', 'Konzertbesuch', 'Bastelrunde'],
  Fr: ['Morgenrunde', 'Bewegungsspiele', 'Wochenrückblick', 'Singkreis', 'Abschlussfeier'],
}

function TypBadge({ typ }) {
  const t = AKTIVITAETEN_TYPEN.find(a => a.id === typ)
  if (!t) return null
  return (
    <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 7px', borderRadius: 4, background: t.bg, color: t.color, flexShrink: 0 }}>
      {t.icon} {t.label}
    </span>
  )
}

export default function Aktivitaeten() {
  const [tab, setTab] = useState('heute')
  const [done, setDone] = useState({ 0: true, 1: true, 2: true })

  const erledigt = TAGESPLAN.filter(a => a.erledigt || done[TAGESPLAN.indexOf(a)]).length
  const total = TAGESPLAN.length

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Aktivitätsplanung</h1>
          <p className="page-sub">Tagesstruktur · Wochen- und Jahresplanung</p>
        </div>
        <div className="flex gap8">
          <button className="btn">✦ KI-Wochenplan erstellen</button>
          <button className="btn btn-primary">+ Aktivität planen</button>
        </div>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Aktivitäten heute</p>
          <p className="stat-value" style={{ color: 'var(--accent2)' }}>{total}</p>
          <p className="stat-sub">{erledigt} erledigt</p>
          <div style={{ marginTop: 8, height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(erledigt / total) * 100}%`, background: 'var(--accent)', borderRadius: 2 }} />
          </div>
        </div>
        <div className="stat-card">
          <p className="stat-label">Gäste heute</p>
          <p className="stat-value" style={{ color: 'var(--green)' }}>{TODAY_GUESTS.length}</p>
          <p className="stat-sub">alle in Tagesplan</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Nächste Aktivität</p>
          <p className="stat-value" style={{ color: 'var(--teal)', fontSize: 18 }}>Gedächtnis</p>
          <p className="stat-sub">10:00 Uhr · 45 Min</p>
          <span className="stat-badge badge-teal">In 25 Min</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Einzelbetreuungen</p>
          <p className="stat-value" style={{ color: 'var(--amber)' }}>1</p>
          <p className="stat-sub">Erna H. um 09:30</p>
          <span className="stat-badge badge-amber">Heute</span>
        </div>
      </div>

      <div className="flex gap8 mb16">
        {['heute', 'woche', 'typen'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'heute' ? 'Heute' : t === 'woche' ? 'Wochenplan' : 'Aktivitätstypen'}
          </button>
        ))}
      </div>

      {tab === 'heute' && (
        <div className="grid2 gap16">
          {/* Timeline */}
          <div className="card" style={{ padding: '16px 0' }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 16px 12px' }}>Tagesablauf</p>
            {TAGESPLAN.map((a, i) => {
              const isDone = a.erledigt || done[i]
              const typ = AKTIVITAETEN_TYPEN.find(t => t.id === a.typ)
              return (
                <div key={i} style={{ display: 'flex', gap: 12, padding: '8px 16px', borderBottom: i < TAGESPLAN.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none', opacity: isDone ? 0.55 : 1, cursor: 'pointer' }}
                  onClick={() => setDone(d => ({ ...d, [i]: !d[i] }))}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 44, flexShrink: 0 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', fontFamily: 'var(--font-head)' }}>{a.zeit}</span>
                    {a.dauer > 0 && <span style={{ fontSize: 9, color: 'var(--text3)', marginTop: 1 }}>{a.dauer}m</span>}
                  </div>
                  <div style={{ width: 1, background: typ?.color || 'var(--border)', opacity: 0.3, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div className="flex gap8" style={{ alignItems: 'center', marginBottom: 3, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 13, fontWeight: isDone ? 400 : 500, color: 'var(--text)', textDecoration: isDone ? 'line-through' : 'none' }}>{a.titel}</span>
                      <TypBadge typ={a.typ} />
                    </div>
                    {a.teilnehmer && <span style={{ fontSize: 11, color: 'var(--text3)' }}>👤 {a.teilnehmer}</span>}
                    {a.notiz && <p style={{ fontSize: 11, color: 'var(--text3)', marginTop: 2 }}>{a.notiz}</p>}
                  </div>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', border: `1.5px solid ${isDone ? 'var(--green)' : 'var(--border2)'}`, background: isDone ? 'rgba(74,222,128,0.15)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 10, color: 'var(--green)' }}>
                    {isDone ? '✓' : ''}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: type breakdown + guests */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div className="card">
              <p className="card-title">Aktivitätsverteilung heute</p>
              {AKTIVITAETEN_TYPEN.map(t => {
                const count = TAGESPLAN.filter(a => a.typ === t.id).length
                return count > 0 ? (
                  <div key={t.id} className="flex-between" style={{ padding: '5px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text2)' }}>{t.icon} {t.label}</span>
                    <div className="flex gap8" style={{ alignItems: 'center' }}>
                      <div style={{ width: 60, height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${(count / TAGESPLAN.length) * 100}%`, background: t.color, borderRadius: 2 }} />
                      </div>
                      <span style={{ fontSize: 11, color: t.color, fontWeight: 500, width: 14 }}>{count}×</span>
                    </div>
                  </div>
                ) : null
              })}
            </div>

            <div className="card">
              <p className="card-title">Gäste & Teilnahme</p>
              {TODAY_GUESTS.map(g => (
                <div key={g.id} className="flex-between" style={{ padding: '6px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                  <div className="flex gap8" style={{ alignItems: 'center' }}>
                    <div className={`avatar ${g.color}`} style={{ width: 26, height: 26, fontSize: 10 }}>{g.initials}</div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{g.name.split(' ')[0]}</span>
                  </div>
                  <div className="flex gap4" style={{ gap: 3 }}>
                    {AKTIVITAETEN_TYPEN.slice(0, 4).map(t => (
                      <div key={t.id} style={{ width: 6, height: 6, borderRadius: '50%', background: Math.random() > 0.3 ? t.color : 'var(--bg3)', opacity: 0.8 }} title={t.label} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {tab === 'woche' && (
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)' }}>
            {Object.entries(WOCHEN_PLAN).map(([day, acts], di) => (
              <div key={day} style={{ borderRight: di < 4 ? '1px solid var(--border)' : 'none' }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', background: 'var(--bg3)' }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', textAlign: 'center' }}>{day}</p>
                </div>
                {acts.map((act, i) => {
                  const farbe = AKTIVITAETEN_TYPEN[i % AKTIVITAETEN_TYPEN.length]
                  return (
                    <div key={i} style={{ padding: '8px 12px', borderBottom: i < acts.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                      <div style={{ fontSize: 11, color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 5 }}>
                        <span style={{ fontSize: 8, color: farbe.color }}>●</span> {act}
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'typen' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }}>
          {AKTIVITAETEN_TYPEN.map(t => (
            <div key={t.id} className="card">
              <div style={{ fontSize: 28, marginBottom: 10 }}>{t.icon}</div>
              <h3 style={{ fontSize: 15, fontWeight: 500, color: t.color, marginBottom: 6 }}>{t.label}</h3>
              <p style={{ fontSize: 12, color: 'var(--text3)', lineHeight: 1.6 }}>
                {t.id === 'kognitiv' ? 'Gedächtnistraining, Zeitungsrunde, Quizspiele, Wortfindung' :
                  t.id === 'bewegt' ? 'Stuhlgymnastik, Tanzen, Yoga im Sitzen, Gleichgewichtsübungen' :
                    t.id === 'sozial' ? 'Morgenrunde, Gespräche, Ausflüge, Besucherempfang' :
                      t.id === 'kreativ' ? 'Malen, Basteln, Musiktherapie, Singkreis, Kochen' :
                        t.id === 'ruhe' ? 'Mittagsruhe, Vorlesen, Entspannungsmusik, Einzelzeit' :
                          'Medikamentengabe, Mahlzeiten, Wundversorgung, Vitalzeichenkontrolle'}
              </p>
              <div style={{ marginTop: 10, fontSize: 11, color: 'var(--text3)' }}>
                {TAGESPLAN.filter(a => a.typ === t.id).length}× diese Woche geplant
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
