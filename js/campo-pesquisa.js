const containerFiltro = document.querySelector('[data-select="filtro-paises"]')
const containerPaises = document.querySelector('[data-drop="container-paises"]')


containerFiltro.addEventListener('click', abrirDropdown)

function abrirDropdown() {
    containerPaises.classList.toggle('animeTop')
    containerPaises.classList.toggle('show')
}