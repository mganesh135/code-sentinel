// cli-screens.jsx — reusable CLI auth flow screens (3 steps)
// Used by cli-auth.html (interactive) and canvas.html (display).
// Requires styles.css for .bg-grid, .brand, .codebox, .handshake, etc.

const { useState: useC } = React;

const DEMO_CLI_USER = { name: 'Alex Tran', email: 'alex@vector.dev', initials: 'AT' };
const DEMO_CLI_CODE = 'HZQK-7M4P';

// Shared chrome: brand bar + footer disclaimer wrapping the step card.
function CliShell({ children, label }) {
  return (
    <div className="cli-wrap bg-grid" data-screen-label={label}>
      <div className="cli-stage">
        <div className="cli-brandbar">
          <span className="brand">
            <span className="brand-mark"></span>
            <span className="brand-name" style={{ color: 'var(--text)' }}>Code Sentinel</span>
          </span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <Icon.Lock size={12} />
            Secure device authorization
          </span>
        </div>
        {children}
        <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-4)', lineHeight: 1.6 }}>
          You're seeing this because you ran <code className="mono" style={{
            color: 'var(--text-3)', background: 'var(--surface-2)', padding: '1px 5px', borderRadius: 4,
          }}>sentinel login</code> in your terminal.<br />
          We never store your shell history or local files.
        </div>
      </div>
    </div>
  );
}

// ----- Step 1: Sign in -----------------------------------------------------
function CliSignInStep({ code = DEMO_CLI_CODE, onContinue = () => {} }) {
  const [show, setShow] = useC(false);
  return (
    <div className="cli-mainCard">
      <div className="handshake">
        <span className="hs-pill left">
          <span className="brand-mark" style={{ width: 14, height: 14, borderRadius: 4 }}></span>
          sentinel.dev
        </span>
        <span className="hs-arc"></span>
        <span className="hs-pill right">
          <Icon.Terminal size={13} />
          CLI v1.4.0
        </span>
      </div>
      <div style={{ padding: '24px 26px 26px' }}>
        <h2 style={{ fontSize: 19, marginBottom: 6 }}>Sign in to authorize the CLI</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 18, lineHeight: 1.55 }}>
          Confirm the code below matches the one shown in your terminal,
          then sign in to continue.
        </p>
        <div className="codebox" style={{ marginBottom: 18 }}>
          <div className="codebox-half">{code.split('-')[0]}</div>
          <div className="codebox-sep"></div>
          <div className="codebox-half">{code.split('-')[1]}</div>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onContinue(DEMO_CLI_USER); }}
              style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div className="field">
            <label className="field-label">Email</label>
            <input className="input" type="email" defaultValue="alex@vector.dev" />
          </div>
          <div className="field">
            <label className="field-label">Password</label>
            <div style={{ position: 'relative' }}>
              <input className="input" type={show ? 'text' : 'password'} defaultValue="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" style={{ paddingRight: 38 }} />
              <button type="button" onClick={() => setShow(!show)}
                style={{ position: 'absolute', right: 6, top: 6, width: 28, height: 28, background: 'transparent', border: 0, borderRadius: 6, color: 'var(--text-3)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
                {show ? <Icon.EyeOff size={15} /> : <Icon.Eye size={15} />}
              </button>
            </div>
          </div>
          <button className="btn btn-primary btn-block btn-lg" type="submit" style={{ marginTop: 6 }}>
            Continue
            <Icon.ArrowR size={14} />
          </button>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12.5, color: 'var(--text-3)', marginTop: 4 }}>
            <a style={{ cursor: 'pointer' }}>Use a different account</a>
            <a href="prototype.html#register" style={{ cursor: 'pointer', color: 'var(--text-3)' }}>Create account</a>
          </div>
        </form>
      </div>
    </div>
  );
}

