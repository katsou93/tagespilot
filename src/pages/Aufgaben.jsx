import { useState } from 'react'

const KATEGORIEN = {
  pflege: { label: 'Pflege', color: '#7c6fff', bg: 'rgba(124,111,255,0.12)' },
  verwaltung: { label: 'Verwaltung', color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)' },
  fahrtdienst: { label: 'Fahrtdienst', color: '#fbbf24', bg: 'rgba(251,191,36,0.12)' },
  qualitaet: { label: 'Qualität', color: '#4ade80', bg: 'rgba(74,222,128,0.12)' },
  dringend: { label: 'Dringend', color: '#f87171', bg: 'rgba(248,113,113,0.12)' },
}

const INITIAL_TASKS = [
  { id: 1, titel: 'SIS-Einschätzung Erna Hoffmann aktualisieren', kat: 'pflege', faellig: 'Heute', person: 'R. Ahmadi', erledigt: false, prio: 'hoch' },
  { id: 2, titel: 'Bisoprolol Vorrat auffüllen — nur noch 6 Tabletten', kat: 'dringend', faellig: 'Heute', person: 'M. Schulze', erledigt: false, prio: 'hoch' },
  { id: 3, titel: 'April-Abrechnung bei AOK einreichen', kat: 'verwaltung', faellig: 'Morgen', person: 'C. Berg', erledigt: false, prio: 'mittel' },
  { id: 4, titel: 'Förderantrag SGB XI vorbereiten', kat: 'verwaltung', faellig: '28.05.2026', person: 'C. Berg', erledigt: false, prio: 'mittel' },
  { id: 5, titel: 'Fahrzeugreinigung Bus 1', kat: 'fahrtdienst', faellig: 'Freitag', person: 'T. Kranz', erledigt: false, prio: 'niedrig' },
  { id: 6, titel: 'MDK-Besuch vorbereiten — Dokumentation prüfen', kat: 'qualitaet', faellig: '01.06.2026', person: 'R. Ahmadi', erledigt: false, prio: 'hoch' },
  { id: 7, titel: 'Gerhard Hoffmann (Warteliste) zurückrufen', kat: 'verwaltung', faellig: 'Heute', person: 'C. Berg', erledigt: true, prio: 'mittel' },
  { id: 8, titel: 'Dienstplan Juni erstellen', kat: 'verwaltung', faellig: '29.05.2026', person: 'C. Berg', erledigt: false, prio: 'mittel' },
  { id: 9, titel: 'Stuhlgymnastik-Material erneuern', kat: 'pflege', faellig: 'Nächste Woche', person: 'S. Müller', erledigt: false, prio: 'niedrig' },
  { id: 10, titel: 'Biographiebogen Werner Schulz ergänzen', kat: 'pflege', faellig: '30.05.2026', person: 'M. Schulze', erledigt: true, prio: 'niedrig' },
]

