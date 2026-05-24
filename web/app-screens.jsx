// app-screens.jsx — Dashboard, Subscriptions, Account
// Shared AppShell with top nav. Each screen is a function below.

const { useState: useS } = React;

// =====================================================================
// Shell
// =====================================================================
function AppShell({ active, go, user, children }) {
  const navItems = [
    { id: 'dashboard',     label: 'Product' },
    { id: 'subscriptions', label: 'Subscription' },
    { id: 'account',       label: 'Account' },
  ];
  const [menuOpen, setMenuOpen] = useS(false);
  return (
    <div style={{ minHeight: '100%', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* Top nav */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 30,
        background: 'rgba(255,255,255,0.85)', backdropFilter: 'saturate(180%) blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}>
        <div style={{
          maxWidth: 1180, margin: '0 auto', padding: '0 28px', height: 60,
          display: 'flex', alignItems: 'center', gap: 28,
        }}>
          <a onClick={() => go('dashboard')} className="brand" style={{ cursor: 'pointer' }}>
            <span className="brand-mark"></span>
            <span className="brand-name">Code Sentinel</span>
          </a>
          <nav style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            {navItems.map(n => (
              <a key={n.id} onClick={() => go(n.id)}
                 style={{
                   padding: '7px 11px', fontSize: 13.5, borderRadius: 7,
                   color: active === n.id ? 'var(--text)' : 'var(--text-3)',
                   background: active === n.id ? 'var(--surface-2)' : 'transparent',
                   fontWeight: active === n.id ? 510 : 450,
                   cursor: 'pointer', transition: 'all 0.12s',
                 }}>
                {n.label}
              </a>
            ))}
          </nav>
          <div style={{ flex: 1 }} />
          <a style={{ fontSize: 13, color: 'var(--text-3)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
            <Icon.Book size={14} /> Docs
          </a>
          <span style={{ width: 1, height: 20, background: 'var(--border)' }} />
          <div style={{ position: 'relative' }}>
            <button onClick={() => setMenuOpen(!menuOpen)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8, background: 'transparent',
                border: 0, padding: '4px 6px 4px 4px', borderRadius: 999, cursor: 'pointer',
              }}>
              <span style={{
                width: 28, height: 28, borderRadius: 999, background: 'var(--text)',
                color: '#fff', display: 'grid', placeItems: 'center',
                fontSize: 11.5, fontWeight: 560, letterSpacing: 0.04,
              }}>{user.initials}</span>
              <Icon.Chevron size={13} />
            </button>
            {menuOpen && (
              <div className="card" style={{
                position: 'absolute', right: 0, top: 'calc(100% + 6px)',
                minWidth: 220, padding: 6, boxShadow: 'var(--shadow-lg)',
              }} onClick={() => setMenuOpen(false)}>
                <div style={{ padding: '8px 10px 6px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{user.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{user.email}</div>
                </div>
                <hr className="divider" style={{ margin: '4px 0' }} />
                <MenuItem icon={<Icon.User size={14} />} label="Account settings" onClick={() => go('account')} />
                <MenuItem icon={<Icon.Tag size={14} />} label="Subscription" onClick={() => go('subscriptions')} />
                <MenuItem icon={<Icon.Book size={14} />} label="Documentation" />
                <hr className="divider" style={{ margin: '4px 0' }} />
                <MenuItem icon={<Icon.Logout size={14} />} label="Sign out" onClick={() => go('login')} />
              </div>
            )}
          </div>
        </div>
      </header>
      <main style={{ flex: 1, maxWidth: 1180, margin: '0 auto', padding: '40px 28px 80px', width: '100%' }}>
        {children}
      </main>
    </div>
  );
}

function MenuItem({ icon, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', display: 'flex', alignItems: 'center', gap: 9,
      padding: '8px 10px', background: 'transparent', border: 0, borderRadius: 6,
      color: 'var(--text-2)', fontSize: 13.5, cursor: 'pointer', textAlign: 'left',
    }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--surface-2)'}
       onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
      <span style={{ color: 'var(--text-3)' }}>{icon}</span>
      {label}
    </button>
  );
}

// =====================================================================
// Dashboard (Product page)
// =====================================================================
function DashboardScreen({ go, user }) {
  const platforms = [
    { id: 'mac',   icon: <Icon.Apple size={20} />,   name: 'macOS',     sub: 'Universal · 14 MB',       cmd: 'sentinel-1.4.0-darwin.pkg' },
    { id: 'linux', icon: <Icon.Linux size={20} />,   name: 'Linux',     sub: 'x86_64 / arm64 · 12 MB',  cmd: 'sentinel-1.4.0-linux.tar.gz' },
    { id: 'win',   icon: <Icon.Windows size={20} />, name: 'Windows',   sub: 'x64 · 15 MB',             cmd: 'sentinel-1.4.0-windows.msi' },
  ];
  const installers = [
    { id: 'brew', icon: <Icon.Brew size={16} />, label: 'Homebrew', cmd: 'brew install codesentinel/tap/sentinel' },
    { id: 'npm',  icon: <Icon.Npm size={16} />,  label: 'npm',      cmd: 'npm install -g @codesentinel/cli' },
    { id: 'curl', icon: <Icon.Terminal size={16} />, label: 'cURL', cmd: 'curl -fsSL sentinel.dev/install | sh' },
  ];
  const [tab, setTab] = useS('brew');
  const active = installers.find(i => i.id === tab);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* Hero */}
      <section>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 380px' }}>
            <span className="badge badge-accent badge-dot" style={{ marginBottom: 14 }}>v1.4.0 · just shipped</span>
            <h1 style={{ marginBottom: 12 }}>
              Welcome back, {user.firstName}.<br />
              <span style={{ color: 'var(--text-3)' }}>Your CLI is ready to scan.</span>
            </h1>
            <p style={{ fontSize: 15.5, maxWidth: 520, lineHeight: 1.55 }}>
              Code Sentinel is the static analysis CLI for shipping safer code. Install once,
              then run <code className="mono" style={{ background: 'var(--surface-2)', padding: '1px 6px', borderRadius: 5, fontSize: 13 }}>sentinel scan</code> in any
              repo to surface vulnerabilities, secrets and license risks before they reach main.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <button className="btn btn-accent btn-lg">
                <Icon.Download size={15} /> Download for macOS
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => go('subscriptions')}>
                View plans
              </button>
            </div>
          </div>
          {/* Terminal demo */}
          <div style={{ flex: '0 0 420px', minWidth: 320 }}>
            <div style={{
              background: '#15140f', borderRadius: 12, overflow: 'hidden',
              border: '1px solid #2a2722', boxShadow: '0 30px 60px -20px rgba(20,18,14,0.25)',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 7, padding: '10px 14px',
                borderBottom: '1px solid #2a2722',
              }}>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3a352e' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3a352e' }}></span>
                <span style={{ width: 10, height: 10, borderRadius: 999, background: '#3a352e' }}></span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#6f6a5e', marginLeft: 8 }}>
                  ~/vector-app
                </span>
              </div>
              <div className="terminal-block" style={{ borderRadius: 0, border: 0, padding: '16px 18px', fontSize: 12.5 }}>
                <div><span className="tprompt">$</span> sentinel scan .</div>
                <div className="tcomment">  scanning 1,284 files across 32 languages…</div>
                <div style={{ marginTop: 8 }}><span className="tok">✓</span> No secrets found</div>
                <div><span className="tok">✓</span> No critical CVEs</div>
                <div style={{ color: '#e6b366' }}>! 2 medium issues (sql-injection, weak-crypto)</div>
                <div style={{ marginTop: 8, color: '#6f6a5e' }}>  view report → https://sentinel.dev/r/8a2f1</div>
                <div style={{ marginTop: 10 }}><span className="tprompt">$</span> <span style={{ color: '#fff' }}>_</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14,
      }}>
        {[
          { label: 'Plan',           value: 'Pro',     hint: 'Renews Jun 12' },
          { label: 'Scans this month', value: '184',    hint: 'of 500 included' },
          { label: 'Repos linked',   value: '7',       hint: 'across 2 orgs' },
          { label: 'API tokens',     value: '2 active', hint: 'manage in Account' },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 6 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 520, letterSpacing: '-0.02em' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: 'var(--text-4)', marginTop: 4 }}>{s.hint}</div>
          </div>
        ))}
      </section>

      {/* Downloads */}
      <section>
        <SectionHeader
          eyebrow="Downloads"
          title="Get the CLI"
          subtitle="Pick a native installer or use your favorite package manager."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 18 }}>
          {platforms.map(p => (
            <div key={p.id} className="card" style={{
              padding: 18, display: 'flex', flexDirection: 'column', gap: 14,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 9, background: 'var(--surface-2)',
                  border: '1px solid var(--border)', display: 'grid', placeItems: 'center',
                  color: 'var(--text)',
                }}>{p.icon}</div>
                <div>
                  <div style={{ fontSize: 14.5, fontWeight: 510 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-3)' }}>{p.sub}</div>
                </div>
              </div>
              <div className="mono" style={{
                fontSize: 11.5, color: 'var(--text-3)',
                padding: '7px 10px', background: 'var(--surface)', borderRadius: 6,
                border: '1px solid var(--border)', whiteSpace: 'nowrap',
                overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{p.cmd}</div>
              <button className="btn btn-ghost btn-sm" style={{ alignSelf: 'flex-start' }}>
                <Icon.Download size={13} /> Download
              </button>
            </div>
          ))}
        </div>

        {/* Package manager tabs */}
        <div className="card" style={{ padding: 18 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
            {installers.map(i => (
              <button key={i.id} onClick={() => setTab(i.id)}
                className={tab === i.id ? '' : ''}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '6px 10px', borderRadius: 6, fontSize: 13,
                  border: '1px solid ' + (tab === i.id ? 'var(--border-strong)' : 'transparent'),
                  background: tab === i.id ? 'var(--surface)' : 'transparent',
                  color: tab === i.id ? 'var(--text)' : 'var(--text-3)',
                  fontWeight: tab === i.id ? 510 : 450,
                }}>
                {i.icon} {i.label}
              </button>
            ))}
            <div style={{ flex: 1 }} />
            <button className="btn btn-quiet btn-sm">
              <Icon.Copy size={12} /> Copy
            </button>
          </div>
          <div className="terminal-block" style={{ fontSize: 13 }}>
            <span className="tprompt">$ </span>{active.cmd}
          </div>
        </div>
      </section>

      {/* Resources / next steps */}
      <section>
        <SectionHeader eyebrow="Next steps" title="Get the most out of Sentinel" />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
          {[
            { icon: <Icon.Terminal size={16} />, title: 'Authorize your CLI', body: 'Run sentinel login to connect the CLI to your account.', cta: 'Open docs' },
            { icon: <Icon.Globe size={16} />,    title: 'Connect a repository', body: 'Link a GitHub or GitLab org to scan on every push.', cta: 'Connect repo' },
            { icon: <Icon.Spark size={16} />,    title: 'Invite your team',     body: 'Share findings, rules and dashboards across your team.', cta: 'Send invite' },
          ].map((c, i) => (
            <a key={i} className="card" style={{
              padding: 18, display: 'flex', flexDirection: 'column', gap: 8,
              cursor: 'pointer', transition: 'border-color 0.12s, transform 0.12s',
            }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--border-strong)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}>
              <span style={{ color: 'var(--accent-hover)' }}>{c.icon}</span>
              <div style={{ fontSize: 14.5, fontWeight: 510, marginTop: 4 }}>{c.title}</div>
              <p style={{ fontSize: 13, lineHeight: 1.5 }}>{c.body}</p>
              <span style={{ fontSize: 13, color: 'var(--text)', display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                {c.cta} <Icon.ArrowR size={12} />
              </span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}

function SectionHeader({ eyebrow, title, subtitle }) {
  return (
    <div style={{ marginBottom: 18 }}>
      {eyebrow && (
        <div style={{
          fontSize: 11.5, color: 'var(--accent-hover)', fontWeight: 510,
          letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 8,
        }}>{eyebrow}</div>
      )}
      <h2>{title}</h2>
      {subtitle && <p style={{ fontSize: 14, color: 'var(--text-3)', marginTop: 6 }}>{subtitle}</p>}
    </div>
  );
}

Object.assign(window, { AppShell, DashboardScreen, SectionHeader });
