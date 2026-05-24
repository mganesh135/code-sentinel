import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AppShell from '../components/AppShell.jsx'
import { Icon } from '../components/icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function SettingRow({ title, subtitle, children, danger }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 36, padding: '22px 0', borderBottom: '1px solid var(--border)' }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 510, color: danger ? 'var(--danger)' : 'var(--text)' }}>{title}</div>
        {subtitle && <p style={{ fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
      <div>{children}</div>
    </div>
  )
}

function ProfilePane({ user }) {
  return (
    <div className="card" style={{ padding: '6px 26px 8px' }}>
      <SettingRow title="Profile photo" subtitle="PNG, JPG up to 2 MB.">
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ width: 56, height: 56, borderRadius: 999, background: 'var(--text)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: 19, fontWeight: 540 }}>
            {user?.initials}
          </span>
          <button className="btn btn-ghost btn-sm">Upload new</button>
          <button className="btn btn-quiet btn-sm">Remove</button>
        </div>
      </SettingRow>
      <SettingRow title="Name" subtitle="Shown on your profile and in PR comments.">
        <input className="input" defaultValue={user?.name} style={{ maxWidth: 360 }} />
      </SettingRow>
      <SettingRow title="Email address" subtitle="Used for sign-in and account notifications.">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <input className="input" defaultValue={user?.email} style={{ maxWidth: 360 }} />
          <span className="badge badge-success badge-dot">Verified</span>
        </div>
      </SettingRow>
      <SettingRow title="Password" subtitle="Last changed 4 months ago.">
        <button className="btn btn-ghost btn-sm">Change password</button>
      </SettingRow>
      <SettingRow title="Two-factor auth" subtitle="Add an extra layer of security to your account.">
        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
          <span className="badge">
            <span style={{ width: 5, height: 5, borderRadius: 999, background: 'var(--text-4)' }} />
            Off
          </span>
          <button className="btn btn-ghost btn-sm">Set up authenticator</button>
        </div>
      </SettingRow>
      <SettingRow danger title="Delete account" subtitle="Permanently delete your account and all associated scans. This cannot be undone.">
        <button className="btn btn-ghost btn-sm" style={{ borderColor: 'rgba(200,57,42,0.3)', color: 'var(--danger)' }}>
          Delete account…
        </button>
      </SettingRow>
    </div>
  )
}

function BillingPane() {
  const navigate = useNavigate()
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
        <button className="btn btn-quiet" onClick={() => navigate('/subscriptions')}>Manage plan</button>
        <button className="btn btn-accent">Upgrade to Max</button>
      </div>

      <div className="card" style={{ padding: '6px 22px 8px' }}>
        <SettingRow title="Payment method" subtitle="Charged at the start of each billing period.">
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <div style={{ width: 40, height: 28, borderRadius: 5, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}>
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
        {[['May 12, 2026', '$19.00'], ['Apr 12, 2026', '$19.00'], ['Mar 12, 2026', '$19.00'], ['Feb 12, 2026', '$19.00']].map((row, i) => (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr auto', gap: 14, padding: '12px 0', borderTop: i ? '1px solid var(--border)' : 0, alignItems: 'center', fontSize: 13.5 }}>
            <div style={{ color: 'var(--text-2)' }}>{row[0]}</div>
            <div className="mono" style={{ fontSize: 13 }}>{row[1]}</div>
            <div><span className="badge badge-success badge-dot">Paid</span></div>
            <button className="btn btn-quiet btn-sm"><Icon.Download size={12} /> PDF</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function TokensPane() {
  const tokens = [
    { name: 'ci-production',   created: '3 months ago', lastUsed: '4 minutes ago', preview: 'sk_live_•••• 9hF2' },
    { name: 'laptop-personal', created: '2 weeks ago',  lastUsed: '6 hours ago',   preview: 'sk_live_•••• Qq3p' },
  ]
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <h3>API tokens</h3>
          <p style={{ fontSize: 13, marginTop: 4 }}>Use tokens to authenticate the CLI in CI or scripts.</p>
        </div>
        <button className="btn btn-primary" style={{ marginLeft: 'auto' }}><Icon.Plus size={13} /> New token</button>
      </div>
      {tokens.map((t, i) => (
        <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1.4fr 1fr 1fr auto', gap: 14, padding: '14px 0', borderTop: '1px solid var(--border)', alignItems: 'center', fontSize: 13.5 }}>
          <div style={{ fontWeight: 510 }}>{t.name}</div>
          <div className="mono" style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{t.preview}</div>
          <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Created {t.created}</div>
          <div style={{ color: 'var(--text-3)', fontSize: 12.5 }}>Used {t.lastUsed}</div>
          <button className="btn btn-quiet btn-sm" style={{ color: 'var(--danger)' }}>Revoke</button>
        </div>
      ))}
    </div>
  )
}

function SessionsPane() {
  const sessions = [
    { device: 'MacBook Pro · Chrome',  loc: 'Berlin, DE',      when: 'Active now',     current: true },
    { device: 'sentinel CLI v1.4.0',   loc: 'CI · github.com', when: '12 minutes ago' },
    { device: 'iPhone 16 · Safari',    loc: 'Berlin, DE',      when: '2 days ago' },
  ]
  return (
    <div className="card" style={{ padding: 22 }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 14 }}>
        <div>
          <h3>Active sessions</h3>
          <p style={{ fontSize: 13, marginTop: 4 }}>Devices currently signed in to your account.</p>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ marginLeft: 'auto' }}>Sign out all others</button>
      </div>
      {sessions.map((s, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 0', borderTop: '1px solid var(--border)' }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center', color: 'var(--text-2)' }}>
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
  )
}

const TABS = [
  { id: 'profile',  label: 'Profile' },
  { id: 'billing',  label: 'Billing' },
  { id: 'tokens',   label: 'API tokens' },
  { id: 'sessions', label: 'Sessions' },
]

export default function Account() {
  const { user } = useAuth()
  const [tab, setTab] = useState('profile')

  return (
    <AppShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        <header>
          <div style={{ fontSize: 11.5, color: 'var(--text-3)', fontWeight: 500, letterSpacing: 0.06, textTransform: 'uppercase', marginBottom: 8 }}>
            Settings
          </div>
          <h1 style={{ fontSize: 28 }}>Account</h1>
        </header>

        {/* Tab strip */}
        <nav style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border)' }}>
          {TABS.map((t) => (
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

        {tab === 'profile'  && <ProfilePane user={user} />}
        {tab === 'billing'  && <BillingPane />}
        {tab === 'tokens'   && <TokensPane />}
        {tab === 'sessions' && <SessionsPane />}
      </div>
    </AppShell>
  )
}
