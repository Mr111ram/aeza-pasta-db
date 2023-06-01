let memSelector = ''
const handlers = {
  view: [],
  delete: [],
  refund: [],
}

export const getMode = (selector = memSelector || '#app') => {
  const app = document.querySelector(selector)
  return app.dataset.mode
}

export const setModeHandler = (mode, handler) => {
  handlers[mode].push(handler)
  viewMode()
}

export default function viewMode(selector = memSelector || '#app') {
  const app = document.querySelector(selector)
  let mode = app.dataset.mode || 'view'

  app.dataset.mode = mode
  memSelector = selector

  const modeSwitchers = {
    view: document.getElementById('mode-view'),
    delete: document.getElementById('mode-delete'),
    refund: document.getElementById('mode-refund'),
  }

  function switchDisableButtons() {
    Object.keys(modeSwitchers).forEach(
      (key) => (modeSwitchers[key].disabled = mode === key),
      handlers[mode] && handlers[mode].forEach((f) => f()),
    )
  }

  switchDisableButtons()

  Object.keys(modeSwitchers).forEach((key) => {
    modeSwitchers[key].addEventListener('click', () => {
      mode = key
      app.dataset.mode = mode
      switchDisableButtons()
    })
  })
}
