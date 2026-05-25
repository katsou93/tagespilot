import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts'

const MDK_BEREICHE = [
  { id: 1, name: 'Pflege & medizinische Versorgung', score: 87, max: 100, items: [
    { text: 'Pflegeplanung aktuell und vollständig', status: 'ok' },
    { text: 'Medikamentenvergabe dokumentiert', status: 'ok' },
    { text: 'Risikoskalen durchgeführt (Sturz, Dekubitus)', status: 'warn' },
    { text: 'Wundversorgung dokumentiert', status: 'ok' },
  ]},
  { id: 2, name: 'Soziale Betreuung & Alltagsgestaltung', score: 94, max: 100, items: [
    { text: 'Tagesstruktur geplant und dokumentiert', status: 'ok' },
    { text: 'Aktivierungsangebote regelmäßig', status: 'ok' },
    { text: 'Biographiearbeit vorhanden', status: 'warn' },
    { text: 'Angehörige einbezogen', status: 'ok' },
  ]},
  { id: 3, name: 'Qualitätsmanagement', score: 78, max: 100, items: [
    { text: 'Beschwerdemanagement schriftlich', status: 'warn' },
    { text: 'Mitarbeiterschulungen nachgewiesen', status: 'ok' },
    { text: 'Hygieneplan aktuell', status: 'ok' },
    { text: 'Notfallplan vorhanden', status: 'warn' },
  ]},
  { id: 4, name: 'Abrechnung & Dokumentation', score: 96, max: 100, items: [
    { text: 'Leistungsnachweise vollständig', status: 'ok' },
    { text: 'SGB XI-Abrechnung korrekt', status: 'ok' },
    { text: 'Verträge mit Pflegekassen aktuell', status: 'ok' },
    { text: 'E-Rechnung implementiert', status: 'ok' },
  ]},
]

const RADAR_DATA = MDK_BEREICHE.map(b => ({ subject: b.name.split(' ')[0], A: b.score, fullMark: 100 }))

const MONATS_DATEN = [
  { m: 'Jan', score: 81 }, { m: 'Feb', score: 83 }, { m: 'Mär', score: 85 },
  { m: 'Apr', score: 84 }, { m: 'Mai', score: 89 }, { m: 'Jun', score: 91 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 12 }}>
      <p style={{ color: 'var(--text2)', marginBottom: 2 }}>{label}</p>
      <p style={{ color: 'var(--accent2)', fontWeight: 500 }}>{payload[0].value} Punkte</p>
    </div>
  )
}

