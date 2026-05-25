import { useState } from 'react'
import { GUESTS } from '../data/mock'

const BIOGRAPHIE_DATA = {
  1: {
    geburtsort: 'Krefeld',
    beruf: 'Schneiderin, später Hausfrau',
    family: 'Verheiratet (Ehemann verstorben 2018), 2 Kinder, 4 Enkelkinder',
    hobbies: 'Stricken, Gartenarbeit, Schlager der 50er Jahre',
    wichtig: 'Morgenkaffee mit Milch ohne Zucker, mag keine Zugluft, liebt Blumen',
    abneigungen: 'Lärm, schnelle Bewegungen, fremde Menschen zu nah',
    religion: 'Evangelisch, Kirchgang früher jeden Sonntag',
    besonderes: 'Ehemann hieß Walter — Name hat große Bedeutung. Spricht manchmal von ihrer Kindheit in Krefeld-Uerdingen.',
    foto: null,
  },
  3: {
    geburtsort: 'Mönchengladbach',
    beruf: 'Grundschullehrerin (30 Jahre)',
    family: 'Verwitwet, 1 Sohn (Michael, lebt in Köln)',
    hobbies: 'Lesen, Kreuzworträtsel, klassische Musik',
    wichtig: 'Sehr ordentlich, möchte Dinge an festem Platz. Liest täglich Zeitung.',
    abneigungen: 'Unordnung, laute Musik, Veränderungen der Tagesstruktur',
    religion: 'Katholisch',
    besonderes: 'War Lehrerin — reagiert positiv auf strukturierte Aufgaben. Benutzt gerne ihren Titel "Frau Lehrerin".',
    foto: null,
  },
}

const KAPITEL = [
  { id: 'leben', label: 'Lebenslauf', icon: '📖' },
  { id: 'vorlieben', label: 'Vorlieben', icon: '❤️' },
  { id: 'besonderheiten', label: 'Besonderheiten', icon: '⭐' },
  { id: 'notfall', label: 'Arzt & Notfall', icon: '🏥' },
]

const NOTFALL_DATA = {
  1: { hausarzt: 'Dr. med. Klaus Werner, Tel: 02151-12345', krankenhaus: 'Helios Klinikum Krefeld', notfallkontakt: 'Petra Meier (Tochter): 0157-11223344', versicherung: 'AOK Rheinland/Hamburg, Nr. A123456789', medAllergien: 'Penicillin!' },
  3: { hausarzt: 'Dr. med. Sandra Braun, Tel: 02161-99887', krankenhaus: 'Bethanien Krankenhaus', notfallkontakt: 'Michael Hoffmann (Sohn): 0162-55667788', versicherung: 'TK, Nr. T987654321', medAllergien: 'Keine bekannt' },
}

