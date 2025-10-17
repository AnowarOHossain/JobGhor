import { Router } from 'express'
import { z } from 'zod'
import { verifyToken, requireRole } from '../middlewares/auth.js'

export const jobsRouter = Router()

// In-memory mock data for now
export const JOBS = [
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

const JobSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(20),
  location: z.string().min(1),
  employmentType: z.string().min(1),
  salaryRange: z.object({ min: z.number().nullable().optional(), max: z.number().nullable().optional() }).optional(),
  skills: z.array(z.string()).optional(),
  experienceLevel: z.string().min(1),
  applicationDeadline: z.string().min(1),
  contact: z.string().min(1),
  company: z.string().min(1),
})

jobsRouter.post('/', verifyToken, requireRole('admin'), (req, res) => {
  try {
    const data = JobSchema.parse(req.body || {})
    const job = {
      _id: String(Date.now()),
      ...data,
      createdBy: req.user.id,
      createdAt: new Date().toISOString(),
    }
    JOBS.push(job)
    res.json(job)
  } catch (err) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid job input' })
    res.status(500).json({ message: 'Failed to create job' })
  }
})
