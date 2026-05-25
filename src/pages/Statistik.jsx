import { useState } from 'react'
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell } from 'recharts'
import { GUESTS } from '../data/mock'

const MONATS_AUSLASTUNG = [
  { m: 'Nov', auslast: 72, umsatz: 6800, gaeste: 5 },
  { m: 'Dez', auslast: 68, umsatz: 6200, gaeste: 5 },
  { m: 'Jan', auslast: 75, umsatz: 7100, gaeste: 6 },
  { m: 'Feb', auslast: 78, umsatz: 7400, gaeste: 6 },
  { m: 'Mär', auslast: 82, umsatz: 7800, gaeste: 7 },
  { m: 'Apr', auslast: 85, umsatz: 8240, gaeste: 7 },
  { m: 'Mai', auslast: 88, umsatz: 8600, gaeste: 7 },
]

const PG_VERTEILUNG = [
  { name: 'PG 2', value: GUESTS.filter(g => g.pg === 2).length, color: '#7c6fff' },
  { name: 'PG 3', value: GUESTS.filter(g => g.pg === 3).length, color: '#2dd4bf' },
  { name: 'PG 4', value: GUESTS.filter(g => g.pg === 4).length, color: '#fbbf24' },
  { name: 'PG 5', value: GUESTS.filter(g => g.pg === 5).length, color: '#f87171' },
]

const DOCS_PRO_TAG = [
  { tag: 'Mo', ki: 8, manuell: 1 },
  { tag: 'Di', ki: 7, manuell: 2 },
  { tag: 'Mi', ki: 9, manuell: 0 },
  { tag: 'Do', ki: 6, manuell: 1 },
  { tag: 'Fr', ki: 8, manuell: 1 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>
      <p style={{ color: 'var(--text2)', marginBottom: 4, fontWeight: 500 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}{p.name?.includes('Umsatz') ? '€' : p.name?.includes('Auslast') ? '%' : ''}</p>)}
    </div>
  )
}

