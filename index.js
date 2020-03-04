import {choiceButton} from "./src/components/button/Button.js"
//import('./src/components/ripple/Ripple.js')

CSS.paintWorklet.addModule('./src/worklets/corner-shape.js')
//CSS.paintWorklet.addModule('./src/worklets/ripple.js')

document.querySelectorAll('.mtrl-button--choice').forEach(el => {
    choiceButton.init(el)
})
