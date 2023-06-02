import Koa from 'koa'
import { koaBody } from 'koa-body'
import Static from 'koa-static'
import helmet from 'koa-helmet'
import session from 'koa-session'

import router from './router.js'
import helpers from './helpers.js'
import loggerMiddleware, { logger } from './logger.js'
import { secureCatch } from './auth.js'

const SESSION_CONFIG = {
  key: 'session',
  maxAge: 86400,
  httpOnly: true,
  signed: true,
}

export default async function server({ LOG, PORT }) {
  const staticFiles = helpers.join('web', 'assets')

  const app = new Koa()

  app.keys = [process.env.SECRET]

  LOG && app.use(loggerMiddleware)

  app
    .use(koaBody())
    .use(session(SESSION_CONFIG, app))
    .use(helmet.dnsPrefetchControl())
    .use(helmet.expectCt())
    .use(helmet.frameguard())
    .use(helmet.hidePoweredBy())
    .use(helmet.hsts())
    .use(helmet.ieNoOpen())
    .use(helmet.noSniff())
    .use(helmet.permittedCrossDomainPolicies())
    .use(helmet.referrerPolicy())
    .use(helmet.xssFilter())
    .use(secureCatch)
    .use(Static(staticFiles))
    .use(router.routes())
    .use(router.allowedMethods())

  app.listen(PORT, () => {
    logger.log(`Server has start on ::${PORT}`)
  })
}
