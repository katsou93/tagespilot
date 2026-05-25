import { useState } from 'react'
import { GUESTS } from '../data/mock'

const MONTH_DAYS = Array.from({ length: 31 }, (_, i) => i + 1)
const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']

const TERMINE = [
  { id: 1, datum: 25, typ: 'arzt', titel: 'Hausarzt Dr. Werner', gastId: 1, uhrzeit: '10:00', ort: 'Praxis Krefeld' },
  { id: 2, datum: 26, typ: 'aktivitaet', titel: 'Musiktherapie Frau König', gastId: null, uhrzeit: '14:00', ort: 'Einrichtung' },
  { id: 3, datum: 27, typ: 'besuch', titel: 'Familie Braun', gastId: 4, uhrzeit: '15:00', ort: 'Einrichtung' },
  { id: 4, datum: 28, typ: 'pflege', titel: 'MDK-Begutachtung Gerhard H.', gastId: null, uhrzeit: '09:30', ort: 'Einrichtung' },
  { id: 5, datum: 29, typ: 'arzt', titel: 'Diabetologe Dr. Schmidt', gastId: 3, uhrzeit: '11:15', ort: 'Klinik' },
  { id: 6, datum: 30, typ: 'intern', titel: 'Teambesprechung Pflege', gastId: null, uhrzeit: '16:00', ort: 'Besprechungsraum' },
  { id: 7, datum: 25, typ: 'besuch', titel: 'Tochter Petra Meier', gastId: 1, uhrzeit: '14:30', ort: 'Einrichtung' },
]

const TYP_STYLE = {
  arzt:       { color: '#f87171', bg: 'rgba(248,113,113,0.12)', icon: '🏥', label: 'Arzt' },
  aktivitaet: { color: '#7c6fff', bg: 'rgba(124,111,255,0.12)', icon: '🎭', label: 'Aktivität' },
  besuch:     { color: '#2dd4bf', bg: 'rgba(45,212,191,0.12)', icon: '👥', label: 'Besuch' },
  pflege:     { color: '#fbbf24', bg: 'rgba(251,191,36,0.12)', icon: '📋', label: 'Pflege' },
  intern:     { color: '#4ade80', bg: 'rgba(74,222,128,0.12)', icon: '🏢', label: 'Intern' },
}

export default function Kalender() {
  const [selectedDay, setSelectedDay] = useState(25)
  const [view, setView] = useState('monat')

  const dayTermine = (day) => TERMINE.filter(t => t.datum === day)
  const selectedTermine = TERMINE.filter(t => t.datum === selectedDay)
  const guestName = id => id ? GUESTS.find(g => g.id === id)?.name || '' : ''

  // First day of May 2026 is Friday (offset 4)
  const firstDayOffset = 4

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Kalender</h1>
          <p className="page-sub">Mai 2026 · Termine · Arztbesuche · Aktivitäten</p>
        </div>
        <div className="flex gap8">
          {['monat', 'woche', 'liste'].map(v => (
            <button key={v} className="btn" style={{ fontSize: 12, background: view === v ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: view === v ? 'var(--accent2)' : 'var(--text2)', borderColor: view === v ? 'var(--accent)' : 'var(--border)' }} onClick={() => setView(v)}>
              {v === 'monat' ? 'Monat' : v === 'woche' ? 'Woche' : 'Liste'}
            </button>
          ))}
          <button className="btn btn-primary">+ Termin</button>
        </div>
      </div>

      <div className="grid2 gap16" style={{ gridTemplateColumns: '1fr 300px' }}>
        {/* Calendar grid */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button className="btn" style={{ fontSize: 12, padding: '4px 10px' }}>‹ Apr</button>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text)', fontFamily: 'var(--font-head)' }}>Mai 2026</span>
            <button className="btn" style={{ fontSize: 12, padding: '4px 10px' }}>Jun ›</button>
          </div>

          {/* Weekday headers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--border)' }}>
            {WEEKDAYS.map(d => (
              <div key={d} style={{ padding: '8px 4px', textAlign: 'center', fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{d}</div>
            ))}
          </div>

          {/* Day grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
            {/* Empty cells for offset */}
            {Array.from({ length: firstDayOffset }).map((_, i) => (
              <div key={`empty-${i}`} style={{ minHeight: 70, borderRight: '1px solid var(--border)', borderBottom: '1px solid var(--border)', background: 'rgba(255,255,255,0.01)' }} />
            ))}
            {MONTH_DAYS.map((day, i) => {
              const termine = dayTermine(day)
              const isSelected = selectedDay === day
              const isToday = day === 25
              const col = (i + firstDayOffset) % 7
              const isWeekend = col === 5 || col === 6
              return (
                <div key={day} onClick={() => setSelectedDay(day)} style={{ minHeight: 70, padding: '6px', borderRight: col < 6 ? '1px solid var(--border)' : 'none', borderBottom: '1px solid var(--border)', background: isSelected ? 'rgba(124,111,255,0.08)' : isWeekend ? 'rgba(255,255,255,0.01)' : 'transparent', cursor: 'pointer', position: 'relative', transition: 'background 0.15s' }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: isToday ? 'var(--accent)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 3 }}>
                    <span style={{ fontSize: 12, fontWeight: isToday || isSelected ? 600 : 400, color: isToday ? 'white' : isSelected ? 'var(--accent2)' : isWeekend ? 'var(--text3)' : 'var(--text2)' }}>{day}</span>
                  </div>
                  {termine.slice(0, 2).map((t, ti) => {
                    const ts = TYP_STYLE[t.typ]
                    return (
                      <div key={ti} style={{ fontSize: 9, padding: '1px 4px', borderRadius: 2, background: ts.bg, color: ts.color, marginBottom: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {t.uhrzeit} {t.titel}
                      </div>
                    )
                  })}
                  {termine.length > 2 && <div style={{ fontSize: 9, color: 'var(--text3)' }}>+{termine.length - 2} mehr</div>}
                </div>
              )
            })}
          </div>
        </div>

        {/* Day detail */}
        <div>
          <div className="card" style={{ marginBottom: 10 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text)', marginBottom: selectedTermine.length ? 12 : 0 }}>
              {selectedDay}. Mai 2026 {selectedDay === 25 ? '— Heute' : ''}
            </p>
            {selectedTermine.length === 0 ? (
              <p style={{ fontSize: 12, color: 'var(--text3)' }}>Keine Termine</p>
            ) : selectedTermine.map(t => {
              const ts = TYP_STYLE[t.typ]
              return (
                <div key={t.id} style={{ display: 'flex', gap: 10, padding: '8px 10px', background: ts.bg, borderRadius: 8, marginBottom: 6 }}>
                  <span style={{ fontSize: 16 }}>{ts.icon}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{t.titel}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)' }}>{t.uhrzeit} · {t.ort}</p>
                    {t.gastId && <p style={{ fontSize: 11, color: ts.color }}>👤 {guestName(t.gastId)}</p>}
                  </div>
                </div>
              )
            })}
          </div>

          {/* Legend */}
          <div className="card">
            <p style={{ fontSize: 10, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>Termintypen</p>
            {Object.entries(TYP_STYLE).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 5, fontSize: 11, color: 'var(--text2)' }}>
                <div style={{ width: 10, height: 10, borderRadius: 2, background: v.bg, border: `1px solid ${v.color}`, flexShrink: 0 }} />
                {v.icon} {v.label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
