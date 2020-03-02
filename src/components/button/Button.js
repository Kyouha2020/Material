const choiceButton = {
    init(button) {
        button.addEventListener('click', () => {
            if (!button.classList.contains('mtrl-button--choice--active'))
                this.activate(button)
            else
                this.inactivate(button)
        })
    },

    activate(button) {
        button.classList.add('mtrl-button--choice--active')
    },

    inactivate(button) {
        button.classList.remove('mtrl-button--choice--active')
    },
}

export {choiceButton}
