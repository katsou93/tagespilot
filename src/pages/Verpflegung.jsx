import { useState } from 'react'
import { GUESTS } from '../data/mock'

const SPEISEPLAN = {
  Mo: { frueh: 'Vollkornbrot mit Käse & Aufschnitt', mittag: 'Rindergulasch, Kartoffeln, Rotkohl', kaffee: 'Apfelkuchen', abendbrot: '—' },
  Di: { frueh: 'Müsli mit Früchten & Joghurt', mittag: 'Lachsfilet, Reis, Brokkoli', kaffee: 'Waffelherzen', abendbrot: '—' },
  Mi: { frueh: 'Brötchen mit Marmelade & Butter', mittag: 'Hühnereintopf mit Nudeln', kaffee: 'Streuselkuchen', abendbrot: '—' },
  Do: { frueh: 'Toast mit Ei und Aufschnitt', mittag: 'Schweinebraten, Knödel, Soße', kaffee: 'Marmorkuchen', abendbrot: '—' },
  Fr: { frueh: 'Cornflakes mit Milch & Banane', mittag: 'Forelle, Salzkartoffeln, Salat', kaffee: 'Obsttorte', abendbrot: '—' },
}

const DIÄT_INFOS = {
  'Normal': { badge: 'bg', desc: 'Vollkost ohne Einschränkungen' },
  'Weichkost': { badge: 'ba', desc: 'Weich gekochte, gut kaubare Speisen' },
  'Diabetiker': { badge: 'br', desc: 'Kohlenhydratreduziert, kein Zucker' },
  'Püriert': { badge: 'bp', desc: 'Vollständig pürierte Speisen, Schluckhilfe' },
  'Sonderkost': { badge: 'bgr', desc: 'Individuelle Sonderkost nach ärztl. Anweisung' },
}

const ALLERGIEN = [
  { gastId: 1, allergien: [] },
  { gastId: 3, allergien: ['Laktose'] },
  { gastId: 4, allergien: ['Nüsse'] },
  { gastId: 7, allergien: ['Gluten', 'Laktose'] },
]

const HEUTE_GABEN = [
  { mahlzeit: 'Frühstück', zeit: '08:45', status: 'erledigt', kcal: 320 },
  { mahlzeit: 'Mittagessen', zeit: '12:00', status: 'geplant', kcal: 650 },
  { mahlzeit: 'Nachmittagskaffee', zeit: '15:00', status: 'geplant', kcal: 280 },
]

