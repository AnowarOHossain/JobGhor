import { useState, useMemo } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'
import { useAuth } from '../context/AuthContext.jsx'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

export default function AdminPostJob() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const autoCompany = useMemo(() => user?.company || user?.name || '', [user])

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [employmentType, setEmploymentType] = useState('Full-time')
  const [salaryMin, setSalaryMin] = useState('')
  const [salaryMax, setSalaryMax] = useState('')
  const [skills, setSkills] = useState('') // comma-separated
  const [experienceLevel, setExperienceLevel] = useState('Entry')
  const [deadline, setDeadline] = useState('')
  const [contactMethod, setContactMethod] = useState('') // email or URL
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const requiredMissing = () => {
    if (!title?.trim()) return 'Job Title is required'
    if (!description?.trim()) return 'Job Description is required'
    if (!location?.trim()) return 'Location is required'
    if (!employmentType?.trim()) return 'Employment Type is required'
    if (!experienceLevel?.trim()) return 'Experience Level is required'
    if (!deadline?.trim()) return 'Application Deadline is required'
    if (!contactMethod?.trim()) return 'Contact/Application Method is required'
    // simple sanity checks
    if (description.trim().length < 20) return 'Job Description should be at least 20 characters'
    return ''
  }

  const submit = async (e) => {
    e.preventDefault()
    const miss = requiredMissing()
    if (miss) { setError(miss); return }
    setError('')
    const payload = {
      title: title.trim(),
      description: description.trim(),
      location: location.trim(),
      employmentType,
      salaryRange: {
        min: salaryMin ? Number(salaryMin) : null,
        max: salaryMax ? Number(salaryMax) : null,
      },
      skills: skills
        .split(',')
        .map(s => s.trim())
        .filter(Boolean),
      experienceLevel,
      applicationDeadline: deadline,
      contact: contactMethod.trim(),
      company: autoCompany,
    }
    try {
      setLoading(true)
      const res = await api.post('/api/jobs', payload)
      // success -> go to jobs list or job details
      navigate('/jobs')
    } catch (err) {
      const msg = err?.response?.data?.message || err.message || 'Failed to post job'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="heading-2 mb-4">Post Job</h1>
      <form className="space-y-4" onSubmit={submit}>
        <div>
          <label className="text-sm font-medium">Job Title *</label>
          <Input placeholder="e.g., Frontend Engineer" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label className="text-sm font-medium">Job Description *</label>
          <textarea className="input min-h-32" placeholder="Describe responsibilities, requirements, and perks" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Location *</label>
            <Input placeholder="City / Remote" value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Employment Type *</label>
            <select className="input" value={employmentType} onChange={(e) => setEmploymentType(e.target.value)}>
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Temporary</option>
              <option>Remote</option>
            </select>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Salary Min</label>
            <Input type="number" placeholder="e.g., 30000" value={salaryMin} onChange={(e) => setSalaryMin(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Salary Max</label>
            <Input type="number" placeholder="e.g., 60000" value={salaryMax} onChange={(e) => setSalaryMax(e.target.value)} />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">Required Skills / Qualifications</label>
          <Input placeholder="Comma-separated, e.g., React, Node, REST" value={skills} onChange={(e) => setSkills(e.target.value)} />
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">Experience Level *</label>
            <select className="input" value={experienceLevel} onChange={(e) => setExperienceLevel(e.target.value)}>
              <option>Entry</option>
              <option>Mid</option>
              <option>Senior</option>
              <option>Lead</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Application Deadline *</label>
            <Input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 items-end">
          <div>
            <label className="text-sm font-medium">Contact / Application Method *</label>
            <Input placeholder="Email or application URL" value={contactMethod} onChange={(e) => setContactMethod(e.target.value)} />
          </div>
          <div>
            <label className="text-sm font-medium">Company Name & Profile</label>
            <Input value={autoCompany} readOnly />
          </div>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <Button type="submit" disabled={loading}>{loading ? 'Publishing…' : 'Publish Job'}</Button>
      </form>
    </div>
  )
}
