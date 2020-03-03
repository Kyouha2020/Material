registerPaint('corner-shape', class {
    constructor() {
        this.k = 0.5522847498307933984022516322796
    }

    static get inputProperties() {
        return [
            '--corner-radius',
            '--corner-shape',
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
        //if (properties.get('--corner-radius').unit === 'percent') {
        //    radius = Math.min(radius * geom.width / 100, geom.width / 2)
        //}
        this.shape = properties.get('--corner-shape').toString().toLowerCase().trim()

        let radii = properties.get('--corner-radius').toString().replace(/px/g, '').split(' ').slice(1)
        const radius1 = radii[0]
        const radius2 = radii[1] || radii[0]
        const radius3 = radii[2] || radii[1] || radii[0]
        const radius4 = radii[3] || radii[2] || radii[1] || radii[0]

        const points = [
            {x: radius1, y: 0},
            {x: geom.width - radius2, y: 0},
            {x: geom.width, y: radius2},
            {x: geom.width, y: geom.height - radius3},
            {x: geom.width - radius3, y: geom.height},
            {x: radius4, y: geom.height},
            {x: 0, y: geom.height - radius4},
            {x: 0, y: radius1},
        ]
        const bezierRadius1 = radius1 * this.k
        const bezierRadius2 = radius2 * this.k
        const bezierRadius3 = radius3 * this.k
        const bezierRadius4 = radius4 * this.k

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        if (this.shape === 'iphonex') {
            const r = radius1 * .6
            const bzr = r * this.k
            ctx.lineTo(points[0].x + r, points[0].y)
            ctx.bezierCurveTo(points[0].x + r, bzr, points[0].x + r * 2 - bzr, r, points[0].x + r * 2, r)
            ctx.lineTo(points[1].x - r * 2, r)
            ctx.bezierCurveTo(points[1].x - r * 2 + bzr, r, points[1].x - r, bzr, points[1].x - r, points[1].y)
            this.shape = 'rounded'
        }

        ctx.lineTo(points[1].x, points[1].y)
        this.goTo(ctx,
            [points[2].x, points[2].y],
            [geom.width - radius2, bezierRadius2, geom.width - bezierRadius2, radius2],
            [geom.width - radius2 + bezierRadius2, 0, geom.width, radius2 - bezierRadius2],
            [points[1].x, points[2].y]
        )
        ctx.lineTo(points[3].x, points[3].y)
        this.goTo(ctx,
            [points[4].x, points[4].y],
            [geom.width - bezierRadius3, geom.height - radius3, geom.width - radius3, geom.height - bezierRadius3],
            [geom.width, geom.height - radius3 + bezierRadius3, geom.width - radius3 + bezierRadius3, geom.height],
            [points[4].x, points[3].y]
        )
        ctx.lineTo(points[5].x, points[5].y)
        this.goTo(ctx,
            [points[6].x, points[6].y],
            [radius4, geom.height - bezierRadius4, bezierRadius4, geom.height - radius4],
            [radius4 - bezierRadius4, geom.height, 0, geom.height - radius4 + bezierRadius4],
            [points[5].x, points[6].y]
        )
        ctx.lineTo(points[7].x, points[7].y)
        this.goTo(ctx,
            [points[0].x, points[0].y],
            [bezierRadius1, radius1, radius1, bezierRadius1],
            [0, radius1 - bezierRadius1, radius1 - bezierRadius1, 0],
            [points[0].x, points[7].y]
        )
        ctx.closePath()
        if (args == 'filled') {
            ctx.fill()
        } else if (args == 'outlined') {
            ctx.strokeStyle = properties.get('--stroke-color')
            ctx.lineWidth = properties.get('--stroke-width').toString().replace('px', '') * 2
            ctx.stroke()
        }
    }

    goTo(ctx, point, scoop, round, notch) {
        switch (this.shape) {
            case 'cut':
                ctx.lineTo(point[0], point[1])
                return
            case 'scoop':
                ctx.bezierCurveTo(scoop[0], scoop[1], scoop[2], scoop[3], point[0], point[1])
                return
            case 'rounded':
                ctx.bezierCurveTo(round[0], round[1], round[2], round[3], point[0], point[1])
                return
            case 'notch':
                ctx.lineTo(notch[0], notch[1])
                ctx.lineTo(point[0], point[1])
                return
            case 'iphonex':
                return
        }
    }
})
