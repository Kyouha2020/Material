if (typeof registerPaint !== 'undefined') registerPaint('ripple', class {
    static get inputProperties() {
        return ['--mtrl-ripple--color', '--mtrl-ripple--opacity', '--animation-tick', '--mtrl-ripple--x', '--mtrl-ripple--y', '--mtrl-ripple--speed']
    }

    paint(ctx, geom, properties) {
        const rippleColor = properties.get('--mtrl-ripple--color').toString(),
            rippleOpacity = properties.get('--mtrl-ripple--opacity').toString().replace(/[ %]/g, '') / 100,
            x = parseFloat(properties.get('--mtrl-ripple--x').toString()),
            y = parseFloat(properties.get('--mtrl-ripple--y').toString()),
            speed = parseFloat((properties.get('--mtrl-ripple--speed') || '').toString()) || 1
        let tick = parseFloat(properties.get('--animation-tick').toString())
        tick *= speed
        if (tick < 0) tick = 0
        if (tick > 1000) tick = 1000

        ctx.fillStyle = rippleColor
        ctx.globalAlpha = rippleOpacity - tick / 1000 * rippleOpacity
        ctx.arc(x, y, geom.width * tick / 1000, 0, 2 * Math.PI)
        ctx.fill()
    }
})
