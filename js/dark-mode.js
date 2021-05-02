const html = document.querySelector('html')
const btnDarkMode = document.querySelector('[data-btn="dark-mode"]')

const toggleDarkMode = () => html.classList.toggle('light-mode')

btnDarkMode.addEventListener('click', toggleDarkMode)
