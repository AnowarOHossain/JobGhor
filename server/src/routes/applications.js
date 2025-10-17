import { Router } from 'express'
import { z } from 'zod'
import { verifyToken, requireRole } from '../middlewares/auth.js'
import { JOBS } from './jobs.js'

export const applicationsRouter = Router()

const APPLICATIONS = []

const ApplySchema = z.object({
  jobId: z.string().min(1),
  resumeUrl: z.string().min(1),
  note: z.string().optional(),
})

applicationsRouter.post('/', verifyToken, async (req, res) => {
  try {
    const { jobId, resumeUrl, note } = ApplySchema.parse(req.body || {})
  const exists = JOBS.find(j => j._id === jobId)
    if (!exists) return res.status(404).json({ message: 'Job not found' })

    const duplicate = APPLICATIONS.find(a => a.jobId === jobId && a.userId === req.user.id)
    if (duplicate) return res.status(409).json({ message: 'Already applied' })

    const app = {
      _id: String(Date.now()),
      jobId,
      userId: req.user.id,
      resumeUrl,
      note: note || '',
      status: 'submitted',
      createdAt: new Date().toISOString(),
    }
    APPLICATIONS.push(app)
    res.json(app)
  } catch (err) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input' })
    res.status(500).json({ message: 'Failed to apply' })
  }
})

applicationsRouter.get('/mine', verifyToken, (req, res) => {
  const items = APPLICATIONS.filter(a => a.userId === req.user.id)
  res.json(items)
})

applicationsRouter.get('/by-job/:jobId', verifyToken, requireRole('admin'), (req, res) => {
  const items = APPLICATIONS.filter(a => a.jobId === req.params.jobId)
  res.json(items)
})
