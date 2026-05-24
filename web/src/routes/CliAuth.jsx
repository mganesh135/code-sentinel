// CliAuth — standalone CLI auth page opened by `sentinel login`.
// Three sequential steps: Sign in → Authorize → Success.
// No AppShell — this page is intentionally separate from the main app nav.

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Icon } from '../components/icons.jsx'

const DEMO_CODE = 'HZQK-7M4P'
const DEMO_USER = { name: 'Alex Tran', email: 'alex@vector.dev', initials: 'AT' }

// ── Shared chrome ─────────────────────────────────────────────────────────────
function CliShell({ children }) {
  return (
    <div
      className="cli-wrap bg-grid"
      style={{ minHeight: '100vh' }}
    >
      <div className="cli-stage">
        {/* Brand bar */}
        <div className="cli-brandbar">
          <span className="brand">
            <span className="brand-mark" />
            <span className="brand-name">Code Sentinel</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon.Lock size={12} /> Secure device authorization
          </span>
        </div>

        {children}

        {/* Footer */}
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-4)', lineHeight: 1.6 }}>
          You're seeing this because you ran{' '}
          <code className="mono" style={{ color: 'var(--text-3)', background: 'var(--surface-2)', padding: '1px 5px', borderRadius: 4 }}>
            sentinel login
          </code>{' '}
          in your terminal.<br />
          We never store your shell history or local files.
        </div>
      </div>
    </div>
  )
}

// ── Step 1: Sign in ───────────────────────────────────────────────────────────
function SignInStep({ onContinue }) {
  const [show, setShow] = useState(false)

  return (
    <div className="cli-mainCard">
      {/* Handshake graphic */}
      <div className="handshake">
        <span className="hs-pill left">
          <span className="brand-mark" style={{ width: 14, height: 14, borderRadius: 4 }} />
          sentinel.dev
        </span>
        <span className="hs-arc" />
        <span className="hs-pill right">
          <Icon.Terminal size={13} /> CLI v1.4.0
        </span>
      </div>

      <div style={{ padding: '24px 26px 26px' }}>
        <h2 style={{ fontSize: 19, marginBottom: 6 }}>Sign in to authorize the CLI</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 18, lineHeight: 1.55 }}>
          Confirm the code below matches the one shown in your terminal, then sign in to continue.
        </p>

        {/* Device code */}
        <div className="codebox" style={{ marginBottom: 18 }}>
          <div className="codebox-half">{DEMO_CODE.split('-')[0]}</div>
          <div className="codebox-sep" />
          <div className="codebox-half">{DEMO_CODE.split('-')[1]}</div>
        </div>

        <form onSubmit={(e) => { e.preventDefault(); onContinue(DEMO_USER) }} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label className="field-label">Email</label>
            <input className="input" type="email" defaultValue="alex@vector.dev" />
          </div>
          <div className="field">
            <label className="field-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={show ? 'text' : 'password'} defaultValue="············" style={{ paddingRight: 38 }} />
              <button type="button" onClick={() => setShow((s) => !s)}
                style={{ position: 'absolute', right: 6, top: 6, width: 28, height: 28, background: 'transparent', border: 0, borderRadius: 6, color: 'var(--text-3)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                {show ? <Icon.EyeOff size={15} /> : <Icon.Eye size={15} />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit" style={{ marginTop: 6 }}>
            Continue <Icon.ArrowR size={14} />
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
            <a href="#" style={{ cursor: 'pointer' }}>Use a different account</a>
            <Link to="/register" style={{ color: 'var(--text-3)' }}>Create account</Link>
          </div>
        </form>
      </div>
    </div>
  )
}

