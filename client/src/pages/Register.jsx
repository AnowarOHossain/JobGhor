import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    // TODO: call backend to create account
    alert('Account created (demo). Implement API call next.')
    setName(''); setEmail(''); setPassword(''); setConfirm('')
  }

  return (
    <div className="max-w-md mx-auto">
      <h1 className="heading-2 mb-4">Create Account</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <Input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Input type="password" placeholder="Confirm Password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button className="w-full" type="submit">Create Account</Button>
      </form>
    </div>
  )
}
