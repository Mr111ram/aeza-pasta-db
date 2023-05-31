import Koa from 'koa'
import { koaBody } from 'koa-body'
import Static from 'koa-static'

import { join, resolve } from 'node:path'
import { log } from 'node:console'

import router from './router.js'

export default async function server({ LOG, PORT }) {
  const staticFiles = join(resolve(), 'web', 'assets')

  const app = new Koa()

  if (LOG) {
    const { responseLogger, responseTime } = await import('./logger.js')

    app.use(responseLogger).use(responseTime)
  }

  app
    .use(koaBody())
    .use(Static(staticFiles))
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(PORT, () => {
    log(`Server has start on ::${PORT}`)
  })
}
