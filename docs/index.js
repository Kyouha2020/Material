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

const demoButton = document.querySelector('#demo-button')

document.querySelector('#demo-select--1').addEventListener('change', (event) => {
    switch (event.target.value) {
        case '0':
            demoButton.classList.remove('mtrl-button--outlined')
            demoButton.classList.remove('mtrl-button--contained')
            document.querySelector('#demo-select--3--op-2').removeAttribute('disabled')
            document.querySelector('#demo-select--3--op-3').setAttribute('disabled', 'true')
            break;
        case '1':
            demoButton.classList.add('mtrl-button--outlined')
            demoButton.classList.remove('mtrl-button--contained')
            document.querySelector('#demo-select--3--op-2').removeAttribute('disabled')
            document.querySelector('#demo-select--3--op-3').setAttribute('disabled', 'true')
            break;
        case '2':
            demoButton.classList.add('mtrl-button--contained')
            demoButton.classList.remove('mtrl-button--outlined')
            document.querySelector('#demo-select--3--op-2').setAttribute('disabled', 'true')
            document.querySelector('#demo-select--3--op-3').removeAttribute('disabled')
            break;
    }
})

document.querySelector('#demo-select--2').addEventListener('change', (event) => {
    switch (event.target.value) {
        case '0':
            demoButton.removeAttribute('disabled')
            break;
        case '1':
            demoButton.setAttribute('disabled', 'true')
            break;
    }
})

document.querySelector('#demo-select--3').addEventListener('change', (event) => {
    switch (event.target.value) {
        case '0':
            demoButton.classList.remove('mtrl-button--float')
            demoButton.classList.remove('mtrl-button--raised')
            demoButton.classList.remove('mtrl-button--unelevated')
            break;
        case '1':
            demoButton.classList.add('mtrl-button--float')
            demoButton.classList.remove('mtrl-button--raised')
            demoButton.classList.remove('mtrl-button--unelevated')
            break;
        case '2':
            demoButton.classList.add('mtrl-button--raised')
            demoButton.classList.remove('mtrl-button--float')
            demoButton.classList.remove('mtrl-button--unelevated')
            break;
        case '3':
            demoButton.classList.add('mtrl-button--unelevated')
            demoButton.classList.remove('mtrl-button--float')
            demoButton.classList.remove('mtrl-button--raised')
            break;
    }
})

document.querySelector('#demo-select--4').addEventListener('change', (event) => {
    switch (event.target.value) {
        case '0':
            document.querySelector('#demo-button__leading-icon').style.display = 'none'
            document.querySelector('#demo-button__trailing-icon').style.display = 'none'
            document.querySelector('#demo-button__leading-svg-icon').style.display = 'none'
            break;
        case '1':
            document.querySelector('#demo-button__leading-icon').style.display = 'inline-flex'
            document.querySelector('#demo-button__trailing-icon').style.display = 'none'
            document.querySelector('#demo-button__leading-svg-icon').style.display = 'none'
            break;
        case '2':
            document.querySelector('#demo-button__leading-icon').style.display = 'none'
            document.querySelector('#demo-button__trailing-icon').style.display = 'inline-flex'
            document.querySelector('#demo-button__leading-svg-icon').style.display = 'none'
            break;
        case '3':
            document.querySelector('#demo-button__leading-icon').style.display = 'none'
            document.querySelector('#demo-button__trailing-icon').style.display = 'none'
            document.querySelector('#demo-button__leading-svg-icon').style.display = 'inline-flex'
            break;
    }
})

document.querySelector('#demo-select--5').addEventListener('change', (event) => {
    switch (event.target.value) {
        case '0':
            demoButton.classList.remove('mtrl-shape--rounded-corners')
            demoButton.classList.remove('mtrl-shape--cut-corners')
            demoButton.classList.remove('mtrl-shape--scoop-corners')
            demoButton.classList.remove('mtrl-shape--notch-corners')
            break;
        case '1':
            demoButton.classList.add('mtrl-shape--rounded-corners')
            demoButton.classList.remove('mtrl-shape--cut-corners')
            demoButton.classList.remove('mtrl-shape--scoop-corners')
            demoButton.classList.remove('mtrl-shape--notch-corners')
            break;
        case '2':
            demoButton.classList.remove('mtrl-shape--rounded-corners')
            demoButton.classList.add('mtrl-shape--cut-corners')
            demoButton.classList.remove('mtrl-shape--scoop-corners')
            demoButton.classList.remove('mtrl-shape--notch-corners')
            break;
        case '3':
            demoButton.classList.remove('mtrl-shape--rounded-corners')
            demoButton.classList.remove('mtrl-shape--cut-corners')
            demoButton.classList.add('mtrl-shape--scoop-corners')
            demoButton.classList.remove('mtrl-shape--notch-corners')
            break;
        case '4':
            demoButton.classList.remove('mtrl-shape--rounded-corners')
            demoButton.classList.remove('mtrl-shape--cut-corners')
            demoButton.classList.remove('mtrl-shape--scoop-corners')
            demoButton.classList.add('mtrl-shape--notch-corners')
            break;
    }
})

document.querySelector('#demo-input--1').addEventListener('change', (event) => {
    demoButton.style.setProperty('--mtrl-button-corner-radius', event.target.value)
})