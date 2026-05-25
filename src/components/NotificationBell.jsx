import { useState } from 'react'

const NOTIFICATIONS = [
  { id: 1, type: 'warn', title: 'Medikament fast aufgebraucht', text: 'Bisoprolol für Hildegard Meier — nur noch 6 Tabletten', zeit: 'Vor 5 Min', gelesen: false },
  { id: 2, type: 'info', title: 'KI-Einschätzung bereit', text: 'Pflegegrad-Analyse für Erna Hoffmann abgeschlossen', zeit: 'Vor 18 Min', gelesen: false },
  { id: 3, type: 'success', title: 'Abrechnung eingereicht', text: 'April-Abrechnung erfolgreich an AOK übermittelt', zeit: 'Vor 1 Std', gelesen: false },
  { id: 4, type: 'info', title: 'Neuer Interessent', text: 'Klaus Westerberg — Erstgespräch für 27.05. bestätigt', zeit: 'Vor 2 Std', gelesen: true },
  { id: 5, type: 'warn', title: 'Fahrtdienst Änderung', text: 'Werner Schulz heute 30 Min später — Route angepasst', zeit: 'Gestern', gelesen: true },
]

const TYPE_STYLE = {
  warn: { color: 'var(--amber)', bg: 'rgba(251,191,36,0.1)', icon: '⚠' },
  info: { color: 'var(--accent2)', bg: 'rgba(124,111,255,0.1)', icon: 'ℹ' },
  success: { color: 'var(--green)', bg: 'rgba(74,222,128,0.1)', icon: '✓' },
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false)
  const [notes, setNotes] = useState(NOTIFICATIONS)

  const unread = notes.filter(n => !n.gelesen).length

  const markAll = () => setNotes(n => n.map(x => ({ ...x, gelesen: true })))
  const markOne = (id) => setNotes(n => n.map(x => x.id === id ? { ...x, gelesen: true } : x))

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(v => !v)}
        style={{ width: 36, height: 36, borderRadius: 9, background: open ? 'var(--bg3)' : 'transparent', border: '1px solid', borderColor: open ? 'var(--border2)' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'all 0.15s' }}
      >
        <span style={{ fontSize: 16 }}>🔔</span>
        {unread > 0 && (
          <span style={{ position: 'absolute', top: 5, right: 5, width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', border: '1.5px solid var(--bg)' }} />
        )}
      </button>

      {open && (
        <div className="fade-in" style={{ position: 'absolute', right: 0, top: 42, width: 340, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, boxShadow: '0 8px 32px rgba(0,0,0,0.4)', zIndex: 999, overflow: 'hidden' }}>
          <div style={{ padding: '12px 16px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>Benachrichtigungen {unread > 0 && <span style={{ fontSize: 11, background: 'var(--red)', color: 'white', borderRadius: 10, padding: '1px 6px', marginLeft: 4 }}>{unread}</span>}</span>
            {unread > 0 && <button onClick={markAll} style={{ fontSize: 11, color: 'var(--accent2)', background: 'none', border: 'none', cursor: 'pointer' }}>Alle lesen</button>}
          </div>
          <div style={{ maxHeight: 380, overflowY: 'auto' }}>
            {notes.map(n => {
              const s = TYPE_STYLE[n.type]
              return (
                <div key={n.id} onClick={() => markOne(n.id)} style={{ padding: '10px 14px', borderBottom: '1px solid rgba(255,255,255,0.04)', cursor: 'pointer', background: n.gelesen ? 'transparent' : 'rgba(124,111,255,0.03)', display: 'flex', gap: 10 }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}
                  onMouseLeave={e => e.currentTarget.style.background = n.gelesen ? 'transparent' : 'rgba(124,111,255,0.03)'}
                >
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 13 }}>{s.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
                      <span style={{ fontSize: 12, fontWeight: n.gelesen ? 400 : 600, color: 'var(--text)' }}>{n.title}</span>
                      {!n.gelesen && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', flexShrink: 0, marginTop: 4 }} />}
                    </div>
                    <p style={{ fontSize: 11, color: 'var(--text3)', lineHeight: 1.4, marginBottom: 2 }}>{n.text}</p>
                    <span style={{ fontSize: 10, color: 'var(--text3)' }}>{n.zeit}</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div style={{ padding: '10px 14px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button style={{ fontSize: 12, color: 'var(--accent2)', background: 'none', border: 'none', cursor: 'pointer' }}>Alle Benachrichtigungen anzeigen</button>
          </div>
        </div>
      )}
    </div>
  )
}
