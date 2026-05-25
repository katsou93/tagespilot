import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, ReferenceLine } from 'recharts'
import { GUESTS } from '../data/mock'

const generateVitals = (guestId) => {
  const base = { 1: { sys: 128, dia: 82, puls: 72, gewicht: 68, temp: 36.5 }, 3: { sys: 145, dia: 92, puls: 88, gewicht: 61, temp: 36.8 }, 4: { sys: 135, dia: 85, puls: 76, gewicht: 84, temp: 36.6 } }[guestId] || { sys: 130, dia: 80, puls: 74, gewicht: 72, temp: 36.5 }
  return Array.from({ length: 10 }, (_, i) => ({
    datum: `${15 + i}.05`,
    sys: base.sys + Math.round((Math.random() - 0.5) * 14),
    dia: base.dia + Math.round((Math.random() - 0.5) * 8),
    puls: base.puls + Math.round((Math.random() - 0.5) * 10),
    gewicht: +(base.gewicht + (Math.random() - 0.5) * 0.4).toFixed(1),
    temp: +(base.temp + (Math.random() - 0.5) * 0.3).toFixed(1),
  }))
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 8, padding: '8px 12px', fontSize: 11 }}>
      <p style={{ color: 'var(--text2)', marginBottom: 4, fontWeight: 500 }}>{label}</p>
      {payload.map((p, i) => <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>)}
    </div>
  )
}

function VitalCard({ label, value, unit, status, icon }) {
  const colors = { ok: 'var(--green)', warn: 'var(--amber)', krit: 'var(--red)' }
  return (
    <div className="stat-card">
      <p className="stat-label">{icon} {label}</p>
      <p className="stat-value" style={{ color: colors[status] || 'var(--text)' }}>{value}</p>
      <p className="stat-sub">{unit}</p>
      <span className={`stat-badge ${status === 'ok' ? 'badge-green' : status === 'warn' ? 'badge-amber' : 'badge-red'}`}>
        {status === 'ok' ? 'Normal' : status === 'warn' ? 'Beobachten' : 'Kritisch!'}
      </span>
    </div>
  )
}