const PRIO_BADGE = {
  hoch: { color: '#f87171', bg: 'rgba(248,113,113,0.1)', label: 'Hoch' },
  mittel: { color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', label: 'Mittel' },
  niedrig: { color: '#4ade80', bg: 'rgba(74,222,128,0.1)', label: 'Niedrig' },
}

export default function Aufgaben() {
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [filter, setFilter] = useState('alle')
  const [newTask, setNewTask] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [generating, setGenerating] = useState(false)
  const [aiTasks, setAiTasks] = useState([])

  const toggle = (id) => setTasks(t => t.map(x => x.id === id ? { ...x, erledigt: !x.erledigt } : x))

  const filtered = tasks.filter(t => {
    if (filter === 'offen') return !t.erledigt
    if (filter === 'erledigt') return t.erledigt
    if (filter === 'dringend') return t.prio === 'hoch' && !t.erledigt
    return true
  }).sort((a, b) => {
    if (a.erledigt !== b.erledigt) return a.erledigt ? 1 : -1
    const pOrder = { hoch: 0, mittel: 1, niedrig: 2 }
    return pOrder[a.prio] - pOrder[b.prio]
  })

  const generateAITasks = async () => {
    setGenerating(true)
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 400,
          messages: [{
            role: 'user',
            content: 'Erstelle 3 konkrete Aufgaben für eine Tagespflegeeinrichtung die heute oder diese Woche wichtig wären. Fokus auf: Qualitätsmanagement, Dokumentation, Pflegeplanung. Antworte NUR als JSON-Array: [{"titel":"...","kat":"pflege|verwaltung|qualitaet","faellig":"Heute|Diese Woche|Freitag","prio":"hoch|mittel"}]'
          }]
        })
      })
      const data = await resp.json()
      const text = data.content?.[0]?.text || '[]'
      const clean = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(clean)
      const newTasks = parsed.map((t, i) => ({ ...t, id: Date.now() + i, person: 'KI-Vorschlag', erledigt: false }))
      setAiTasks(newTasks)
    } catch {
      setAiTasks([
        { id: Date.now(), titel: 'Risikoskalen für alle Gäste aktualisieren (Sturz, Dekubitus)', kat: 'qualitaet', faellig: 'Diese Woche', person: 'KI-Vorschlag', erledigt: false, prio: 'hoch' },
        { id: Date.now() + 1, titel: 'Verlaufsdokumentation der letzten 7 Tage auf Vollständigkeit prüfen', kat: 'pflege', faellig: 'Freitag', person: 'KI-Vorschlag', erledigt: false, prio: 'mittel' },
      ])
    }
    setGenerating(false)
  }

  const acceptAiTask = (task) => {
    setTasks(t => [...t, task])
    setAiTasks(a => a.filter(x => x.id !== task.id))
  }

  const offen = tasks.filter(t => !t.erledigt).length
  const heute = tasks.filter(t => !t.erledigt && t.faellig === 'Heute').length
  const erledigt = tasks.filter(t => t.erledigt).length

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Aufgaben & Todos</h1>
          <p className="page-sub">{offen} offen · {heute} heute fällig · {erledigt} erledigt</p>
        </div>
        <div className="flex gap8">
          <button className="btn" onClick={generateAITasks} disabled={generating}>
            {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /></> : '✦ KI-Vorschläge'}
          </button>
          <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}>+ Neue Aufgabe</button>
        </div>
      </div>

      <div className="grid4 mb20">
        {[
          { label: 'Offen', val: offen, color: 'var(--amber)' },
          { label: 'Heute fällig', val: heute, color: 'var(--red)' },
          { label: 'Hohe Priorität', val: tasks.filter(t => t.prio === 'hoch' && !t.erledigt).length, color: 'var(--accent2)' },
          { label: 'Erledigt (gesamt)', val: erledigt, color: 'var(--green)' },
        ].map((k, i) => (
          <div key={i} className="stat-card">
            <p className="stat-label">{k.label}</p>
            <p className="stat-value" style={{ color: k.color }}>{k.val}</p>
          </div>
        ))}
      </div>

      {/* AI suggestions */}
      {aiTasks.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontSize: 11, fontWeight: 600, color: 'var(--accent2)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>✦ KI-Vorschläge</p>
          {aiTasks.map(t => (
            <div key={t.id} className="card fade-in" style={{ marginBottom: 6, padding: '10px 14px', borderColor: 'rgba(124,111,255,0.3)', display: 'flex', gap: 10, alignItems: 'center' }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, color: 'var(--text)', marginBottom: 3 }}>{t.titel}</p>
                <p style={{ fontSize: 11, color: 'var(--text3)' }}>{t.faellig} · {KATEGORIEN[t.kat]?.label}</p>
              </div>
              <div className="flex gap6" style={{ gap: 6 }}>
                <button className="btn btn-primary" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => acceptAiTask(t)}>Übernehmen</button>
                <button className="btn" style={{ fontSize: 11, padding: '4px 10px' }} onClick={() => setAiTasks(a => a.filter(x => x.id !== t.id))}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New task */}
      {showAdd && (
        <div className="card fade-in" style={{ marginBottom: 14, padding: '14px 16px' }}>
          <div className="flex gap8">
            <input className="inp" placeholder="Aufgabe beschreiben…" value={newTask} onChange={e => setNewTask(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter' && newTask.trim()) { setTasks(t => [...t, { id: Date.now(), titel: newTask, kat: 'verwaltung', faellig: 'Heute', person: 'C. Berg', erledigt: false, prio: 'mittel' }]); setNewTask(''); setShowAdd(false) } }}
              autoFocus style={{ flex: 1 }} />
            <button className="btn btn-primary" style={{ fontSize: 12 }} onClick={() => { if (newTask.trim()) { setTasks(t => [...t, { id: Date.now(), titel: newTask, kat: 'verwaltung', faellig: 'Heute', person: 'C. Berg', erledigt: false, prio: 'mittel' }]); setNewTask(''); setShowAdd(false) } }}>Hinzufügen</button>
          </div>
        </div>
      )}

      {/* Filter */}
      <div className="flex gap6 mb14" style={{ gap: 6, marginBottom: 14 }}>
        {[['alle', 'Alle'], ['offen', 'Offen'], ['dringend', '🔴 Dringend'], ['erledigt', 'Erledigt']].map(([v, l]) => (
          <button key={v} className="btn" style={{ fontSize: 12, padding: '6px 12px', background: filter === v ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: filter === v ? 'var(--accent2)' : 'var(--text2)', borderColor: filter === v ? 'var(--accent)' : 'var(--border)' }} onClick={() => setFilter(v)}>{l}</button>
        ))}
        <span style={{ fontSize: 12, color: 'var(--text3)', padding: '6px 0', marginLeft: 8 }}>{filtered.length} Aufgaben</span>
      </div>

      {/* Task list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {filtered.map(t => {
          const kat = KATEGORIEN[t.kat]
          const prio = PRIO_BADGE[t.prio]
          return (
            <div key={t.id} className="card" style={{ padding: '10px 14px', display: 'flex', gap: 12, alignItems: 'flex-start', opacity: t.erledigt ? 0.5 : 1, transition: 'opacity 0.2s', cursor: 'pointer' }}
              onClick={() => toggle(t.id)}>
              <div style={{ width: 20, height: 20, borderRadius: 5, border: `1.5px solid ${t.erledigt ? 'var(--green)' : 'var(--border2)'}`, background: t.erledigt ? 'rgba(74,222,128,0.15)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1, fontSize: 11, color: 'var(--green)', transition: 'all 0.15s' }}>
                {t.erledigt ? '✓' : ''}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, color: t.erledigt ? 'var(--text3)' : 'var(--text)', textDecoration: t.erledigt ? 'line-through' : 'none', marginBottom: 4, lineHeight: 1.4 }}>{t.titel}</p>
                <div className="flex gap6" style={{ gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
                  <span style={{ fontSize: 10, padding: '1px 7px', borderRadius: 3, background: kat.bg, color: kat.color, fontWeight: 500 }}>{kat.label}</span>
                  <span style={{ fontSize: 11, color: t.faellig === 'Heute' ? 'var(--red)' : 'var(--text3)' }}>📅 {t.faellig}</span>
                  <span style={{ fontSize: 11, color: 'var(--text3)' }}>👤 {t.person}</span>
                </div>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 8px', borderRadius: 4, background: prio.bg, color: prio.color, flexShrink: 0 }}>{prio.label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
