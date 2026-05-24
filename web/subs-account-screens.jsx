// subs-account-screens.jsx — Subscriptions page + Account page

const { useState: useSA } = React;

// =====================================================================
// Subscriptions
// =====================================================================
function SubscriptionsScreen({ go }) {
  const [period, setPeriod] = useSA('monthly');
  const tiers = [
    {
      id: 'pro', name: 'Pro', tagline: 'For individual developers shipping side projects and small repos.',
      priceM: 19, priceY: 15, cta: 'Current plan', ctaVariant: 'ghost', current: true,
      features: [
        'Up to 500 scans / month',
        '3 connected repositories',
        'All scanners (SAST, secrets, deps)',
        'Email support',
        'Community ruleset',
      ],
    },
    {
      id: 'max', name: 'Max', tagline: 'For teams that want unlimited scanning and faster ship cycles.',
      priceM: 49, priceY: 39, cta: 'Upgrade to Max', ctaVariant: 'accent', highlight: true,
      features: [
        'Unlimited scans',
        '25 connected repositories',
        'All scanners + custom rules',
        'PR comments + GitHub checks',
        'Priority support, < 4h response',
        'Audit log & SSO (Google, GitHub)',
      ],
    },
    {
      id: 'ent', name: 'Enterprise', tagline: 'For organizations with compliance, SSO and procurement needs.',
      priceM: null, priceY: null, cta: 'Talk to sales', ctaVariant: 'ghost',
      features: [
        'Everything in Max',
        'Unlimited repositories & seats',
        'SAML SSO, SCIM provisioning',
        'Self-hosted / on-prem option',
        'SOC 2 Type II, BAA available',
        'Dedicated solutions engineer',
      ],
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
      {/* Header */}
      <header style={{ textAlign: 'center', maxWidth: 640, margin: '8px auto 0' }}>
        <div style={{
          fontSize: 11.5, color: 'var(--accent-hover)', fontWeight: 510,
          letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 12,
        }}>Plans &amp; pricing</div>
        <h1 style={{ fontSize: 36, letterSpacing: '-0.03em' }}>Pick a plan that scales with you.</h1>
        <p style={{ fontSize: 15.5, marginTop: 12, color: 'var(--text-3)' }}>
          Start on Pro, upgrade when you outgrow it, and switch to Enterprise when procurement asks.
          Cancel any time.
        </p>
        {/* Billing toggle */}
        <div style={{ display: 'inline-flex', marginTop: 22, padding: 4, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
          {['monthly', 'yearly'].map(p => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              padding: '6px 14px', borderRadius: 7, fontSize: 13, border: 0, cursor: 'pointer',
              background: period === p ? '#fff' : 'transparent',
              color: period === p ? 'var(--text)' : 'var(--text-3)',
              fontWeight: period === p ? 510 : 450,
              boxShadow: period === p ? 'var(--shadow-sm)' : 'none',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              {p === 'monthly' ? 'Monthly' : 'Yearly'}
              {p === 'yearly' && <span className="badge badge-accent" style={{ height: 18, fontSize: 10.5, padding: '0 6px' }}>−20%</span>}
            </button>
          ))}
        </div>
      </header>

      {/* Tiers */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {tiers.map(t => (
          <div key={t.id} className="card" style={{
            padding: 26, display: 'flex', flexDirection: 'column', gap: 18,
            position: 'relative', borderColor: t.highlight ? 'var(--text)' : 'var(--border)',
            boxShadow: t.highlight ? '0 24px 48px -16px rgba(20,18,14,0.18), 0 0 0 1px var(--text)' : 'var(--shadow-sm)',
          }}>
            {t.highlight && (
              <span style={{
                position: 'absolute', top: -10, right: 22,
                background: 'var(--text)', color: '#fff',
                fontSize: 10.5, fontWeight: 520, letterSpacing: 0.06, textTransform: 'uppercase',
                padding: '4px 9px', borderRadius: 999,
              }}>Most popular</span>
            )}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <h3 style={{ fontSize: 18 }}>{t.name}</h3>
                {t.current && <span className="badge badge-success badge-dot">Current</span>}
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.5, minHeight: 60 }}>{t.tagline}</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minHeight: 56 }}>
              {t.priceM !== null ? (
                <>
                  <span style={{ fontSize: 38, fontWeight: 520, letterSpacing: '-0.03em' }}>
                    ${period === 'monthly' ? t.priceM : t.priceY}
                  </span>
                  <span style={{ fontSize: 13, color: 'var(--text-3)' }}>
                    / user / month{period === 'yearly' && <span style={{ color: 'var(--text-4)' }}>, billed yearly</span>}
                  </span>
                </>
              ) : (
                <span style={{ fontSize: 32, fontWeight: 520, letterSpacing: '-0.025em' }}>Custom</span>
              )}
            </div>
            <button
              className={`btn btn-${t.ctaVariant} btn-block`}
              style={{ height: 42, fontSize: 14 }}
              disabled={t.current}
            >
              {t.cta}
            </button>
            <hr className="divider" />
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {t.features.map((f, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, color: 'var(--text-2)' }}>
                  <span style={{
                    flex: '0 0 16px', width: 16, height: 16, borderRadius: 999,
                    background: 'var(--surface-2)', color: 'var(--success)',
                    display: 'grid', placeItems: 'center', marginTop: 2,
                  }}>
                    <Icon.Check size={11} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Compare row */}
      <section className="card" style={{ padding: '22px 26px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
          <div style={{
            width: 38, height: 38, borderRadius: 9, background: 'var(--surface-2)',
            border: '1px solid var(--border)', display: 'grid', placeItems: 'center',
          }}>
            <Icon.Lock size={16} />
          </div>
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontSize: 14.5, fontWeight: 510 }}>Need procurement docs, MSA or a security review?</div>
            <p style={{ fontSize: 13, marginTop: 3 }}>
              Our team has SOC 2 reports, a vendor security questionnaire, and a draft DPA ready to send.
            </p>
          </div>
          <button className="btn btn-ghost">Contact sales <Icon.ArrowR size={13} /></button>
        </div>
      </section>

      {/* FAQ */}
      <section>
        <SectionHeader title="Frequently asked" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          {[
            { q: 'Can I switch plans later?', a: 'Yes — upgrade or downgrade any time from this page. We pro-rate the difference automatically.' },
            { q: 'What counts as a "scan"?',  a: 'A scan is a single sentinel scan invocation against a repository. Re-running on the same commit is free.' },
            { q: 'Do you offer a free plan?', a: 'Sentinel CLI is free for personal use on public repos forever. Pro unlocks private repos and team features.' },
            { q: 'Which payment methods?',    a: 'All major cards via Stripe. Annual Enterprise plans can also be invoiced by ACH or wire.' },
          ].map((f, i) => (
            <div key={i} className="card" style={{ padding: '16px 18px' }}>
              <div style={{ fontSize: 14, fontWeight: 510, marginBottom: 6 }}>{f.q}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// =====================================================================
// Account
// =====================================================================
function AccountScreen({ user, go }) {
  const [tab, setTab] = useSA('profile');
  const tabs = [
    { id: 'profile',  label: 'Profile' },
    { id: 'billing',  label: 'Billing' },
    { id: 'tokens',   label: 'API tokens' },
    { id: 'sessions', label: 'Sessions' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <header>
        <div style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 500, letterSpacing: 0.06, textTransform: 'uppercase', marginBottom: 8 }}>
          Settings
        </div>
        <h1 style={{ fontSize: 28 }}>Account</h1>
      </header>

      {/* Tab strip */}
      <nav style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)' }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            padding: '10px 12px', fontSize: 13.5, background: 'transparent', border: 0,
            color: tab === t.id ? 'var(--text)' : 'var(--text-3)',
            fontWeight: tab === t.id ? 510 : 450,
            borderBottom: '2px solid ' + (tab === t.id ? 'var(--text)' : 'transparent'),
            marginBottom: -1, cursor: 'pointer',
          }}>
            {t.label}
          </button>
        ))}
      </nav>

      {tab === 'profile' && <ProfilePane user={user} />}
      {tab === 'billing' && <BillingPane go={go} />}
      {tab === 'tokens'  && <TokensPane />}
      {tab === 'sessions'&& <SessionsPane />}
    </div>
  );
}

