import { useState } from 'react'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

export default function ApplyJob() {
  const [resumeUrl, setResumeUrl] = useState('')
  const [note, setNote] = useState('')

  const submit = (e) => {
    e.preventDefault()
    // TODO: call POST /api/applications
    alert('Application submitted (demo). Implement API call next.')
    setResumeUrl(''); setNote('')
  }

  return (
    <div className="max-w-lg">
      <h1 className="heading-2 mb-4">Apply to Job</h1>
      <form className="space-y-3" onSubmit={submit}>
        <Input placeholder="Resume URL" value={resumeUrl} onChange={(e) => setResumeUrl(e.target.value)} />
        <textarea className="input min-h-24" placeholder="Note (optional)" value={note} onChange={(e) => setNote(e.target.value)} />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  )
}
