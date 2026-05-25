import { useState } from 'react'
import { GUESTS } from '../data/mock'

const SIS_BEREICHE = [
  { id: 1, titel: 'Kognition & Kommunikation', icon: '🧠', frage: 'Wie nimmt die Person ihre Umwelt wahr? Wie kommuniziert sie?' },
  { id: 2, titel: 'Mobilität & Bewegung', icon: '🦽', frage: 'Wie bewegt sich die Person? Welche Hilfsmittel werden genutzt?' },
  { id: 3, titel: 'Krankheitsbezogene Anforderungen', icon: '⚕️', frage: 'Welche Erkrankungen, Medikamente und Behandlungen sind relevant?' },
  { id: 4, titel: 'Selbstversorgung', icon: '🍽️', frage: 'Wie versorgt sich die Person in der Grundpflege? Wo braucht sie Unterstützung?' },
  { id: 5, titel: 'Leben in sozialen Beziehungen', icon: '👥', frage: 'Welche sozialen Kontakte hat die Person? Was ist ihr wichtig?' },
  { id: 6, titel: 'Wohnen & Häuslichkeit', icon: '🏠', frage: 'Wie ist die Wohnsituation? Welche Hilfsmittel sind vorhanden?' },
]

const SIS_DATA = {
  1: {
    1: { text: 'Kann sich verbal gut äußern, versteht einfache Anweisungen. Gelegentliche Verwirrtheit am frühen Morgen. Erkennt vertraute Personen sicher.', risiken: ['Sturzgefahr bei Verwirrtheit'], massnahmen: ['Morgenbegleitung durch vertraute Kraft', 'Ruhige Umgebung beim Ankommen'] },
    3: { text: 'Stark demenziell verändert. Kommunikation über nonverbale Signale. Reagiert auf vertraute Stimmen und Musik positiv. Kennt Tochter zuverlässig.', risiken: ['Weglaufgefahr', 'Schluckstörungen', 'Erhöhtes Sturzrisiko'], massnahmen: ['Sitzgurt im Rollstuhl', 'Pürierte Kost', 'Ständige Aufsicht', 'Erinnerungsarbeit mit Fotos'] },
  }
}

const RISIKOSKALEN = [
  { id: 'sturz', name: 'Sturzrisiko', max: 20, wert: { 1: 12, 3: 17, 4: 8 } },
  { id: 'deku', name: 'Dekubitusrisiko (Braden)', max: 23, wert: { 1: 18, 3: 12, 4: 20 } },
  { id: 'schmerz', name: 'Schmerzassessment', max: 10, wert: { 1: 2, 3: 4, 4: 1 } },
]