function SettingRow({ title, subtitle, children, danger }) {
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '260px 1fr', gap: 36,
      padding: '22px 0', borderBottom: '1px solid var(--border)',
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 510, color: danger ? 'var(--danger)' : 'var(--text)' }}>{title}</div>
        {subtitle && <p style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

function ProfilePane({ user }) {
  return (
    <div className="card" style={{ padding: '6px 26px 8px' }}>
      <SettingRow title="Profile photo" subtitle="PNG, JPG up to 2 MB.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{
            width: 56, height: 56, borderRadius: 999, background: 'var(--text)',
            color: '#fff', display: 'grid', placeItems: 'center',
            fontSize: 19, fontWeight: 540,
          }}>{user.initials}</span>
          <button className="btn btn-ghost btn-sm">Upload new</button>
          <button className="btn btn-quiet btn-sm">Remove</button>
        </div>
      </SettingRow>
      <SettingRow title="Name" subtitle="Shown on your profile and in PR comments.">
        <input className="input" defaultValue={user.name} style={{ maxWidth: 360 }} />
      </SettingRow>
      <SettingRow title="Email address" subtitle="Used for sign-in and account notifications.">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input className="input" defaultValue={user.email} style={{ maxWidth: 360 }} />
          <span className="badge badge-success badge-dot">Verified</span>
        </div>
      </SettingRow>
      <SettingRow title="Password" subtitle="Last changed 4 months ago.">
        <button className="btn btn-ghost btn-sm">Change password</button>
      </SettingRow>
      <SettingRow title="Two-factor auth" subtitle="Add an extra layer of security to your account.">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="badge"><span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--text-4)' }}></span>Off</span>
          <button className="btn btn-ghost btn-sm">Set up authenticator</button>
        </div>
      </SettingRow>
      <SettingRow danger title="Delete account" subtitle="Permanently delete your account and all associated scans. This cannot be undone.">
        <button className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(200,57,42,0.3)', color: 'var(--danger)' }}>Delete account…</button>
      </SettingRow>
    </div>
  );
}

