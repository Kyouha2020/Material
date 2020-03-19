export const initToggleButtons = () => {
    const toggleButtons = document.querySelectorAll('.mtrl-button--toggle')
    toggleButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('mtrl-button--toggle--active'))
                button.classList.remove('mtrl-button--toggle--active')
            else button.classList.add('mtrl-button--toggle--active')
        })
    })
}