function RisikoBar({ name, wert, max }) {
  const pct = (wert / max) * 100
  const color = pct > 70 ? 'var(--red)' : pct > 45 ? 'var(--amber)' : 'var(--green)'
  return (
    <div style={{ marginBottom: 10 }}>
      <div className="flex-between" style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--text2)' }}>{name}</span>
        <span style={{ fontSize: 11, fontWeight: 600, color }}>{wert}/{max}</span>
      </div>
      <div style={{ height: 5, background: 'var(--bg3)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 3, transition: 'width 0.5s' }} />
      </div>
    </div>
  )
}

export default function SIS() {
  const [selectedGuest, setSelectedGuest] = useState(GUESTS[0])
  const [activeBereich, setActiveBereich] = useState(1)
  const [generating, setGenerating] = useState(false)
  const [generatedSIS, setGeneratedSIS] = useState({})
  const [tab, setTab] = useState('sis')

  const sisData = SIS_DATA[selectedGuest.id] || {}
  const currentBereich = SIS_BEREICHE.find(b => b.id === activeBereich)

  const generateSIS = async () => {
    setGenerating(true)
    const key = `${selectedGuest.id}-${activeBereich}`
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          messages: [{
            role: 'user',
            content: `Erstelle eine SIS-Einschätzung nach Strukturmodell für Bereich "${currentBereich.titel}" für: ${selectedGuest.name}, ${selectedGuest.age} Jahre, Pflegegrad ${selectedGuest.pg}, ${selectedGuest.notes}. Schreibe 2-3 Sätze sachlich-fachlich, MDK-konform. Dann liste 2-3 Pflegemaßnahmen auf (als kurze Stichworte).`
          }]
        })
      })
      const data = await resp.json()
      setGeneratedSIS(p => ({ ...p, [key]: data.content?.[0]?.text || '' }))
    } catch {
      setGeneratedSIS(p => ({ ...p, [`${selectedGuest.id}-${activeBereich}`]: `${selectedGuest.name} zeigt im Bereich ${currentBereich.titel} einen stabilen Zustand mit bekanntem Hilfebedarf. Regelmäßige Beobachtung und angepasste Unterstützung sind sichergestellt.` }))
    }
    setGenerating(false)
  }

  const currentKey = `${selectedGuest.id}-${activeBereich}`
  const currentData = generatedSIS[currentKey] || sisData[activeBereich]?.text

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Pflegeplanung (SIS)</h1>
          <p className="page-sub">Strukturiertes Informationssystem · MDK-konform</p>
        </div>
        <div className="flex gap8">
          <button className="btn">📥 SIS exportieren (PDF)</button>
          <button className="btn btn-primary">✦ KI-Gesamtplan erstellen</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, alignItems: 'start' }}>
        {/* Guest sidebar */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Gast</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {GUESTS.slice(0, 5).map(g => (
              <button key={g.id} onClick={() => setSelectedGuest(g)} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', background: selectedGuest.id === g.id ? 'rgba(124,111,255,0.1)' : 'var(--bg2)', borderRadius: 8, border: `1px solid ${selectedGuest.id === g.id ? 'var(--accent)' : 'var(--border)'}`, cursor: 'pointer', textAlign: 'left' }}>
                <div className={`avatar ${g.color}`} style={{ width: 28, height: 28, fontSize: 10, flexShrink: 0 }}>{g.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{g.name.split(' ')[0]} {g.name.split(' ')[1]?.[0]}.</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>PG {g.pg}</div>
                </div>
              </button>
            ))}
          </div>

          <div style={{ marginTop: 16 }}>
            <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Risikoskalen</p>
            <div className="card" style={{ padding: '14px 16px' }}>
              {RISIKOSKALEN.map(r => (
                <RisikoBar key={r.id} name={r.name} wert={r.wert[selectedGuest.id] || 5} max={r.max} />
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div>
          <div className="flex gap8 mb16">
            {['sis', 'massnahmen', 'verlauf'].map(t => (
              <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
                {t === 'sis' ? 'SIS-Einschätzung' : t === 'massnahmen' ? 'Pflegemaßnahmen' : 'Verlaufsdokumentation'}
              </button>
            ))}
          </div>

          {tab === 'sis' && (
            <div>
              {/* Bereiche */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
                {SIS_BEREICHE.map(b => {
                  const hasData = !!generatedSIS[`${selectedGuest.id}-${b.id}`] || !!sisData[b.id]
                  return (
                    <button key={b.id} onClick={() => setActiveBereich(b.id)} style={{ padding: '10px 12px', background: activeBereich === b.id ? 'rgba(124,111,255,0.1)' : 'var(--bg2)', border: `1px solid ${activeBereich === b.id ? 'var(--accent)' : 'var(--border)'}`, borderRadius: 8, cursor: 'pointer', textAlign: 'left', position: 'relative' }}>
                      <div style={{ fontSize: 16, marginBottom: 4 }}>{b.icon}</div>
                      <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text)', lineHeight: 1.3 }}>{b.titel}</div>
                      {hasData && <div style={{ position: 'absolute', top: 8, right: 8, width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />}
                    </button>
                  )
                })}
              </div>

              {/* Active bereich detail */}
              <div className="card">
                <div className="flex-between mb12">
                  <div>
                    <h3 style={{ fontSize: 16, fontFamily: 'var(--font-head)', fontWeight: 500 }}>{currentBereich.icon} {currentBereich.titel}</h3>
                    <p style={{ fontSize: 12, color: 'var(--text3)', marginTop: 2 }}>{currentBereich.frage}</p>
                  </div>
                  <button className="btn" style={{ fontSize: 11, padding: '5px 12px', flexShrink: 0 }} onClick={generateSIS} disabled={generating}>
                    {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /><span style={{ marginLeft: 8 }}>KI denkt…</span></> : '✦ KI-Einschätzung'}
                  </button>
                </div>

                {currentData ? (
                  <div>
                    <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '12px 14px', fontSize: 13, color: 'var(--text)', lineHeight: 1.7, marginBottom: 12, whiteSpace: 'pre-wrap' }}>
                      {currentData}
                    </div>
                    {sisData[activeBereich]?.risiken && (
                      <div style={{ marginBottom: 10 }}>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--red)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>⚠ Risiken</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {sisData[activeBereich].risiken.map(r => (
                            <span key={r} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(248,113,113,0.1)', color: 'var(--red)' }}>{r}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {sisData[activeBereich]?.massnahmen && (
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6 }}>✓ Pflegemaßnahmen</p>
                        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                          {sisData[activeBereich].massnahmen.map(m => (
                            <span key={m} style={{ fontSize: 11, padding: '2px 8px', borderRadius: 4, background: 'rgba(74,222,128,0.1)', color: 'var(--green)' }}>{m}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                      <button className="btn" style={{ fontSize: 11, padding: '5px 12px' }}>✏ Bearbeiten</button>
                      <button className="btn" style={{ fontSize: 11, padding: '5px 12px' }}>✓ Freigeben (PDL)</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ padding: '32px 0', textAlign: 'center', color: 'var(--text3)' }}>
                    <p style={{ fontSize: 32, marginBottom: 8 }}>✦</p>
                    <p style={{ fontSize: 13, marginBottom: 12 }}>Noch keine Einschätzung für diesen Bereich</p>
                    <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={generateSIS} disabled={generating}>
                      {generating ? 'KI generiert…' : '✦ KI-Einschätzung erstellen'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {tab === 'massnahmen' && (
            <div className="card">
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 12 }}>Pflegeplan — {selectedGuest.name}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {[
                  { bereich: 'Mobilität', massnahme: 'Begleitung beim Ein-/Aussteigen aus dem Fahrtdienst', freq: 'Täglich', verantw: 'Pflegekraft' },
                  { bereich: 'Ernährung', massnahme: selectedGuest.diet === 'Weichkost' ? 'Weichkost anbieten, ausreichend Flüssigkeit' : selectedGuest.diet === 'Diabetiker' ? 'Diabetikergerechte Kost, BZ-Kontrolle' : 'Beobachtung der Nahrungsaufnahme', freq: 'Täglich', verantw: 'Betreuung' },
                  { bereich: 'Soziale Teilhabe', massnahme: 'Einbindung in Gruppenaktivitäten, Einzelansprache', freq: '3x/Woche', verantw: 'Betreuungskraft' },
                  { bereich: 'Kommunikation', massnahme: 'Angehörigen-Update täglich über App', freq: 'Täglich', verantw: 'Automatisch / KI' },
                ].map((m, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, padding: '10px 12px', background: 'var(--bg3)', borderRadius: 8 }}>
                    <span style={{ fontSize: 11, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: 'rgba(124,111,255,0.1)', color: 'var(--accent2)', alignSelf: 'flex-start', flexShrink: 0 }}>{m.bereich}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 12, color: 'var(--text)', marginBottom: 2 }}>{m.massnahme}</div>
                      <div style={{ fontSize: 11, color: 'var(--text3)' }}>{m.freq} · {m.verantw}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'verlauf' && (
            <div className="card">
              <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 12 }}>Verlaufsdokumentation — {selectedGuest.name}</p>
              {[
                { datum: 'Heute, 16:15', text: 'Tagesverlauf ohne besondere Vorkommnisse. Hat gut an den Aktivitäten teilgenommen. Mahlzeiten vollständig eingenommen.', kraft: 'M. Schulze', ki: true },
                { datum: '24.05.2026, 16:00', text: 'Leichte Unruhe am Nachmittag, beruhigt durch Musik. Blutdruck 135/82 mmHg, unauffällig. Gute Stimmung beim Abschied.', kraft: 'R. Ahmadi', ki: false },
                { datum: '23.05.2026, 15:45', text: 'Besuch der Tochter gegen 14:00 Uhr, Gast sichtlich erfreut. Abendessen komplett gegessen. Fahrtdienst pünktlich.', kraft: 'M. Schulze', ki: true },
              ].map((e, i) => (
                <div key={i} style={{ padding: '12px 0', borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div className="flex-between" style={{ marginBottom: 5 }}>
                    <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 500 }}>{e.datum}</span>
                    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                      {e.ki && <span style={{ fontSize: 9, padding: '1px 6px', borderRadius: 3, background: 'rgba(124,111,255,0.1)', color: 'var(--accent2)' }}>KI-generiert</span>}
                      <span style={{ fontSize: 11, color: 'var(--text3)' }}>{e.kraft}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{e.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
