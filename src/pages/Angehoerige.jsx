import { useState } from 'react'
import { GUESTS } from '../data/mock'

const UPDATES = [
  { gastId: 1, datum: 'Heute, 16:15', text: 'Hildegard hatte heute einen schönen Tag. Sie hat an der Morgenrunde teilgenommen und gut gegessen. Blutdruck war stabil. Sie hat sich gefreut als das Lied gespielt wurde.', stimmung: '😊', gesendet: true },
  { gastId: 3, datum: 'Heute, 16:00', text: 'Erna hat heute ruhig mitgemacht. Mittagessen komplett gegessen. Blutzucker morgens 124 mg/dl — im Rahmen. Sie hat nachmittags ein bisschen geschlafen.', stimmung: '😌', gesendet: true },
  { gastId: 4, datum: 'Heute, 16:20', text: 'Hans-Georg war heute besonders aktiv und hat beim Gedächtnistraining mitgemacht. Hat alle Mahlzeiten genossen und sich mit anderen Gästen gut unterhalten.', stimmung: '😄', gesendet: false },
]

const ANGEHOERIGE = [
  { gastId: 1, name: 'Petra Meier', relation: 'Tochter', tel: '0157-11223344', kanal: 'WhatsApp', aktiv: true },
  { gastId: 3, name: 'Michael Hoffmann', relation: 'Sohn', tel: '0162-55667788', kanal: 'SMS', aktiv: true },
  { gastId: 4, name: 'Renate Braun', relation: 'Ehefrau', tel: '02151-334455', kanal: 'E-Mail', aktiv: true },
]

