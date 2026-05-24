import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { Icon } from '../components/icons.jsx'

export default function ForgotPassword() {
  const [sent, setSent] = useState(false)

  return (
    <AuthShell
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={
        sent
          ? "If an account exists for that email, we've sent a reset link."
          : "Enter your email and we'll send you a link to reset it."
      }
      footer={
        <Link
          to="/login"
          style={{ color: 'var(--text-3)', display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          <Icon.ArrowL size={12} /> Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '14px 0 6px', textAlign: 'center' }}>
          <div style={{ width: 44, height: 44, borderRadius: 999, background: 'var(--success-soft)', color: 'var(--success)', display: 'grid', placeItems: 'center' }}>
            <Icon.Check size={22} />
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', maxWidth: 280 }}>
            We sent a link to <strong style={{ color: 'var(--text)' }}>alex@vector.dev</strong>. The link expires in 30 minutes.
          </p>
          <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>
            Use a different email
          </button>
        </div>
      ) : (
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true) }}
          style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          <div className="field">
            <label className="field-label">Email</label>
            <input className="input" type="email" placeholder="you@company.com" autoFocus />
          </div>
          <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: 4 }}>
            Send reset link
          </button>
        </form>
      )}
    </AuthShell>
  )
}
