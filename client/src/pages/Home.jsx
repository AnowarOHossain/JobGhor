import Button from '../components/ui/Button'

export default function Home() {
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
    </section>
  )
}
