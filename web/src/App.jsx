import { Routes, Route, Navigate } from 'react-router-dom'
import AuthGuard from './guards/AuthGuard.jsx'
import Login from './routes/Login.jsx'
import Register from './routes/Register.jsx'
import ForgotPassword from './routes/ForgotPassword.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Subscriptions from './routes/Subscriptions.jsx'
import Account from './routes/Account.jsx'
import CliAuth from './routes/CliAuth.jsx'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/cli-auth" element={<CliAuth />} />

      {/* Protected routes — wrapped by AuthGuard */}
      <Route element={<AuthGuard />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subscriptions" element={<Subscriptions />} />
        <Route path="/account" element={<Account />} />
      </Route>

      {/* Default redirect */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
