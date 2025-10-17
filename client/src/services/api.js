import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Optionally include an AI model header if configured via VITE_AI_MODEL
api.interceptors.request.use(config => {
  const aiModel = import.meta.env.VITE_AI_MODEL
  if (aiModel) config.headers['x-ai-model'] = aiModel
  const token = localStorage.getItem('token')
  if (token) config.headers['Authorization'] = `Bearer ${token}`
  return config
})

export default api
