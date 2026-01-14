class Countdown {
  constructor({ targetDate, container, digits = 8 }) {
    this.target = new Date(targetDate).getTime()
    this.container = container
    this.digits = digits

    this.displays = Array.from({ length: digits }, () => this._createDisplay())

    this._tick = this._tick.bind(this)
    requestAnimationFrame(this._tick)
  }

  _createDisplay() {
    const el = document.createElement('div')
    el.className = 'dispaly'
    el.dataset.digit = '0'

    el.innerHTML = `
      <div class="dispaly__segements">
        ${['a', 'b', 'c', 'd', 'e', 'f', 'g']
          .map(s => `<div class="dispaly__segment dispaly__segment--${s}"></div>`)
          .reduce((a, b) => a + b)}
      </div>
    `

    this.container.appendChild(el)
    return el
  }

  _tick() {
    const seconds = Math.max(
      0,
      Math.floor((this.target - Date.now()) / 1000)
    )

    const digits = String(seconds)
      .padStart(this.digits, '0')
      .slice(-this.digits)
      .split('')

    this.displays
      .map((el, i) => [el, digits[i]])
      .forEach(([el, d]) => (el.dataset.digit = d))

    if (seconds > 0) requestAnimationFrame(this._tick)
  }
}

new Countdown({
  targetDate: '2026-12-31T23:59:59',
	//targetDate: '2025-12-17T21:40:59',
  container: document.querySelector('app')
})
