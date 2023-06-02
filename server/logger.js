import { createWriteStream } from 'node:fs'
import { Console } from 'node:console'

const PROD = true

export const logger = new Console({
  stdout: process.stdout,
  stderr:
    process.env.NODE_ENV === 'production' || PROD
      ? createWriteStream('./error.log')
      : process.stderr,
})

console.log(process.env.NODE_ENV)

export default async function loggerMiddleware(ctx, next) {
  const start = Date.now()

  try {
    await next()
  } catch (error) {
    logger.error(error)
  }

  const difference = Date.now() - start

  ctx.set('X-Response-Time', `${difference}ms`)
  logger.log(`${ctx.method} ${ctx.url} - ${difference}ms`)
}
