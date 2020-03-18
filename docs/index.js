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
