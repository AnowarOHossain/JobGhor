import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Ensure Claude Sonnet 4.5 is enabled for all client requests via a default header
api.interceptors.request.use(config => {
  const aiModel = import.meta.env.VITE_AI_MODEL || 'claude-sonnet-4.5'
  config.headers['x-ai-model'] = aiModel
  const token = localStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default api
