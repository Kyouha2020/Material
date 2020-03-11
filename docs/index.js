import('../src/components/ripple/Ripple.js')

if (typeof CSS.paintWorklet !== 'undefined') {
    CSS.paintWorklet.addModule('../../src/worklets/corner-shape.js')
    CSS.paintWorklet.addModule('../../src/worklets/ripple.js')
}

const themeToggle = document.querySelector('#theme-toggle')
themeToggle.addEventListener('click', () => {
    if (!document.documentElement.hasAttribute('dark')) {
        document.documentElement.setAttribute('dark', '')
        themeToggle.innerHTML = `Light Theme`
    } else {
        document.documentElement.removeAttribute('dark')
        themeToggle.innerHTML = `Dark Theme`
    }
})
