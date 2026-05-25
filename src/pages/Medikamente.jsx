import { useState } from 'react'
import { GUESTS } from '../data/mock'

const MEDIKAMENTE = [
  { gastId: 1, name: 'Metformin 500mg', einnahme: 'Morgens zum Frühstück', vorrat: 24, status: 'ok' },
  { gastId: 1, name: 'Bisoprolol 2,5mg', einnahme: 'Morgens nüchtern', vorrat: 6, status: 'warn' },
  { gastId: 3, name: 'Insulin Lantus', einnahme: 'Abends 20 IE', vorrat: 2, status: 'kritisch' },
  { gastId: 3, name: 'Aspirin 100mg', einnahme: 'Morgens zum Frühstück', vorrat: 30, status: 'ok' },
  { gastId: 4, name: 'Ramipril 5mg', einnahme: 'Morgens', vorrat: 14, status: 'ok' },
  { gastId: 2, name: 'Marcumar 3mg', einnahme: 'Täglich nach INR-Wert', vorrat: 20, status: 'ok' },
  { gastId: 2, name: 'Furosemid 40mg', einnahme: 'Morgens', vorrat: 8, status: 'warn' },
]

const STATUS = {
  ok: { label: 'Ausreichend', color: 'var(--green)', bg: 'rgba(74,222,128,0.12)' },
  warn: { label: 'Nachbestellen', color: 'var(--amber)', bg: 'rgba(251,191,36,0.12)' },
  kritisch: { label: 'Dringend!', color: 'var(--red)', bg: 'rgba(248,113,113,0.12)' },
}

const GABEN_HEUTE = [
  { gastId: 1, med: 'Metformin 500mg', zeit: '08:30', status: 'gegeben', wer: 'M. Schulze' },
  { gastId: 3, med: 'Insulin Lantus', zeit: '08:00', status: 'gegeben', wer: 'M. Schulze' },
  { gastId: 3, med: 'Aspirin 100mg', zeit: '08:30', status: 'ausstehend', wer: '' },
  { gastId: 4, med: 'Ramipril 5mg', zeit: '09:00', status: 'ausstehend', wer: '' },
  { gastId: 2, med: 'Marcumar 3mg', zeit: '09:00', status: 'ausstehend', wer: '' },
]

