import { useState } from 'react'

const STEPS = [
  { id: 1, title: 'Einrichtung', icon: '🏥', desc: 'Grunddaten Ihrer Einrichtung' },
  { id: 2, title: 'Team', icon: '👥', desc: 'Erste Mitarbeiter anlegen' },
  { id: 3, title: 'Erste Gäste', icon: '◎', desc: 'Gäste importieren oder anlegen' },
  { id: 4, title: 'Förderung', icon: '💶', desc: 'GKV-Förderantrag starten' },
  { id: 5, title: 'Fertig', icon: '✓', desc: 'Carevera ist bereit' },
]

export default function Onboarding({ onComplete }) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState({ name: '', ik: '', plaetze: '', adresse: '', traeger: 'Privat' })
  const [mitarbeiter, setMitarbeiter] = useState([{ name: '', email: '', rolle: 'pflege' }])

  const update = (k, v) => setData(d => ({ ...d, [k]: v }))

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'var(--font-main)' }}>
      <div style={{ width: '100%', maxWidth: 640 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 48, height: 48, background: 'var(--accent)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, fontFamily: 'var(--font-head)', color: 'white', margin: '0 auto 14px' }}>CV</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 22, fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>Willkommen bei Carevera</h1>
          <p style={{ fontSize: 13, color: 'var(--text3)' }}>Einrichtung in 5 Minuten einrichten</p>
        </div>

        {/* Step indicator */}
        <div style={{ display: 'flex', gap: 0, marginBottom: 32, background: 'var(--bg2)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
          {STEPS.map((s, i) => (
            <div key={s.id} style={{ flex: 1, padding: '10px 4px', textAlign: 'center', background: step === s.id ? 'rgba(124,111,255,0.12)' : 'transparent', borderRight: i < 4 ? '1px solid var(--border)' : 'none', transition: 'background 0.2s' }}>
              <div style={{ fontSize: 14, marginBottom: 2 }}>{step > s.id ? '✓' : s.icon}</div>
              <div style={{ fontSize: 10, color: step === s.id ? 'var(--accent2)' : step > s.id ? 'var(--green)' : 'var(--text3)', fontWeight: step === s.id ? 600 : 400 }}>{s.title}</div>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="card" style={{ padding: '28px 32px', marginBottom: 14 }}>
          {step === 1 && (
            <div className="fade-in">
              <h2 style={{ fontSize: 17, fontFamily: 'var(--font-head)', marginBottom: 4 }}>🏥 Einrichtungsdaten</h2>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Diese Daten werden für Abrechnung und Förderanträge verwendet.</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                {[
                  { label: 'Einrichtungsname', key: 'name', placeholder: 'Tagespflege Sonnenschein GmbH' },
                  { label: 'IK-Nummer', key: 'ik', placeholder: '123456789' },
                  { label: 'Anzahl Plätze', key: 'plaetze', placeholder: '12' },
                  { label: 'Adresse', key: 'adresse', placeholder: 'Hauptstr. 1, 47800 Krefeld' },
                ].map(f => (
                  <div key={f.key}>
                    <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{f.label}</label>
                    <input className="inp" placeholder={f.placeholder} value={data[f.key]} onChange={e => update(f.key, e.target.value)} />
                  </div>
                ))}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Trägerschaft</label>
                  <select className="inp" value={data.traeger} onChange={e => update('traeger', e.target.value)} style={{ appearance: 'none' }}>
                    {['Privat', 'Wohlfahrtsverband', 'Kommunal', 'Kirchlich'].map(o => <option key={o}>{o}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="fade-in">
              <h2 style={{ fontSize: 17, fontFamily: 'var(--font-head)', marginBottom: 4 }}>👥 Team einladen</h2>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Laden Sie Ihre Mitarbeiter ein — sie erhalten per E-Mail einen Zugangslink.</p>
              {mitarbeiter.map((m, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 140px', gap: 8, marginBottom: 8 }}>
                  <input className="inp" placeholder="Name" value={m.name} onChange={e => setMitarbeiter(arr => arr.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} />
                  <input className="inp" placeholder="E-Mail" type="email" value={m.email} onChange={e => setMitarbeiter(arr => arr.map((x, j) => j === i ? { ...x, email: e.target.value } : x))} />
                  <select className="inp" value={m.rolle} onChange={e => setMitarbeiter(arr => arr.map((x, j) => j === i ? { ...x, rolle: e.target.value } : x))} style={{ appearance: 'none' }}>
                    {[['leitung', 'Leitung'], ['pdl', 'PDL'], ['pflege', 'Pflege'], ['betreuung', 'Betreuung'], ['fahrer', 'Fahrer']].map(([v, l]) => <option key={v} value={v}>{l}</option>)}
                  </select>
                </div>
              ))}
              <button className="btn" style={{ fontSize: 12, marginTop: 4 }} onClick={() => setMitarbeiter(a => [...a, { name: '', email: '', rolle: 'pflege' }])}>+ Weiteren Mitarbeiter</button>
            </div>
          )}

          {step === 3 && (
            <div className="fade-in">
              <h2 style={{ fontSize: 17, fontFamily: 'var(--font-head)', marginBottom: 4 }}>◎ Erste Gäste</h2>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 20 }}>Wie möchten Sie Ihre Gäste einpflegen?</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { icon: '📋', title: 'Manuell anlegen', desc: 'Gäste einzeln in Carevera eingeben', action: 'Gäste anlegen' },
                  { icon: '📥', title: 'CSV-Import', desc: 'Aus Excel oder bestehender Software importieren', action: 'CSV hochladen' },
                  { icon: '⏭', title: 'Später', desc: 'Demo-Gäste nutzen und eigene Gäste später hinzufügen', action: 'Demo nutzen' },
                ].map((o, i) => (
                  <button key={i} style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, cursor: 'pointer', textAlign: 'left', transition: 'border-color 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                    onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                    onClick={() => setStep(4)}
                  >
                    <span style={{ fontSize: 24 }}>{o.icon}</span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)', marginBottom: 2 }}>{o.title}</p>
                      <p style={{ fontSize: 12, color: 'var(--text3)' }}>{o.desc}</p>
                    </div>
                    <span style={{ color: 'var(--accent2)', fontSize: 13 }}>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="fade-in">
              <h2 style={{ fontSize: 17, fontFamily: 'var(--font-head)', marginBottom: 4 }}>💶 GKV-Förderantrag</h2>
              <p style={{ fontSize: 13, color: 'var(--text3)', marginBottom: 16 }}>Ihre Einrichtung hat Anspruch auf bis zu 12.000€ Digitalisierungsförderung.</p>
              <div style={{ background: 'rgba(74,222,128,0.07)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 10, padding: '14px 16px', marginBottom: 16 }}>
                <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--green)', marginBottom: 4 }}>✓ Sie sind förderberechtigt</p>
                <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.6 }}>Carevera-Lizenzkosten (2.388€/Jahr) sind vollständig förderfähig. Die 12.000€ decken Ihre Software für über 5 Jahre — und Schulungen, Tablets und WLAN zusätzlich.</p>
              </div>
              <div className="flex gap8">
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setStep(5)}>Förderantrag jetzt starten</button>
                <button className="btn" onClick={() => setStep(5)}>Später</button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="fade-in" style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
              <h2 style={{ fontFamily: 'var(--font-head)', fontSize: 22, marginBottom: 8 }}>Alles bereit!</h2>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 380, margin: '0 auto 24px' }}>
                {data.name || 'Ihre Einrichtung'} ist eingerichtet. Carevera ist bereit für den ersten Einsatz. Alle Funktionen sind sofort verfügbar.
              </p>
              <button className="btn btn-primary" style={{ fontSize: 14, padding: '12px 32px' }} onClick={onComplete}>
                Zur Übersicht →
              </button>
            </div>
          )}
        </div>

        {/* Navigation */}
        {step < 5 && step !== 3 && (
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button className="btn" onClick={() => setStep(s => Math.max(1, s - 1))} style={{ opacity: step === 1 ? 0.4 : 1 }} disabled={step === 1}>← Zurück</button>
            <button className="btn btn-primary" onClick={() => setStep(s => Math.min(5, s + 1))}>
              {step === 4 ? 'Fertigstellen →' : 'Weiter →'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
