import { useState } from 'react'

const INTERESSENTEN = [
  { id: 1, name: 'Gerhard Hoffmann', age: 78, pg: 3, adresse: 'Uerdinger Str. 45, 47799 Krefeld', kontakt: 'Tochter: 0157-23456789', seit: '12.03.2026', wunschTage: ['Mo','Mi','Fr'], status: 'wartet', notes: 'Rollator, möchte gerne montags starten', ki_score: 94 },
  { id: 2, name: 'Elfriede Bauer', age: 84, pg: 4, adresse: 'Nordstr. 12, 47798 Krefeld', kontakt: 'Sohn: 0162-98765432', seit: '01.04.2026', wunschTage: ['Di','Do'], status: 'wartet', notes: 'Diabetikerin, Pflegebett vorhanden', ki_score: 87 },
  { id: 3, name: 'Klaus Westerberg', age: 71, pg: 2, adresse: 'Am Stadtwald 7, 47809 Krefeld', kontakt: 'Ehefrau: 02151-445566', seit: '18.04.2026', wunschTage: ['Mo','Di','Mi','Do','Fr'], status: 'erstgespraech', notes: 'Sehr mobil, sucht soziale Kontakte', ki_score: 76 },
  { id: 4, name: 'Hedwig Schmitz', age: 89, pg: 5, adresse: 'Blumenstr. 3, 47805 Krefeld', kontakt: 'Pflegedienst: 02151-778899', seit: '05.05.2026', wunschTage: ['Mi','Fr'], status: 'wartet', notes: 'Intensivbetreuung, Rollstuhl, kurze Wege wichtig', ki_score: 61 },
]

const STATUS_LABELS = {
  wartet: { label: 'Auf Warteliste', color: 'var(--amber)', bg: 'rgba(251,191,36,0.12)' },
  erstgespraech: { label: 'Erstgespräch geplant', color: 'var(--teal)', bg: 'rgba(45,212,191,0.12)' },
  abgelehnt: { label: 'Kein Platz', color: 'var(--red)', bg: 'rgba(248,113,113,0.12)' },
}

