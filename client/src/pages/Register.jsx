import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../services/api'
import { useAuth } from '../context/AuthContext.jsx'

export default function Register() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const role = useMemo(() => {
    const q = new URLSearchParams(location.search)
    const r = q.get('role')
    return r === 'admin' ? 'admin' : 'user'
  }, [location.search])

  const onSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)
    try {
      const res = await api.post('/api/auth/register', { name, email, password, role })
      const { token, user } = res.data || {}
      if (!token || !user) throw new Error('Invalid response')
      // auto-login
      login({ token, user })
      navigate('/')
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to register'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="heading-2 mb-1">Create Account</h1>
      <p className="muted mb-4">Registering as <span className="font-medium">{role === 'admin' ? 'Employer / Admin' : 'Job Seeker'}</span></p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button className="w-full" type="submit" disabled={loading}>{loading ? 'Creating…' : 'Create Account'}</Button>
      </form>
    </div>
  )
}
