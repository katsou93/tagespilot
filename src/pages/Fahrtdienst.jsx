import { useState } from 'react'
import { TODAY_GUESTS, ROUTE } from '../data/mock'

const MORNING = ROUTE.filter(r => r.type === 'pickup')
const EVENING = ROUTE.filter(r => r.type === 'dropoff')

export default function Fahrtdienst() {
  const [activeRoute, setActiveRoute] = useState('morning')
  const [optimized, setOptimized] = useState(true)
  const [loading, setLoading] = useState(false)

  const handleOptimize = () => {
    setLoading(true)
    setTimeout(() => { setLoading(false); setOptimized(true) }, 1800)
  }

  const route = activeRoute === 'morning' ? MORNING : EVENING

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Fahrtdienst</h1>
          <p className="page-sub">Heute {TODAY_GUESTS.length} Gäste · 2 Touren · KI-optimierte Route</p>
        </div>
        <button className="btn btn-primary" onClick={handleOptimize} disabled={loading}>
          {loading ? <><span className="ki-dot"/> <span className="ki-dot"/> <span className="ki-dot"/></> : '✦ Route neu optimieren'}
        </button>
      </div>

      {/* Stats */}
      <div className="grid3 mb20">
        <div className="stat-card">
          <p className="stat-label">Gesamtdistanz</p>
          <p className="stat-value" style={{color:'var(--teal)'}}>23,4</p>
          <p className="stat-sub">km heute · beide Touren</p>
          {optimized && <span className="stat-badge badge-teal">↓ 12 Min optimiert</span>}
        </div>
        <div className="stat-card">
          <p className="stat-label">Abholungen</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{MORNING.length}</p>
          <p className="stat-sub">Morgen-Tour · 08:00 Start</p>
          <span className="stat-badge badge-purple">Fahrzeug: Bus 1</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Rollstuhlplätze</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>2</p>
          <p className="stat-sub">von 3 Plätzen belegt</p>
          <span className="stat-badge badge-amber">Kapazität geprüft</span>
        </div>
      </div>

      <div className="grid2 gap16">
        {/* Route list */}
        <div className="card">
          <div className="flex gap8 mb16">
            {['morning','evening'].map(t => (
              <button key={t} className="btn" style={{flex:1,justifyContent:'center',background:activeRoute===t?'rgba(124,111,255,0.12)':'var(--bg3)',color:activeRoute===t?'var(--accent2)':'var(--text2)',borderColor:activeRoute===t?'var(--accent)':'var(--border)'}} onClick={()=>setActiveRoute(t)}>
                {t==='morning' ? '↓ Abholung morgens' : '↑ Rückfahrt abends'}
              </button>
            ))}
          </div>

          {optimized && (
            <div style={{background:'rgba(45,212,191,0.08)',border:'1px solid rgba(45,212,191,0.2)',borderRadius:8,padding:'8px 12px',marginBottom:14,fontSize:12,color:'var(--teal)',display:'flex',gap:8}}>
              <span>✓</span>
              <span>KI-optimierte Route — spart 12 Minuten vs. gestern</span>
            </div>
          )}

          <div style={{display:'flex',flexDirection:'column',gap:0}}>
            {route.map((r, i) => (
              <div key={i} style={{display:'flex',gap:12,alignItems:'flex-start',padding:'10px 0',borderBottom: i < route.length-1 ? '1px solid var(--border)' : 'none',position:'relative'}}>
                {/* Timeline dot */}
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',width:28}}>
                  <div style={{width:22,height:22,borderRadius:'50%',background: i===0 ? 'var(--accent)' : 'var(--bg3)',border:`2px solid ${i===0?'var(--accent)':'var(--border2)'}`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600,color: i===0?'white':'var(--text3)',flexShrink:0}}>{i+1}</div>
                  {i < route.length-1 && <div style={{width:1,flex:1,minHeight:16,background:'var(--border)',marginTop:2}}/>}
                </div>
                <div style={{flex:1}}>
                  <div className="flex-between">
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${r.guest.color}`} style={{width:26,height:26,fontSize:10}}>{r.guest.initials}</div>
                      <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{r.guest.name}</span>
                      {r.guest.notes.includes('Rollstuhl') && <span style={{fontSize:10,padding:'1px 5px',background:'rgba(251,191,36,0.12)',color:'var(--amber)',borderRadius:3}}>♿</span>}
                    </div>
                    <span style={{fontSize:12,fontWeight:600,color:'var(--accent2)',fontFamily:'var(--font-head)'}}>{r.time}</span>
                  </div>
                  <p style={{fontSize:11,color:'var(--text3)',marginTop:3,paddingLeft:34}}>{r.guest.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map placeholder + notes */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          <div className="card" style={{flex:1,minHeight:240}}>
            <p className="card-title">Route Visualisierung</p>
            <div style={{background:'var(--bg3)',borderRadius:8,height:200,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column',gap:8,border:'1px dashed var(--border2)'}}>
              {/* Simple SVG map mockup */}
              <svg width="200" height="140" viewBox="0 0 200 140">
                <line x1="30" y1="120" x2="70" y2="85" stroke="rgba(124,111,255,0.4)" strokeWidth="2" strokeDasharray="4"/>
                <line x1="70" y1="85" x2="110" y2="60" stroke="rgba(124,111,255,0.4)" strokeWidth="2" strokeDasharray="4"/>
                <line x1="110" y1="60" x2="150" y2="40" stroke="rgba(124,111,255,0.4)" strokeWidth="2" strokeDasharray="4"/>
                <line x1="150" y1="40" x2="170" y2="25" stroke="rgba(45,212,191,0.5)" strokeWidth="2"/>
                {[[30,120,'#7c6fff'],[70,85,'#7c6fff'],[110,60,'#fbbf24'],[150,40,'#7c6fff'],[170,25,'#2dd4bf']].map(([x,y,c],i)=>(
                  <g key={i}>
                    <circle cx={x} cy={y} r="6" fill={c} fillOpacity="0.2" stroke={c} strokeWidth="1.5"/>
                    <circle cx={x} cy={y} r="2.5" fill={c}/>
                    <text x={x} y={y-10} fill={c} fontSize="9" textAnchor="middle">{i+1}</text>
                  </g>
                ))}
              </svg>
              <p style={{fontSize:11,color:'var(--text3)'}}>Google Maps Integration → Phase 2</p>
            </div>
          </div>

          <div className="card">
            <p className="card-title">Fahrer-Notizen</p>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {[
                { icon: '♿', text: 'Erna Hoffmann: Sitzgurt anlegen nicht vergessen' },
                { icon: '⚕', text: 'Hildegard Meier: Rollstuhl braucht Heckablage' },
                { icon: '🅿', text: 'Gartenweg 5: Nur kurz halten, Parkverbot' },
              ].map((n,i) => (
                <div key={i} style={{display:'flex',gap:8,padding:'7px 10px',background:'var(--bg3)',borderRadius:7,fontSize:12,color:'var(--text2)'}}>
                  <span>{n.icon}</span><span>{n.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
