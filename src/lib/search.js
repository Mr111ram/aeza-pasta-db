export default function search(selector, callback) {
  const input = document.querySelector(selector)

  input.addEventListener('input', ({ target }) => {
    const value = target.value

    callback(value)
  })
}