// ----- Step 2: Authorize ---------------------------------------------------
function CliAuthorizeStep({ code = DEMO_CLI_CODE, user = DEMO_CLI_USER, onAuthorize = () => {}, onCancel = () => {} }) {
  const [busy, setBusy] = useC(false);
  const handle = () => {
    setBusy(true);
    setTimeout(onAuthorize, 700);
  };
  return (
    <div className="cli-mainCard">
      <div className="handshake">
        <span className="hs-pill left">
          <span style={{ width: 16, height: 16, borderRadius: 999, background: 'var(--text)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 9, fontWeight: 560 }}>{user.initials}</span>
          {user.email}
        </span>
        <span className="hs-arc"></span>
        <span className="hs-pill right">
          <Icon.Terminal size={13} />
          {code}
        </span>
      </div>
      <div style={{ padding: '24px 26px 26px' }}>
        <h2 style={{ fontSize: 19, marginBottom: 6 }}>Authorize this device?</h2>
        <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 18, lineHeight: 1.55 }}>
          <strong style={{ color: 'var(--text)', fontWeight: 510 }}>sentinel CLI v1.4.0</strong> on
          your machine is requesting access to your Code Sentinel account.
        </p>

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.06, fontWeight: 510, marginBottom: 8 }}>
            Code Sentinel will be able to
          </div>
          <CliScope icon={<Icon.Box size={14} />} title="Scan your repositories"
                 body="Submit code from your local checkouts for static analysis." />
          <CliScope icon={<Icon.Activity size={14} />} title="Read your scan history"
                 body="View past scan results and reports tied to your account." />
          <CliScope icon={<Icon.User size={14} />} title="Read your profile"
                 body="Read your name, email and current plan." />
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-quiet" style={{ flex: '0 0 auto' }} onClick={onCancel}>Cancel</button>
          <button className="btn btn-accent btn-block" disabled={busy} onClick={handle}>
            {busy ? 'Authorizing\u2026' : <>Authorize CLI<Icon.Check size={14} /></>}
          </button>
        </div>

        <div style={{
          marginTop: 16, padding: '10px 12px', background: 'var(--surface)',
          border: '1px solid var(--border)', borderRadius: 8,
          display: 'flex', gap: 10, alignItems: 'flex-start',
          fontSize: 12.5, color: 'var(--text-3)', lineHeight: 1.5,
        }}>
          <span style={{ color: 'var(--text-3)', marginTop: 1 }}>
            <Icon.Lock size={13} />
          </span>
          <span>
            Only authorize this device if the code matches{' '}
            <code className="mono" style={{ color: 'var(--text-2)' }}>{code}</code>{' '}
            in your terminal. If it doesn\u2019t, close this tab.
          </span>
        </div>
      </div>
    </div>
  );
}

function CliScope({ icon, title, body }) {
  return (
    <div className="scope">
      <div className="scope-icon">{icon}</div>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 510 }}>{title}</div>
        <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2, lineHeight: 1.5 }}>{body}</div>
      </div>
    </div>
  );
}

// ----- Step 3: Success -----------------------------------------------------
function CliSuccessStep({ user = DEMO_CLI_USER }) {
  return (
    <div className="cli-mainCard">
      <div style={{ padding: '36px 30px 30px', textAlign: 'center' }}>
        <div className="successRing">
          <Icon.Check size={28} />
        </div>
        <h2 style={{ fontSize: 22, marginBottom: 8 }}>You\u2019re all set.</h2>
        <p style={{ fontSize: 14, color: 'var(--text-3)', lineHeight: 1.55, maxWidth: 360, margin: '0 auto 22px' }}>
          The CLI on your machine is now signed in as{' '}
          <strong style={{ color: 'var(--text)', fontWeight: 510 }}>{user.email}</strong>.
          You can close this tab and return to your terminal.
        </p>
        <div className="terminal-block" style={{ textAlign: 'left', marginBottom: 20 }}>
          <div className="tcomment"># back in your terminal</div>
          <div style={{ marginTop: 4 }}><span className="tprompt">$</span> sentinel login</div>
          <div className="tcomment">  opening browser\u2026</div>
          <div style={{ color: '#8dc891' }}>  \u2713 signed in as alex@vector.dev</div>
          <div style={{ marginTop: 8 }}><span className="tprompt">$</span> <span style={{ color: '#fff' }}>_</span></div>
        </div>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
          <button className="btn btn-ghost" onClick={() => window.close && window.close()}>Close this tab</button>
          <a href="prototype.html#dashboard" className="btn btn-primary" style={{ textDecoration: 'none' }}>
            Open dashboard <Icon.ArrowR size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}

// Stand-alone demos used by the design-canvas (no state transitions needed)
function CliSignInDemo()    { return <CliShell label="CLI · sign in"><CliSignInStep /></CliShell>; }
function CliAuthorizeDemo() { return <CliShell label="CLI · authorize"><CliAuthorizeStep /></CliShell>; }
function CliSuccessDemo()   { return <CliShell label="CLI · success"><CliSuccessStep /></CliShell>; }

Object.assign(window, {
  CliShell, CliSignInStep, CliAuthorizeStep, CliSuccessStep,
  CliSignInDemo, CliAuthorizeDemo, CliSuccessDemo,
  DEMO_CLI_USER, DEMO_CLI_CODE,
});
