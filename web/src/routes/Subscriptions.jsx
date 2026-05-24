import { useState } from 'react'
import AppShell from '../components/AppShell.jsx'
import { Icon } from '../components/icons.jsx'

const TIERS = [
  {
    id: 'pro',
    name: 'Pro',
    tagline: 'For individual developers shipping side projects and small repos.',
    priceM: 19, priceY: 15,
    cta: 'Current plan', ctaVariant: 'ghost', current: true,
    features: [
      'Up to 500 scans / month',
      '3 connected repositories',
      'All scanners (SAST, secrets, deps)',
      'Email support',
      'Community ruleset',
    ],
  },
  {
    id: 'max',
    name: 'Max',
    tagline: 'For teams that want unlimited scanning and faster ship cycles.',
    priceM: 49, priceY: 39,
    cta: 'Upgrade to Max', ctaVariant: 'accent', highlight: true,
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
    id: 'ent',
    name: 'Enterprise',
    tagline: 'For organizations with compliance, SSO and procurement needs.',
    priceM: null, priceY: null,
    cta: 'Talk to sales', ctaVariant: 'ghost',
    features: [
      'Everything in Max',
      'Unlimited repositories & seats',
      'SAML SSO, SCIM provisioning',
      'Self-hosted / on-prem option',
      'SOC 2 Type II, BAA available',
      'Dedicated solutions engineer',
    ],
  },
]

const FAQ = [
  { q: 'Can I switch plans later?',  a: 'Yes — upgrade or downgrade any time from this page. We pro-rate the difference automatically.' },
  { q: 'What counts as a "scan"?',   a: 'A scan is a single sentinel scan invocation against a repository. Re-running on the same commit is free.' },
  { q: 'Do you offer a free plan?',  a: 'Sentinel CLI is free for personal use on public repos forever. Pro unlocks private repos and team features.' },
  { q: 'Which payment methods?',     a: 'All major cards via Stripe. Annual Enterprise plans can also be invoiced by ACH or wire.' },
]

export default function Subscriptions() {
  const [period, setPeriod] = useState('monthly')

  return (
    <AppShell>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>

        {/* ── Header ── */}
        <header style={{ textAlign: 'center', maxWidth: 640, margin: '8px auto 0' }}>
          <div style={{ fontSize: 11.5, color: 'var(--accent-hover)', fontWeight: 510, letterSpacing: 0.08, textTransform: 'uppercase', marginBottom: 12 }}>
            Plans &amp; pricing
          </div>
          <h1 style={{ fontSize: 36, letterSpacing: '-0.03em' }}>Pick a plan that scales with you.</h1>
          <p style={{ fontSize: 15.5, marginTop: 12, color: 'var(--text-3)' }}>
            Start on Pro, upgrade when you outgrow it, and switch to Enterprise when procurement asks. Cancel any time.
          </p>

          {/* Billing toggle */}
          <div style={{ display: 'inline-flex', marginTop: 22, padding: 4, background: 'var(--surface)', borderRadius: 10, border: '1px solid var(--border)' }}>
            {['monthly', 'yearly'].map((p) => (
              <button key={p} onClick={() => setPeriod(p)} style={{
                padding: '6px 14px', borderRadius: 7, fontSize: 13, border: 0, cursor: 'pointer',
                background: period === p ? '#fff' : 'transparent',
                color: period === p ? 'var(--text)' : 'var(--text-3)',
                fontWeight: period === p ? 510 : 450,
                boxShadow: period === p ? 'var(--shadow-sm)' : 'none',
                display: 'inline-flex', alignItems: 'center', gap: 6,
              }}>
                {p === 'monthly' ? 'Monthly' : 'Yearly'}
                {p === 'yearly' && (
                  <span className="badge badge-accent" style={{ height: 18, fontSize: 10.5, padding: '0 6px' }}>−20%</span>
                )}
              </button>
            ))}
          </div>
        </header>

        {/* ── Tier cards ── */}
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {TIERS.map((t) => (
            <div key={t.id} className="card" style={{
              padding: 26, display: 'flex', flexDirection: 'column', gap: 18, position: 'relative',
              borderColor: t.highlight ? 'var(--text)' : 'var(--border)',
              boxShadow: t.highlight ? '0 24px 48px -16px rgba(20,18,14,0.18), 0 0 0 1px var(--text)' : 'var(--shadow-sm)',
            }}>
              {t.highlight && (
                <span style={{ position: 'absolute', top: -10, right: 22, background: 'var(--text)', color: '#fff', fontSize: 10.5, fontWeight: 520, letterSpacing: 0.06, textTransform: 'uppercase', padding: '4px 9px', borderRadius: 999 }}>
                  Most popular
                </span>
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
                      / user / month
                      {period === 'yearly' && <span style={{ color: 'var(--text-4)' }}>, billed yearly</span>}
                    </span>
                  </>
                ) : (
                  <span style={{ fontSize: 32, fontWeight: 520, letterSpacing: '-0.025em' }}>Custom</span>
                )}
              </div>

              <button className={`btn btn-${t.ctaVariant} btn-block`} style={{ height: 42, fontSize: 14 }} disabled={t.current}>
                {t.cta}
              </button>

              <hr className="divider" />

              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {t.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 9, fontSize: 13.5, color: 'var(--text-2)' }}>
                    <span style={{ flex: '0 0 16px', width: 16, height: 16, borderRadius: 999, background: 'var(--surface-2)', color: 'var(--success)', display: 'grid', placeItems: 'center', marginTop: 2 }}>
                      <Icon.Check size={11} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* ── Enterprise CTA ── */}
        <section className="card" style={{ padding: '22px 26px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <div style={{ width: 38, height: 38, borderRadius: 9, background: 'var(--surface-2)', border: '1px solid var(--border)', display: 'grid', placeItems: 'center' }}>
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

        {/* ── FAQ ── */}
        <section>
          <h2 style={{ marginBottom: 18 }}>Frequently asked</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {FAQ.map((f, i) => (
              <div key={i} className="card" style={{ padding: '16px 18px' }}>
                <div style={{ fontSize: 14, fontWeight: 510, marginBottom: 6 }}>{f.q}</div>
                <p style={{ fontSize: 13.5, lineHeight: 1.55 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </AppShell>
  )
}
