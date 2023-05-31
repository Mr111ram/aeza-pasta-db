import { getMode } from './mode'

let memory = {}

const langSwitch = document.getElementById('lang_switch')

function makeCard({ description, text, enText, tags }, lang) {
  const card = document.createElement('div')
  const cardBody = /*html*/ `
    <h3 class="card-description">${description}</h3>
    <p class="card-text">${lang === 'ru' ? text : enText}</p>
    <ul class="card-tags select-container">
      ${tags
        .map((tag) =>
          /*html*/ !!tag ? `<li class="select-item">${tag}</li>` : ``,
        )
        .join('')}
    </ul>
  `

  if (description && text) {
    card.classList.add('card')
    card.innerHTML = cardBody.trim()
    card.onclick = copyToBuffer()
    return card
  } else {
    return null
  }
}

function langSwitcher(event) {
  memory.lang = memory.lang === 'ru' ? 'en' : 'ru'
  const { container, cardList, lang } = memory
  const viewModeButton = document.querySelector('#mode-view')

  viewModeButton.click()

  if (container && cardList && lang) {
    renderCard(container, cardList, lang)
  }
}

langSwitch.onclick = langSwitcher

function copyToBuffer() {
  return (event) => {
    const mode = getMode()
    let text
    let element = event.target
    if (mode === 'view') {
      CrimeUglyAndShittyCodeDontTouchThis: {
        if (element.classList.contains('select-item')) {
          element = element.parentNode
        }

        if (element.classList.contains('card-text')) {
          text = element.innerText.trim()
        } else if (element.childNodes.length > 0) {
          const result = [...element.childNodes].filter((item) => {
            if ('classList' in item) {
              return item.classList.contains('card-text')
            } else {
              return false
            }
          })
          if (result.length > 0) {
            text = result[0].innerText.trim()
          } else {
            const result = [...element.parentNode.childNodes].filter((item) => {
              if ('classList' in item) {
                return item.classList.contains('card-text')
              } else {
                return false
              }
            })
            text = result[0].innerText.trim()
          }
        } else {
          ;[...element.parentNode.childNodes].filter((item) =>
            item.classList.contains('card-text'),
          )
          text = result[0].innerText.trim()
        }
      }

      ClickEffect: {
        let status = true

        do {
          if (element.classList.contains('card')) {
            status = false
          } else {
            element = element.parentNode
          }
        } while (status)

        element.style.borderColor = 'rgba(0, 100, 0, .5)'
        setTimeout(() => {
          element.style.borderColor = 'transparent'
        }, 650)
      }

      navigator.clipboard.writeText(text).then((_) => _)
    }
  }
}

export default function renderCard(container, cardList, lang = 'ru') {
  const columns = container.querySelectorAll('.column')
  const columnCount = columns.length

  let index = 0

  for (const col of columns) {
    col.innerHTML = ''
  }

  for (const card of cardList) {
    if (index >= columnCount) index = 0
    const newCard = makeCard(card, lang)
    if (newCard) {
      columns[index].append(makeCard(card, lang))
      index++
    }
  }

  memory = {
    container,
    cardList,
    lang,
  }
}
