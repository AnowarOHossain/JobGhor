import 'dotenv/config'

// Basic env validation / defaults
process.env.PORT ||= '5000'
process.env.DEFAULT_AI_MODEL ||= 'claude-sonnet-4.5'
process.env.JWT_SECRET ||= 'dev-secret'
