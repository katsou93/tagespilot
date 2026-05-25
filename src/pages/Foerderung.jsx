import { useState } from 'react'

const FOERDER_BEREICHE = [
  { id: 'software', label: 'Software-Lizenzen', desc: 'Carevera Jahreslizenz', betrag: 2388, foerderbar: true },
  { id: 'tablets', label: 'Tablets für Pflegekräfte', desc: '3× iPad (Doku & Fahrtdienst)', betrag: 2400, foerderbar: true },
  { id: 'netz', label: 'WLAN-Aufrüstung', desc: 'Netzwerk für alle Räume', betrag: 1800, foerderbar: true },
  { id: 'schulung', label: 'Mitarbeiterschulungen', desc: 'Einweisung & Fortbildungen', betrag: 1200, foerderbar: true },
  { id: 'drucker', label: 'Drucker & Scanner', desc: 'Für Dokumentenmanagement', betrag: 800, foerderbar: false },
]

const PFLEGEKASSEN = [
  'AOK Rheinland/Hamburg', 'TK – Techniker Krankenkasse', 'Barmer', 'DAK-Gesundheit',
  'KKH', 'IKK classic', 'BKK', 'Knappschaft',
]

const STEPS = ['Voraussetzungen', 'Investitionen', 'Antrag ausfüllen', 'Einreichen']

