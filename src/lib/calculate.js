import { setModeHandler } from './mode'

export default function calculateRefund() {
  const refundMatch = 'refund-result'
  const oneDay = 1000 * 60 * 60 * 24
  const refundCalc = document.getElementById('refund-calulator')
  const refundData = document.getElementById('refund-date')
  const refundPrice = document.getElementById('refund-price')
  const refundPayInterval = document.getElementById('refund-pay-interval')
  const refundResult = document.getElementById('refund-result')
  const search = document.getElementById('search')
  const container = document.querySelector('.main .container')

  const monthMappings = {
    янв: 0,
    фев: 1,
    мар: 2,
    апр: 3,
    май: 4,
    мая: 4,
    июн: 5,
    июл: 6,
    авг: 7,
    сен: 8,
    окт: 9,
    ноя: 10,
    дек: 11,
    jan: 0,
    feb: 1,
    mar: 2,
    apr: 3,
    may: 4,
    jun: 5,
    jul: 6,
    aug: 7,
    sep: 8,
    oct: 9,
    nov: 10,
    dec: 11,
    січ: 0,
    лют: 1,
    бер: 2,
    кві: 3,
    тра: 4,
    чер: 5,
    лип: 6,
    сер: 7,
    вер: 8,
    жов: 9,
    лис: 10,
    гру: 11,
  }
  const payIntervalMappings = {
    day: 1,
    month: 30,
    '3-months': 90,
    year: 365,
  }

  setModeHandler('view', () => {
    refundCalc.style.display = 'none'
    search.disabled = false
    search.value = ''
    setTimeout(() => {
      search.oninput({ target: search })
    }, 150)
  })
  setModeHandler('delete', () => {
    refundCalc.style.display = 'none'
    search.disabled = false
    search.value = ''
    setTimeout(() => {
      search.oninput({ target: search })
    }, 150)
  })
  setModeHandler('refund', () => {
    const cards = document.querySelectorAll('.container .card')
    refundCalc.style.display = 'block'
    search.value = `#{${refundMatch}}`
    search.disabled = true
    setTimeout(() => {
      search.oninput({ target: search })
    }, 150)
  })

  function calculate() {
    container.querySelectorAll('.card .card-text').forEach((item) => {
      let value = item.innerHTML.replaceAll(
        `#{${refundMatch}}`,
        '<snap class="ref-res">---</span>',
      )
      item.innerHTML = value
    })

    let result = ''
    const calc = () => {
      let payInterval = payIntervalMappings[refundPayInterval.value]
      let dateSpl = refundData.value.split(' ')
      let date = new Date(
        dateSpl[2],
        monthMappings[dateSpl[1].toLowerCase().replace('.', '')],
        dateSpl[0],
      )
      let price = refundPrice.value
      let now = new Date()
      let diff = date.getTime() - now.getTime()
      let days = Math.round(diff / oneDay)
      let refund = Math.round((days / payInterval) * price)
      return refund
    }

    try {
      result = calc() || '---'
    } catch (e) {
      result = '---'
    }

    refundResult.innerHTML = result
    document.querySelectorAll('.ref-res').forEach((item) => {
      item.innerText = result
    })
  }

  refundCalc.addEventListener('input', calculate)
}
