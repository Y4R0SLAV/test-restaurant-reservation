import { createServer } from 'node:http'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORT = Number(process.env.PORT) || 3000

const booking = JSON.parse(
  readFileSync(join(__dirname, 'data', 'booking.json'), 'utf-8'),
)

const routes = {
  'GET /api/booking': () => booking,
}

function sendJson(res, status, body) {
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
  })
  res.end(JSON.stringify(body))
}

createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    })
    res.end()
    return
  }

  const key = `${req.method} ${req.url?.split('?')[0]}`
  const handler = routes[key]

  if (!handler) {
    sendJson(res, 404, { error: 'Not found' })
    return
  }

  sendJson(res, 200, handler())
}).listen(PORT, () => {
  console.log(`API server http://localhost:${PORT}`)
  console.log(`  GET /api/booking`)
})
