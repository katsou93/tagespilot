import { useState } from 'react'
import { GUESTS, PG_TAGESSAETZE } from '../data/mock'

const HOCHSTUFUNGS_DATEN = [
  { gastId: 1, aktuellerPG: 3, empfehlung: 4, begruendung: 'Zunehmende kognitive Einschränkungen seit Februar, erhöhter Betreuungsaufwand morgens dokumentiert. 3 SIS-Bereiche zeigen Verschlechterung.', potenziel: 744, wahrscheinlichkeit: 78 },
  { gastId: 3, aktuellerPG: 4, empfehlung: 5, begruendung: 'Schluckstörungen seit April, Vollunterstützung bei allen Grundpflegehandlungen notwendig. MDK-Bewertung empfehlenswert.', potenziel: 1056, wahrscheinlichkeit: 65 },
]

const SETTINGS_FIELDS = [
  { label: 'Einrichtungsname', value: 'Tagespflege Sonnenschein GmbH', type: 'text' },
  { label: 'IK-Nummer', value: '123456789', type: 'text' },
  { label: 'Träger', value: 'Privat', type: 'select', options: ['Privat', 'Wohlfahrtsverband', 'Kommunal', 'Kirchlich'] },
  { label: 'Plätze gesamt', value: '12', type: 'number' },
  { label: 'Adresse', value: 'Hauptstr. 5, 47800 Krefeld', type: 'text' },
  { label: 'Ansprechpartner', value: 'Claudia Berg', type: 'text' },
  { label: 'E-Mail', value: 'info@tagespflege-sonnenschein.de', type: 'email' },
  { label: 'Telefon', value: '02151-123456', type: 'tel' },
]

