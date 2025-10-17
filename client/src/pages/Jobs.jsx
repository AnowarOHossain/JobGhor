import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../services/api'
import { Card, CardBody, CardTitle } from '../components/ui/Card'

export default function Jobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    api.get('/api/jobs')
      .then(res => { if (mounted) setJobs(res.data || []) })
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [])

  if (loading) return <p>Loading jobs...</p>
  if (error) return <p className="text-red-600">{error}</p>

  return (
    <div className="space-y-6">
      <h1 className="heading-2">Jobs</h1>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.map(job => (
          <li key={job._id}>
            <Card>
              <CardBody>
                <CardTitle>{job.title}</CardTitle>
                <p className="muted text-sm">{job.company} • {job.location}</p>
                <div className="mt-4">
                  <Link to={`/jobs/${job._id}`} className="text-brand-600 hover:underline">View details</Link>
                </div>
              </CardBody>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  )
}
