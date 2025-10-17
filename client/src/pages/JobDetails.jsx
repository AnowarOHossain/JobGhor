import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'
import Button from '../components/ui/Button'

export default function JobDetails() {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true
    api.get(`/api/jobs/${id}`)
      .then(res => { if (mounted) setJob(res.data) })
      .catch(err => setError(err?.response?.data?.message || err.message))
      .finally(() => setLoading(false))
    return () => { mounted = false }
  }, [id])

  if (loading) return <p>Loading job...</p>
  if (error) return <p className="text-red-600">{error}</p>
  if (!job) return <p>Job not found.</p>

  return (
    <article className="space-y-4">
      <div>
        <h1 className="heading-2">{job.title}</h1>
        <p className="muted">{job.company} • {job.location}</p>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p>{job.description}</p>
      </div>
      <Button className="mt-2">Apply</Button>
    </article>
  )
}
