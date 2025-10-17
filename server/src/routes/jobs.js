import { Router } from 'express'

export const jobsRouter = Router()

// In-memory mock data for now
const JOBS = [
  { _id: '1', title: 'Frontend Engineer', company: 'Acme', location: 'Remote', description: 'Build delightful UIs with React.' },
  { _id: '2', title: 'Backend Developer', company: 'Globex', location: 'Dhaka', description: 'Design APIs and services with Node.js.' },
  { _id: '3', title: 'Full Stack Developer', company: 'Initech', location: 'Chittagong', description: 'Own features end-to-end.' },
]

jobsRouter.get('/', (req, res) => {
  res.json(JOBS)
})

jobsRouter.get('/:id', (req, res) => {
  const job = JOBS.find(j => j._id === req.params.id)
  if (!job) return res.status(404).json({ message: 'Job not found' })
  res.json(job)
})