export default function Statistik() {
  const [zeitraum, setZeitraum] = useState('6m')
  const [tab, setTab] = useState('auslastung')

  const aktuellerMonat = MONATS_AUSLASTUNG[MONATS_AUSLASTUNG.length - 1]
  const vorMonat = MONATS_AUSLASTUNG[MONATS_AUSLASTUNG.length - 2]

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Statistik & Berichte</h1>
          <p className="page-sub">Auslastung · Umsatz · Dokumentation · Pflegegrade</p>
        </div>
        <div className="flex gap8">
          {['3m', '6m', '12m'].map(z => (
            <button key={z} className="btn" style={{ fontSize: 12, padding: '6px 12px', background: zeitraum === z ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: zeitraum === z ? 'var(--accent2)' : 'var(--text2)', borderColor: zeitraum === z ? 'var(--accent)' : 'var(--border)' }} onClick={() => setZeitraum(z)}>{z}</button>
          ))}
          <button className="btn">📥 Bericht exportieren</button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid4 mb20">
        {[
          { label: 'Auslastung Mai', val: `${aktuellerMonat.auslast}%`, sub: `+${aktuellerMonat.auslast - vorMonat.auslast}% vs. Vormonat`, color: 'var(--green)', badge: 'badge-green' },
          { label: 'Umsatz Mai', val: `${aktuellerMonat.umsatz.toLocaleString('de')}€`, sub: `+${aktuellerMonat.umsatz - vorMonat.umsatz}€ vs. Vormonat`, color: 'var(--teal)', badge: 'badge-teal' },
          { label: 'Aktive Gäste', val: aktuellerMonat.gaeste, sub: 'Ø Besuche: 3,2/Woche', color: 'var(--accent2)', badge: 'badge-purple' },
          { label: 'KI-Dokus gesamt', val: '148', sub: 'Diese Woche: 38', color: 'var(--amber)', badge: 'badge-amber' },
        ].map((k, i) => (
          <div key={i} className="stat-card">
            <p className="stat-label">{k.label}</p>
            <p className="stat-value" style={{ color: k.color }}>{k.val}</p>
            <p className="stat-sub">{k.sub}</p>
            <span className={`stat-badge ${k.badge}`}>↑ Positiv</span>
          </div>
        ))}
      </div>

      <div className="flex gap8 mb16">
        {['auslastung', 'umsatz', 'dokumentation', 'pflegegrade'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'auslastung' ? 'Auslastung' : t === 'umsatz' ? 'Umsatz' : t === 'dokumentation' ? 'Dokumentation' : 'Pflegegrade'}
          </button>
        ))}
      </div>

      {tab === 'auslastung' && (
        <div className="grid2 gap16">
          <div className="card">
            <p className="card-title">Auslastung % (6 Monate)</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={MONATS_AUSLASTUNG}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis domain={[60, 100]} tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
                <Tooltip content={<CustomTooltip />} />
                <Line dataKey="auslast" name="Auslastung" stroke="var(--accent)" strokeWidth={2} dot={{ fill: 'var(--accent)', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <p className="card-title">Auslastung nach Wochentag</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 8 }}>
              {[{ d: 'Montag', pct: 92 }, { d: 'Dienstag', pct: 85 }, { d: 'Mittwoch', pct: 88 }, { d: 'Donnerstag', pct: 75 }, { d: 'Freitag', pct: 67 }].map(d => (
                <div key={d.d} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ fontSize: 12, color: 'var(--text2)', width: 80, flexShrink: 0 }}>{d.d}</span>
                  <div style={{ flex: 1, height: 8, background: 'var(--bg3)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${d.pct}%`, background: d.pct > 85 ? 'var(--green)' : d.pct > 70 ? 'var(--teal)' : 'var(--amber)', borderRadius: 4, transition: 'width 0.5s' }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text2)', width: 36, textAlign: 'right' }}>{d.pct}%</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 12, padding: '8px 10px', background: 'var(--bg3)', borderRadius: 7, fontSize: 11, color: 'var(--text3)' }}>
              💡 Freitag noch Kapazität — Warteliste prüfen
            </div>
          </div>
        </div>
      )}

      {tab === 'umsatz' && (
        <div className="grid2 gap16">
          <div className="card">
            <p className="card-title">Monatsumsatz (€)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={MONATS_AUSLASTUNG}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="m" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${v / 1000}k`} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="umsatz" name="Umsatz" fill="rgba(45,212,191,0.5)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <p className="card-title">Umsatz nach Pflegegrad</p>
            {[2, 3, 4, 5].map(pg => {
              const g = GUESTS.filter(x => x.pg === pg)
              const estMonat = g.reduce((s, x) => s + (x.days.length * 4 * ([0, 0, 62, 74, 84, 95][pg])), 0)
              return (
                <div key={pg} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                  <span className={`tag tag-${pg - 1}`} style={{ flexShrink: 0, width: 40, textAlign: 'center' }}>PG {pg}</span>
                  <span style={{ fontSize: 12, color: 'var(--text3)', width: 60 }}>{g.length} Gäste</span>
                  <div style={{ flex: 1, height: 4, background: 'var(--bg3)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${Math.min((estMonat / 4000) * 100, 100)}%`, background: 'var(--teal)', borderRadius: 2 }} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--teal)', width: 70, textAlign: 'right' }}>{estMonat.toLocaleString('de')}€</span>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {tab === 'dokumentation' && (
        <div className="grid2 gap16">
          <div className="card">
            <p className="card-title">KI- vs. Manuelle Dokumentation</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={DOCS_PRO_TAG}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                <XAxis dataKey="tag" tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'var(--text3)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="ki" name="KI-generiert" fill="rgba(124,111,255,0.5)" radius={[3, 3, 0, 0]} stackId="a" />
                <Bar dataKey="manuell" name="Manuell" fill="rgba(251,191,36,0.5)" radius={[3, 3, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <p className="card-title">Zeitersparnis durch KI</p>
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <p style={{ fontSize: 48, fontWeight: 700, fontFamily: 'var(--font-head)', color: 'var(--green)', lineHeight: 1 }}>3,2h</p>
              <p style={{ fontSize: 13, color: 'var(--text2)', marginTop: 4 }}>Ersparnis pro Tag durch KI-Dokumentation</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginTop: 8 }}>
              <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>Ø Minuten/Doku</p>
                <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--text)' }}>2 <span style={{ fontSize: 12, color: 'var(--text3)' }}>statt 18 Min</span></p>
              </div>
              <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px', textAlign: 'center' }}>
                <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>KI-Quote</p>
                <p style={{ fontSize: 20, fontWeight: 600, color: 'var(--accent2)' }}>89%</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {tab === 'pflegegrade' && (
        <div className="grid2 gap16">
          <div className="card">
            <p className="card-title">Pflegegrad-Verteilung</p>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={PG_VERTEILUNG.filter(p => p.value > 0)} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, value }) => `${name}: ${value}`} labelLine={{ stroke: 'var(--text3)' }}>
                  {PG_VERTEILUNG.map((entry, index) => <Cell key={index} fill={entry.color} fillOpacity={0.7} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="card">
            <p className="card-title">Gäste nach Pflegegrad</p>
            {GUESTS.map(g => (
              <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderBottom: '1px solid var(--border)' }}>
                <div className={`avatar ${g.color}`} style={{ width: 26, height: 26, fontSize: 10 }}>{g.initials}</div>
                <span style={{ fontSize: 12, color: 'var(--text)', flex: 1 }}>{g.name}</span>
                <span className={`tag tag-${g.pg - 1}`}>PG {g.pg}</span>
                <span style={{ fontSize: 11, color: 'var(--text3)', width: 50, textAlign: 'right' }}>{[0, 0, 62, 74, 84, 95][g.pg]}€/T</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
