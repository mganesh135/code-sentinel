// AuthShell — centered card layout used by Login, Register, ForgotPassword.

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div
      className="bg-grid"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '48px 24px',
      }}
    >
      <div style={{ position: 'relative', width: '100%', maxWidth: 380, zIndex: 1 }}>
        {/* Brand mark */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <span className="brand">
            <span className="brand-mark" />
            <span className="brand-name">Code Sentinel</span>
          </span>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '28px 28px 24px' }}>
          <h2 style={{ fontSize: 20, marginBottom: 6 }}>{title}</h2>
          {subtitle && (
            <p style={{ fontSize: 13.5, color: 'var(--text-3)', marginBottom: 22 }}>
              {subtitle}
            </p>
          )}
          {children}
        </div>

        {/* Footer link */}
        {footer && (
          <p style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-3)', marginTop: 18 }}>
            {footer}
          </p>
        )}
      </div>
    </div>
  )
}