export default function Verpflegung() {
  const [tab, setTab] = useState('heute')
  const [selectedDay, setSelectedDay] = useState('Mo')

  const diätGruppen = Object.entries(
    GUESTS.reduce((acc, g) => {
      acc[g.diet] = (acc[g.diet] || 0) + 1
      return acc
    }, {})
  )

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Verpflegung & Ernährung</h1>
          <p className="page-sub">Speiseplan · Diäten · Flüssigkeitsbilanz</p>
        </div>
        <div className="flex gap8">
          <button className="btn">✦ KI-Speiseplan erstellen</button>
          <button className="btn btn-primary">+ Menü planen</button>
        </div>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Gäste heute</p>
          <p className="stat-value" style={{ color: 'var(--accent2)' }}>{GUESTS.filter(g => g.days.includes('Mo')).length}</p>
          <p className="stat-sub">3 Diätkategorien</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Sonderdiäten</p>
          <p className="stat-value" style={{ color: 'var(--amber)' }}>{GUESTS.filter(g => g.diet !== 'Normal').length}</p>
          <p className="stat-sub">von {GUESTS.length} Gästen</p>
          <span className="stat-badge badge-amber">Zubereitung beachten</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Allergien</p>
          <p className="stat-value" style={{ color: 'var(--red)' }}>{ALLERGIEN.filter(a => a.allergien.length > 0).length}</p>
          <p className="stat-sub">Gäste betroffen</p>
          <span className="stat-badge badge-red">Prüfen!</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Ø Tages-kcal</p>
          <p className="stat-value" style={{ color: 'var(--green)' }}>1.250</p>
          <p className="stat-sub">kcal pro Gast</p>
          <span className="stat-badge badge-green">Im Zielbereich</span>
        </div>
      </div>

      <div className="flex gap8 mb16">
        {['heute', 'speiseplan', 'diaeten'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'heute' ? 'Heute' : t === 'speiseplan' ? 'Wochenspeiseplan' : 'Diäten & Allergien'}
          </button>
        ))}
      </div>

      {tab === 'heute' && (
        <div className="grid2 gap16">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Mahlzeiten heute</p>
            {HEUTE_GABEN.map((m, i) => (
              <div key={i} className="card" style={{ marginBottom: 8, padding: '12px 16px' }}>
                <div className="flex-between mb8">
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{m.mahlzeit}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)' }}>{m.zeit} Uhr · {m.kcal} kcal</p>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: m.status === 'erledigt' ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)', color: m.status === 'erledigt' ? 'var(--green)' : 'var(--amber)' }}>
                    {m.status === 'erledigt' ? '✓ Ausgegeben' : '⏳ Geplant'}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--text2)', fontStyle: 'italic' }}>
                  {m.mahlzeit === 'Frühstück' ? SPEISEPLAN.Mo.frueh : m.mahlzeit === 'Mittagessen' ? SPEISEPLAN.Mo.mittag : SPEISEPLAN.Mo.kaffee}
                </div>
                {m.mahlzeit === 'Mittagessen' && (
                  <div style={{ marginTop: 8, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {GUESTS.filter(g => g.diet !== 'Normal' && g.days.includes('Mo')).map(g => (
                      <span key={g.id} style={{ fontSize: 10, padding: '1px 7px', borderRadius: 3, background: 'rgba(248,113,113,0.1)', color: 'var(--red)' }}>
                        ⚠ {g.name.split(' ')[0]}: {g.diet}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Flüssigkeitsbilanz</p>
            <div className="card">
              {GUESTS.filter(g => g.days.includes('Mo')).map((g, i) => {
                const ml = 400 + Math.floor(Math.random() * 800)
                const ziel = 1200
                const pct = Math.min((ml / ziel) * 100, 100)
                return (
                  <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: i < 3 ? '1px solid var(--border)' : 'none' }}>
                    <div className={`avatar ${g.color}`} style={{ width: 24, height: 24, fontSize: 9, flexShrink: 0 }}>{g.initials}</div>
                    <span style={{ fontSize: 11, color: 'var(--text2)', width: 80, flexShrink: 0 }}>{g.name.split(' ')[0]}</span>
                    <div style={{ flex: 1, height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: pct < 40 ? 'var(--red)' : pct < 70 ? 'var(--amber)' : 'var(--teal)', borderRadius: 2 }} />
                    </div>
                    <span style={{ fontSize: 11, fontWeight: 500, color: pct < 40 ? 'var(--red)' : 'var(--text3)', width: 60, textAlign: 'right' }}>{ml} ml</span>
                  </div>
                )
              })}
              <p style={{ fontSize: 10, color: 'var(--text3)', marginTop: 8 }}>Ziel: 1.200 ml/Tag pro Gast</p>
            </div>
          </div>
        </div>
      )}

      {tab === 'speiseplan' && (
        <div>
          <div className="flex gap8 mb12">
            {Object.keys(SPEISEPLAN).map(d => (
              <button key={d} className="btn" style={{ fontSize: 12, padding: '6px 14px', background: selectedDay === d ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: selectedDay === d ? 'var(--accent2)' : 'var(--text2)', borderColor: selectedDay === d ? 'var(--accent)' : 'var(--border)' }} onClick={() => setSelectedDay(d)}>{d}</button>
            ))}
          </div>
          <div className="grid2 gap12">
            {[
              { label: '🌅 Frühstück', value: SPEISEPLAN[selectedDay].frueh },
              { label: '☀️ Mittagessen', value: SPEISEPLAN[selectedDay].mittag },
              { label: '☕ Nachmittag', value: SPEISEPLAN[selectedDay].kaffee },
            ].map(m => (
              <div key={m.label} className="card">
                <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>{m.label}</p>
                <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.5 }}>{m.value}</p>
                <div style={{ marginTop: 10, display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {GUESTS.filter(g => g.diet !== 'Normal' && g.days.includes(selectedDay)).map(g => (
                    <span key={g.id} style={{ fontSize: 10, padding: '1px 7px', borderRadius: 3, background: 'rgba(251,191,36,0.1)', color: 'var(--amber)' }}>{g.name.split(' ')[0]}: {g.diet}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'diaeten' && (
        <div className="grid2 gap16">
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Diätverteilung</p>
            {diätGruppen.map(([diät, anzahl]) => {
              const info = DIÄT_INFOS[diät] || { badge: 'bgr', desc: '' }
              return (
                <div key={diät} className="card" style={{ marginBottom: 8, padding: '12px 16px' }}>
                  <div className="flex-between mb4">
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{diät}</span>
                    <span className={`badge b${info.badge}`} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4 }}>{anzahl} Gast{anzahl > 1 ? 'ä' : ''}</span>
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text3)' }}>{info.desc}</p>
                </div>
              )
            })}
          </div>
          <div>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10 }}>Allergien & Unverträglichkeiten</p>
            {ALLERGIEN.filter(a => a.allergien.length > 0).map(a => {
              const g = GUESTS.find(x => x.id === a.gastId)
              return g ? (
                <div key={a.gastId} className="card" style={{ marginBottom: 8, padding: '10px 16px', borderLeft: '3px solid var(--red)' }}>
                  <div className="flex gap10" style={{ alignItems: 'center' }}>
                    <div className={`avatar ${g.color}`} style={{ width: 28, height: 28, fontSize: 10 }}>{g.initials}</div>
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{g.name}</p>
                      <div style={{ display: 'flex', gap: 4, marginTop: 3 }}>
                        {a.allergien.map(al => (
                          <span key={al} style={{ fontSize: 10, padding: '1px 7px', borderRadius: 3, background: 'rgba(248,113,113,0.12)', color: 'var(--red)', fontWeight: 500 }}>⚠ {al}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : null
            })}
          </div>
        </div>
      )}
    </div>
  )
}