export default function Biographie() {
  const [selectedGuest, setSelectedGuest] = useState(GUESTS[0])
  const [activeKap, setActiveKap] = useState('leben')
  const [editing, setEditing] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [generatedText, setGeneratedText] = useState('')

  const bio = BIOGRAPHIE_DATA[selectedGuest.id]
  const notfall = NOTFALL_DATA[selectedGuest.id]

  const generateErzaehlung = async () => {
    setGenerating(true)
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          messages: [{
            role: 'user',
            content: `Schreibe eine kurze, einfühlsame biographische Erzählung für Pflegekräfte über: ${selectedGuest.name}, ${selectedGuest.age} Jahre, aus ${bio?.geburtsort || 'unbekannt'}, Beruf: ${bio?.beruf || ''}, Familie: ${bio?.family || ''}. Vorlieben: ${bio?.hobbies || ''}. Besonderheiten: ${bio?.besonderes || ''}. Max 4 Sätze, warm und persönlich, hilft Pflegekräften beim Verständnis der Person.`
          }]
        })
      })
      const data = await resp.json()
      setGeneratedText(data.content?.[0]?.text || '')
    } catch {
      setGeneratedText(`${selectedGuest.name} hat ein reiches Leben gelebt — ${bio?.beruf ? `als ${bio.beruf}` : ''} und als Mittelpunkt ihrer Familie. Heute schätzt sie besonders ${bio?.hobbies?.split(',')[0] || 'ruhige Momente'} und fühlt sich wohl wenn ihre Gewohnheiten respektiert werden. Im Umgang mit ihr ist es wichtig zu wissen: ${bio?.wichtig || 'persönliche Aufmerksamkeit ist ihr viel wert'}.`)
    }
    setGenerating(false)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Biographiebogen</h1>
          <p className="page-sub">Lebensgeschichte · Vorlieben · Notfallkontakte</p>
        </div>
        <div className="flex gap8">
          <button className="btn" onClick={() => setEditing(!editing)}>{editing ? '✓ Fertig' : '✏ Bearbeiten'}</button>
          <button className="btn btn-primary" onClick={generateErzaehlung} disabled={generating}>
            {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /></> : '✦ KI-Erzählung'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 16, alignItems: 'start' }}>
        {/* Guest select */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 14 }}>
            {GUESTS.slice(0, 5).map(g => (
              <button key={g.id} onClick={() => { setSelectedGuest(g); setGeneratedText('') }} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', background: selectedGuest.id === g.id ? 'rgba(124,111,255,0.1)' : 'var(--bg2)', borderRadius: 8, border: `1px solid ${selectedGuest.id === g.id ? 'var(--accent)' : 'var(--border)'}`, cursor: 'pointer', textAlign: 'left' }}>
                <div className={`avatar ${g.color}`} style={{ width: 28, height: 28, fontSize: 10 }}>{g.initials}</div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{g.name.split(' ')[0]} {g.name.split(' ')[1]?.[0]}.</div>
                  <div style={{ fontSize: 10, color: 'var(--text3)' }}>PG {g.pg} · {g.age} J.</div>
                </div>
                {BIOGRAPHIE_DATA[g.id] ? <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} /> : <span style={{ marginLeft: 'auto', width: 6, height: 6, borderRadius: '50%', background: 'var(--bg3)', flexShrink: 0 }} />}
              </button>
            ))}
          </div>

          {/* Kapitel */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {KAPITEL.map(k => (
              <button key={k.id} onClick={() => setActiveKap(k.id)} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '7px 10px', background: activeKap === k.id ? 'rgba(124,111,255,0.1)' : 'transparent', borderRadius: 7, border: `1px solid ${activeKap === k.id ? 'var(--accent)' : 'transparent'}`, cursor: 'pointer', textAlign: 'left' }}>
                <span style={{ fontSize: 14 }}>{k.icon}</span>
                <span style={{ fontSize: 12, color: activeKap === k.id ? 'var(--accent2)' : 'var(--text2)', fontWeight: activeKap === k.id ? 500 : 400 }}>{k.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div>
          {/* Guest header */}
          <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 12, padding: '14px 18px' }}>
            <div className={`avatar ${selectedGuest.color}`} style={{ width: 52, height: 52, fontSize: 18 }}>{selectedGuest.initials}</div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 20, fontWeight: 600, marginBottom: 3 }}>{selectedGuest.name}</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)' }}>{selectedGuest.age} Jahre · PG {selectedGuest.pg} · {selectedGuest.diet} · {selectedGuest.days.join(', ')}</p>
            </div>
            {!BIOGRAPHIE_DATA[selectedGuest.id] && (
              <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 6, background: 'rgba(251,191,36,0.12)', color: 'var(--amber)' }}>Biographie unvollständig</span>
            )}
          </div>

          {/* KI-Erzählung */}
          {generatedText && (
            <div className="card fade-in" style={{ marginBottom: 12, borderColor: 'rgba(124,111,255,0.3)', background: 'rgba(124,111,255,0.03)' }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>✦ KI-Persönlichkeitserzählung für Pflegekräfte</p>
              <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.8, fontStyle: 'italic' }}>{generatedText}</p>
            </div>
          )}

          {activeKap === 'leben' && bio && (
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>📖 Lebenslauf & Familie</h3>
              {[
                { label: 'Geburtsort', key: 'geburtsort' },
                { label: 'Beruf / Tätigkeit', key: 'beruf' },
                { label: 'Familie', key: 'family' },
                { label: 'Religion / Konfession', key: 'religion' },
              ].map(f => (
                <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>{f.label}</span>
                  {editing ? (
                    <input className="inp" defaultValue={bio[f.key]} style={{ fontSize: 12, padding: '4px 8px' }} />
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--text)' }}>{bio[f.key] || '—'}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeKap === 'vorlieben' && bio && (
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>❤️ Vorlieben & Gewohnheiten</h3>
              {[
                { label: 'Hobbies / Interessen', key: 'hobbies' },
                { label: 'Was ihr wichtig ist', key: 'wichtig' },
                { label: 'Was sie nicht mag', key: 'abneigungen' },
              ].map(f => (
                <div key={f.key} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>{f.label}</span>
                  {editing ? (
                    <textarea className="inp" defaultValue={bio[f.key]} style={{ fontSize: 12, padding: '4px 8px', minHeight: 60 }} />
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.6 }}>{bio[f.key] || '—'}</span>
                  )}
                </div>
              ))}
            </div>
          )}

          {activeKap === 'besonderheiten' && bio && (
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>⭐ Besonderheiten für Pflegekräfte</h3>
              <div style={{ background: 'rgba(124,111,255,0.06)', borderRadius: 8, padding: '14px 16px', marginBottom: 12, borderLeft: '3px solid var(--accent)' }}>
                <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent2)', marginBottom: 6 }}>Wichtiger Hinweis für alle Pflegekräfte</p>
                <p style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.7 }}>{bio.besonderes}</p>
              </div>
              {editing && (
                <textarea className="inp" defaultValue={bio.besonderes} style={{ fontSize: 12, minHeight: 100 }} />
              )}
            </div>
          )}

          {activeKap === 'notfall' && (
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>🏥 Ärzte & Notfallkontakte</h3>
              {notfall ? (
                [
                  { label: 'Hausarzt', value: notfall.hausarzt },
                  { label: 'Krankenhaus', value: notfall.krankenhaus },
                  { label: 'Notfallkontakt', value: notfall.notfallkontakt },
                  { label: 'Krankenversicherung', value: notfall.versicherung },
                  { label: 'Med. Allergien', value: notfall.medAllergien },
                ].map(f => (
                  <div key={f.label} style={{ display: 'grid', gridTemplateColumns: '180px 1fr', gap: 12, padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 12, color: 'var(--text3)', fontWeight: 500 }}>{f.label}</span>
                    <span style={{ fontSize: 13, color: f.label === 'Med. Allergien' && f.value !== 'Keine bekannt' ? 'var(--red)' : 'var(--text)', fontWeight: f.label === 'Med. Allergien' && f.value !== 'Keine bekannt' ? 600 : 400 }}>
                      {f.value}
                    </span>
                  </div>
                ))
              ) : (
                <p style={{ fontSize: 13, color: 'var(--text3)' }}>Noch keine Notfalldaten erfasst.</p>
              )}
            </div>
          )}

          {!bio && activeKap !== 'notfall' && (
            <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
              <p style={{ fontSize: 32, marginBottom: 10 }}>📖</p>
              <p style={{ fontSize: 14, color: 'var(--text2)', marginBottom: 12 }}>Noch kein Biographiebogen für {selectedGuest.name.split(' ')[0]}</p>
              <button className="btn btn-primary">Biographie anlegen</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