export default function Einstellungen() {
  const [tab, setTab] = useState('hochstufung')
  const [analysing, setAnalysing] = useState(false)
  const [analysed, setAnalysed] = useState(true)
  const [saved, setSaved] = useState(false)

  const gesamtPotenzial = HOCHSTUFUNGS_DATEN.reduce((s, h) => s + h.potenziel, 0)

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">Einstellungen & KI-Analyse</h1>
          <p className="page-sub">Einrichtungsdaten · Pflegegrad-Optimierung · Systemeinstellungen</p>
        </div>
      </div>

      <div className="flex gap8 mb16">
        {['hochstufung', 'einrichtung', 'integrationen'].map(t => (
          <button key={t} className="btn" style={{ fontSize: 12, background: tab === t ? 'rgba(124,111,255,0.12)' : 'var(--bg3)', color: tab === t ? 'var(--accent2)' : 'var(--text2)', borderColor: tab === t ? 'var(--accent)' : 'var(--border)' }} onClick={() => setTab(t)}>
            {t === 'hochstufung' ? '✦ KI-Pflegegrad-Analyse' : t === 'einrichtung' ? 'Einrichtung' : 'Integrationen'}
          </button>
        ))}
      </div>

      {tab === 'hochstufung' && (
        <div>
          <div className="card" style={{ marginBottom: 16, background: 'rgba(124,111,255,0.04)', borderColor: 'rgba(124,111,255,0.2)' }}>
            <div className="flex-between mb8">
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--accent2)', marginBottom: 3 }}>✦ KI-Pflegegrad-Hochstufungsanalyse</p>
                <p style={{ fontSize: 12, color: 'var(--text3)' }}>Die KI analysiert SIS-Verlaufsdaten, Dokumentationseinträge und Risikoskalen — und erkennt Gäste mit Anspruch auf einen höheren Pflegegrad.</p>
              </div>
              <button className="btn btn-primary" style={{ fontSize: 12, flexShrink: 0 }} onClick={() => { setAnalysing(true); setTimeout(() => { setAnalysing(false); setAnalysed(true) }, 2000) }} disabled={analysing}>
                {analysing ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /></> : '↻ Neu analysieren'}
              </button>
            </div>
            {analysed && (
              <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.15)', borderRadius: 8, padding: '10px 12px', display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ color: 'var(--green)' }}>✓</span>
                <p style={{ fontSize: 12, color: 'var(--text2)' }}>
                  <strong style={{ color: 'var(--text)' }}>2 Gäste identifiziert</strong> mit möglichem Anspruch auf Hochstufung. Jährliches Mehreinnahmen-Potenzial: <strong style={{ color: 'var(--green)' }}>{(gesamtPotenzial * 12).toLocaleString('de')}€</strong>
                </p>
              </div>
            )}
          </div>

          {analysed && HOCHSTUFUNGS_DATEN.map(h => {
            const guest = GUESTS.find(g => g.id === h.gastId)
            const tagessatzNeu = PG_TAGESSAETZE[h.empfehlung]
            const tagessatzAlt = PG_TAGESSAETZE[h.aktuellerPG]
            return (
              <div key={h.gastId} className="card fade-in" style={{ marginBottom: 10 }}>
                <div className="flex-between mb10">
                  <div className="flex gap10" style={{ alignItems: 'center' }}>
                    <div className={`avatar ${guest.color}`} style={{ width: 36, height: 36, fontSize: 12 }}>{guest.initials}</div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: 'var(--text)' }}>{guest.name}</p>
                      <div className="flex gap6" style={{ gap: 6, alignItems: 'center' }}>
                        <span className={`tag tag-${h.aktuellerPG - 1}`}>PG {h.aktuellerPG}</span>
                        <span style={{ color: 'var(--text3)', fontSize: 12 }}>→</span>
                        <span className={`tag tag-${h.empfehlung - 1}`} style={{ fontWeight: 700 }}>PG {h.empfehlung} empfohlen</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 2 }}>Monatliches Mehreinnahmen-Potenzial</p>
                    <p style={{ fontSize: 18, fontWeight: 600, color: 'var(--green)', fontFamily: 'var(--font-head)' }}>+{h.potenziel.toLocaleString('de')}€</p>
                    <p style={{ fontSize: 10, color: 'var(--text3)' }}>({tagessatzAlt}€ → {tagessatzNeu}€ Tagessatz, Ø {guest.days.length * 4} Tage)</p>
                  </div>
                </div>
                <div style={{ background: 'var(--bg3)', borderRadius: 8, padding: '10px 12px', marginBottom: 10 }}>
                  <p style={{ fontSize: 11, fontWeight: 500, color: 'var(--amber)', marginBottom: 4 }}>KI-Begründung ({h.wahrscheinlichkeit}% Wahrscheinlichkeit)</p>
                  <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>{h.begruendung}</p>
                </div>
                <div className="flex gap8">
                  <button className="btn btn-primary" style={{ fontSize: 12 }}>MDK-Antrag vorbereiten</button>
                  <button className="btn" style={{ fontSize: 12 }}>Begutachtung anfragen</button>
                  <button className="btn" style={{ fontSize: 12 }}>Ignorieren</button>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {tab === 'einrichtung' && (
        <div className="card">
          <h3 style={{ fontSize: 15, fontFamily: 'var(--font-head)', fontWeight: 500, marginBottom: 16 }}>Einrichtungsdaten</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {SETTINGS_FIELDS.map(f => (
              <div key={f.label}>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
                {f.type === 'select' ? (
                  <select className="inp" defaultValue={f.value} style={{ appearance: 'none' }}>
                    {f.options.map(o => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input className="inp" type={f.type} defaultValue={f.value} />
                )}
              </div>
            ))}
          </div>
          <button className="btn btn-primary" style={{ fontSize: 13 }} onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000) }}>
            {saved ? '✓ Gespeichert' : 'Speichern'}
          </button>
        </div>
      )}

      {tab === 'integrationen' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { name: 'DATEV Lohnschnittstelle', status: 'aktiv', desc: 'Monatliche Übergabe Lohndaten an DATEV', icon: '🔗' },
            { name: 'GKV-Abrechnung §302', status: 'aktiv', desc: 'Elektronische Abrechnung mit Pflegekassen', icon: '🏥' },
            { name: 'Telematikinfrastruktur (TI)', status: 'ausstehend', desc: 'Anbindung an TI — Einrichtung erforderlich', icon: '📡' },
            { name: 'E-Mail (SMTP)', status: 'aktiv', desc: 'Automatischer Versand von Rechnungen und Updates', icon: '📧' },
            { name: 'WhatsApp Business API', status: 'deaktiviert', desc: 'Angehörigen-Updates direkt per WhatsApp', icon: '💬' },
          ].map(i => (
            <div key={i.name} className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 16px' }}>
              <span style={{ fontSize: 22, flexShrink: 0 }}>{i.icon}</span>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{i.name}</p>
                <p style={{ fontSize: 11, color: 'var(--text3)' }}>{i.desc}</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 500, padding: '2px 10px', borderRadius: 20, flexShrink: 0, background: i.status === 'aktiv' ? 'rgba(74,222,128,0.12)' : i.status === 'ausstehend' ? 'rgba(251,191,36,0.12)' : 'rgba(255,255,255,0.06)', color: i.status === 'aktiv' ? 'var(--green)' : i.status === 'ausstehend' ? 'var(--amber)' : 'var(--text3)' }}>
                {i.status === 'aktiv' ? '✓ Aktiv' : i.status === 'ausstehend' ? 'Einrichten' : 'Deaktiviert'}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
