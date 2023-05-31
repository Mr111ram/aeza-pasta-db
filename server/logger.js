import { log } from 'node:console'

export const responseLogger = async (ctx, next) => {
  await next()

  const responseTime = ctx.response.get('X-Response-Time')
  log(`${ctx.method} ${ctx.url} - ${responseTime}`)
}

export const responseTime = async (ctx, next) => {
  const start = Date.now()

  await next()

  const difference = Date.now() - start
  ctx.set('X-Response-Time', `${difference}ms`)
}
