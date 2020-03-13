if (typeof CSS.paintWorklet !== 'undefined') {
    CSS.paintWorklet.addModule('../../src/worklets/corner-shape.js')
}

const themeToggle = document.querySelector('#theme-toggle')
themeToggle.addEventListener('click', () => {
    if (!document.documentElement.hasAttribute('dark')) {
        document.documentElement.setAttribute('dark', '')
        themeToggle.innerHTML = `<i class="material-icons">brightness_7</i>`
    } else {
        document.documentElement.removeAttribute('dark')
        themeToggle.innerHTML = `<i class="material-icons">brightness_4</i>`
    }
})

const dirToggle = document.querySelector('#dir-toggle')
dirToggle.addEventListener('click', () => {
    if (!document.documentElement.hasAttribute('dir')) {
        document.documentElement.setAttribute('dir', 'rtl')
        dirToggle.innerHTML = `<i class="material-icons">navigate_next</i>`
    } else {
        document.documentElement.removeAttribute('dir')
        dirToggle.innerHTML = `<i class="material-icons">navigate_before</i>`
    }
})