// ── Step 2: Authorize ─────────────────────────────────────────────────────────
function AuthorizeStep({ user, onAuthorize, onCancel }) {
  const [busy, setBusy] = useState(false)

  const handle = () => {
    setBusy(true)
    setTimeout(onAuthorize, 700)
  }

  return (
    <div className="cli-mainCard">
      <div className="handshake">
        <span className="hs-pill left">
          <span style={{ width: 16, height: 16, borderRadius: 999, background: 'var(--text)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 560 }}>
            {user.initials}
          </span>
          {user.email}
        </span>
        <span className="hs-arc" />
        <span className="hs-pill right">
          <Icon.Terminal size={13} /> {DEMO_CODE}
        </span>
      </div>

      <div style={{ padding: '24px 26px 26px' }}>
        <h2 style={{ fontSize: 19, marginBottom: 6 }}>Authorize this device?</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 18, lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--text)', fontWeight: 510 }}>sentinel CLI v1.4.0</strong> on your machine is requesting access to your Code Sentinel account.
        </p>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.06, fontWeight: 510, marginBottom: 8 }}>
            Code Sentinel will be able to
          </div>
          {[
            { icon: <Icon.Box size={14} />,      title: 'Scan your repositories',  body: 'Submit code from your local checkouts for static analysis.' },
            { icon: <Icon.Activity size={14} />, title: 'Read your scan history',  body: 'View past scan results and reports tied to your account.' },
            { icon: <Icon.User size={14} />,     title: 'Read your profile',       body: 'Read your name, email and current plan.' },
          ].map((s, i) => (
            <div key={i} className="scope" style={{ marginTop: i ? 6 : 0 }}>
              <div className="scope-icon">{s.icon}</div>
              <div>
                <div style={{ fontSize: 13.5, fontWeight: 510 }}>{s.title}</div>
                <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.5 }}>{s.body}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-quiet" style={{ flex: '0 0 auto' }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-accent btn-block" disabled={busy} onClick={handle}>
            {busy ? 'Authorizing…' : <><Icon.Check size={14} /> Authorize CLI</>}
          </button>
        </div>

        <div style={{ marginTop: 16, padding: '10px 12px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.5 }}>
          <span style={{ marginTop: 1 }}><Icon.Lock size={13} /></span>
          <span>
            Only authorize this device if the code matches{' '}
            <code className="mono" style={{ color: 'var(--text-2)' }}>{DEMO_CODE}</code>{' '}
            in your terminal. If it doesn't, close this tab.
          </span>
        </div>
      </div>
    </div>
  )
}

// ── Step 3: Success ───────────────────────────────────────────────────────────
function SuccessStep({ user }) {
  return (
    <div className="cli-mainCard">
      <div style={{ padding: '36px 30px 30px', textAlign: 'center' }}>
        <div className="successRing">
          <Icon.Check size={28} />
        </div>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>You're all set.</h2>
        <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.55, maxWidth: 360, margin: '0 auto 22px' }}>
          The CLI on your machine is now signed in as{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 510 }}>{user.email}</strong>.
          You can close this tab and return to your terminal.
        </p>
        <div className="terminal-block" style={{ textAlign: 'left', marginBottom: 20 }}>
          <div className="tcomment"># back in your terminal</div>
          <div style={{ marginTop: 4 }}><span className="tprompt">$</span> sentinel login</div>
          <div className="tcomment">  opening browser…</div>
          <div style={{ color: '#8dc891' }}>  ✓ signed in as {user.email}</div>
          <div style={{ marginTop: 8 }}><span className="tprompt">$</span> <span style={{ color: '#fff' }}>_</span></div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => window.close?.()}>Close this tab</button>
          <Link to="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Open dashboard <Icon.ArrowR size={13} />
          </Link>
        </div>
      </div>
    </div>
  )
}

// ── Route component ───────────────────────────────────────────────────────────
export default function CliAuth() {
  const [step, setStep] = useState('signin')   // 'signin' | 'authorize' | 'success'
  const [user, setUser] = useState(null)

  const handleSignIn = (userData) => {
    setUser(userData)
    setStep('authorize')
  }

  return (
    <CliShell>
      {step === 'signin'    && <SignInStep onContinue={handleSignIn} />}
      {step === 'authorize' && <AuthorizeStep user={user} onAuthorize={() => setStep('success')} onCancel={() => setStep('signin')} />}
      {step === 'success'   && <SuccessStep user={user} />}
    </CliShell>
  )
}
