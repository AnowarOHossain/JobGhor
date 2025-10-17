import { Router } from 'express'
import { z } from 'zod'
import { getRecommendations } from '../services/gemini.js'

export const recommendationsRouter = Router()

const ProfileSchema = z.object({
  title: z.string().optional(),
  skills: z.array(z.string()).optional(),
  location: z.string().optional(),
  experience: z.string().optional(),
})

recommendationsRouter.post('/', async (req, res) => {
  try {
    const profile = ProfileSchema.parse(req.body || {})
    const model = req.header('x-ai-model') || process.env.DEFAULT_AI_MODEL || 'claude-sonnet-4.5'
    const result = await getRecommendations({ profile, model })
    res.json(result)
  } catch (err) {
    console.error('[recommendations] error', err)
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid profile input' })
    res.status(500).json({ message: 'Failed to generate recommendations' })
  }
})
