import { createReadStream, readFileSync, writeFileSync } from 'node:fs'
import { join, resolve } from 'node:path'

import Router from 'koa-router'
// import { authRoute } from './auth.js'

const router = Router()

const root = resolve()
const indexHtml = join(root, 'web', 'index.html')
// const authHtml = join(root, 'web', 'auth.html')
const dbJson = join(root, 'db', 'db.json')
const logFile = join(root, 'error.log')

router.get('/', async (ctx) => {
  const stream = createReadStream(indexHtml)

  ctx.response.set('content-type', 'txt/html')
  ctx.type = 'html'
  ctx.body = stream
})

// router.get('/auth/', async (ctx) => {
//   const stream = createReadStream(authHtml)

//   ctx.response.set('content-type', 'txt/html')
//   ctx.type = 'html'
//   ctx.body = stream
// })

// router.post('/auth/', authRoute)

router.get('/api/db', async (ctx) => {
  const raw_db = readFileSync(dbJson)

  ctx.response.set('content-type', 'application/json;charset=utf-8')
  ctx.type = 'json'
  ctx.body = JSON.parse(raw_db.toString())
})

router.get('/api/log', async (ctx) => {
  const log = readFileSync(logFile)

  ctx.response.set('content-type', 'text/html;charset=utf-8')
  ctx.type = 'html'
  ctx.body = `<code><pre>${log.toString()}</pre></code>`
})

router.post('/api/append_card', async (ctx) => {
  const card = JSON.parse(ctx.request.body)
  const db = JSON.parse(readFileSync(dbJson, 'utf8'))

  db.cards.push(card)

  db.tags.push(...card.tags)
  db.tags = [...new Set(db.tags)]

  try {
    writeFileSync(dbJson, JSON.stringify(db))
  } catch (e) {
    console.error(e)
  }

  ctx.body = { success: true }
})

router.post('/api/delete_card', async (ctx) => {
  const body = JSON.parse(ctx.request.body)
  const db = JSON.parse(readFileSync(dbJson, 'utf8'))
  const newCards = []

  db.cards.forEach((card) => {
    if (card.text !== body.text && card.description !== body.description) {
      newCards.push(card)
    }
  })

  db.cards = newCards

  try {
    writeFileSync(dbJson, JSON.stringify(db))
  } catch (e) {
    ctx.status = 404
    ctx.body = { success: false }
  }

  ctx.status = 200
  ctx.body = { success: true }
})

export default router
