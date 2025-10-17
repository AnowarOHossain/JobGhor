import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProtectedRoute({ children, role: requiredRole }) {
  const { token, role } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  if (requiredRole && role !== requiredRole) return <Navigate to="/" replace />
  return children
}
