export default function multiSelect(configs, callback, deleteTag) {
  const container = document.querySelector(configs.container)
  const input = document.querySelector(configs.input)
  const add = document.querySelector(configs.add)

  add.addEventListener('click', addButton)

  function addButton() {
    const value = input.value.trim()
    input.value = ''
    if (value) {
      const items = callback(value)
      container.innerHTML = ''
      for (const item of items) {
        addTag(item)
      }
    }
  }

  function addTag(value) {
    const item = document.createElement('li')
    item.classList.add('select-item')
    item.onclick = deleteTag
    item.innerText = value
    container.append(item)
  }
}
