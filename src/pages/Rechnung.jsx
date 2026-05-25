import { useState } from 'react'
import { GUESTS, PG_TAGESSAETZE } from '../data/mock'

const RECHNUNGEN = [
  { id: 'RE-2026-042', gastId: 1, monat: 'April 2026', betrag: 1240, eigenanteil: 310, gkv: 930, status: 'bezahlt', datum: '30.04.2026', faellig: '14.05.2026', zahlungsdatum: '08.05.2026' },
  { id: 'RE-2026-043', gastId: 2, monat: 'April 2026', betrag: 992, eigenanteil: 248, gkv: 744, status: 'bezahlt', datum: '30.04.2026', faellig: '14.05.2026', zahlungsdatum: '10.05.2026' },
  { id: 'RE-2026-044', gastId: 3, monat: 'April 2026', betrag: 1344, eigenanteil: 336, gkv: 1008, status: 'offen', datum: '30.04.2026', faellig: '14.05.2026', zahlungsdatum: null },
  { id: 'RE-2026-045', gastId: 4, monat: 'April 2026', betrag: 1240, eigenanteil: 310, gkv: 930, status: 'mahnung', datum: '30.04.2026', faellig: '07.05.2026', zahlungsdatum: null },
  { id: 'RE-2026-046', gastId: 5, monat: 'April 2026', betrag: 992, eigenanteil: 248, gkv: 744, status: 'offen', datum: '30.04.2026', faellig: '14.05.2026', zahlungsdatum: null },
]

const STATUS = {
  bezahlt: { label: 'Bezahlt', color: 'var(--green)', bg: 'rgba(74,222,128,0.12)' },
  offen: { label: 'Offen', color: 'var(--amber)', bg: 'rgba(251,191,36,0.12)' },
  mahnung: { label: 'Mahnung', color: 'var(--red)', bg: 'rgba(248,113,113,0.12)' },
}

