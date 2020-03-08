function ripple() {
    const button = this, start = performance.now()

    requestAnimationFrame(function raf(now) {
        button.removeEventListener('mouseleave', rippleOut)
        const count = Math.floor(now - start) + 100
        if (count > 1000) {
            button.style.removeProperty('--animation-tick')
            button.addEventListener('mouseleave', rippleOut)
        }
        requestAnimationFrame(raf)
    })
}

function rippleIn(evt) {
    const button = this, rect = button.getBoundingClientRect(), start = performance.now()
    let x, y

    if (evt.keyCode === 32) {
        x = rect.width / 2
        y = rect.height / 2
    } else if (evt.type === 'touchstart') {
        const touch = evt.touches[0]
        x = Number(touch.clientX) - rect.left
        y = Number(touch.clientY) - rect.top
    } else {
        x = evt.clientX - rect.left
        y = evt.clientY - rect.top
    }

    requestAnimationFrame(function raf(now) {
        button.addEventListener('mouseleave', rippleOut)
        if (evt.type === 'touchstart') button.removeEventListener('mousedown', rippleIn)
        const count = Math.floor(now - start) + 100
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count > 1000) {
            if (evt.type === 'touchstart') button.addEventListener('mousedown', rippleIn)
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
    const button = this, rect = button.getBoundingClientRect(), start = performance.now(),
        t = button.style.getPropertyValue('--animation-tick')
    let x, y

    if (evt.type === 'touchmove') {
        const touch = evt.touches[0]
        x = Number(touch.clientX) - rect.left
        y = Number(touch.clientY) - rect.top
    } else {
        x = evt.clientX - rect.left
        y = evt.clientY - rect.top
    }

    requestAnimationFrame(function raf(now) {
        const count = t - Math.floor(now - start)
        button.style.setProperty('--ripple-x', x.toString())
        button.style.setProperty('--ripple-y', y.toString())
        button.style.setProperty('--animation-tick', count.toString())
        if (count === 1000)
            button.style.setProperty('--animation-tick', count.toString())
        if (count < 0) {
            button.style.removeProperty('--ripple-x')
            button.style.removeProperty('--ripple-y')
            button.style.removeProperty('--animation-tick')
        }
        requestAnimationFrame(raf)
    })
}

document.querySelectorAll('.mtrl-button, .mtrl-toggle-button, .mtrl-icon-button, .mtrl-fab').forEach(el => {
    el.addEventListener('click', ripple)
    el.addEventListener('mousedown', rippleIn)
    el.addEventListener('touchstart', rippleIn, {passive: true})
    el.addEventListener('keydown', rippleIn)
    el.addEventListener('mouseleave', rippleOut)
    el.addEventListener('touchmove', rippleOut, {passive: true})
    el.style.toString().replace('#ffffff', '#03dac6')
})
