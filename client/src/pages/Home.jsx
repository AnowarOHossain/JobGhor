import { useState } from 'react'
import Button from '../components/ui/Button'
import AIJobSearch from '../components/AIJobSearch'

export default function Home() {
  const [recs, setRecs] = useState([])

  return (
    <section className="py-8 sm:py-14">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="heading-1">Simple solutions for job search</h1>
        <p className="mt-4 muted">
          Discover your next opportunity. Search curated roles, apply in minutes, and track your applications—all in one place.
        </p>
        <div className="mt-8 flex items-center justify-center gap-3">
          <a href="/jobs"><Button>Browse Jobs</Button></a>
          <a href="/profile"><Button variant="outline">Build Profile</Button></a>
        </div>
        <div className="mt-6">
          <AIJobSearch onResults={setRecs} />
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Relevant Matches', desc: 'AI-powered recommendations tailored to your profile.' },
          { title: 'Fast Applications', desc: 'One-click apply with your saved profile and resume.' },
          { title: 'Stay Organized', desc: 'Track applications and manage interviews with ease.' },
        ].map((f) => (
          <div key={f.title} className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="muted mt-1">{f.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 space-y-3">
        <h2 className="heading-2">Recommended for you</h2>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recs.map((r) => (
            <li key={r.id} className="card">
              <div className="card-body">
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <p className="muted text-sm">{r.company} • {r.location}</p>
                {typeof r.matchScore === 'number' && (
                  <p className="text-xs mt-1 text-brand-700 dark:text-brand-300">Match score: {r.matchScore}%</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