function KiMatchPanel({ freierPlatz }) {
  const [running, setRunning] = useState(false)
  const [done, setDone] = useState(false)

  const start = () => {
    setRunning(true)
    setTimeout(() => { setRunning(false); setDone(true) }, 2000)
  }

  return (
    <div className="card" style={{borderColor:'rgba(124,111,255,0.3)',background:'rgba(124,111,255,0.04)'}}>
      <div className="flex-between mb12">
        <div>
          <p style={{fontSize:13,fontWeight:600,color:'var(--accent2)',marginBottom:3}}>✦ KI-Wartelisten-Matching</p>
          <p style={{fontSize:12,color:'var(--text3)'}}>Freier Platz erkannt: {freierPlatz}</p>
        </div>
        {!done && (
          <button className="btn btn-primary" style={{fontSize:12}} onClick={start} disabled={running}>
            {running ? <><span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/> Analysiere…</> : '✦ Besten Kandidaten finden'}
          </button>
        )}
      </div>
      {done && (
        <div className="fade-in">
          <p style={{fontSize:11,color:'var(--text3)',marginBottom:10,fontWeight:500,letterSpacing:'0.06em',textTransform:'uppercase'}}>KI-Empfehlung</p>
          {[{name:'Gerhard Hoffmann',score:94,grund:'Wunschtage passen perfekt (Mo/Mi/Fr), Adresse 2,1 km — günstig für Route, PG 3 erhöht Tagessatz optimal'},{name:'Elfriede Bauer',score:87,grund:'Di/Do frei, Adresse 1,8 km, PG 4 — höchster Tagessatz. Diabetiker-Menü bereits eingeplant'},{name:'Klaus Westerberg',score:76,grund:'Flexibel alle Tage, aktiv und selbstständig — gut für Gruppenstruktur. Aber PG 2 = niedrigerer Tagessatz'}].map((k,i) => (
            <div key={i} style={{display:'flex',gap:12,padding:'10px 12px',background:'var(--bg3)',borderRadius:8,marginBottom:6,alignItems:'flex-start'}}>
              <div style={{minWidth:36,height:36,borderRadius:'50%',background: i===0?'rgba(74,222,128,0.15)':i===1?'rgba(45,212,191,0.12)':'rgba(251,191,36,0.12)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:12,fontWeight:600,color: i===0?'var(--green)':i===1?'var(--teal)':'var(--amber)',flexShrink:0}}>
                #{i+1}
              </div>
              <div style={{flex:1}}>
                <div className="flex-between" style={{marginBottom:3}}>
                  <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{k.name}</span>
                  <span style={{fontSize:11,fontWeight:600,color: i===0?'var(--green)':i===1?'var(--teal)':'var(--amber)'}}>{k.score}% Match</span>
                </div>
                <p style={{fontSize:11,color:'var(--text3)',lineHeight:1.5}}>{k.grund}</p>
              </div>
              {i === 0 && <button className="btn" style={{fontSize:11,padding:'4px 10px',whiteSpace:'nowrap',flexShrink:0}}>Kontaktieren</button>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Warteliste() {
  const [selected, setSelected] = useState(null)
  const [showMatch, setShowMatch] = useState(false)

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Interessenten & Warteliste</h1>
          <p className="page-sub">{INTERESSENTEN.length} Interessenten · 3 freie Plätze</p>
        </div>
        <div className="flex gap8">
          <button className="btn" style={{borderColor:'rgba(124,111,255,0.4)',color:'var(--accent2)'}} onClick={() => setShowMatch(!showMatch)}>
            ✦ KI-Matching
          </button>
          <button className="btn btn-primary">+ Interessent erfassen</button>
        </div>
      </div>

      {showMatch && <KiMatchPanel freierPlatz="Montag/Mittwoch/Freitag" />}

      <div style={{display:'flex',gap:8,marginBottom:16,flexWrap:'wrap'}}>
        {['Alle','Auf Warteliste','Erstgespräch'].map(f => (
          <button key={f} className="btn" style={{fontSize:12,padding:'6px 12px'}}>{f}</button>
        ))}
        <input className="inp" style={{maxWidth:220,marginLeft:'auto'}} placeholder="Suchen…"/>
      </div>

      <div className="grid2 gap16">
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{paddingLeft:16}}>Name</th>
                <th>PG</th>
                <th>Wunschtage</th>
                <th>KI-Match</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {INTERESSENTEN.map(p => (
                <tr key={p.id} style={{cursor:'pointer',background: selected===p.id?'rgba(124,111,255,0.06)':'transparent'}} onClick={() => setSelected(selected===p.id?null:p.id)}>
                  <td style={{paddingLeft:16}}>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{p.name}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{p.age} J. · seit {p.seit}</div>
                  </td>
                  <td><span className={`tag tag-${p.pg-1}`}>PG {p.pg}</span></td>
                  <td>
                    <div className="flex gap4" style={{gap:3,flexWrap:'wrap'}}>
                      {p.wunschTage.map(d => <span key={d} style={{fontSize:10,padding:'1px 5px',background:'var(--bg3)',borderRadius:3,color:'var(--text2)'}}>{d}</span>)}
                    </div>
                  </td>
                  <td>
                    <div style={{display:'flex',alignItems:'center',gap:5}}>
                      <div style={{width:32,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${p.ki_score}%`,background: p.ki_score>85?'var(--green)':p.ki_score>70?'var(--teal)':'var(--amber)',borderRadius:2}}/>
                      </div>
                      <span style={{fontSize:11,color:'var(--text3)',fontWeight:500}}>{p.ki_score}%</span>
                    </div>
                  </td>
                  <td>
                    <span style={{fontSize:10,fontWeight:500,padding:'2px 7px',borderRadius:4,background:STATUS_LABELS[p.status].bg,color:STATUS_LABELS[p.status].color}}>
                      {STATUS_LABELS[p.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selected ? (
          <div className="card fade-in">
            {(() => {
              const p = INTERESSENTEN.find(x => x.id === selected)
              return <>
                <h3 style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:600,marginBottom:4}}>{p.name}</h3>
                <p style={{fontSize:13,color:'var(--text2)',marginBottom:16}}>{p.age} Jahre · <span className={`tag tag-${p.pg-1}`}>PG {p.pg}</span></p>
                <div className="divider"/>
                {[['Adresse',p.adresse],['Kontakt',p.kontakt],['Auf Liste seit',p.seit],['Wunschtage',p.wunschTage.join(', ')],['Notizen',p.notes]].map(([k,v]) => (
                  <div key={k} className="flex-between" style={{padding:'7px 0',borderBottom:'1px solid var(--border)'}}>
                    <span style={{fontSize:12,color:'var(--text3)',fontWeight:500}}>{k}</span>
                    <span style={{fontSize:12,color:'var(--text)',textAlign:'right',maxWidth:220}}>{v}</span>
                  </div>
                ))}
                <div className="divider"/>
                <div style={{background:'rgba(124,111,255,0.08)',border:'1px solid rgba(124,111,255,0.2)',borderRadius:8,padding:'10px 12px',marginBottom:12}}>
                  <p style={{fontSize:11,color:'var(--accent2)',fontWeight:500,marginBottom:3}}>KI-Passgenauigkeit: {p.ki_score}%</p>
                  <p style={{fontSize:11,color:'var(--text3)'}}>Basierend auf Wunschtagen, Adressnähe, Pflegegrad und aktueller Auslastung</p>
                </div>
                <div className="flex gap8">
                  <button className="btn btn-primary" style={{fontSize:12}}>Platz anbieten</button>
                  <button className="btn" style={{fontSize:12}}>Termin vereinbaren</button>
                </div>
              </>
            })()}
          </div>
        ) : (
          <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:260}}>
            <div style={{textAlign:'center',color:'var(--text3)'}}>
              <p style={{fontSize:28,marginBottom:8}}>◈</p>
              <p style={{fontSize:13}}>Interessenten auswählen</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
