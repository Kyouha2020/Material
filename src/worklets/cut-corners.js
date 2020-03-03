registerPaint('cut-corners', class {
    static get inputProperties() {
        return [
            '--corner-radius',
            '--stroke-width',
            '--stroke-color'
        ]
    }

    static get inputArguments() {
        return [
            '<custom-ident>'
        ]
    }

    paint(ctx, geom, properties, args) {
        let radii = properties.get('--corner-radius').toString().replace(/px/g, '').split(' ').slice(1)
        const inset = parseInt(properties.get('--stroke-width')[0]) / 2 || 0
        const radius1 = radii[0]
        const radius2 = radii[1]
        const radius3 = radii[2]
        const radius4 = radii[3]

        const points = [
            {x: inset, y: radius1},
            {x: radius1, y: inset},
            {x: geom.width - radius2, y: inset},
            {x: geom.width - inset, y: radius2},
            {x: geom.width - inset, y: geom.height - radius3},
            {x: geom.width - radius3, y: geom.height - inset},
            {x: radius4, y: geom.height - inset},
            {x: inset, y: geom.height - radius4},
        ]

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        ctx.lineTo(points[1].x, points[1].y)
        ctx.lineTo(points[2].x, points[2].y)
        ctx.lineTo(points[3].x, points[3].y)
        ctx.lineTo(points[4].x, points[4].y)
        ctx.lineTo(points[5].x, points[5].y)
        ctx.lineTo(points[6].x, points[6].y)
        ctx.lineTo(points[7].x, points[7].y)
        ctx.closePath()

        if (args == 'filled') {
            ctx.fill()
        } else if (args == 'outlined') {
            ctx.strokeStyle = properties.get('--stroke-color')
            ctx.lineWidth = properties.get('--stroke-width')
            ctx.stroke()
        }
    }
})
