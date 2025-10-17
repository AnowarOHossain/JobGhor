import { Router } from 'express'
import { z } from 'zod'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { createUser, findByEmail, findByName } from '../stores/users.js'

export const authRouter = Router()

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin']).optional(),
})

authRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = RegisterSchema.parse(req.body || {})
    if (findByEmail(email)) return res.status(409).json({ message: 'Email already exists' })
    const passwordHash = await bcrypt.hash(password, 10)
    const id = String(Date.now())
    const user = createUser({ id, name, email, passwordHash, role: role || 'user' })
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input' })
    res.status(500).json({ message: 'Failed to register' })
  }
})

const LoginSchema = z.object({
  emailOrName: z.string().min(1),
  password: z.string().min(6),
})

authRouter.post('/login', async (req, res) => {
  try {
    const { emailOrName, password } = LoginSchema.parse(req.body || {})
    const user = findByEmail(emailOrName) || findByName(emailOrName)
    if (!user) return res.status(404).json({ message: 'User not found' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, process.env.JWT_SECRET || 'dev-secret', { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } })
  } catch (err) {
    if (err?.name === 'ZodError') return res.status(400).json({ message: 'Invalid input' })
    res.status(500).json({ message: 'Failed to login' })
  }
})