export default function Angehoerige() {
  const [selected, setSelected] = useState(null)
  const [generating, setGenerating] = useState(null)
  const [generatedTexts, setGeneratedTexts] = useState({})

  const guestName = (id) => GUESTS.find(g => g.id === id)?.name || '—'
  const guestColor = (id) => GUESTS.find(g => g.id === id)?.color || 'av-gray'
  const guestInitials = (id) => GUESTS.find(g => g.id === id)?.initials || '?'

  const generateUpdate = async (gastId) => {
    setGenerating(gastId)
    const guest = GUESTS.find(g => g.id === gastId)
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 300,
          messages: [{ role: 'user', content: `Schreibe eine kurze, herzliche Tages-Nachricht an Angehörige für: ${guest?.name}, ${guest?.age} Jahre, Pflegegrad ${guest?.pg}, Ernährung: ${guest?.diet}. Max 3 Sätze. Warm, persönlich, kein Fachjargon. Kein "Sehr geehrte/r", direkt beginnen.` }]
        })
      })
      const data = await resp.json()
      setGeneratedTexts(p => ({ ...p, [gastId]: data.content?.[0]?.text || '...' }))
    } catch {
      setGeneratedTexts(p => ({ ...p, [gastId]: 'Heute war ein schöner Tag. Ihr Angehöriger hat gut gegessen und an den Aktivitäten teilgenommen. Wir melden uns morgen wieder.' }))
    }
    setGenerating(null)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Angehörigen-Kommunikation</h1>
          <p className="page-sub">Automatische Tages-Updates · {ANGEHOERIGE.length} Kontakte aktiv</p>
        </div>
        <button className="btn btn-primary">+ Kontakt hinzufügen</button>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Updates heute</p>
          <p className="stat-value" style={{color:'var(--green)'}}>{UPDATES.filter(u=>u.gesendet).length}</p>
          <p className="stat-sub">von {UPDATES.length} gesendet</p>
          <span className="stat-badge badge-green">Auto-versendet</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Aktive Kontakte</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{ANGEHOERIGE.length}</p>
          <p className="stat-sub">WhatsApp · SMS · E-Mail</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Ausstehend</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>{UPDATES.filter(u=>!u.gesendet).length}</p>
          <p className="stat-sub">Noch zu senden</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Rückfragen heute</p>
          <p className="stat-value" style={{color:'var(--teal)'}}>2</p>
          <p className="stat-sub">Angehörige haben geantwortet</p>
        </div>
      </div>

      <div className="grid2 gap16">
        {/* Updates */}
        <div>
          <p style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Tages-Updates</p>
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {GUESTS.filter(g => g.days.includes('Mo')).map(guest => {
              const update = UPDATES.find(u => u.gastId === guest.id)
              const angehoerig = ANGEHOERIGE.find(a => a.gastId === guest.id)
              const generatedText = generatedTexts[guest.id]
              return (
                <div key={guest.id} className={`card ${selected===guest.id?'accent':''}`} style={{cursor:'pointer',borderColor:selected===guest.id?'var(--accent)':'',padding:'14px 16px'}} onClick={()=>setSelected(selected===guest.id?null:guest.id)}>
                  <div className="flex-between mb8">
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${guest.color}`} style={{width:28,height:28,fontSize:10}}>{guest.initials}</div>
                      <div>
                        <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{guest.name}</div>
                        {angehoerig && <div style={{fontSize:11,color:'var(--text3)'}}>{angehoerig.name} · {angehoerig.kanal}</div>}
                      </div>
                    </div>
                    {update ? (
                      <span style={{fontSize:11,fontWeight:500,padding:'2px 8px',borderRadius:4,background:update.gesendet?'rgba(74,222,128,0.12)':'rgba(251,191,36,0.12)',color:update.gesendet?'var(--green)':'var(--amber)'}}>
                        {update.gesendet ? `${update.stimmung} Gesendet` : '⏳ Ausstehend'}
                      </span>
                    ) : (
                      <span style={{fontSize:11,color:'var(--text3)'}}>Kein Kontakt</span>
                    )}
                  </div>
                  {selected === guest.id && (
                    <div className="fade-in" style={{marginTop:8}}>
                      {generatedText ? (
                        <div>
                          <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px',fontSize:12,color:'var(--text2)',lineHeight:1.6,marginBottom:8}}>
                            {generatedText}
                          </div>
                          <div className="flex gap6" style={{gap:6}}>
                            <button className="btn btn-primary" style={{fontSize:11,padding:'5px 12px'}}>✓ Senden</button>
                            <button className="btn" style={{fontSize:11,padding:'5px 12px'}} onClick={(e)=>{e.stopPropagation();generateUpdate(guest.id)}}>↻ Neu generieren</button>
                          </div>
                        </div>
                      ) : update ? (
                        <div>
                          <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px',fontSize:12,color:'var(--text2)',lineHeight:1.6,marginBottom:8}}>
                            {update.text}
                          </div>
                          <div style={{fontSize:11,color:'var(--text3)',marginBottom:8}}>{update.datum}</div>
                          <button className="btn" style={{fontSize:11,padding:'5px 12px'}} onClick={(e)=>{e.stopPropagation();generateUpdate(guest.id)}}>
                            {generating===guest.id?<><span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/><span style={{marginLeft:8}}>KI generiert…</span></>:'✦ KI-Update generieren'}
                          </button>
                        </div>
                      ) : (
                        <button className="btn btn-primary" style={{fontSize:11,padding:'5px 12px'}} onClick={(e)=>{e.stopPropagation();generateUpdate(guest.id)}}>
                          {generating===guest.id?<><span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/><span style={{marginLeft:8}}>KI generiert…</span></>:'✦ Update erstellen'}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Kontakte */}
        <div>
          <p style={{fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',marginBottom:10}}>Angehörigen-Kontakte</p>
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {ANGEHOERIGE.map(a => (
              <div key={a.gastId} className="card" style={{padding:'12px 16px'}}>
                <div className="flex-between mb6">
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{a.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{a.relation} von {guestName(a.gastId)}</div>
                  </div>
                  <span style={{fontSize:10,fontWeight:500,padding:'2px 8px',borderRadius:4,background:'rgba(45,212,191,0.12)',color:'var(--teal)'}}>{a.kanal}</span>
                </div>
                <div style={{fontSize:12,color:'var(--text3)'}}>{a.tel}</div>
              </div>
            ))}
            <div className="card" style={{padding:'12px 16px',border:'1px dashed var(--border)',cursor:'pointer',opacity:0.6}}>
              <div style={{fontSize:12,color:'var(--text3)',textAlign:'center'}}>+ Kontakt hinzufügen</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
