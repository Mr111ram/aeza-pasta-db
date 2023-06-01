export default function search(selector, callback) {
  const input = document.querySelector(selector)

  input.oninput = function ({ target }) {
    const value = target.value

    callback(value)
  }

  // input.addEventListener('input', ({ target }) => {
  //   const value = target.value

  //   callback(value)
  // })
}
