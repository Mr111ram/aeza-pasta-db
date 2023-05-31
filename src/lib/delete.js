import { setModeHandler } from './mode'

export default function modeDelete() {
  setModeHandler('view', () => {
    const cards = document.querySelectorAll('.container .card')
    cards.forEach((card) => {
      card.classList.remove('danger')
    })
  })
  setModeHandler('delete', () => {
    const cards = document.querySelectorAll('.container .card')

    cards.forEach((card) => {
      card.classList.add('danger')

      card.addEventListener('dblclick', async (event) => {
        let text
        let element = event.target

        CrimeUglyAndShittyCodeDontTouchThis: {
          if (element.classList.contains('select-item')) {
            element = element.parentNode
          }

          if (element.classList.contains('card-text')) {
            text = element
          } else if (element.childNodes.length > 0) {
            const result = [...element.childNodes].filter((item) => {
              if ('classList' in item) {
                return item.classList.contains('card-text')
              } else {
                return false
              }
            })
            if (result.length > 0) {
              text = result[0]
            } else {
              const result = [...element.parentNode.childNodes].filter(
                (item) => {
                  if ('classList' in item) {
                    return item.classList.contains('card-text')
                  } else {
                    return false
                  }
                },
              )
              text = result[0]
            }
          } else {
            ;[...element.parentNode.childNodes].filter((item) =>
              item.classList.contains('card-text'),
            )
            text = result[0]
          }
        }

        const card = text.parentNode
        const desc = card.querySelector('.card-description')
        const request = {
          text: text.innerHTML.trim(),
          description: desc.innerHTML.trim(),
        }
        const response = await fetch('/api/delete_card', {
          method: 'POST',
          body: JSON.stringify(request),
        })
        let result = await response.json()
        if (result.success) {
          setTimeout(function () {
            location.reload()
          }, 100)
        }
      })
    })
  })
}
