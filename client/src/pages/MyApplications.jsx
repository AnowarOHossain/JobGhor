export default function MyApplications() {
  // TODO: fetch from /api/applications/mine
  const items = [
    { id: 'a1', title: 'Frontend Engineer', company: 'Acme', status: 'Under review' },
  ]
  return (
    <section className="space-y-4">
      <h1 className="heading-2">My Applications</h1>
      <ul className="grid gap-3">
        {items.map((a) => (
          <li key={a.id} className="card">
            <div className="card-body">
              <p className="font-medium">{a.title} — {a.company}</p>
              <p className="muted text-sm">{a.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
