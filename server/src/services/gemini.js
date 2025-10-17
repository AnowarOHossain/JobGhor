// Gemini integration using Google Generative AI SDK
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function getRecommendations({ profile, model }) {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return {
      model,
      items: [
        { id: 'mock-1', title: 'Frontend Engineer', company: 'Acme', location: 'Remote' },
        { id: 'mock-2', title: 'Backend Developer', company: 'Globex', location: 'Dhaka' },
        { id: 'mock-3', title: 'Full Stack Developer', company: 'Initech', location: 'Chittagong' },
      ],
      note: 'Mock recommendations (set GEMINI_API_KEY to enable real calls)'
    }
  }

  const genAI = new GoogleGenerativeAI(apiKey)
  // Pick a reasonable Gemini model name. You can map from Claude names if needed.
  const modelName = process.env.GEMINI_MODEL || 'gemini-1.5-flash'
  const m = genAI.getGenerativeModel({ model: modelName })

  const prompt = `Given this user profile, suggest 5 relevant job roles in JSON array with fields id, title, company, location.
Profile: ${JSON.stringify(profile)}
Output only JSON.`
  const result = await m.generateContent(prompt)
  const text = result.response.text()

  let items = []
  try {
    items = JSON.parse(text)
  } catch (_e) {
    // Fallback parse: try to extract JSON block
    const match = text.match(/\[[\s\S]*\]/)
    if (match) items = JSON.parse(match[0])
  }

  if (!Array.isArray(items)) {
    items = []
  }

  return { model, items }
}
