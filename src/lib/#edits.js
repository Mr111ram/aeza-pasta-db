// import { setModeHandler } from './mode'

// window.edited = false

// export default function modeEdits() {
//   setModeHandler('edit', () => {
//     const saveButton = document.querySelector('#mode-view')
//     const cards = document.querySelectorAll('.container .card')

//     saveButton.innerHTML = 'Сохранить'
//     edited = true

//     cards.forEach((card) => {
//       const desc = card.querySelector('.card-description')
//       const text = card.querySelector('.card-text')

//       desc.contentEditable = true
//       text.contentEditable = true
//     })
//   })

//   setModeHandler('view', () => {
//     if (edited) {
//       const saveButton = document.querySelector('#mode-view')
//       const cards = document.querySelectorAll('.container .card')

//       saveButton.innerHTML = 'Просмотр'
//       edited = false

//       cards.forEach((card) => {
//         const desc = card.querySelector('.card-description')
//         const text = card.querySelector('.card-text')

//         const descValue = desc.innerHTML.trim()
//         const textValue = text.innerHTML.trim()

//         desc.contentEditable = false
//         text.contentEditable = false

//         const oldState = state.get('cards')
//         const newState = new Set()

//         oldState.forEach((card) => {
//           const result = {}
//           oldState.forEach((value) => {
//             console.log(value)
//           })
//         })
//       })
//     }
//   })
// }
