import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { recommendationsRouter } from './routes/recommendations.js'

const app = express()

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))

app.get('/api/health', (req, res) => res.json({ ok: true }))
app.use('/api/recommendations', recommendationsRouter)

export default app
