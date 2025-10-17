import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import api from '../services/api'

export default function ApplyJob() {
  const navigate = useNavigate()
  const location = useLocation()
  const jobId = useMemo(() => new URLSearchParams(location.search).get('jobId') || '', [location.search])
  const [resumeUrl, setResumeUrl] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    if (!jobId) { setError('Missing job id'); return }
    setError('')
    try {
      setLoading(true)
      await api.post('/api/applications', { jobId, resumeUrl, note })
      navigate('/applications')
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to submit application'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-lg">
      <h1 className="heading-2 mb-4">Apply to Job</h1>
      <form className="space-y-3" onSubmit={submit}>
        <Input placeholder="Resume URL" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
        <textarea className="input min-h-24" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Submitting…' : 'Submit'}</Button>
      </form>
    </div>
  )
}
