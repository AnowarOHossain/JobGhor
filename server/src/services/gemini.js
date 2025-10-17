// Gemini integration using Google Generative AI SDK
import { GoogleGenerativeAI } from '@google/generative-ai'

function mockWithScores(profile) {
  const q = (profile?.query || '').toLowerCase()
  const wantTitle = (profile?.title || '').toLowerCase()
  const wantLoc = (profile?.location || '').toLowerCase()
  const wantSkills = (profile?.skills || []).map(s => s.toLowerCase())

  const base = [
    { id: 'mock-1', title: 'Frontend Engineer', company: 'Acme', location: 'Remote', skills: ['react', 'js'] },
    { id: 'mock-2', title: 'Backend Developer', company: 'Globex', location: 'Dhaka', skills: ['node', 'api'] },
    { id: 'mock-3', title: 'Full Stack Developer', company: 'Initech', location: 'Chittagong', skills: ['react', 'node'] },
  ]

  const scored = base.map(item => {
    let score = 0
    const titleLc = item.title.toLowerCase()
    const locLc = item.location.toLowerCase()
    if (q) {
      if (titleLc.includes(q)) score += 40
      if (locLc.includes(q)) score += 20
      if (item.skills.some(s => q.includes(s))) score += 20
    }
    if (wantTitle && titleLc.includes(wantTitle)) score += 30
    if (wantLoc && locLc.includes(wantLoc)) score += 20
    if (wantSkills.length) {
      const overlaps = item.skills.filter(s => wantSkills.includes(s)).length
      score += overlaps * 15
    }
    return { ...item, matchScore: Math.min(100, score) }
  }).sort((a, b) => b.matchScore - a.matchScore)

  return scored
}

export async function getRecommendations({ profile, model }) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return { model, items: mockWithScores(profile), note: 'Mock recommendations (set GEMINI_API_KEY to enable real calls)' }
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  // Pick a reasonable Gemini model name. You can map from Claude names if needed.
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  const m = genAI.getGenerativeModel({ model: modelName })

  const prompt = `You are a job matching engine. Given this profile, return a JSON array of 5 recommended jobs.
Each object MUST have: id, title, company, location, matchScore (0-100 integer).
Consider job title, skills, location, experience, and salary. Output ONLY JSON.
Profile: ${JSON.stringify(profile)}`
  let items = []
  try {
    const result = await m.generateContent(prompt)
    const text = result.response.text()

    try {
      items = JSON.parse(text)
    } catch (_e) {
      // Fallback parse: try to extract JSON block
      const match = text.match(/\[[\s\S]*\]/)
      if (match) items = JSON.parse(match[0])
    }
  } catch (err) {
    // Graceful fallback on any SDK/network/auth errors
    return { model, items: mockWithScores(profile), note: 'AI service error; returning mock recommendations' }
  }

  if (!Array.isArray(items)) items = []
  items = items.map((it, idx) => ({
    id: it.id || `gem-${idx + 1}`,
    title: it.title,
    company: it.company,
    location: it.location,
    matchScore: typeof it.matchScore === 'number' ? Math.max(0, Math.min(100, Math.round(it.matchScore))) : undefined,
  }))

  return { model, items }
}
