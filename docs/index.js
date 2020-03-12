if (typeof CSS.paintWorklet !== 'undefined') {
    CSS.paintWorklet.addModule('../../src/worklets/corner-shape.js')
    CSS.paintWorklet.addModule('../../src/worklets/ripple.js')
}

const themeToggle = document.querySelector('#theme-toggle')
themeToggle.addEventListener('click', () => {
    if (!document.documentElement.hasAttribute('dark')) {
        document.documentElement.setAttribute('dark', '')
        themeToggle.innerHTML = `Dark Theme is on`
    } else {
        document.documentElement.removeAttribute('dark')
        themeToggle.innerHTML = `Dark Theme is off`
    }
})

const dirToggle = document.querySelector('#dir-toggle')
dirToggle.addEventListener('click', () => {
    if (!document.documentElement.hasAttribute('dir')) {
        document.documentElement.setAttribute('dir', 'rtl')
        dirToggle.innerHTML = `RTL is on`
    } else {
        document.documentElement.removeAttribute('dir')
        dirToggle.innerHTML = `RTL is off`
    }
})
