import { useState } from 'react'

const DEMO_USERS = [
  { email: 'leitung@sonnenschein.de',   password: 'demo2026', name: 'Claudia Berg',   rolle: 'Einrichtungsleitung' },
  { email: 'pdl@sonnenschein.de',       password: 'demo2026', name: 'Reza Ahmadi',    rolle: 'Pflegedienstleitung' },
  { email: 'pflege@sonnenschein.de',    password: 'demo2026', name: 'Maria Schulze',  rolle: 'Pflegekraft' },
  { email: 'betreuung@sonnenschein.de', password: 'demo2026', name: 'Sabine Müller',  rolle: 'Betreuungskraft' },
  { email: 'fahrer@sonnenschein.de',    password: 'demo2026', name: 'Thomas Kranz',   rolle: 'Fahrer' },
]

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showDemo, setShowDemo] = useState(false)

  const handleLogin = (e) => {
    e?.preventDefault()
    setLoading(true)
    setError('')
    setTimeout(() => {
      const user = DEMO_USERS.find(u => u.email === email && u.password === password)
      if (user) {
        onLogin(user)
      } else {
        setError('E-Mail oder Passwort nicht korrekt.')
        setLoading(false)
      }
    }, 800)
  }

  const quickLogin = (user) => {
    setEmail(user.email)
    setPassword(user.password)
    setLoading(true)
    setTimeout(() => onLogin(user), 600)
  }

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg)',
      backgroundImage: 'radial-gradient(ellipse 70% 60% at 50% -10%, rgba(124,111,255,0.08) 0%, transparent 70%)',
      fontFamily: 'var(--font-main)', padding: '24px'
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ width: 52, height: 52, background: 'var(--accent)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 700, fontFamily: 'var(--font-head)', color: 'white', margin: '0 auto 16px', letterSpacing: '-0.5px' }}>CV</div>
          <h1 style={{ fontFamily: 'var(--font-head)', fontSize: 24, fontWeight: 600, color: 'var(--text)', letterSpacing: '-0.3px', marginBottom: 6 }}>Carevera</h1>
          <p style={{ fontSize: 13, color: 'var(--text3)' }}>Bitte melden Sie sich an</p>
        </div>

        {/* Form */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 16, padding: '28px 32px', marginBottom: 14 }}>
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: 6 }}>E-Mail</label>
              <input
                className="inp"
                type="email"
                placeholder="ihre@email.de"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Passwort</label>
                <button type="button" style={{ fontSize: 11, color: 'var(--accent2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Vergessen?</button>
              </div>
              <input
                className="inp"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </div>
            {error && (
              <div style={{ fontSize: 12, color: 'var(--red)', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 7, padding: '8px 12px', marginBottom: 14 }}>
                {error}
              </div>
            )}
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '12px', fontSize: 14 }}
              disabled={loading}
            >
              {loading ? <><span className="ki-dot" /><span className="ki-dot" /><span className="ki-dot" /></> : 'Anmelden'}
            </button>
          </form>
        </div>

        {/* Demo access */}
        <div style={{ background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 12, padding: '16px 20px' }}>
          <button
            onClick={() => setShowDemo(!showDemo)}
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
          >
            <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--accent2)' }}>✦ Demo-Zugänge</span>
            <span style={{ fontSize: 12, color: 'var(--text3)' }}>{showDemo ? '▲' : '▼'}</span>
          </button>
          {showDemo && (
            <div className="fade-in" style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
              <p style={{ fontSize: 11, color: 'var(--text3)', marginBottom: 4 }}>Klicken zum Direkteinloggen:</p>
              {DEMO_USERS.map(u => (
                <button key={u.email} onClick={() => quickLogin(u)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 10px', background: 'var(--bg3)', borderRadius: 7, border: '1px solid var(--border)', cursor: 'pointer', transition: 'border-color 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text)' }}>{u.name}</div>
                    <div style={{ fontSize: 10, color: 'var(--text3)' }}>{u.rolle} · {u.email}</div>
                  </div>
                  <span style={{ fontSize: 11, color: 'var(--accent2)' }}>→</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--text3)', marginTop: 20 }}>
          © 2026 Carevera · Datenschutz · Impressum
        </p>
      </div>
    </div>
  )
}