export default function Vitaldaten() {
  const [selectedGuest, setSelectedGuest] = useState(GUESTS[0])
  const [tab, setTab] = useState('verlauf')
  const [newEntry, setNewEntry] = useState({ sys: '', dia: '', puls: '', gewicht: '', temp: '' })
  const [saved, setSaved] = useState(false)

  const vitals = generateVitals(selectedGuest.id)
  const latest = vitals[vitals.length - 1]

  const getBPStatus = (sys, dia) => sys > 160 || dia > 100 ? 'krit' : sys > 140 || dia > 90 ? 'warn' : 'ok'
  const getTempStatus = (t) => t >= 38.5 ? 'krit' : t >= 37.5 ? 'warn' : 'ok'
  const getPulsStatus = (p) => p > 100 || p < 50 ? 'krit' : p > 90 || p < 55 ? 'warn' : 'ok'

  const saveVital = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
    setNewEntry({ sys: '', dia: '', puls: '', gewicht: '', temp: '' })
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Vitaldaten</h1>
          <p className="page-sub">Blutdruck · Puls · Gewicht · Temperatur · Verlauf</p>
        </div>
        <button className="btn btn-primary">+ Messung erfassen</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 16, alignItems: 'start' }}>
        {/* Guest picker */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {GUESTS.slice(0, 5).map(g => (
            <button key={g.id} onClick={() => setSelectedGuest(g)} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '8px 10px', background: selectedGuest.id === g.id ? 'rgba(124,111,255,0.1)' : 'var(--bg2)', borderRadius: 8, border: `1px solid ${selectedGuest.id === g.id ? 'var(--accent)' : 'var(--border)'}`, cursor: 'pointer', textAlign: 'left' }}>
              <div className={`avatar ${g.color}`} style={{ width: 28, height: 28, fontSize: 10 }}>{g.initials}</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 500, color: 'var(--text)' }}>{g.name.split(' ')[0]}</div>
                <div style={{ fontSize: 9, color: 'var(--text3)' }}>PG {g.pg}</div>
              </div>
            </button>
          ))}
        </div>

        <div>
          {/* Latest vitals */}
          <div className="grid4 mb16">
            <VitalCard label="Blutdruck" value={`${latest.sys}/${latest.dia}`} unit="mmHg" status={getBPStatus(latest.sys, latest.dia)} icon="❤️" />
            <VitalCard label="Puls" value={latest.puls} unit="bpm" status={getPulsStatus(latest.puls)} icon="💓" />
            <VitalCard label="Gewicht" value={latest.gewicht} unit="kg" status="ok" icon="⚖️" />
            <VitalCard label="Temperatur" value={latest.temp} unit="°C" status={getTempStatus(latest.temp)} icon="🌡️" />
          </div>

          <div className="flex gap8 mb12">
            {['verlauf', 'eingabe', 'tabelle'].map(t => (
              <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
                {t === 'verlauf' ? 'Verlaufskurven' : t === 'eingabe' ? 'Messung erfassen' : 'Tabelle'}
              </button>
            ))}
          </div>

          {tab === 'verlauf' && (
            <div className="grid2 gap12">
              <div className="card">
                <p className="card-title">Blutdruck (mmHg) — letzte 10 Tage</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={vitals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="datum" tick={{ fill: 'var(--text3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[60, 180]} tick={{ fill: 'var(--text3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <ReferenceLine y={140} stroke="rgba(248,113,113,0.3)" strokeDasharray="4" label={{ value: 'Grenze', fill: 'var(--text3)', fontSize: 9 }} />
                    <Line dataKey="sys" name="Systolisch" stroke="#f87171" strokeWidth={2} dot={false} />
                    <Line dataKey="dia" name="Diastolisch" stroke="#7c6fff" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="card">
                <p className="card-title">Puls (bpm) & Gewicht (kg)</p>
                <ResponsiveContainer width="100%" height={160}>
                  <LineChart data={vitals}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
                    <XAxis dataKey="datum" tick={{ fill: 'var(--text3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fill: 'var(--text3)', fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line dataKey="puls" name="Puls" stroke="#2dd4bf" strokeWidth={2} dot={false} />
                    <Line dataKey="gewicht" name="Gewicht" stroke="#fbbf24" strokeWidth={2} dot={false} yAxisId={1} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {tab === 'eingabe' && (
            <div className="card">
              <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 14 }}>Neue Messung — {selectedGuest.name}</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginBottom: 14 }}>
                {[
                  { label: 'Systolisch (mmHg)', key: 'sys', placeholder: '128' },
                  { label: 'Diastolisch (mmHg)', key: 'dia', placeholder: '82' },
                  { label: 'Puls (bpm)', key: 'puls', placeholder: '72' },
                  { label: 'Gewicht (kg)', key: 'gewicht', placeholder: '68.2' },
                  { label: 'Temperatur (°C)', key: 'temp', placeholder: '36.5' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
                    <input className="inp" type="number" placeholder={f.placeholder} value={newEntry[f.key]} onChange={e => setNewEntry(v => ({ ...v, [f.key]: e.target.value }))} />
                  </div>
                ))}
              </div>
              <div style={{ marginBottom: 12 }}>
                <label style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Bemerkung</label>
                <input className="inp" placeholder="Optional: Besonderheiten, Beschwerden..." style={{ maxWidth: 400 }} />
              </div>
              <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={saveVital}>
                {saved ? '✓ Gespeichert' : 'Messung speichern'}
              </button>
            </div>
          )}

          {tab === 'tabelle' && (
            <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="data-table">
                <thead><tr><th style={{ paddingLeft: 16 }}>Datum</th><th>Blutdruck</th><th>Puls</th><th>Gewicht</th><th>Temp.</th><th>Status</th></tr></thead>
                <tbody>
                  {[...vitals].reverse().map((v, i) => {
                    const st = getBPStatus(v.sys, v.dia)
                    return (
                      <tr key={i}>
                        <td style={{ paddingLeft: 16, fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{v.datum}.2026</td>
                        <td style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{v.sys}/{v.dia}</td>
                        <td style={{ fontSize: 12 }}>{v.puls} bpm</td>
                        <td style={{ fontSize: 12 }}>{v.gewicht} kg</td>
                        <td style={{ fontSize: 12, color: getTempStatus(v.temp) !== 'ok' ? 'var(--amber)' : 'var(--text2)' }}>{v.temp}°C</td>
                        <td><span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: st === 'ok' ? 'rgba(74,222,128,0.12)' : 'rgba(251,191,36,0.12)', color: st === 'ok' ? 'var(--green)' : 'var(--amber)' }}>{st === 'ok' ? 'Normal' : 'Beobachten'}</span></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
