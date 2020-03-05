function rippleIn(evt) {
    const button = this,
        rect = button.getBoundingClientRect(),
        start = performance.now()
    let x, y

    if (evt.keyCode === 32) {
        x = rect.width / 2
        y = rect.height / 2
    } else {
        x = evt.clientX - rect.left
        y = evt.clientY - rect.top
    }

    requestAnimationFrame(function raf(now) {
        const count = Math.floor(now - start) + 100
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count > 1000) {
            button.style.removeProperty('--ripple-x')
            button.style.removeProperty('--ripple-y')
            if (evt.keyCode === 32)
                button.style.removeProperty('--animation-tick')
            else
                button.style.setProperty('--animation-tick', '1000')
        }
        requestAnimationFrame(raf)
    })
}

function rippleOut(evt) {
    const button = this,
        rect = button.getBoundingClientRect(),
        start = performance.now(),
        x = evt.clientX - rect.left,
        y = evt.clientY - rect.top,
        t = button.style.getPropertyValue('--animation-tick').trim()

    requestAnimationFrame(function raf(now) {
        const count = t - Math.floor(now - start)
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count === 1000) {
            const count = count - Math.floor(now - start)
            button.style.setProperty('--animation-tick', count.toString())
        }
        if (count <= 0) {
            button.style.removeProperty('--ripple-x')
            button.style.removeProperty('--ripple-y')
            button.style.removeProperty('--animation-tick')
        }
        requestAnimationFrame(raf)
    })
}

document.querySelectorAll('.mtrl-button, .mtrl-toggle-button, .mtrl-icon-button, .mtrl-fab').forEach(el => {
    el.addEventListener('mousedown', rippleIn)
    el.addEventListener('keydown', rippleIn)
    el.addEventListener('mouseleave', rippleOut)
})