export default function Rechnung() {
  const [tab, setTab] = useState('uebersicht')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)

  const guestName = id => GUESTS.find(g => g.id === id)?.name || '—'
  const guestColor = id => GUESTS.find(g => g.id === id)?.color || 'av-gray'
  const guestInitials = id => GUESTS.find(g => g.id === id)?.initials || '?'

  const total = RECHNUNGEN.reduce((s, r) => s + r.betrag, 0)
  const bezahlt = RECHNUNGEN.filter(r => r.status === 'bezahlt').reduce((s, r) => s + r.betrag, 0)
  const offen = RECHNUNGEN.filter(r => r.status !== 'bezahlt').reduce((s, r) => s + r.betrag, 0)

  const generateMonthlyBilling = () => {
    setGenerating(true)
    setTimeout(() => { setGenerating(false); setGenerated(true) }, 2500)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Abrechnung & E-Rechnung</h1>
          <p className="page-sub">SGB XI-konform · E-Rechnung (XRechnung) · Mahnwesen</p>
        </div>
        <div className="flex gap8">
          <button className="btn">📥 GKV-Abrechnung einreichen</button>
          <button className="btn btn-primary" onClick={generateMonthlyBilling} disabled={generating}>
            {generating ? <><span className="ki-dot"/><span className="ki-dot"/><span className="ki-dot"/> Generiere…</> : generated ? '✓ Mai 2026 bereit' : '✦ Monatsabschluss Mai 2026'}
          </button>
        </div>
      </div>

      {generated && (
        <div className="fade-in" style={{background:'rgba(74,222,128,0.08)',border:'1px solid rgba(74,222,128,0.2)',borderRadius:10,padding:'12px 16px',marginBottom:16,display:'flex',gap:12,alignItems:'center'}}>
          <span style={{color:'var(--green)',fontSize:18}}>✓</span>
          <div>
            <p style={{fontSize:13,fontWeight:500,color:'var(--green)',marginBottom:2}}>Mai 2026 — 7 Rechnungen erstellt</p>
            <p style={{fontSize:12,color:'var(--text2)'}}>Gesamtbetrag: 8.240€ · Alle als XRechnung (E-Rechnung) exportierbar · GKV-Dateien bereit zum Einreichen</p>
          </div>
          <button className="btn" style={{marginLeft:'auto',fontSize:12,flexShrink:0}}>📥 Alle herunterladen</button>
        </div>
      )}

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Monatsumsatz April</p>
          <p className="stat-value" style={{color:'var(--text)'}}>{total.toLocaleString('de')}€</p>
          <p className="stat-sub">Brutto inkl. Eigenanteile</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Eingegangen</p>
          <p className="stat-value" style={{color:'var(--green)'}}>{bezahlt.toLocaleString('de')}€</p>
          <p className="stat-sub">{RECHNUNGEN.filter(r=>r.status==='bezahlt').length} Rechnungen</p>
          <span className="stat-badge badge-green">↑ 67%</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Ausstehend</p>
          <p className="stat-value" style={{color:'var(--amber)'}}>{offen.toLocaleString('de')}€</p>
          <p className="stat-sub">{RECHNUNGEN.filter(r=>r.status!=='bezahlt').length} Rechnungen offen</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Mahnungen</p>
          <p className="stat-value" style={{color:'var(--red)'}}>{RECHNUNGEN.filter(r=>r.status==='mahnung').length}</p>
          <p className="stat-sub">1. Mahnung gesendet</p>
          <span className="stat-badge badge-red">Handlung nötig</span>
        </div>
      </div>

      {/* E-Rechnung Hinweis */}
      <div style={{background:'rgba(124,111,255,0.06)',border:'1px solid rgba(124,111,255,0.15)',borderRadius:10,padding:'12px 16px',marginBottom:16,display:'flex',gap:10,alignItems:'flex-start'}}>
        <span style={{color:'var(--accent2)',fontSize:14,flexShrink:0}}>ℹ</span>
        <p style={{fontSize:12,color:'var(--text2)',lineHeight:1.6}}>
          <strong style={{color:'var(--text)'}}>E-Rechnung Pflicht seit 01.01.2025:</strong> Alle Rechnungen werden automatisch im XRechnung-Format (ZUGFeRD) erstellt. Die GKV-Abrechnung erfolgt elektronisch über §302 SGB V. Eigenanteils-Rechnungen an Gäste werden als PDF + XRechnung generiert.
        </p>
      </div>

      <div className="flex gap8 mb16">
        {['uebersicht','erstellen','mahnwesen'].map(t => (
          <button key={t} className="btn" style={{fontSize:12,background:tab===t?'rgba(124,111,255,0.12)':'var(--bg3)',color:tab===t?'var(--accent2)':'var(--text2)',borderColor:tab===t?'var(--accent)':'var(--border)'}} onClick={()=>setTab(t)}>
            {t==='uebersicht'?'Rechnungsübersicht':t==='erstellen'?'Neue Rechnung':'Mahnwesen'}
          </button>
        ))}
      </div>

      {tab === 'uebersicht' && (
        <div className="card" style={{padding:0,overflow:'hidden'}}>
          <table className="data-table">
            <thead><tr><th style={{paddingLeft:16}}>Rechnung</th><th>Gast</th><th>Monat</th><th>GKV-Anteil</th><th>Eigenanteil</th><th>Gesamt</th><th>Status</th></tr></thead>
            <tbody>
              {RECHNUNGEN.map(r => (
                <tr key={r.id} style={{cursor:'pointer'}}>
                  <td style={{paddingLeft:16,fontFamily:'var(--font-head)',fontSize:12,color:'var(--text3)'}}>{r.id}</td>
                  <td>
                    <div className="flex gap8" style={{alignItems:'center'}}>
                      <div className={`avatar ${guestColor(r.gastId)}`} style={{width:26,height:26,fontSize:10}}>{guestInitials(r.gastId)}</div>
                      <span style={{fontSize:12,fontWeight:500,color:'var(--text)'}}>{guestName(r.gastId)}</span>
                    </div>
                  </td>
                  <td style={{fontSize:12,color:'var(--text2)'}}>{r.monat}</td>
                  <td style={{fontSize:12,fontWeight:500,color:'var(--teal)'}}>{r.gkv.toLocaleString('de')}€</td>
                  <td style={{fontSize:12,color:'var(--text2)'}}>{r.eigenanteil.toLocaleString('de')}€</td>
                  <td style={{fontSize:13,fontWeight:600,color:'var(--text)',fontFamily:'var(--font-head)'}}>{r.betrag.toLocaleString('de')}€</td>
                  <td>
                    <span style={{fontSize:10,fontWeight:500,padding:'2px 8px',borderRadius:4,background:STATUS[r.status].bg,color:STATUS[r.status].color}}>
                      {STATUS[r.status].label}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'mahnwesen' && (
        <div>
          {RECHNUNGEN.filter(r => r.status !== 'bezahlt').map(r => (
            <div key={r.id} className="card" style={{marginBottom:8,padding:'14px 16px'}}>
              <div className="flex-between">
                <div className="flex gap12" style={{alignItems:'center'}}>
                  <div className={`avatar ${guestColor(r.gastId)}`} style={{width:32,height:32,fontSize:11}}>{guestInitials(r.gastId)}</div>
                  <div>
                    <div style={{fontSize:13,fontWeight:500,color:'var(--text)'}}>{guestName(r.gastId)}</div>
                    <div style={{fontSize:11,color:'var(--text3)'}}>{r.id} · Fällig: {r.faellig} · {r.betrag.toLocaleString('de')}€</div>
                  </div>
                </div>
                <div className="flex gap8" style={{alignItems:'center'}}>
                  <span style={{fontSize:10,fontWeight:500,padding:'2px 8px',borderRadius:4,background:STATUS[r.status].bg,color:STATUS[r.status].color}}>
                    {STATUS[r.status].label}
                  </span>
                  <button className="btn" style={{fontSize:11,padding:'5px 10px'}}>
                    {r.status==='mahnung'?'2. Mahnung senden':'Mahnung senden'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
