import { createContext, useState } from 'react'

export const AuthContext = createContext(null)

// keeps track of whether someone is logged in, across the whole app
export function AuthProvider({ children }) {
  const [username, setUsername] = useState(localStorage.getItem('username'))

  const login = (token, userId, username) => {
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('username', username)
    setUsername(username)
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('username')
    setUsername(null)
  }

  const isLoggedIn = !!localStorage.getItem('token')

  return (
    <AuthContext.Provider value={{ username, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
