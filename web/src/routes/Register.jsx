import { Link, useNavigate } from 'react-router-dom'
import AuthShell from '../components/AuthShell.jsx'
import { Icon } from '../components/icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function SocialRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
      <button className="btn btn-quiet" style={{ height: 38 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z" />
        </svg>
        GitHub
      </button>
      <button className="btn btn-quiet" style={{ height: 38 }}>
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22 12c0-.7-.1-1.4-.2-2H12v3.8h5.6c-.2 1.3-1 2.4-2 3.1v2.6h3.3c1.9-1.8 3.1-4.4 3.1-7.5z" />
          <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.5l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22z" />
          <path fill="#FBBC05" d="M6.4 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.1.3-1.7V7.7H3a10 10 0 0 0 0 8.6l3.4-2.6z" />
          <path fill="#EA4335" d="M12 6.2c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 3.2 14.7 2.3 12 2.3a10 10 0 0 0-9 5.4l3.4 2.6c.8-2.3 3-4.1 5.6-4.1z" />
        </svg>
        Google
      </button>
    </div>
  )
}

function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 18px', color: 'var(--text-4)' }}>
      <hr className="divider" style={{ flex: 1 }} />
      <span style={{ fontSize: 11.5, letterSpacing: 0.06, textTransform: 'uppercase' }}>or</span>
      <hr className="divider" style={{ flex: 1 }} />
    </div>
  )
}

export default function Register() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: replace with real register API call
    login({ name: 'Alex Tran', firstName: 'Alex', email: 'alex@vector.dev', initials: 'AT' })
    navigate('/dashboard')
  }

  return (
    <AuthShell
      title="Create your account"
      subtitle="Start scanning your first repository in under a minute."
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--accent-hover)', fontWeight: 500 }}>
            Sign in
          </Link>
        </>
      }
    >
      <SocialRow />
      <OrDivider />
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label className="field-label">Full name</label>
          <input className="input" type="text" placeholder="Ada Lovelace" />
        </div>
        <div className="field">
          <label className="field-label">Work email</label>
          <input className="input" type="email" placeholder="you@company.com" />
        </div>
        <div className="field">
          <label className="field-label">Password</label>
          <input className="input" type="password" placeholder="At least 8 characters" />
        </div>
        <label style={{ display: 'flex', gap: 9, alignItems: 'flex-start', fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>
          <input type="checkbox" defaultChecked style={{ marginTop: 3, accentColor: 'var(--accent)' }} />
          <span>
            I agree to the{' '}
            <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Terms</a>
            {' '}and{' '}
            <a href="#" style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Privacy Policy</a>.
          </span>
        </label>
        <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: 6 }}>
          Create account <Icon.ArrowR size={14} />
        </button>
      </form>
    </AuthShell>
  )
}
