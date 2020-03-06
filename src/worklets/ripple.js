registerPaint('ripple', class {
    static get inputProperties() {
        return ['--ripple-color', '--animation-tick', '--ripple-x', '--ripple-y', '--ripple-speed']
    }

    paint(ctx, geom, properties) {
        const rippleColor = properties.get('--ripple-color').toString(),
            x = parseFloat(properties.get('--ripple-x').toString()),
            y = parseFloat(properties.get('--ripple-y').toString()),
            speed = parseFloat((properties.get('--ripple-speed') || '').toString()) || 1
        let tick = parseFloat(properties.get('--animation-tick').toString())
        tick *= speed
        if (tick < 0) tick = 0
        if (tick > 1000) tick = 1000

        ctx.fillStyle = rippleColor
        ctx.globalAlpha = 1 - tick / 1000
        ctx.arc(x, y, geom.width * tick / 1000, 0, 2 * Math.PI)
        ctx.fill()
    }
})
