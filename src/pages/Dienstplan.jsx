import { useState } from 'react'

const MITARBEITER = [
  { id: 1, name: 'Maria Schulze', rolle: 'Pflegefachkraft', initials: 'MS', color: '#7c6fff', std_woche: 38, urlaub_rest: 14 },
  { id: 2, name: 'Thomas Kranz', rolle: 'Fahrer / Betreuung', initials: 'TK', color: '#2dd4bf', std_woche: 30, urlaub_rest: 20 },
  { id: 3, name: 'Sabine Müller', rolle: 'Pflegehelferin', initials: 'SM', color: '#fbbf24', std_woche: 20, urlaub_rest: 8 },
  { id: 4, name: 'Reza Ahmadi', rolle: 'Pflegefachkraft', initials: 'RA', color: '#4ade80', std_woche: 38, urlaub_rest: 18 },
  { id: 5, name: 'Claudia Berg', rolle: 'Leitung', initials: 'CB', color: '#f87171', std_woche: 40, urlaub_rest: 10 },
]

const DAYS = ['Mo','Di','Mi','Do','Fr','Sa']
const DAYNAMES = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag']

const SHIFTS = {
  F: { label: 'Früh', time: '06:00–14:00', color: '#378ADD', bg: 'rgba(55,138,221,0.12)' },
  S: { label: 'Spät', time: '14:00–22:00', color: '#7c6fff', bg: 'rgba(124,111,255,0.12)' },
  T: { label: 'Teildienst', time: '09:00–15:00', color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)' },
  U: { label: 'Urlaub', time: '', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  K: { label: 'Krank', time: '', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const PLAN = {
  1: { Mo:'F', Di:'F', Mi:'F', Do:'T', Fr:'T', Sa:'' },
  2: { Mo:'F', Di:'F', Mi:'F', Do:'F', Fr:'F', Sa:'' },
  3: { Mo:'T', Di:'', Mi:'T', Do:'', Fr:'T', Sa:'' },
  4: { Mo:'S', Di:'S', Mi:'', Do:'F', Fr:'F', Sa:'F' },
  5: { Mo:'T', Di:'T', Mi:'T', Do:'T', Fr:'T', Sa:'' },
}

export default function Dienstplan() {
  const [tab, setTab] = useState('plan')
  const [kw] = useState(22)

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Dienstplan & Team</h1>
          <p className="page-sub">{MITARBEITER.length} Mitarbeiter · KW {kw} · Mai 2026</p>
        </div>
        <div className="flex gap8">
          <button className="btn">‹ KW {kw-1}</button>
          <button className="btn" style={{fontWeight:500,color:'var(--accent2)',borderColor:'var(--accent)'}}>KW {kw}</button>
          <button className="btn">KW {kw+1} ›</button>
          <button className="btn btn-primary">+ Schicht planen</button>
        </div>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Mitarbeiter gesamt</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{MITARBEITER.length}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Diese Woche im Dienst</p>
          <p className="stat-value" style={{color:'var(--green)'}}>4</p>
          <p className="stat-sub">1 im Urlaub</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Offene Schichten</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>2</p>
          <p className="stat-sub">Samstag unbesetzt</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Urlaubsanfragen</p>
          <p className="stat-value" style={{color:'var(--teal)'}}>1</p>
          <p className="stat-sub">Zu genehmigen</p>
        </div>
      </div>

      <div className="flex gap8 mb16">
        {['plan','mitarbeiter','zeiterfassung'].map(t => (
          <button key={t} className="btn" style={{fontSize:12,background:tab===t?'rgba(124,111,255,0.12)':'var(--bg3)',color:tab===t?'var(--accent2)':'var(--text2)',borderColor:tab===t?'var(--accent)':'var(--border)'}} onClick={()=>setTab(t)}>
            {t==='plan'?'Wochenplan':t==='mitarbeiter'?'Mitarbeiter':'Zeiterfassung'}
          </button>
        ))}
      </div>

      {tab === 'plan' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <div style={{display:'grid',gridTemplateColumns:`180px repeat(6,1fr)`,borderBottom:'1px solid var(--border)'}}>
            <div style={{padding:'12px 16px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Mitarbeiter</div>
            {DAYNAMES.map((d,i) => (
              <div key={d} style={{padding:'12px 8px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',textAlign:'center',borderLeft:'1px solid var(--border)'}}>
                {d.slice(0,2)}<br/><span style={{fontWeight:400,fontSize:10,textTransform:'none'}}>{DAYS[i]}</span>
              </div>
            ))}
          </div>
          {MITARBEITER.map(m => (
            <div key={m.id} style={{display:'grid',gridTemplateColumns:`180px repeat(6,1fr)`,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
              <div style={{padding:'10px 16px',display:'flex',gap:8,alignItems:'center'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:`${m.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600,color:m.color,flexShrink:0}}>{m.initials}</div>
                <div>
                  <div style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{m.name.split(' ')[0]}</div>
                  <div style={{fontSize:10,color:'var(--text3)'}}>{m.rolle.split(' ')[0]}</div>
                </div>
              </div>
              {DAYS.map(d => {
                const shift = PLAN[m.id]?.[d]
                return (
                  <div key={d} style={{borderLeft:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',padding:'6px'}}>
                    {shift ? (
                      <div style={{background:SHIFTS[shift].bg,borderRadius:4,padding:'3px 8px',textAlign:'center',width:'100%'}}>
                        <div style={{fontSize:11,color:SHIFTS[shift].color,fontWeight:600}}>{shift}</div>
                        {SHIFTS[shift].time && <div style={{fontSize:9,color:'var(--text3)'}}>{SHIFTS[shift].time.split('–')[0]}</div>}
                      </div>
                    ) : (
                      <div style={{width:20,height:20,borderRadius:'50%',border:'1px dashed rgba(255,255,255,0.08)'}}/>
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}

      {tab === 'mitarbeiter' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th style={{paddingLeft:16}}>Name</th><th>Rolle</th><th>Std./Woche</th><th>Urlaub Resttage</th><th>Aktionen</th></tr></thead>
            <tbody>
              {MITARBEITER.map(m => (
                <tr key={m.id}>
                  <td style={{paddingLeft:16}}>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div style={{width:32,height:32,borderRadius:'50%',background:`${m.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:11,fontWeight:600,color:m.color,flexShrink:0}}>{m.initials}</div>
                      <span style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{m.name}</span>
                    </div>
                  </td>
                  <td style={{fontSize:12,color:'var(--text2)'}}>{m.rolle}</td>
                  <td style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{m.std_woche}h</td>
                  <td>
                    <span style={{fontSize:12,fontWeight:500,color: m.urlaub_rest < 10 ? 'var(--amber)':'var(--green)'}}>{m.urlaub_rest} Tage</span>
                  </td>
                  <td>
                    <div className="flex gap6" style={{gap:6}}>
                      <button className="btn" style={{fontSize:11,padding:'4px 8px'}}>Dienstplan</button>
                      <button className="btn" style={{fontSize:11,padding:'4px 8px'}}>Urlaub</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'zeiterfassung' && (
        <div className="card">
          <p style={{fontSize:13,color:'var(--text2)',marginBottom:12}}>Wochenstunden KW {kw}</p>
          {MITARBEITER.map(m => {
            const geplant = m.std_woche
            const ist = Math.round(geplant * (0.85 + Math.random() * 0.3))
            const diff = ist - geplant
            return (
              <div key={m.id} style={{display:'flex',alignItems:'center',gap:12,padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:28,height:28,borderRadius:'50%',background:`${m.color}20`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:10,fontWeight:600,color:m.color,flexShrink:0}}>{m.initials}</div>
                <span style={{fontSize:13,fontWeight:500,color:'var(--text)',width:140,flexShrink:0}}>{m.name}</span>
                <div style={{flex:1,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                  <div style={{height:'100%',width:`${Math.min((ist/geplant)*100,100)}%`,background: diff>0?'var(--amber)':'var(--green)',borderRadius:2}}/>
                </div>
                <span style={{fontSize:12,color:'var(--text2)',width:60,textAlign:'right'}}>{ist}h / {geplant}h</span>
                <span style={{fontSize:11,fontWeight:500,width:50,textAlign:'right',color: diff>0?'var(--amber)':'var(--green)'}}>{diff>0?`+${diff}`:`${diff}`}h</span>
              </div>
            )
          })}
        </div>
      )}

      {/* Legend */}
      <div className="card" style={{marginTop:12,display:'flex',gap:20,padding:'10px 16px',flexWrap:'wrap'}}>
        {Object.entries(SHIFTS).map(([k,v]) => (
          <div key={k} style={{display:'flex',alignItems:'center',gap:6,fontSize:11,color:'var(--text2)'}}>
            <span style={{background:v.bg,color:v.color,padding:'1px 6px',borderRadius:3,fontWeight:600,fontSize:11}}>{k}</span>
            {v.label} {v.time && `(${v.time})`}
          </div>
        ))}
      </div>
    </div>
  )
}