export default function Qualitaet() {
  const [activeBereich, setActiveBereich] = useState(null)
  const [generating, setGenerating] = useState(false)
  const [reportGenerated, setReportGenerated] = useState(false)

  const gesamtScore = Math.round(MDK_BEREICHE.reduce((s, b) => s + b.score, 0) / MDK_BEREICHE.length)
  const offenePunkte = MDK_BEREICHE.flatMap(b => b.items.filter(i => i.status === 'warn'))

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Qualität & MDK-Vorbereitung</h1>
          <p className="page-sub">Qualitätsprüfung Pflege-TÜV · Letzte Prüfung: März 2026</p>
        </div>
        <div className="flex gap8">
          <button className="btn" onClick={() => { setGenerating(true); setTimeout(() => { setGenerating(false); setReportGenerated(true) }, 2500) }} disabled={generating}>
            {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /><span style={{ marginLeft: 8 }}>Erstelle Bericht…</span></> : '✦ MDK-Bericht erstellen'}
          </button>
          <button className="btn btn-primary">📅 MDK-Termin vorbereiten</button>
        </div>
      </div>

      {reportGenerated && (
        <div className="fade-in" style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: '12px 16px', marginBottom: 16, display: 'flex', gap: 12, alignItems: 'center' }}>
          <span style={{ color: 'var(--green)', fontSize: 16 }}>✓</span>
          <div>
            <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)', marginBottom: 2 }}>MDK-Selbstauskunft Mai 2026 erstellt</p>
            <p style={{ fontSize: 12, color: 'var(--text2)' }}>Gesamtpunktzahl: {gesamtScore}/100 · 4 offene Punkte als Empfehlungen markiert · Bereit zum Einreichen</p>
          </div>
          <button className="btn" style={{ marginLeft: 'auto', fontSize: 12, flexShrink: 0 }}>📥 PDF herunterladen</button>
        </div>
      )}

      <div className="grid4 mb20">
        <div className="stat-card">
          <p className="stat-label">Gesamtqualität</p>
          <p className="stat-value" style={{ color: gesamtScore > 90 ? 'var(--green)' : 'var(--amber)' }}>{gesamtScore}</p>
          <p className="stat-sub">von 100 Punkten</p>
          <span className={`stat-badge ${gesamtScore > 90 ? 'badge-green' : 'badge-amber'}`}>{gesamtScore > 90 ? 'Sehr gut' : 'Gut'}</span>
        </div>
        <div className="stat-card">
          <p className="stat-label">Geprüfte Bereiche</p>
          <p className="stat-value" style={{ color: 'var(--accent2)' }}>{MDK_BEREICHE.length}</p>
          <p className="stat-sub">alle bewertet</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Offene Punkte</p>
          <p className="stat-value" style={{ color: offenePunkte.length > 0 ? 'var(--amber)' : 'var(--green)' }}>{offenePunkte.length}</p>
          <p className="stat-sub">Empfehlungen</p>
          {offenePunkte.length > 0 && <span className="stat-badge badge-amber">Zu bearbeiten</span>}
        </div>
        <div className="stat-card">
          <p className="stat-label">Trend (6 Monate)</p>
          <p className="stat-value" style={{ color: 'var(--green)' }}>+8</p>
          <p className="stat-sub">Punkte verbessert</p>
          <span className="stat-badge badge-green">↑ Positiv</span>
        </div>
      </div>

      <div className="grid2 gap16 mb16">
        <div className="card">
          <p className="card-title">Qualitätsentwicklung</p>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={MONATS_DATEN}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[70, 100]} tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="score" fill="rgba(124,111,255,0.5)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card">
          <p className="card-title">Qualitätsradar</p>
          <ResponsiveContainer width="100%" height={160}>
            <RadarChart data={RADAR_DATA}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text3)', fontSize: 10 }} />
              <Radar dataKey="A" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.15} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {MDK_BEREICHE.map(b => (
          <div key={b.id} className="card" style={{ cursor: 'pointer', borderColor: activeBereich === b.id ? 'var(--accent)' : '' }} onClick={() => setActiveBereich(activeBereich === b.id ? null : b.id)}>
            <div className="flex-between">
              <div className="flex gap12" style={{ alignItems: 'center' }}>
                <div style={{ minWidth: 42, height: 42, borderRadius: 8, background: b.score > 90 ? 'rgba(74,222,128,0.12)' : b.score > 80 ? 'rgba(251,191,36,0.12)' : 'rgba(248,113,113,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, fontFamily: 'var(--font-head)', color: b.score > 90 ? 'var(--green)' : b.score > 80 ? 'var(--amber)' : 'var(--red)' }}>
                  {b.score}
                </div>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{b.name}</p>
                  <div style={{ width: 200, height: 3, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${b.score}%`, background: b.score > 90 ? 'var(--green)' : b.score > 80 ? 'var(--amber)' : 'var(--red)', borderRadius: 2 }} />
                  </div>
                </div>
              </div>
              <div className="flex gap8" style={{ alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text3)' }}>{b.items.filter(i => i.status === 'warn').length} offen</span>
                <span style={{ color: 'var(--text3)', fontSize: 12 }}>{activeBereich === b.id ? '▲' : '▼'}</span>
              </div>
            </div>
            {activeBereich === b.id && (
              <div className="fade-in" style={{ marginTop: 12, borderTop: '1px solid var(--border)', paddingTop: 12 }}>
                {b.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '6px 0', borderBottom: i < b.items.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <span style={{ fontSize: 13, color: item.status === 'ok' ? 'var(--green)' : 'var(--amber)', flexShrink: 0 }}>{item.status === 'ok' ? '✓' : '⚠'}</span>
                    <span style={{ fontSize: 12, color: item.status === 'ok' ? 'var(--text2)' : 'var(--text)' }}>{item.text}</span>
                    {item.status === 'warn' && <button className="btn" style={{ fontSize: 10, padding: '2px 8px', marginLeft: 'auto', flexShrink: 0 }}>Bearbeiten</button>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
