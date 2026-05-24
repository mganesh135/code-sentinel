import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

/**
 * AuthGuard — wraps protected routes.
 *
 * If the user is not authenticated it redirects to /login and records the
 * attempted URL in `state.from` so Login can redirect back after sign-in.
 *
 * Replace the `user` check with a real token/session validation once the
 * gateway auth endpoints are implemented.
 */
export default function AuthGuard() {
  const { user } = useAuth()

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
