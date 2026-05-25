import { useState, useEffect, useRef } from 'react'
import { GUESTS } from '../data/mock'

const SEARCH_INDEX = [
  ...GUESTS.map(g => ({ type: 'gast', id: 'guests', label: g.name, sub: `PG ${g.pg} · ${g.diet} · ${g.days.join(', ')}`, icon: '◎' })),
  { type: 'seite', id: 'dashboard', label: 'Übersicht', sub: 'Tages-Dashboard', icon: '▦' },
  { type: 'seite', id: 'belegung', label: 'Belegungsplan', sub: 'Wochenauslastung', icon: '◫' },
  { type: 'seite', id: 'fahrtdienst', label: 'Fahrtdienst', sub: 'Routen & Abholungen', icon: '◈' },
  { type: 'seite', id: 'dokumentation', label: 'KI-Protokoll', sub: 'Pflegedokumentation', icon: '✦' },
  { type: 'seite', id: 'medikamente', label: 'Medikamente', sub: 'Vergabeliste & Vorräte', icon: '⊕' },
  { type: 'seite', id: 'rechnung', label: 'Rechnungen & GKV', sub: 'E-Rechnung, Abrechnung', icon: '◈' },
  { type: 'seite', id: 'foerderung', label: 'Förderantrag', sub: '§ 8 SGB XI, bis 12.000€', icon: '◎' },
  { type: 'seite', id: 'qualitaet', label: 'MDK & Qualität', sub: 'Qualitätsprüfung', icon: '◈' },
  { type: 'seite', id: 'statistik', label: 'Statistik', sub: 'Auslastung & Berichte', icon: '◇' },
  { type: 'seite', id: 'warteliste', label: 'Warteliste', sub: 'Interessenten & KI-Matching', icon: '◌' },
  { type: 'seite', id: 'vitaldaten', label: 'Vitaldaten', sub: 'Blutdruck, Puls, Gewicht', icon: '❤️' },
  { type: 'seite', id: 'vorfaelle', label: 'Vorfälle', sub: 'Sturz & Unfallprotokoll', icon: '⚠️' },
  { type: 'aktion', id: 'dokumentation', label: 'KI-Protokoll erstellen', sub: 'Neues Tagesprotokoll', icon: '✦' },
  { type: 'aktion', id: 'foerderung', label: 'Förderantrag starten', sub: 'GKV-Förderung beantragen', icon: '💶' },
  { type: 'aktion', id: 'aufgaben', label: 'Neue Aufgabe', sub: 'Aufgabe erfassen', icon: '◱' },
]

const TYPE_LABEL = { gast: 'Gast', seite: 'Seite', aktion: 'Aktion' }
const TYPE_COLOR = { gast: 'var(--teal)', seite: 'var(--accent2)', aktion: 'var(--green)' }

export default function GlobalSearch({ onNavigate }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(0)
  const inputRef = useRef(null)
  const ref = useRef(null)

  const results = query.length > 0
    ? SEARCH_INDEX.filter(item =>
        item.label.toLowerCase().includes(query.toLowerCase()) ||
        item.sub.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 8)
    : SEARCH_INDEX.filter(i => i.type === 'seite').slice(0, 6)

  useEffect(() => {
    const handler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const select = (item) => { onNavigate(item.id); setOpen(false); setQuery('') }

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50) }}
        className="btn"
        style={{ fontSize: 12, padding: '5px 14px', gap: 8, color: 'var(--text3)', minWidth: 180, justifyContent: 'space-between' }}
      >
        <span>🔍 Suchen…</span>
        <span style={{ fontSize: 10, background: 'var(--bg3)', padding: '1px 5px', borderRadius: 3, fontFamily: 'monospace' }}>⌘K</span>
      </button>

      {open && (
        <div className="fade-in" style={{ position: 'absolute', top: 42, left: '50%', transform: 'translateX(-50%)', width: 420, background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.5)', zIndex: 9999, overflow: 'hidden' }}>
          <div style={{ padding: '10px 14px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: 'var(--text3)', fontSize: 14 }}>🔍</span>
            <input
              ref={inputRef}
              value={query}
              onChange={e => { setQuery(e.target.value); setFocused(0) }}
              onKeyDown={e => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setFocused(f => Math.min(f + 1, results.length - 1)) }
                if (e.key === 'ArrowUp') { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)) }
                if (e.key === 'Enter' && results[focused]) select(results[focused])
              }}
              placeholder="Gäste, Seiten, Aktionen…"
              style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: 'var(--text)', fontSize: 14, fontFamily: 'var(--font-main)' }}
            />
            {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', color: 'var(--text3)', cursor: 'pointer', fontSize: 14 }}>✕</button>}
          </div>

          {!query && <p style={{ fontSize: 10, color: 'var(--text3)', padding: '6px 14px 2px', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>Schnellzugriff</p>}
          {query && results.length === 0 && (
            <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text3)', fontSize: 13 }}>Keine Ergebnisse für „{query}"</div>
          )}

          <div style={{ maxHeight: 320, overflowY: 'auto' }}>
            {results.map((item, i) => (
              <button key={i} onClick={() => select(item)} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '9px 14px', width: '100%', background: focused === i ? 'rgba(124,111,255,0.1)' : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < results.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}
                onMouseEnter={() => setFocused(i)}>
                <div style={{ width: 30, height: 30, borderRadius: 8, background: 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, flexShrink: 0 }}>{item.icon}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, color: 'var(--text)', fontWeight: 500, marginBottom: 1 }}>{item.label}</p>
                  <p style={{ fontSize: 11, color: 'var(--text3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.sub}</p>
                </div>
                <span style={{ fontSize: 9, fontWeight: 600, padding: '1px 6px', borderRadius: 3, background: 'var(--bg3)', color: TYPE_COLOR[item.type], textTransform: 'uppercase', letterSpacing: '0.08em', flexShrink: 0 }}>{TYPE_LABEL[item.type]}</span>
              </button>
            ))}
          </div>

          <div style={{ padding: '8px 14px', borderTop: '1px solid var(--border)', display: 'flex', gap: 12, fontSize: 10, color: 'var(--text3)' }}>
            <span>↑↓ Navigieren</span>
            <span>↵ Öffnen</span>
            <span>ESC Schließen</span>
          </div>
        </div>
      )}
    </div>
  )
}
