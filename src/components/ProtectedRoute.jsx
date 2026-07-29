import { Navigate } from 'react-router-dom'

// wraps pages that should only be visible when logged in
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute
