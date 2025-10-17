import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { recommendationsRouter } from './routes/recommendations.js'
import { jobsRouter } from './routes/jobs.js'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/recommendations', recommendationsRouter)
app.use('/api/jobs', jobsRouter)

export default app
