import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

function Navbar() {
  const { username, isLoggedIn, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">Student Task Manager</Link>

        {isLoggedIn && (
          <div className="d-flex align-items-center">
            <span className="text-white me-3">Hi, {username}</span>
            <Link className="btn btn-outline-light btn-sm me-2" to="/dashboard">Dashboard</Link>
            <Link className="btn btn-outline-light btn-sm me-2" to="/tasks">My Tasks</Link>
            <button className="btn btn-light btn-sm" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
