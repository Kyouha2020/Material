import {choiceButton} from "./src/components/button/Button.js"
import('./src/components/ripple/Ripple.js')

CSS.paintWorklet.addModule('./src/worklets/avatar-polygon.js')
CSS.paintWorklet.addModule('./src/worklets/background.js')
CSS.paintWorklet.addModule('./src/worklets/corner-shape.js')
CSS.paintWorklet.addModule('./src/worklets/ripple.js')
CSS.paintWorklet.addModule('./src/worklets/separator.js')
CSS.paintWorklet.addModule('./src/worklets/smooth-corners.js')

document.querySelectorAll('.mtrl-button--choice').forEach(el => {
    choiceButton.init(el)
})
