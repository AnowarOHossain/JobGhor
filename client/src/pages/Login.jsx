import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext.jsx'
import { Card, CardBody } from '../components/ui/Card'

function RoleCard({ icon, title, desc, onSignIn, onCreate }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-start gap-3">
          <div className="shrink-0 rounded-full bg-brand-50 text-brand-600 p-2">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{title}</h3>
            <p className="muted text-sm mt-1">{desc}</p>
            <div className="mt-4 flex items-center gap-3">
              <Button onClick={onSignIn}>Sign in</Button>
              <button className="btn-outline" onClick={onCreate} type="button">Create Account</button>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  )
}

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [mode, setMode] = useState('pick') // 'pick' | 'form'
  const [role, setRole] = useState('user') // 'user' | 'admin'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const startSignIn = (r) => {
    setRole(r)
    setMode('form')
  }

  const onCreate = (r) => {
    navigate(`/register?role=${r}`)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    // Demo-only: simulate login. Replace with real API call.
    login({
      token: 'demo-token',
      user: { id: 'u1', name: email.split('@')[0] || 'User', role },
    })
    window.location.href = '/'
  }

  if (mode === 'pick') {
    return (
      <section className="space-y-6">
        <h1 className="heading-2">Welcome back</h1>
        <p className="muted">Choose how you want to sign in.</p>

        <div className="grid gap-4 sm:grid-cols-2">
          <RoleCard
            title="Job Seeker"
            desc="Sign in or create account to manage your profile and applications."
            onSignIn={() => startSignIn('user')}
            onCreate={() => onCreate('user')}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-3-3.87"/><path d="M4 21v-2a4 4 0 0 1 3-3.87"/><circle cx="12" cy="7" r="4"/></svg>
            }
          />
          <RoleCard
            title="Employer / Admin"
            desc="Sign in or create account to post jobs and manage candidates."
            onSignIn={() => startSignIn('admin')}
            onCreate={() => onCreate('admin')}
            icon={
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="12" rx="2"/><path d="M7 20h10"/></svg>
            }
          />
        </div>
      </section>
    )
  }

  // Sign-in form for the chosen role
  return (
    <div className="max-w-md mx-auto">
      <button className="text-sm text-brand-600 hover:underline mb-3" onClick={() => setMode('pick')}>
        ← Choose another role
      </button>
      <h1 className="heading-2 mb-1">Sign in</h1>
      <p className="muted mb-4">Signing in as <span className="font-medium">{role === 'admin' ? 'Employer / Admin' : 'Job Seeker'}</span></p>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Name/Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button className="w-full" type="submit">Sign in</Button>
      </form>
      <div className="mt-3 text-sm">
        <span className="muted">New here?</span>{' '}
        <button className="text-brand-600 hover:underline" onClick={() => onCreate(role)}>
          Create Account
        </button>
      </div>
    </div>
  )
}
