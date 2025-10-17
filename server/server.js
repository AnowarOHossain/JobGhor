import './src/env.js'
import app from './src/app.js'

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`[server] listening on http://localhost:${port}`)
})
