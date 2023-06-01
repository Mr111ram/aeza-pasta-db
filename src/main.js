import './style.scss'

import multiSelect from './lib/multiSelect.js'
import renderCard from './lib/renderCard.js'
import State from './lib/state.js'
import viewMode from './lib/mode'
import modeDelete from './lib/delete'
import search from './lib/search'
import calculateRefund from './lib/calculate'

const add = document.querySelector('#pasta-add')
const text = document.querySelector('#pasta-text')
const enText = document.querySelector('#pasta-en-text')
const description = document.querySelector('#pasta-description')

const tagsContainer = document.querySelector('.multi-select .select-container')
const container = document.querySelector('.main .container')

window.state = new State({
  tags: new Set(),
  cards: new Set(),
})

UI: {
  const pasta = {
    text: '',
    enText: '',
    description: '',
    tags: [],
  }

  multiSelect(
    {
      container: '.select-container',
      input: '.select-input',
      add: '.select-add',
    },
    (value) => {
      pasta.tags.push(value.toLowerCase())
      pasta.tags = [...new Set(pasta.tags)]
      return pasta.tags
    },
    ({ target }) => {
      const value = target.innerText.trim()
      const result = pasta.tags.indexOf(value.toLowerCase())
      target.style.display = 'none'
      delete pasta.tags[result]
    },
  )

  add.addEventListener('click', () => {
    state.add('cards', pasta)
    clearPasta()
  })

  text.addEventListener('change', ({ target }) => {
    const value = target.value.trim()
    pasta.text = value
  })

  enText.addEventListener('change', ({ target }) => {
    const value = target.value.trim()
    pasta.enText = value
  })

  description.addEventListener('change', ({ target }) => {
    const value = target.value.trim()
    pasta.description = value
  })

  function clearPasta() {
    pasta.text = ''
    pasta.enText = ''
    pasta.description = ''
    pasta.tags = []

    description.value = ''
    text.value = ''
    enText.value = ''
    tagsContainer.innerHTML = ''
  }

  RenderCards: {
    state.on('cards', 'add', (cards) => {
      renderCard(container, state.get('cards'))
    })
  }

  SearchCard: {
    search('#search', (dirty) => {
      const value = dirty.trim()
      if (value) {
        const newState = []
        state.get('cards').forEach((card) => {
          let test = false
          Object.keys(card).find((key) => {
            const field = card[key]
            if (!test && field.indexOf(value) > -1) {
              newState.push(card)
              test = true
            }
          })
        })
        renderCard(container, newState)
      } else {
        renderCard(container, state.get('cards'))
      }
    })
  }

  ContainerHeightFix: {
    window.addEventListener('resize', containerHeightFix())

    function containerHeightFix() {
      container.style = ''
      container.style.maxHeight = `${container.offsetHeight}px`
      return containerHeightFix
    }
  }

  viewMode('#app')
  calculateRefund()
}

RequestsOnServer: {
  const updateButton = document.getElementById('update_db')

  async function getDB() {
    const response = await fetch('/api/db')
    const { tags, cards } = await response.json()

    state.add('cards', cards, 'get_db')
    state.add('tags', tags, 'get_db')
  }

  // updateButton.addEventListener('click', async () => {
  //   const viewModeButton = document.querySelector('#mode-view')

  //   viewModeButton.click()
  //   await getDB()
  // })
  window.addEventListener('DOMContentLoaded', async () => await getDB())
  state.on('cards', 'add', (values, key, message) => {
    if (message !== 'get_db') {
      values.forEach(async (value) => {
        const response = await fetch('/api/append_card', {
          method: 'POST',
          body: JSON.stringify(value),
        })
        console.log(response.json())
      })
    }
  })
}

state.on('cards', 'add', () => {
  // Delete Mode
  modeDelete()
})
