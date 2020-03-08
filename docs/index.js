import('../src/design/interaction/Ripple.js')

if (typeof CSS.paintWorklet !== 'undefined') {
    CSS.paintWorklet.addModule('../../src/worklets/corner-shape.js')
    CSS.paintWorklet.addModule('../../src/worklets/ripple.js')
}
