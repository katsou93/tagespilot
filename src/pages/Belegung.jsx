import { useState } from 'react'
import { GUESTS } from '../data/mock'

const DAYS = ['Mo','Di','Mi','Do','Fr']
const DAYNAMES = ['Montag','Dienstag','Mittwoch','Donnerstag','Freitag']
const MAX_PLAETZE = 12

const COLORS = ['av-purple','av-teal','av-amber','av-green','av-purple','av-teal','av-amber']

function getDayGuests(day) {
  return GUESTS.filter(g => g.days.includes(day))
}

export default function Belegung() {
  const [selected, setSelected] = useState(null)
  const [view, setView] = useState('woche')

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Belegungsplan</h1>
          <p className="page-sub">Wochenübersicht · {MAX_PLAETZE} Plätze gesamt</p>
        </div>
        <div className="flex gap8">
          <button className="btn" onClick={() => setView(v => v === 'woche' ? 'monat' : 'woche')}>
            {view === 'woche' ? '📅 Monatsansicht' : '📋 Wochenansicht'}
          </button>
          <button className="btn btn-primary">+ Buchung erfassen</button>
        </div>
      </div>

      {/* Week overview */}
      <div className="grid4 mb20" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
        {DAYS.map((d, i) => {
          const guests = getDayGuests(d)
          const pct = Math.round((guests.length / MAX_PLAETZE) * 100)
          return (
            <div key={d} className="stat-card" style={{cursor:'pointer',borderColor: selected===d?'var(--accent)':''}} onClick={() => setSelected(selected===d?null:d)}>
              <p className="stat-label">{DAYNAMES[i]}</p>
              <p className="stat-value" style={{color: pct>80?'var(--red)':pct>60?'var(--amber)':'var(--green)'}}>{guests.length}</p>
              <p className="stat-sub">von {MAX_PLAETZE} Plätzen</p>
              <div style={{marginTop:8,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${pct}%`,background: pct>80?'var(--red)':pct>60?'var(--amber)':'var(--green)',borderRadius:2,transition:'width 0.5s'}}/>
              </div>
              <div style={{marginTop:4,fontSize:10,color:'var(--text3)'}}>{pct}% ausgelastet</div>
            </div>
          )
        })}
      </div>

      {/* Detailed grid */}
      <div className="card" style={{padding:0,overflow:'hidden'}}>
        <div style={{display:'grid',gridTemplateColumns:`160px repeat(5,1fr)`,borderBottom:'1px solid var(--border)'}}>
          <div style={{padding:'12px 16px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em'}}>Gast</div>
          {DAYNAMES.map((d,i) => (
            <div key={d} style={{padding:'12px 8px',fontSize:11,fontWeight:600,color:'var(--text3)',textTransform:'uppercase',letterSpacing:'0.06em',textAlign:'center',borderLeft:'1px solid var(--border)',background: selected===DAYS[i]?'rgba(124,111,255,0.06)':'transparent'}}>
              {d.slice(0,2)}<br/><span style={{fontWeight:400,textTransform:'none',fontSize:10}}>{DAYS[i]}</span>
            </div>
          ))}
        </div>
        {GUESTS.map((g, gi) => (
          <div key={g.id} style={{display:'grid',gridTemplateColumns:`160px repeat(5,1fr)`,borderBottom:'1px solid rgba(255,255,255,0.04)'}}>
            <div style={{padding:'10px 16px',display:'flex',gap:8,alignItems:'center'}}>
              <div className={`avatar ${COLORS[gi % COLORS.length]}`} style={{width:26,height:26,fontSize:10,flexShrink:0}}>{g.initials}</div>
              <div>
                <div style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{g.name.split(' ')[0]}</div>
                <div style={{fontSize:10,color:'var(--text3)'}}>PG {g.pg}</div>
              </div>
            </div>
            {DAYS.map((d, di) => {
              const booked = g.days.includes(d)
              return (
                <div key={d} style={{borderLeft:'1px solid var(--border)',display:'flex',alignItems:'center',justifyContent:'center',padding:'8px',background: selected===d?'rgba(124,111,255,0.04)':'transparent'}}>
                  {booked ? (
                    <div style={{width:'100%',background:'rgba(124,111,255,0.12)',border:'1px solid rgba(124,111,255,0.2)',borderRadius:4,padding:'4px 6px',textAlign:'center'}}>
                      <div style={{fontSize:10,color:'var(--accent2)',fontWeight:500}}>{g.pickup}</div>
                      <div style={{fontSize:9,color:'var(--text3)'}}>– {g.dropoff}</div>
                    </div>
                  ) : (
                    <div style={{width:20,height:20,borderRadius:'50%',border:'1px dashed rgba(255,255,255,0.08)'}}/>
                  )}
                </div>
              )
            })}
          </div>
        ))}
        {/* Empty slots */}
        {Array.from({length: MAX_PLAETZE - GUESTS.length}).map((_, i) => (
          <div key={`empty-${i}`} style={{display:'grid',gridTemplateColumns:`160px repeat(5,1fr)`,borderBottom:'1px solid rgba(255,255,255,0.02)',opacity:0.4}}>
            <div style={{padding:'10px 16px',fontSize:11,color:'var(--text3)',fontStyle:'italic'}}>Freier Platz</div>
            {DAYS.map(d => <div key={d} style={{borderLeft:'1px solid var(--border)',padding:'8px',display:'flex',alignItems:'center',justifyContent:'center'}}><div style={{fontSize:10,color:'var(--text3)'}}>—</div></div>)}
          </div>
        ))}
      </div>

      <div className="card" style={{marginTop:12,display:'flex',gap:24,padding:'12px 20px',flexWrap:'wrap'}}>
        {[{c:'var(--green)',l:'< 60% Auslastung'},{c:'var(--amber)',l:'60–80%'},{c:'var(--red)',l:'> 80% — fast voll'}].map(({c,l}) => (
          <div key={l} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'var(--text2)'}}>
            <div style={{width:10,height:10,borderRadius:2,background:c}}/>
            {l}
          </div>
        ))}
        <div style={{marginLeft:'auto',fontSize:12,color:'var(--text3)'}}>Klick auf Wochentag zum Hervorheben</div>
      </div>
    </div>
  )
}
