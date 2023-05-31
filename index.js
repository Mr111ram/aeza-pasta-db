import * as dotenv from 'dotenv'

import server from './server/server.js'

dotenv.config()

const PORT = process.env.PORT ?? 3000
const HOST = process.env.HOST ?? 'localhost'
const LOG = process.env.LOG === 'true' ?? true

server({ PORT, HOST, LOG })
