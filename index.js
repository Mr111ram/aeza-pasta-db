import * as dotenv from 'dotenv'

import server from './server/server.js'

dotenv.config()

server({
  PORT: process.env.PORT ?? 3000,
  HOST: process.env.HOST ?? 'localhost',
  LOG: process.env.LOG === 'true' ?? true,
})
