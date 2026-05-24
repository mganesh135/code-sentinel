// AppShell — sticky top nav + main content area for authenticated pages.
// Navigation is router-aware: active state comes from the current pathname.

import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { Icon } from './icons.jsx'

const NAV_ITEMS = [
  { path: '/dashboard',     label: 'Product' },
  { path: '/subscriptions', label: 'Subscription' },
  { path: '/account',       label: 'Account' },
]

function MenuItem({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: 9,
        padding: '8px 10px',
        background: 'transparent',
        border: 0,
        borderRadius: 6,
        color: 'var(--text-2)',
        fontSize: 13.5,
        cursor: 'pointer',
        textAlign: 'left',
      }}
      onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--surface-2)')}
      onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
    >
      <span style={{ color: 'var(--text-3)' }}>{icon}</span>
      {label}
    </button>
  )
}

export default function AppShell({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', flexDirection: 'column' }}>
      {/* ── Top nav ── */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '0 28px',
            height: 60,
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
        >
          {/* Brand */}
          <Link to="/dashboard" className="brand" style={{ textDecoration: 'none' }}>
            <span className="brand-mark" />
            <span className="brand-name">Code Sentinel</span>
          </Link>

          {/* Primary nav */}
          <nav style={{ display: 'flex', gap: 4, marginLeft: 8 }}>
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.path}
                to={n.path}
                style={{
                  padding: '7px 11px',
                  fontSize: 13.5,
                  borderRadius: 7,
                  color: pathname === n.path ? 'var(--text)' : 'var(--text-3)',
                  background: pathname === n.path ? 'var(--surface-2)' : 'transparent',
                  fontWeight: pathname === n.path ? 510 : 450,
                  textDecoration: 'none',
                  transition: 'all 0.12s',
                }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div style={{ flex: 1 }} />

          {/* Docs link */}
          <a
            href="#"
            style={{
              fontSize: 13,
              color: 'var(--text-3)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
            }}
          >
            <Icon.Book size={14} /> Docs
          </a>

          <span style={{ width: 1, height: 20, background: 'var(--border)' }} />

          {/* User menu */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setMenuOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'transparent',
                border: 0,
                padding: '4px 6px 4px 4px',
                borderRadius: 999,
                cursor: 'pointer',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 999,
                  background: 'var(--text)',
                  color: '#fff',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 11.5,
                  fontWeight: 560,
                  letterSpacing: 0.04,
                }}
              >
                {user?.initials}
              </span>
              <Icon.Chevron size={13} />
            </button>

            {menuOpen && (
              <div
                className="card"
                style={{
                  position: 'absolute',
                  right: 0,
                  top: 'calc(100% + 6px)',
                  minWidth: 220,
                  padding: 6,
                  boxShadow: 'var(--shadow-lg)',
                }}
                onClick={() => setMenuOpen(false)}
              >
                <div style={{ padding: '8px 10px 6px' }}>
                  <div style={{ fontSize: 13.5, fontWeight: 500 }}>{user?.name}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--text-3)' }}>{user?.email}</div>
                </div>
                <hr className="divider" style={{ margin: '4px 0' }} />
                <MenuItem icon={<Icon.User size={14} />} label="Account settings" onClick={() => navigate('/account')} />
                <MenuItem icon={<Icon.Tag size={14} />} label="Subscription" onClick={() => navigate('/subscriptions')} />
                <MenuItem icon={<Icon.Book size={14} />} label="Documentation" onClick={() => {}} />
                <hr className="divider" style={{ margin: '4px 0' }} />
                <MenuItem icon={<Icon.Logout size={14} />} label="Sign out" onClick={handleLogout} />
              </div>
            )}
          </div>
        </div>
      </header>

      {/* ── Page content ── */}
      <main
        style={{
          flex: 1,
          maxWidth: 1180,
          margin: '0 auto',
          padding: '40px 28px 80px',
          width: '100%',
        }}
      >
        {children}
      </main>
    </div>
  )
}
