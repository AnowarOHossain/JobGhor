import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token') || '')
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem('user')
    return u ? JSON.parse(u) : null
  })
  const role = user?.role || 'guest'

  useEffect(() => {
    if (token) localStorage.setItem('token', token)
    else localStorage.removeItem('token')
  }, [token])

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  const login = (data) => {
    setToken(data.token || '')
    setUser({ id: data.user?.id, name: data.user?.name, role: data.user?.role || 'user' })
  }

  const logout = () => {
    setToken('')
    setUser(null)
  }

  const value = useMemo(() => ({ token, user, role, login, logout }), [token, user, role])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
