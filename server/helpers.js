import { join, resolve } from 'node:path'

const root = resolve()

export default {
  join(...args) {
    return join(root, ...args)
  },
}
