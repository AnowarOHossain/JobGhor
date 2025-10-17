import { useEffect, useState } from 'react'
import api from '../services/api'

export default function MyApplications() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    api.get('/api/applications/mine')
      .then(res => { if (mounted) setItems(res.data || []) })
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  return (
    <section className="space-y-4">
      <h1 className="heading-2">My Applications</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && items.length === 0 && (
        <p className="muted">No applications yet.</p>
      )}
      <ul className="grid gap-3">
        {items.map((a) => (
          <li key={a._id} className="card">
            <div className="card-body">
              <p className="font-medium">Application ID: {a._id}</p>
              <p className="muted text-sm">Status: {a.status} • Applied: {new Date(a.createdAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
