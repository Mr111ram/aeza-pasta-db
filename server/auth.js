import md5 from 'md5'

export const secureCatch = async (ctx, next) => {
  await next().catch((err) => {
    if (err.status === 404) {
      ctx.status = err.status
      ctx.body = `<img src="https://random.imagecdn.app/500/150"/> <br/> Protected resource, use Authorization header to get access\n`
    } else {
      throw new Error(err)
    }
  })
}

export const authRoute = async (ctx) => {
  const REFERENCE_HASH = process.env.HASH_KEY
  const body = JSON.parse(ctx.request.body)
  const hash = md5(body.payload)
  let status = false

  if (REFERENCE_HASH === hash) {
    status = true
  }

  ctx.status = 200
  ctx.body = { status }
}
