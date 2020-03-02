function ripple(evt) {
    const button = this, rect = button.getBoundingClientRect(), x = evt.clientX - rect.left, y = evt.clientY - rect.top,
        start = performance.now()

    requestAnimationFrame(function raf(now) {
        const count = Math.floor(now - start)
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count > 1000) {
            button.style.removeProperty('--ripple-x')
            button.style.removeProperty('--ripple-y')
            button.style.removeProperty('--animation-tick')
            return
        }
        requestAnimationFrame(raf)
    })
}

function rippleTouch(evt) {
    this.removeEventListener('mousedown', ripple)

    const button = this, rect = button.getBoundingClientRect(), touch = evt.touches[0],
        x = Number(touch.clientX) - rect.left, y = Number(touch.clientY) - rect.top, start = performance.now()

    requestAnimationFrame(function raf(now) {
        const count = Math.floor(now - start)
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count > 1000) {
            button.style.removeProperty('--ripple-x')
            button.style.removeProperty('--ripple-y')
            button.style.removeProperty('--animation-tick')
            button.addEventListener('mousedown', ripple)
            return
        }
        requestAnimationFrame(raf)
    })
}

document.querySelectorAll('.mtrl-button, .mtrl-toggle-button, .mtrl-icon-button, .mtrl-fab, .mtrl-list-item').forEach(el => {
    el.addEventListener('touchstart', rippleTouch)
    el.addEventListener('mousedown', ripple)
})
