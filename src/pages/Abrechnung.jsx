import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { GUESTS, ABRECHNUNG_DATA, PG_TAGESSAETZE, PG_ENTLASTUNG } from '../data/mock'

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{background:'var(--bg2)',border:'1px solid var(--border)',borderRadius:8,padding:'8px 12px',fontSize:12}}>
      <p style={{color:'var(--text2)',marginBottom:4,fontWeight:500}}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{color: p.color}}>
          {p.name}: {p.value}€
        </p>
      ))}
    </div>
  )
}

export default function Abrechnung() {
  const [month, setMonth] = useState('Mai 2026')

  const totalMonth = GUESTS.reduce((sum, g) => {
    const days = g.days.length * 4 // approx 4 weeks
    const tagessatz = PG_TAGESSAETZE[g.pg] || 62
    return sum + days * tagessatz
  }, 0)

  const offene = GUESTS.filter(g => g.pg >= 3).length
  const foerderung = 12000

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Abrechnung</h1>
          <p className="page-sub">SGB XI-konforme Abrechnung · GKV-Förderung aktiv</p>
        </div>
        <div className="flex gap8">
          <button className="btn">Monatsabschluss</button>
          <button className="btn btn-primary">+ Abrechnung einreichen</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Umsatz {month}</p>
          <p className="stat-value" style={{color:'var(--green)'}}>8.240€</p>
          <p className="stat-sub">7 Gäste · alle Pflegegrade</p>
          <span className="stat-badge badge-green">↑ 6% vs. Vormonat</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">GKV-Förderung §8 SGB XI</p>
          <p className="stat-value" style={{color:'var(--accent2)'}}>{foerderung.toLocaleString('de')}€</p>
          <p className="stat-sub">Noch verfügbar</p>
          <span className="stat-badge badge-purple">Bis 2030 gültig</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Offene Verordnungen</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>{offene}</p>
          <p className="stat-sub">Gäste mit PG ≥ 3</p>
          <span className="stat-badge badge-amber">Frist in 8 Tagen</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Fehlerquote</p>
          <p className="stat-value" style={{color:'var(--green)'}}>0,2%</p>
          <p className="stat-sub">KI-Prüfung aktiv</p>
          <span className="stat-badge badge-green">Komda: ~8%</span>
        </div>
      </div>

      {/* Förderung banner */}
      <div style={{background:'rgba(124,111,255,0.07)',border:'1px solid rgba(124,111,255,0.2)',borderRadius:12,padding:'14px 18px',marginBottom:20,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <p style={{fontSize:13,fontWeight:600,color:'var(--accent2)',marginBottom:3}}>✦ GKV-Digitalisierungsförderung § 8 Abs. 8 SGB XI</p>
          <p style={{fontSize:12,color:'var(--text2)'}}>Ihre Einrichtung hat Anspruch auf 12.000€ Förderung für digitale Anschaffungen. Noch nicht beantragt — TagesPilot Lizenzkosten sind förderungsfähig.</p>
        </div>
        <button className="btn btn-primary" style={{whiteSpace:'nowrap'}}>Förderantrag starten →</button>
      </div>

      <div className="grid2 gap16">
        {/* Chart */}
        <div className="card">
          <p className="card-title">Monatsumsatz Entwicklung</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ABRECHNUNG_DATA} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false}/>
              <XAxis dataKey="month" tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false}/>
              <YAxis tick={{fill:'var(--text3)',fontSize:11}} axisLine={false} tickLine={false} tickFormatter={v=>`${v/1000}k€`}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Bar dataKey="komda" name="Abrechnungsbetrag" fill="rgba(124,111,255,0.5)" radius={[4,4,0,0]}/>
              <Bar dataKey="einsparung" name="Ersparte Kosten (vs Komda)" fill="rgba(74,222,128,0.4)" radius={[4,4,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Per-guest breakdown */}
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <p className="card-title" style={{padding:'16px 16px 0'}}>Abrechnung pro Gast — {month}</p>
          <table className="data-table">
            <thead>
              <tr>
                <th style={{paddingLeft:16}}>Gast</th>
                <th>PG</th>
                <th>Tage</th>
                <th>Tagessatz</th>
                <th>Gesamt</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {GUESTS.map(g => {
                const days = g.days.length * 4
                const tagessatz = PG_TAGESSAETZE[g.pg] || 62
                const total = days * tagessatz
                return (
                  <tr key={g.id}>
                    <td style={{paddingLeft:16}}>
                      <div className="flex gap8" style={{alignItems:'center'}}>
                        <div className={`avatar ${g.color}`} style={{width:26,height:26,fontSize:10}}>{g.initials}</div>
                        <span style={{fontSize:12,color:'var(--text)',fontWeight:500}}>{g.name}</span>
                      </div>
                    </td>
                    <td><span className={`tag tag-${g.pg-1}`}>PG {g.pg}</span></td>
                    <td style={{fontSize:12}}>{days}</td>
                    <td style={{fontSize:12,color:'var(--text2)'}}>{tagessatz}€</td>
                    <td style={{fontWeight:600,color:'var(--text)',fontFamily:'var(--font-head)',fontSize:13}}>{total.toLocaleString('de')}€</td>
                    <td><span className={`tag ${g.pg >= 4 ? 'tag-2' : 'tag-5'}`}>{g.pg >= 4 ? 'Prüfung' : 'Bereit'}</span></td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
