import { useState } from 'react'
import Input from './ui/Input'
import Button from './ui/Button'
import api from '../services/api'

/**
 * AIJobSearch
 * A compact search bar that sends a prompt/profile to /api/recommendations
 * Props:
 *  - onResults(items: Array): callback with recommendation items
 */
export default function AIJobSearch({ onResults }) {
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async (e) => {
    e?.preventDefault()
    setError('')
    setLoading(true)
    // Try to parse ad-hoc fields from a single input:
    // e.g. "Frontend React Dhaka 40k-60k mid"
    const q = query.trim()
    const body = { query: q }
    // simple salary parse (e.g., 40k-60k or 40000-60000)
    const salaryMatch = q.match(/(\d+\s*[kK]?)[\s-–to]+(\d+\s*[kK]?)/)
    if (salaryMatch) {
      const toNum = (s) => {
        const v = parseInt(s.replace(/\D/g, ''), 10) || 0
        return /k/i.test(s) ? v * 1000 : v
      }
      const min = toNum(salaryMatch[1])
      const max = toNum(salaryMatch[2])
      if (min > 0) body.salaryMin = min
      if (max > 0) body.salaryMax = max
    }

    try {
      const res = await api.post('/api/recommendations', body)
      const items = res.data?.items || []
      onResults?.(items)
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to get recommendations'
      setError(msg)
      // Graceful client-side fallback so the UI still shows something useful
      onResults?.([
        { id: 'fallback-1', title: 'Frontend Engineer', company: 'Acme', location: 'Remote' },
        { id: 'fallback-2', title: 'Backend Developer', company: 'Globex', location: 'Dhaka' },
        { id: 'fallback-3', title: 'Full Stack Developer', company: 'Initech', location: 'Chittagong' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSearch} className="w-full max-w-3xl mx-auto">
      <div className="flex gap-3">
        <Input
          placeholder="Try: Frontend React Dhaka 40k-60k mid"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="AI job search query"
          className="flex-1"
        />
        <Button type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </Button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">
          {error} — showing sample results. Set GEMINI_API_KEY in server/.env to enable real AI results.
        </p>
      )}
    </form>
  )
}
