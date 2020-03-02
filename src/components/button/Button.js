const initChoiceButton = (button) => {
    button.addEventListener('click', () => {
        if (!button.classList.contains('mtrl-button--choice--active'))
            activateChoiceButton(button)
        else
            inactivateChoiceButton(button)
    })
}

const activateChoiceButton = (button) => {
    button.classList.add('mtrl-button--choice--active')
}

const inactivateChoiceButton = (button) => {
    button.classList.remove('mtrl-button--choice--active')
}

export {initChoiceButton, activateChoiceButton, inactivateChoiceButton}
