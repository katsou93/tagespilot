import { useState } from 'react'
import { TODAY_GUESTS } from '../data/mock'

const TEMPLATES = [
  'Tagesprotokoll',
  'Pflegeverlauf',
  'Angehörigen-Update',
  'MDK-Bericht',
]

const SAMPLE_DOCS = [
  { guest: TODAY_GUESTS[0], time: '16:30', type: 'Tagesprotokoll', text: 'Hildegard Meier (PG 3) besuchte die Einrichtung von 08:15 bis 16:30 Uhr. Gast zeigte sich aufgeschlossen und gut gelaunt. Nahm aktiv an der Morgenrunde und dem Gedächtnistraining teil. Alle Mahlzeiten vollständig eingenommen (Weichkost). Mobilität mit Rollstuhl stabil. Blutdruck 128/82 mmHg — unauffällig. Keine Sturzgefahr beobachtet.' },
  { guest: TODAY_GUESTS[1], time: '15:45', type: 'Pflegeverlauf', text: 'Werner Schulz (PG 2): Normaler Tagesverlauf. Stuhlgymnastik gut mitgemacht. Hörgerät links funktioniert einwandfrei. Mittagessen vollständig. Gast äußerte Freude über heutige Aktivitäten.' },
]

export default function Dokumentation() {
  const [selectedGuest, setSelectedGuest] = useState(TODAY_GUESTS[0])
  const [template, setTemplate] = useState('Tagesprotokoll')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!input.trim()) return
    setLoading(true)
    setResult('')

    const prompt = `Du bist Pflegedokumentations-Assistent für eine Tagespflege. 
Erstelle ein professionelles "${template}" für folgenden Gast:

Name: ${selectedGuest.name}
Alter: ${selectedGuest.age} Jahre
Pflegegrad: ${selectedGuest.pg}
Diät: ${selectedGuest.diet}
Besonderheiten: ${selectedGuest.notes || 'keine'}

Notizen der Pflegekraft: "${input}"

Erstelle eine vollständige, MDK-konforme Dokumentation in 3-5 Sätzen. Professionell, sachlich, auf Deutsch.`

    try {
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1000,
          messages: [{ role: 'user', content: prompt }]
        })
      })
      const data = await response.json()
      const text = data.content?.[0]?.text || 'Fehler bei der KI-Generierung.'
      setResult(text)
    } catch {
      setResult('KI-Verbindung fehlgeschlagen. Bitte API-Key prüfen.')
    }
    setLoading(false)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">KI-Dokumentation</h1>
          <p className="page-sub">Sprachnotiz eingeben → KI erstellt MDK-konformes Protokoll</p>
        </div>
        <div className="stat-badge badge-purple" style={{padding:'6px 12px',fontSize:13}}>
          <span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/>
          <span style={{marginLeft:8}}>KI aktiv</span>
        </div>
      </div>

      <div className="grid2 gap16">
        {/* Generator */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          {/* Guest select */}
          <div className="card">
            <p className="card-title" style={{marginBottom:10}}>Gast auswählen</p>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {TODAY_GUESTS.map(g => (
                <button key={g.id} onClick={() => setSelectedGuest(g)} style={{display:'flex',gap:10,alignItems:'center',padding:'8px 10px',background: selectedGuest.id === g.id ? 'rgba(124,111,255,0.1)' : 'var(--bg3)',borderRadius:8,border: `1px solid ${selectedGuest.id === g.id ? 'var(--accent)' : 'var(--border)'}`,cursor:'pointer',textAlign:'left',transition:'all 0.15s'}}>
                  <div className={`avatar ${g.color}`}>{g.initials}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{g.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>PG {g.pg} · {g.diet}</div>
                  </div>
                  {selectedGuest.id === g.id && <span style={{marginLeft:'auto',color:'var(--accent2)',fontSize:14}}>✓</span>}
                </button>
              ))}
            </div>
          </div>

          {/* Template */}
          <div className="card">
            <p className="card-title" style={{marginBottom:10}}>Dokumenttyp</p>
            <div className="flex gap6" style={{gap:6,flexWrap:'wrap'}}>
              {TEMPLATES.map(t => (
                <button key={t} onClick={() => setTemplate(t)} className="btn" style={{fontSize:12,background: template===t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)',color: template===t ? 'var(--accent2)' : 'var(--text2)',borderColor: template===t ? 'var(--accent)' : 'var(--border)'}}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main input/output */}
        <div style={{display:'flex',flexDirection:'column',gap:14}}>
          <div className="card">
            <p className="card-title">Stichwort-Eingabe für KI</p>
            <p style={{fontSize:12,color:'var(--text3)',marginBottom:10}}>Tippt oder sprecht kurz ein was heute war — die KI macht daraus ein vollständiges Protokoll.</p>
            <textarea
              className="inp"
              style={{minHeight:100,marginBottom:10}}
              placeholder={`z.B. "gut gelaunt, hat mitgegessen, Blutdruck 130/80, Sturzrisiko beobachtet, Rollstuhl OK"`}
              value={input}
              onChange={e => setInput(e.target.value)}
            />
            <button className="btn btn-primary" style={{width:'100%',justifyContent:'center',padding:'10px'}} onClick={handleGenerate} disabled={loading || !input.trim()}>
              {loading ? <><span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/> <span style={{marginLeft:8}}>KI generiert…</span></> : '✦ Dokumentation generieren'}
            </button>
          </div>

          {result && (
            <div className="card fade-in" style={{borderColor:'rgba(124,111,255,0.3)'}}>
              <div className="flex-between mb12">
                <p className="card-title" style={{marginBottom:0}}>{template} — {selectedGuest.name}</p>
                <div className="flex gap6" style={{gap:6}}>
                  <button className="btn" style={{fontSize:11,padding:'4px 8px'}}>Übernehmen</button>
                  <button className="btn" style={{fontSize:11,padding:'4px 8px'}}>Kopieren</button>
                </div>
              </div>
              <div style={{background:'var(--bg3)',borderRadius:8,padding:'12px 14px',fontSize:13,color:'var(--text)',lineHeight:1.7}}>
                {result}
              </div>
              <p style={{fontSize:11,color:'var(--text3)',marginTop:8}}>✓ MDK-konform · {new Date().toLocaleTimeString('de-DE', {hour:'2-digit',minute:'2-digit'})} Uhr · Claude AI</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent docs */}
      <div className="card" style={{marginTop:16}}>
        <p className="card-title">Letzte Dokumentationen</p>
        <div style={{display:'flex',flexDirection:'column',gap:10}}>
          {SAMPLE_DOCS.map((d, i) => (
            <div key={i} style={{padding:'10px 12px',background:'var(--bg3)',borderRadius:8,borderLeft:'2px solid var(--accent)'}}>
              <div className="flex-between mb8">
                <div className="flex gap8" style={{alignItems:'center'}}>
                  <div className={`avatar ${d.guest.color}`} style={{width:26,height:26,fontSize:10}}>{d.guest.initials}</div>
                  <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{d.guest.name}</span>
                  <span className="tag tag-1" style={{fontSize:10}}>{d.type}</span>
                </div>
                <span style={{fontSize:11,color:'var(--text3)'}}>{d.time} Uhr</span>
              </div>
              <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>{d.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
