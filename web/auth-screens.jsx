// auth-screens.jsx — Login, Register, Forgot password
// Centered card on a subtle grid background with a brand mark above.

const { useState } = React;

function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="bg-grid" style={{
      position: 'relative', minHeight: '100%', display: 'grid',
      placeItems: 'center', padding: '48px 24px',
    }}>
      <div style={{ position: 'relative', width: '100%', maxWidth: 380, zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <span className="brand">
            <span className="brand-mark"></span>
            <span className="brand-name">Code Sentinel</span>
          </span>
        </div>
        <div className="card" style={{ padding: '28px 28px 24px' }}>
          <h2 style={{ fontSize: 20, marginBottom: 6 }}>{title}</h2>
          {subtitle && <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 22 }}>{subtitle}</p>}
          {children}
        </div>
        {footer && (
          <p style={{
            textAlign: 'center', fontSize: 13, color: 'var(--text-3)',
            marginTop: 18,
          }}>{footer}</p>
        )}
      </div>
    </div>
  );
}

function SocialRow() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 18 }}>
      <button className="btn btn-quiet" style={{ height: 38 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.2 6.8 9.5.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.8v2.7c0 .3.2.6.7.5A10 10 0 0 0 22 12c0-5.5-4.5-10-10-10z"/>
        </svg>
        GitHub
      </button>
      <button className="btn btn-quiet" style={{ height: 38 }}>
        <svg width="14" height="14" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22 12c0-.7-.1-1.4-.2-2H12v3.8h5.6c-.2 1.3-1 2.4-2 3.1v2.6h3.3c1.9-1.8 3.1-4.4 3.1-7.5z"/>
          <path fill="#34A853" d="M12 22c2.7 0 5-.9 6.7-2.5l-3.3-2.6c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3v2.6A10 10 0 0 0 12 22z"/>
          <path fill="#FBBC05" d="M6.4 13.7c-.2-.6-.3-1.2-.3-1.7s.1-1.1.3-1.7V7.7H3a10 10 0 0 0 0 8.6l3.4-2.6z"/>
          <path fill="#EA4335" d="M12 6.2c1.5 0 2.8.5 3.8 1.5l2.9-2.9C16.9 3.2 14.7 2.3 12 2.3a10 10 0 0 0-9 5.4l3.4 2.6c.8-2.3 3-4.1 5.6-4.1z"/>
        </svg>
        Google
      </button>
    </div>
  );
}

function OrDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '4px 0 18px', color: 'var(--text-4)' }}>
      <hr className="divider" style={{ flex: 1 }} />
      <span style={{ fontSize: 11.5, letterSpacing: 0.06, textTransform: 'uppercase' }}>or</span>
      <hr className="divider" style={{ flex: 1 }} />
    </div>
  );
}

function LoginScreen({ go, fromCli }) {
  const [show, setShow] = useState(false);
  return (
    <AuthShell
      title={fromCli ? 'Sign in to authorize the CLI' : 'Welcome back'}
      subtitle={fromCli
        ? 'Once signed in, we\u2019ll send a confirmation code back to your terminal.'
        : 'Sign in to your Code Sentinel account.'}
      footer={!fromCli && (
        <>Don\u2019t have an account?{' '}
          <a onClick={() => go('register')} style={{ color: 'var(--accent-hover)', fontWeight: 500, cursor: 'pointer' }}>
            Create one
          </a>
        </>
      )}
    >
      <SocialRow />
      <OrDivider />
      <form onSubmit={(e) => { e.preventDefault(); go(fromCli ? 'cli-confirm' : 'dashboard'); }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div className="field">
          <label className="field-label">Email</label>
          <input className="input" type="email" defaultValue="alex@vector.dev" placeholder="you@company.com" />
        </div>
        <div className="field">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="field-label">Password</label>
            <a onClick={() => go('forgot')}
               style={{ fontSize: 12.5, color: 'var(--text-3)', cursor: 'pointer' }}>Forgot?</a>
          </div>
          <div style={{ position: 'relative' }}>
            <input className="input" type={show ? 'text' : 'password'} defaultValue="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style={{ paddingRight: 38 }} />
            <button type="button" onClick={() => setShow(!show)}
              style={{ position: 'absolute', right: 6, top: 6, width: 28, height: 28, background: 'transparent', border: 0, borderRadius: 6, color: 'var(--text-3)', display: 'grid', placeItems: 'center' }}>
              {show ? <Icon.EyeOff size={15} /> : <Icon.Eye size={15} />}
            </button>
          </div>
        </div>
        <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: 6 }}>
          {fromCli ? 'Sign in and authorize' : 'Sign in'}
          <Icon.ArrowR size={14} />
        </button>
      </form>
    </AuthShell>
  );
}

function RegisterScreen({ go }) {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Start scanning your first repository in under a minute."
      footer={
        <>Already have an account?{' '}
          <a onClick={() => go('login')} style={{ color: 'var(--accent-hover)', fontWeight: 500, cursor: 'pointer' }}>
            Sign in
          </a>
        </>
      }
    >
      <SocialRow />
      <OrDivider />
      <form onSubmit={(e) => { e.preventDefault(); go('dashboard'); }}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
          <span>I agree to the <a style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Terms</a> and <a style={{ color: 'var(--text-2)', textDecoration: 'underline' }}>Privacy Policy</a>.</span>
        </label>
        <button className="btn btn-primary btn-block" type="submit" style={{ marginTop: 6 }}>
          Create account
          <Icon.ArrowR size={14} />
        </button>
      </form>
    </AuthShell>
  );
}

function ForgotScreen({ go }) {
  const [sent, setSent] = useState(false);
  return (
    <AuthShell
      title={sent ? 'Check your inbox' : 'Reset your password'}
      subtitle={sent
        ? 'If an account exists for that email, we\u2019ve sent a reset link.'
        : 'Enter your email and we\u2019ll send you a link to reset it.'}
      footer={
        <a onClick={() => go('login')} style={{ color: 'var(--text-3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          <Icon.ArrowL size={12} /> Back to sign in
        </a>
      }
    >
      {sent ? (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
          padding: '14px 0 6px', textAlign: 'center',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 999, background: 'var(--success-soft)',
            color: 'var(--success)', display: 'grid', placeItems: 'center',
          }}>
            <Icon.Check size={22} />
          </div>
          <p style={{ fontSize: 13.5, color: 'var(--text-2)', maxWidth: 280 }}>
            We sent a link to <strong style={{ color: 'var(--text)' }}>alex@vector.dev</strong>. The link expires in 30 minutes.
          </p>
          <button className="btn btn-ghost btn-sm" onClick={() => setSent(false)}>Use a different email</button>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
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
  );
}

Object.assign(window, { AuthShell, LoginScreen, RegisterScreen, ForgotScreen });
