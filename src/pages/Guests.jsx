import { useState } from 'react'
import { GUESTS } from '../data/mock'

const DAY_MAP = { Mo: 'Montag', Di: 'Dienstag', Mi: 'Mittwoch', Do: 'Donnerstag', Fr: 'Freitag' }
const DAYS = ['Mo','Di','Mi','Do','Fr']

export default function Guests() {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [dayFilter, setDayFilter] = useState(null)

  const filtered = GUESTS.filter(g =>
    (g.name.toLowerCase().includes(search.toLowerCase())) &&
    (!dayFilter || g.days.includes(dayFilter))
  )

  const guest = selected ? GUESTS.find(g => g.id === selected) : null

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Tagesgäste</h1>
          <p className="page-sub">{GUESTS.length} Gäste gesamt · Alle Stammdaten & Pflegegrade</p>
        </div>
        <button className="btn btn-primary">+ Neuer Gast</button>
      </div>

      {/* Filters */}
      <div className="flex gap8 mb16">
        <input className="inp" style={{maxWidth:260}} placeholder="Gast suchen…" value={search} onChange={e => setSearch(e.target.value)} />
        <div className="flex gap4">
          {DAYS.map(d => (
            <button key={d} className="btn" style={{padding:'7px 10px',fontSize:12,background: dayFilter === d ? 'rgba(124,111,255,0.15)' : 'var(--bg3)',color: dayFilter === d ? 'var(--accent2)' : 'var(--text2)',borderColor: dayFilter === d ? 'var(--accent)' : 'var(--border)'}} onClick={() => setDayFilter(dayFilter === d ? null : d)}>{d}</button>
          ))}
        </div>
      </div>

      <div className="grid2 gap16">
        {/* Guest list */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{padding:'12px 16px'}}>Name</th>
                <th>PG</th>
                <th>Tage</th>
                <th>Abholung</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(g => (
                <tr key={g.id} style={{cursor:'pointer', background: selected === g.id ? 'rgba(124,111,255,0.06)' : 'transparent'}} onClick={() => setSelected(selected === g.id ? null : g.id)}>
                  <td style={{padding:'10px 16px'}}>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${g.color}`}>{g.initials}</div>
                      <div>
                        <div style={{color:'var(--text)',fontWeight:500,fontSize:13}}>{g.name}</div>
                        <div style={{fontSize:11,color:'var(--text3)'}}>{g.age} J. · {g.diet}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={`tag tag-${g.pg - 1}`}>PG {g.pg}</span></td>
                  <td>
                    <div className="flex gap3" style={{gap:3}}>
                      {g.days.map(d => <span key={d} style={{fontSize:10,padding:'1px 5px',background:'var(--bg3)',borderRadius:3,color:'var(--text2)'}}>{d}</span>)}
                    </div>
                  </td>
                  <td style={{fontWeight:500,fontSize:13,color:'var(--text)'}}>{g.pickup}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Detail */}
        {guest ? (
          <div className="card fade-in">
            <div className="flex gap12 mb20" style={{alignItems:'center'}}>
              <div className={`avatar ${guest.color}`} style={{width:48,height:48,fontSize:16}}>{guest.initials}</div>
              <div>
                <h2 style={{fontFamily:'var(--font-head)',fontSize:18,fontWeight:600,marginBottom:2}}>{guest.name}</h2>
                <p style={{fontSize:13,color:'var(--text2)'}}>{guest.age} Jahre · <span className={`tag tag-${guest.pg-1}`}>Pflegegrad {guest.pg}</span></p>
              </div>
            </div>

            <div className="divider" />

            {[
              ['Adresse', guest.address],
              ['Abholung', guest.pickup + ' Uhr'],
              ['Rückfahrt', guest.dropoff + ' Uhr'],
              ['Ernährung', guest.diet],
              ['Besuch-Tage', guest.days.join(', ')],
              ['Besonderheiten', guest.notes || '—'],
            ].map(([k,v]) => (
              <div key={k} className="flex-between" style={{padding:'7px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:12,color:'var(--text3)',fontWeight:500}}>{k}</span>
                <span style={{fontSize:13,color:'var(--text)',textAlign:'right',maxWidth:200}}>{v}</span>
              </div>
            ))}

            <div className="divider" />

            <div style={{marginBottom:12}}>
              <p style={{fontSize:12,color:'var(--text3)',marginBottom:8,fontWeight:500}}>Letzte KI-Dokumentation</p>
              <div style={{background:'var(--bg3)',borderRadius:8,padding:'10px 12px',fontSize:12,color:'var(--text2)',lineHeight:1.6}}>
                Gast zeigte sich heute gut gelaunt. Konnte an der Morgenrunde vollständig teilnehmen. Mahlzeiten vollständig eingenommen. Keine Auffälligkeiten beim Blutdruck. Mobilität stabil mit Rollator.
              </div>
            </div>

            <div className="flex gap8">
              <button className="btn" style={{fontSize:12}}>✦ KI-Doku erstellen</button>
              <button className="btn" style={{fontSize:12}}>Bearbeiten</button>
            </div>
          </div>
        ) : (
          <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:300}}>
            <div style={{textAlign:'center',color:'var(--text3)'}}>
              <p style={{fontSize:32,marginBottom:8}}>◎</p>
              <p style={{fontSize:13}}>Gast auswählen für Details</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
