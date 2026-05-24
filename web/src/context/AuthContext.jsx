import { createContext, useContext, useState } from 'react'

// ---------------------------------------------------------------------------
// Stub user — replace with real session data once the gateway is wired up.
// ---------------------------------------------------------------------------
const STUB_USER = {
  name: 'Alex Tran',
  firstName: 'Alex',
  email: 'alex@vector.dev',
  initials: 'AT',
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  // `user` is null when logged out, an object when logged in.
  // Initialise with STUB_USER so every protected route works out of the box.
  // Swap the initial value to `null` to exercise the login redirect.
  const [user, setUser] = useState(STUB_USER)

  /** Call with user data on successful login. */
  const login = (userData) => setUser(userData)

  /** Call on logout — clears session and redirects are handled by AuthGuard. */
  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Hook — returns { user, login, logout }. */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