export default function Foerderung() {
  const [step, setStep] = useState(0)
  const [selected, setSelected] = useState({ software: true, tablets: true, netz: true, schulung: true })
  const [kasse, setKasse] = useState('AOK Rheinland/Hamburg')
  const [generating, setGenerating] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [antragText, setAntragText] = useState('')

  const selectedItems = FOERDER_BEREICHE.filter(b => selected[b.id] && b.foerderbar)
  const gesamtInvest = selectedItems.reduce((s, b) => s + b.betrag, 0)
  const foerderung = Math.min(gesamtInvest * 0.4, 12000)
  const eigenanteil = gesamtInvest - foerderung

  const generateAntrag = async () => {
    setGenerating(true)
    try {
      const resp = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 600,
          messages: [{
            role: 'user',
            content: `Schreibe einen kurzen, professionellen Antrag auf Digitalisierungsförderung nach § 8 Abs. 8 SGB XI für eine Tagespflegeeinrichtung. Angestrebte Maßnahmen: ${selectedItems.map(i => i.label).join(', ')}. Gesamtinvestition: ${gesamtInvest}€. Beantragte Förderung (40%): ${foerderung}€. Adressat: ${kasse}. 3-4 Absätze, förmlich aber verständlich.`
          }]
        })
      })
      const data = await resp.json()
      setAntragText(data.content?.[0]?.text || '')
      setGenerated(true)
    } catch {
      setAntragText(`Sehr geehrte Damen und Herren,\n\nhiermit beantragen wir gemäß § 8 Abs. 8 SGB XI die Förderung von Digitalisierungsmaßnahmen in Höhe von ${foerderung.toLocaleString('de')}€.\n\nDie geplanten Investitionen in Höhe von insgesamt ${gesamtInvest.toLocaleString('de')}€ umfassen: ${selectedItems.map(i => i.label).join(', ')}.\n\nMit freundlichen Grüßen`)
      setGenerated(true)
    }
    setGenerating(false)
  }

  return (
    <div className="fade-in">
      <div className="flex-between mb24">
        <div>
          <h1 className="page-title">GKV-Förderantrag</h1>
          <p className="page-sub">§ 8 Abs. 8 SGB XI · Bis 12.000€ · Gültig bis 2030</p>
        </div>
        <div style={{ background: 'rgba(74,222,128,0.08)', border: '1px solid rgba(74,222,128,0.2)', borderRadius: 8, padding: '8px 16px', textAlign: 'right' }}>
          <p style={{ fontSize: 11, color: 'var(--green)', fontWeight: 500 }}>Mögliche Förderung</p>
          <p style={{ fontSize: 22, fontWeight: 600, color: 'var(--green)', fontFamily: 'var(--font-head)' }}>{foerderung.toLocaleString('de')}€</p>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 24, background: 'var(--bg2)', borderRadius: 10, overflow: 'hidden', border: '1px solid var(--border)' }}>
        {STEPS.map((s, i) => (
          <button key={s} onClick={() => setStep(i)} style={{ flex: 1, padding: '12px 8px', background: step === i ? 'rgba(124,111,255,0.15)' : 'transparent', borderRight: i < 3 ? '1px solid var(--border)' : 'none', border: 'none', cursor: 'pointer', transition: 'background 0.15s' }}>
            <div style={{ fontSize: 11, color: step === i ? 'var(--accent2)' : step > i ? 'var(--green)' : 'var(--text3)', fontWeight: 500 }}>
              {step > i ? '✓ ' : `${i + 1}. `}{s}
            </div>
          </button>
        ))}
      </div>

      {step === 0 && (
        <div>
          <div className="card hero" style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 15, marginBottom: 10 }}>Förderfähigkeits-Check</h3>
            {[
              { text: 'Einrichtung nach § 72 SGB XI zugelassen', ok: true },
              { text: 'Noch keine Förderung nach § 8 Abs. 8 SGB XI beantragt', ok: true },
              { text: 'Gültige Versorgungsverträge mit Pflegekassen', ok: true },
              { text: 'Investitionen dienen der Digitalisierung der Pflege', ok: true },
              { text: 'Förderzeitraum noch aktiv (bis Ende 2030)', ok: true },
            ].map((c, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '7px 0', borderBottom: i < 4 ? '1px solid var(--border)' : 'none' }}>
                <span style={{ color: 'var(--green)', fontSize: 14 }}>✓</span>
                <span style={{ fontSize: 13, color: 'var(--text2)' }}>{c.text}</span>
              </div>
            ))}
          </div>
          <div className="card" style={{ marginBottom: 12, background: 'rgba(124,111,255,0.04)', borderColor: 'rgba(124,111,255,0.2)' }}>
            <p style={{ fontSize: 12, color: 'var(--text2)', lineHeight: 1.7 }}>
              <strong style={{ color: 'var(--accent2)' }}>So funktioniert die Förderung:</strong> Pflegeeinrichtungen erhalten 40% ihrer förderfähigen Digitalisierungsausgaben zurück, maximal 12.000€. Der Antrag wird bei der zuständigen Pflegekasse gestellt. Die Maßnahmen können <strong>rückwirkend ab 2019</strong> beantragt werden.
            </p>
          </div>
          <button className="btn btn-primary" onClick={() => setStep(1)}>Weiter → Investitionen wählen</button>
        </div>
      )}

      {step === 1 && (
        <div>
          <p style={{ fontSize: 13, color: 'var(--text2)', marginBottom: 16 }}>Wählen Sie die förderfähigen Maßnahmen:</p>
          {FOERDER_BEREICHE.map(b => (
            <div key={b.id} className="card" style={{ marginBottom: 8, padding: '12px 16px', cursor: 'pointer', borderColor: selected[b.id] && b.foerderbar ? 'var(--accent)' : !b.foerderbar ? 'var(--border)' : 'var(--border)', opacity: !b.foerderbar ? 0.5 : 1 }}
              onClick={() => b.foerderbar && setSelected(s => ({ ...s, [b.id]: !s[b.id] }))}>
              <div className="flex-between">
                <div className="flex gap12" style={{ alignItems: 'center' }}>
                  <div style={{ width: 18, height: 18, borderRadius: 4, border: `1.5px solid ${selected[b.id] && b.foerderbar ? 'var(--accent)' : 'var(--border2)'}`, background: selected[b.id] && b.foerderbar ? 'rgba(124,111,255,0.2)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {selected[b.id] && b.foerderbar && <span style={{ color: 'var(--accent2)', fontSize: 12 }}>✓</span>}
                  </div>
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>{b.label}</p>
                    <p style={{ fontSize: 11, color: 'var(--text3)' }}>{b.desc}</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{b.betrag.toLocaleString('de')}€</p>
                  {b.foerderbar ? (
                    <p style={{ fontSize: 10, color: 'var(--green)' }}>davon {Math.round(b.betrag * 0.4).toLocaleString('de')}€ gefördert</p>
                  ) : (
                    <p style={{ fontSize: 10, color: 'var(--red)' }}>nicht förderfähig</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="card" style={{ marginTop: 12, background: 'var(--bg3)' }}>
            <div className="flex-between">
              <span style={{ fontSize: 13, color: 'var(--text2)' }}>Gesamtinvestition</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)' }}>{gesamtInvest.toLocaleString('de')}€</span>
            </div>
            <div className="flex-between" style={{ marginTop: 4 }}>
              <span style={{ fontSize: 13, color: 'var(--green)' }}>GKV übernimmt (40%, max. 12.000€)</span>
              <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--green)' }}>− {foerderung.toLocaleString('de')}€</span>
            </div>
            <div style={{ borderTop: '1px solid var(--border)', marginTop: 8, paddingTop: 8 }} className="flex-between">
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text)' }}>Ihr Eigenanteil</span>
              <span style={{ fontSize: 16, fontWeight: 600, color: 'var(--accent2)' }}>{eigenanteil.toLocaleString('de')}€</span>
            </div>
          </div>
          <div className="flex gap8" style={{ marginTop: 12 }}>
            <button className="btn" onClick={() => setStep(0)}>← Zurück</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Weiter → Antrag ausfüllen</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <div className="card" style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 14, marginBottom: 14 }}>Antragsdaten</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>PFLEGEKASSE</label>
                <select className="inp" value={kasse} onChange={e => setKasse(e.target.value)} style={{ appearance: 'none' }}>
                  {PFLEGEKASSEN.map(k => <option key={k}>{k}</option>)}
                </select>
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>BEANTRAGTE FÖRDERUNG</label>
                <input className="inp" value={`${foerderung.toLocaleString('de')} €`} readOnly style={{ opacity: 0.7 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>MASSNAHMEN</label>
                <input className="inp" value={selectedItems.map(i => i.label).join(', ')} readOnly style={{ opacity: 0.7 }} />
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 500, color: 'var(--text3)', display: 'block', marginBottom: 5 }}>DATUM</label>
                <input className="inp" defaultValue="25.05.2026" />
              </div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: 12 }}>
            <div className="flex-between mb10">
              <h3 style={{ fontSize: 14 }}>Antragstext</h3>
              <button className="btn" style={{ fontSize: 11, padding: '5px 12px' }} onClick={generateAntrag} disabled={generating}>
                {generating ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /><span style={{ marginLeft: 8 }}>KI schreibt…</span></> : '✦ KI-Text generieren'}
              </button>
            </div>
            {generated ? (
              <textarea className="inp" value={antragText} onChange={e => setAntragText(e.target.value)} style={{ minHeight: 200, fontSize: 12, lineHeight: 1.7 }} />
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', color: 'var(--text3)', background: 'var(--bg3)', borderRadius: 8 }}>
                <p style={{ fontSize: 13 }}>Klicken Sie auf "KI-Text generieren" für einen fertigen Antragstext</p>
              </div>
            )}
          </div>
          <div className="flex gap8">
            <button className="btn" onClick={() => setStep(1)}>← Zurück</button>
            <button className="btn btn-primary" onClick={() => { if (generated) setStep(3) }} style={{ opacity: generated ? 1 : 0.5 }}>Weiter → Einreichen</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="card hero" style={{ textAlign: 'center', padding: '40px 32px' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>✅</div>
            <h3 style={{ fontSize: 20, fontFamily: 'var(--font-head)', marginBottom: 8 }}>Antrag bereit zum Einreichen</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, maxWidth: 400, margin: '0 auto 24px' }}>
              Der Antrag für {foerderung.toLocaleString('de')}€ Digitalisierungsförderung ist vollständig ausgefüllt und kann bei der {kasse} eingereicht werden.
            </p>
            <div className="flex gap10" style={{ justifyContent: 'center' }}>
              <button className="btn btn-primary">📥 Antrag als PDF herunterladen</button>
              <button className="btn">📧 Per E-Mail senden</button>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 12 }}>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Nächste Schritte</p>
              {['Antrag ausdrucken und unterschreiben', 'Per Post oder Fax an die Kasse senden', 'Bewilligungsbescheid abwarten (4–8 Wochen)', 'Rechnungen sammeln & einreichen', 'Förderung wird überwiesen'].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, padding: '5px 0', fontSize: 12, color: 'var(--text2)' }}>
                  <span style={{ color: 'var(--accent2)', flexShrink: 0 }}>{i + 1}.</span> {s}
                </div>
              ))}
            </div>
            <div className="card">
              <p style={{ fontSize: 12, fontWeight: 500, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 8 }}>Zusammenfassung</p>
              {[['Pflegekasse', kasse], ['Gesamtinvestition', `${gesamtInvest.toLocaleString('de')}€`], ['Förderung (40%)', `${foerderung.toLocaleString('de')}€`], ['Ihr Eigenanteil', `${eigenanteil.toLocaleString('de')}€`], ['Maßnahmen', selectedItems.length + ' Positionen']].map(([k, v]) => (
                <div key={k} className="flex-between" style={{ padding: '5px 0', borderBottom: '1px solid var(--border)', fontSize: 12 }}>
                  <span style={{ color: 'var(--text3)' }}>{k}</span>
                  <span style={{ color: 'var(--text)', fontWeight: 500 }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
