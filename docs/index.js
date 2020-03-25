const themeToggle = document.querySelector('#theme-toggle')
if (themeToggle !== null)
    themeToggle.addEventListener('click', () => {
        if (!document.documentElement.hasAttribute('dark')) {
            document.documentElement.setAttribute('dark', '')
            themeToggle.innerHTML = `<i class="material-icons">brightness_7</i>`
            themeToggle.setAttribute('title', 'light mode')
        } else {
            document.documentElement.removeAttribute('dark')
            themeToggle.innerHTML = `<i class="material-icons">brightness_4</i>`
            themeToggle.setAttribute('title', 'dark mode')
        }
    })

const dirToggle = document.querySelector('#dir-toggle')
if (dirToggle !== null)
    dirToggle.addEventListener('click', () => {
        if (!document.documentElement.hasAttribute('dir')) {
            document.documentElement.setAttribute('dir', 'rtl')
            dirToggle.innerHTML = `<i class="material-icons">navigate_next</i>`
            dirToggle.setAttribute('title', 'LTR mode')
        } else {
            document.documentElement.removeAttribute('dir')
            dirToggle.innerHTML = `<i class="material-icons">navigate_before</i>`
            dirToggle.setAttribute('title', 'RTL mode')
        }
    })

document.querySelectorAll('.mtrl-button, .mtrl-fab').forEach(button => {
    button.setAttribute('data-ripple', '')
})