function BillingPane({ go }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: 22, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 220 }}>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.06, marginBottom: 6 }}>Current plan</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
            <h2 style={{ fontSize: 22 }}>Pro</h2>
            <span style={{ fontSize: 14, color: 'var(--text-3)' }}>$19 / month</span>
          </div>
          <div style={{ fontSize: 13, color: 'var(--text-3)', marginTop: 6 }}>Renews on June 12, 2026.</div>
        </div>
        <button className="btn btn-quiet" onClick={() => go && go('subscriptions')}>Manage plan</button>
        <button className="btn btn-accent">Upgrade to Max</button>
      </div>

      <div className="card" style={{ padding: '6px 22px 8px' }}>
        <SettingRow title="Payment method" subtitle="Charged at the start of each billing period.">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{
              width: 40, height: 28, borderRadius: 5, background: 'var(--surface-2)',
              border: '1px solid var(--border)', display: 'grid', placeItems: 'center',
              color: 'var(--text-2)',
            }}>
              <Icon.Card size={16} />
            </div>
            <div>
              <div style={{ fontSize: 13.5 }}>Visa ending in 4242</div>
              <div style={{ fontSize: 12, color: 'var(--text-3)' }}>Expires 09 / 2028</div>
            </div>
            <button className="btn btn-quiet btn-sm" style={{ marginLeft: 'auto' }}>Update</button>
          </div>
        </SettingRow>
        <SettingRow title="Billing email" subtitle="Invoices and receipts go to this address.">
          <input className="input" defaultValue="billing@vector.dev" style={{ maxWidth: 360 }} />
        </SettingRow>
        <SettingRow title="Billing address" subtitle="Used on invoices and tax forms.">
          <button className="btn btn-ghost btn-sm">Add billing address</button>
        </SettingRow>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <h3>Invoices</h3>
          <button className="btn btn-quiet btn-sm" style={{ marginLeft: 'auto' }}>Download all</button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            ['May 12, 2026', '$19.00', 'Paid'],
            ['Apr 12, 2026', '$19.00', 'Paid'],
            ['Mar 12, 2026', '$19.00', 'Paid'],
            ['Feb 12, 2026', '$19.00', 'Paid'],
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 14,
              padding: '12px 0', borderTop: i ? '1px solid var(--border)' : 0,
              alignItems: 'center', fontSize: 13.5,
            }}>
              <div style={{ color: 'var(--text-2)' }}>{row[0]}</div>
              <div className="mono" style={{ fontSize: 13 }}>{row[1]}</div>
              <div><span className="badge badge-success badge-dot">{row[2]}</span></div>
              <button className="btn btn-quiet btn-sm">
                <Icon.Download size={12} /> PDF
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TokensPane() {
  const tokens = [
    { name: 'ci-production',   created: '3 months ago', lastUsed: '4 minutes ago', preview: 'sk_live_•••• 9hF2' },
    { name: 'laptop-personal', created: '2 weeks ago',  lastUsed: '6 hours ago',   preview: 'sk_live_•••• Qq3p' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div className="card" style={{ padding: 22 }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
          <div>
            <h3>API tokens</h3>
            <p style={{ fontSize: 13, marginTop: 4 }}>Use tokens to authenticate the CLI in CI or scripts.</p>
          </div>
          <button className="btn btn-primary" style={{ marginLeft: 'auto' }}>
            <Icon.Plus size={13} /> New token
          </button>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {tokens.map((t, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr auto', gap: 14,
              padding: '14px 0', borderTop: '1px solid var(--border)',
              alignItems: 'center', fontSize: 13.5,
            }}>
              <div style={{ fontWeight: 510 }}>{t.name}</div>
              <div className="mono" style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{t.preview}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Created {t.created}</div>
              <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Used {t.lastUsed}</div>
              <button className="btn btn-quiet btn-sm" style={{ color: 'var(--danger)' }}>Revoke</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SessionsPane() {
  const sessions = [
    { device: 'MacBook Pro · Chrome',     loc: 'Berlin, DE',     when: 'Active now', current: true },
    { device: 'sentinel CLI v1.4.0',      loc: 'CI · github.com', when: '12 minutes ago' },
    { device: 'iPhone 16 · Safari',       loc: 'Berlin, DE',     when: '2 days ago' },
  ];
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <h3>Active sessions</h3>
          <p style={{ fontSize: 13, marginTop: 4 }}>Devices currently signed in to your account.</p>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>Sign out all others</button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {sessions.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 14,
            padding: '14px 0', borderTop: '1px solid var(--border)',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)',
              border: '1px solid var(--border)', display: 'grid', placeItems: 'center',
              color: 'var(--text-2)',
            }}>
              <Icon.Activity size={15} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 510, display: 'flex', alignItems: 'center', gap: 8 }}>
                {s.device}
                {s.current && <span className="badge badge-success badge-dot">This device</span>}
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--text-3)', marginTop: 2 }}>{s.loc} · {s.when}</div>
            </div>
            {!s.current && <button className="btn btn-quiet btn-sm">Revoke</button>}
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { SubscriptionsScreen, AccountScreen });
