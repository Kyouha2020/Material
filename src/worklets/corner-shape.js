if (typeof registerPaint !== 'undefined') registerPaint('corner-shape', class {
    static get inputProperties() {
        return ['--mtrl-shape--corner-radius', '--mtrl-shape--corner-shape', '--mtrl-shape--stroke-width', '--mtrl-shape--stroke-color', '--mtrl-shape--polygon-sides', '--mtrl-shape--polygon-angle']
    }

    static get inputArguments() {
        return ['<custom-ident>']
    }

    paint(ctx, geom, properties, args) {
        this.shape = properties.get('--mtrl-shape--corner-shape').toString().trim()

        if (this.shape === 'smooth-rounded') this.smoothRounded(ctx, geom, properties)
        else if (this.shape === 'polygon') this.polygon(ctx, geom, properties)
        else this.cornerShapes(ctx, geom, properties)

        if (args.toString() === 'filled') ctx.fill()
        else if (args.toString() === 'outlined' &&properties.get('--mtrl-shape--stroke-width').toString().replace('px', '') * 2　!== 0) {
            ctx.strokeStyle = properties.get('--mtrl-shape--stroke-color')
            ctx.lineWidth = properties.get('--mtrl-shape--stroke-width').toString().replace('px', '') * 2
            ctx.stroke()
        }
    }

    smoothRounded(ctx, geom, properties) {
        const n = properties.get('--mtrl-shape--corner-radius').toString(), r = geom.width / 2, w = geom.width / 2,
            h = geom.height / 2
        let m = n
        if (n > 100) m = 100
        if (n < 0.00000000001) m = 0.00000000001

        ctx.beginPath()
        for (let i = 0; i < (2 * r + 1); i++) {
            const x = (i - r) + w,
                y = (Math.pow(Math.abs(Math.pow(r, m) - Math.pow(Math.abs(i - r), m)), 1 / m)) + h
            if (i === 0) ctx.moveTo(x, y)
            else ctx.lineTo(x, y)
        }
        for (let i = (2 * r); i < (4 * r + 1); i++) {
            const x = (3 * r - i) + w,
                y = (-Math.pow(Math.abs(Math.pow(r, m) - Math.pow(Math.abs(3 * r - i), m)), 1 / m)) + h
            ctx.lineTo(x, y)
        }
        ctx.closePath()
    }

    polygon(ctx, geom, properties) {
        const numSides = properties.get('--mtrl-shape--polygon-sides').toString(),
            rotate = properties.get('--mtrl-shape--polygon-angle').toString().replace(/ |deg/g, ''),
            center = {x: geom.width / 2, y: geom.height / 2}, radius = Math.min(geom.width, geom.height) / 2

        ctx.translate(geom.width / 2, geom.height / 2)
        ctx.rotate((rotate + 180) * Math.PI / 180)
        ctx.translate(-geom.width / 2, -geom.height / 2)

        ctx.beginPath()
        for (let i = 1; i <= numSides; i++) {
            const xPos = center.x + radius * Math.sin(2 * Math.PI * i / numSides),
                yPos = center.y + radius * Math.cos(2 * Math.PI * i / numSides)
            if (i === 0) ctx.moveTo(xPos, yPos)
            else ctx.lineTo(xPos, yPos)
        }
        ctx.closePath()
    }

    cornerShapes(ctx, geom, properties) {
        const k = 0.5522847498307933984022516322796,
            radii = properties.get('--mtrl-shape--corner-radius').toString().replace(/px|%/g, '').split(' ').slice(1),
            radius1 = radii[0], radius2 = radii[1] || radii[0], radius3 = radii[2] || radii[0],
            radius4 = radii[3] || radii[1] || radii[0], bezierRadius1 = radius1 * k, bezierRadius2 = radius2 * k,
            bezierRadius3 = radius3 * k, bezierRadius4 = radius4 * k,
            points = [
                {x: radius1, y: 0},
                {x: geom.width - radius2, y: 0},
                {x: geom.width, y: radius2},
                {x: geom.width, y: geom.height - radius3},
                {x: geom.width - radius3, y: geom.height},
                {x: radius4, y: geom.height},
                {x: 0, y: geom.height - radius4},
                {x: 0, y: radius1},
            ]

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)
        ctx.lineTo(points[1].x, points[1].y)
        this.goTo(ctx, [points[2].x, points[2].y], [geom.width - radius2, bezierRadius2, geom.width - bezierRadius2, radius2], [geom.width - radius2 + bezierRadius2, 0, geom.width, radius2 - bezierRadius2], [points[1].x, points[2].y])
        ctx.lineTo(points[3].x, points[3].y)
        this.goTo(ctx, [points[4].x, points[4].y], [geom.width - bezierRadius3, geom.height - radius3, geom.width - radius3, geom.height - bezierRadius3], [geom.width, geom.height - radius3 + bezierRadius3, geom.width - radius3 + bezierRadius3, geom.height], [points[4].x, points[3].y])
        ctx.lineTo(points[5].x, points[5].y)
        this.goTo(ctx, [points[6].x, points[6].y], [radius4, geom.height - bezierRadius4, bezierRadius4, geom.height - radius4], [radius4 - bezierRadius4, geom.height, 0, geom.height - radius4 + bezierRadius4], [points[5].x, points[6].y])
        ctx.lineTo(points[7].x, points[7].y)
        this.goTo(ctx, [points[0].x, points[0].y], [bezierRadius1, radius1, radius1, bezierRadius1], [0, radius1 - bezierRadius1, radius1 - bezierRadius1, 0], [points[0].x, points[7].y])
        ctx.closePath()
    }

    goTo(ctx, point, scoop, round, notch) {
        if (this.shape === 'cut')
            ctx.lineTo(point[0], point[1])
        else if (this.shape === 'scoop')
            ctx.bezierCurveTo(scoop[0], scoop[1], scoop[2], scoop[3], point[0], point[1])
        else if (this.shape === 'rounded')
            ctx.bezierCurveTo(round[0], round[1], round[2], round[3], point[0], point[1])
        else if (this.shape === 'notch') {
            ctx.lineTo(notch[0], notch[1])
            ctx.lineTo(point[0], point[1])
        }
    }
})