export default function Medikamente() {
  const [tab, setTab] = useState('heute')

  const guestName = (id) => GUESTS.find(g => g.id === id)?.name || '—'
  const guestColor = (id) => GUESTS.find(g => g.id === id)?.color || 'av-gray'
  const guestInitials = (id) => GUESTS.find(g => g.id === id)?.initials || '?'
  const kritisch = MEDIKAMENTE.filter(m => m.status !== 'ok')

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Medikamentenverwaltung</h1>
          <p className="page-sub">Vergabeliste, Vorräte & Hinweise</p>
        </div>
        <button className="btn btn-primary">+ Medikament erfassen</button>
      </div>

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Medikamente gesamt</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{MEDIKAMENTE.length}</p>
          <p className="stat-sub">für {new Set(MEDIKAMENTE.map(m=>m.gastId)).size} Gäste</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Heute noch ausstehend</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>{GABEN_HEUTE.filter(g=>g.status==='ausstehend').length}</p>
          <p className="stat-sub">Vergaben offen</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Nachzubestellen</p>
          <p className="stat-value" style={{color: kritisch.length>0?'var(--red)':'var(--green)'}}>{kritisch.length}</p>
          <p className="stat-sub">Medikamente</p>
          {kritisch.length>0 && <span className="stat-badge badge-red">Handlung nötig</span>}
        </div>
        <div className="stat-card">
          <p className="stat-label">Heute vergeben</p>
          <p className="stat-value" style={{color:'var(--green)'}}>{GABEN_HEUTE.filter(g=>g.status==='gegeben').length}</p>
          <p className="stat-sub">von {GABEN_HEUTE.length} geplant</p>
        </div>
      </div>

      {kritisch.length > 0 && (
        <div style={{background:'rgba(248,113,113,0.08)',border:'1px solid rgba(248,113,113,0.2)',borderRadius:10,padding:'12px 16px',marginBottom:16,display:'flex',gap:12,alignItems:'flex-start'}}>
          <span style={{color:'var(--red)',fontSize:16}}>⚠</span>
          <div>
            <p style={{fontSize:13,fontWeight:500,color:'var(--red)',marginBottom:4}}>Vorräte kritisch</p>
            <p style={{fontSize:12,color:'var(--text2)'}}>
              {kritisch.map(m => `${m.name} (${guestName(m.gastId)}, ${m.vorrat} Tbl.)`).join(' · ')}
            </p>
          </div>
        </div>
      )}

      <div className="flex gap8 mb16">
        {['heute','vorrate','alle'].map(t => (
          <button key={t} className="btn" style={{fontSize:12,background:tab===t?'rgba(124,111,255,0.12)':'var(--bg3)',color:tab===t?'var(--accent2)':'var(--text2)',borderColor:tab===t?'var(--accent)':'var(--border)'}} onClick={()=>setTab(t)}>
            {t==='heute'?'Vergabeliste heute':t==='vorrate'?'Vorräte':'Alle Medikamente'}
          </button>
        ))}
      </div>

      {tab === 'heute' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th style={{paddingLeft:16}}>Gast</th><th>Medikament</th><th>Uhrzeit</th><th>Status</th><th>Gegeben von</th></tr></thead>
            <tbody>
              {GABEN_HEUTE.map((g,i) => (
                <tr key={i}>
                  <td style={{paddingLeft:16}}>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${guestColor(g.gastId)}`} style={{width:26,height:26,fontSize:10}}>{guestInitials(g.gastId)}</div>
                      <span style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{guestName(g.gastId)}</span>
                    </div>
                  </td>
                  <td style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{g.med}</td>
                  <td style={{fontSize:12,color:'var(--text2)',fontWeight:500}}>{g.zeit}</td>
                  <td>
                    <span style={{fontSize:10,fontWeight:500,padding:'2px 8px',borderRadius:4,background:g.status==='gegeben'?'rgba(74,222,128,0.12)':'rgba(251,191,36,0.12)',color:g.status==='gegeben'?'var(--green)':'var(--amber)'}}>
                      {g.status==='gegeben'?'✓ Gegeben':'⏳ Ausstehend'}
                    </span>
                  </td>
                  <td style={{fontSize:12,color:'var(--text3)'}}>{g.wer || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'vorrate' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th style={{paddingLeft:16}}>Gast</th><th>Medikament</th><th>Vorrat (Tage)</th><th>Status</th></tr></thead>
            <tbody>
              {[...MEDIKAMENTE].sort((a,b) => a.vorrat - b.vorrat).map((m,i) => (
                <tr key={i}>
                  <td style={{paddingLeft:16}}>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${guestColor(m.gastId)}`} style={{width:26,height:26,fontSize:10}}>{guestInitials(m.gastId)}</div>
                      <span style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{guestName(m.gastId)}</span>
                    </div>
                  </td>
                  <td style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{m.name}</td>
                  <td>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div style={{width:60,height:4,background:'var(--bg3)',borderRadius:2,overflow:'hidden'}}>
                        <div style={{height:'100%',width:`${Math.min((m.vorrat/30)*100,100)}%`,background:m.status==='ok'?'var(--green)':m.status==='warn'?'var(--amber)':'var(--red)',borderRadius:2}}/>
                      </div>
                      <span style={{fontSize:12,fontWeight:500,color:m.status==='ok'?'var(--green)':m.status==='warn'?'var(--amber)':'var(--red)'}}>{m.vorrat} Tbl.</span>
                    </div>
                  </td>
                  <td>
                    <span style={{fontSize:10,fontWeight:500,padding:'2px 8px',borderRadius:4,background:STATUS[m.status].bg,color:STATUS[m.status].color}}>
                      {STATUS[m.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'alle' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th style={{paddingLeft:16}}>Gast</th><th>Medikament</th><th>Einnahme</th><th>Vorrat</th></tr></thead>
            <tbody>
              {MEDIKAMENTE.map((m,i) => (
                <tr key={i}>
                  <td style={{paddingLeft:16}}>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${guestColor(m.gastId)}`} style={{width:26,height:26,fontSize:10}}>{guestInitials(m.gastId)}</div>
                      <span style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{guestName(m.gastId)}</span>
                    </div>
                  </td>
                  <td style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{m.name}</td>
                  <td style={{fontSize:12,color:'var(--text2)'}}>{m.einnahme}</td>
                  <td style={{fontSize:12,fontWeight:500,color:STATUS[m.status].color}}>{m.vorrat} Tbl.</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
