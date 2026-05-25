import { TODAY_GUESTS, GUESTS } from '../data/mock'

const today = new Intl.DateTimeFormat('de-DE', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date())

const ACTIVITIES = [
  { time: '09:00', act: 'Morgenrunde & Begrüßung', done: true },
  { time: '09:30', act: 'Bewegungsübungen (Stuhlgymnastik)', done: true },
  { time: '10:15', act: 'Gedächtnistraining', done: false },
  { time: '12:00', act: 'Mittagessen (Diabetiker-Menü für 1 Gast)', done: false },
  { time: '13:30', act: 'Ruhezeit / Einzelbetreuung', done: false },
  { time: '15:00', act: 'Kaffee & Geselligkeit', done: false },
  { time: '16:00', act: 'Vorbereitung Abholung', done: false },
]

const ALERTS = [
  { type: 'amber', text: 'Blutdruck Fritz Müller noch nicht gemessen' },
  { type: 'purple', text: 'Abrechnung April — 3 Verordnungen ausstehend' },
  { type: 'green', text: 'Fahrtdienst Route optimiert — 12 Min kürzer als gestern' },
]

export default function Dashboard() {
  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Guten Morgen ☀️</h1>
          <p className="page-sub">{today} · {TODAY_GUESTS.length} Gäste erwartet heute</p>
        </div>
        <div className="flex gap8">
          <button className="btn">Tagesprotokoll KI ✦</button>
          <button className="btn btn-primary">+ Gast erfassen</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Heute anwesend</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{TODAY_GUESTS.length}</p>
          <p className="stat-sub">von {GUESTS.length} gesamt</p>
          <span className="stat-badge badge-purple">↑ 1 mehr als gestern</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Abrechenbar heute</p>
          <p className="stat-value" style={{color:'var(--green)'}}>488€</p>
          <p className="stat-sub">4 Gäste × Tagessatz</p>
          <span className="stat-badge badge-green">SGB XI konform</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Fahrtdienst</p>
          <p className="stat-value" style={{color:'var(--teal)'}}>2</p>
          <p className="stat-sub">Touren geplant</p>
          <span className="stat-badge badge-teal">Route optimiert</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Offene Dokus</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>3</p>
          <p className="stat-sub">KI-Hilfe verfügbar</p>
          <span className="stat-badge badge-amber">Heute fällig</span>
        </div>
      </div>

      <div className="grid2 gap16">
        {/* Guests today */}
        <div className="card">
          <p className="card-title">Gäste heute</p>
          <table className="data-table">
            <thead>
              <tr>
                <th>Gast</th><th>PG</th><th>Ankunft</th><th>Diät</th><th>Status</th>
              </tr>
            </thead>
            <tbody>
              {TODAY_GUESTS.map((g, i) => (
                <tr key={g.id}>
                  <td>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${g.color}`}>{g.initials}</div>
                      <div>
                        <div style={{color:'var(--text)',fontWeight:500,fontSize:13}}>{g.name}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{g.age} Jahre</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`tag tag-${g.pg - 1}`}>PG {g.pg}</span></td>
                  <td style={{fontWeight:500,color:'var(--text)'}}>{g.pickup}</td>
                  <td style={{fontSize:12}}>{g.diet}</td>
                  <td>
                    <span className={`tag ${i < 2 ? 'tag-5' : 'tag-1'}`}>
                      {i < 2 ? 'Angekommen' : 'Erwartet'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right col */}
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {/* Alerts */}
          <div className="card">
            <p className="card-title">KI-Hinweise</p>
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {ALERTS.map((a, i) => (
                <div key={i} style={{display:'flex',gap:10,alignItems:'flex-start',padding:'8px 10px',background:'var(--bg3)',borderRadius:8,borderLeft:`2px solid var(--${a.type === 'amber' ? 'amber' : a.type === 'purple' ? 'accent' : 'green'})`}}>
                  <span style={{fontSize:11,color: a.type === 'amber' ? 'var(--amber)' : a.type === 'purple' ? 'var(--accent2)' : 'var(--green)'}}>{a.type === 'amber' ? '⚠' : a.type === 'purple' ? '●' : '✓'}</span>
                  <span style={{fontSize:12,color:'var(--text2)'}}>{a.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tagesplan */}
          <div className="card" style={{flex:1}}>
            <p className="card-title">Tagesablauf</p>
            <div style={{display:'flex',flexDirection:'column',gap:6}}>
              {ACTIVITIES.map((a, i) => (
                <div key={i} style={{display:'flex',gap:10,alignItems:'center',padding:'6px 0',borderBottom:'1px solid var(--border)',opacity: a.done ? 0.5 : 1}}>
                  <span style={{fontSize:11,color:'var(--text3)',minWidth:40,fontWeight:500}}>{a.time}</span>
                  <span style={{width:14,height:14,borderRadius:3,border:`1.5px solid ${a.done ? 'var(--green)' : 'var(--border2)'}`,background: a.done ? 'rgba(74,222,128,0.15)' : 'none',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,fontSize:9,color:'var(--green)'}}>
                    {a.done ? '✓' : ''}
                  </span>
                  <span style={{fontSize:12,color:'var(--text2)'}}>{a.act}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
