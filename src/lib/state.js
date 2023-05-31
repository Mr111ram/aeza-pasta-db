export default class State {
  constructor(scheme) {
    this.callbacks = {}
    this.onMethods = ['add', 'get']
    this.store = Object.assign({}, scheme)

    Object.keys(scheme).map((key) => {
      this.onMethods.forEach((method) => {
        if (this.callbacks[key]) this.callbacks[key][method] = []
        else this.callbacks[key] = { [method]: [] }
      })
    })
  }
  get(key) {
    let value

    if (key in this.store) {
      value = this.store[key]
    }

    if (key in this.callbacks) {
      this.callbacks[key].get.forEach((cb) => cb(value, key, this))
    }

    return value
  }
  add(key, data, message) {
    if (key in this.store) {
      const current = this.store[key]
      let value = data

      if (data instanceof Object && !Array.isArray(data))
        value = Object.assign({}, data)

      if (!Array.isArray(value)) value = [value]

      if (Array.isArray(current)) this.store[key].push(...value)

      if (current instanceof Set) {
        value.forEach((item) => {
          this.store[key].add(item)
        })
      }

      if (key in this.callbacks && this.callbacks[key].add.length > 0) {
        this.callbacks[key].add.forEach((cb) => {
          cb(value, key, message, this)
        })
      }
    }
  }
  on(key, method, cb) {
    let callback, methods

    if (typeof method === 'function') {
      callback = method
      methods = Object.keys(this.onMethods)
    }
    if (typeof method === 'string') {
      methods = [method]
    }
    if (cb) callback = cb

    methods.forEach((method) => {
      this.callbacks[key][method].push(callback)
    })
  }
}
