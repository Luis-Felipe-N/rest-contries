const pageCards = document.querySelector('[data-page="cards"]')
const pageDetails = document.querySelector('[data-page="details"]')
let pesquisarPais = document.querySelector('[data-input="pesquisar-pais"]')
const continents = document.querySelectorAll('[data-continentes="lista-continentes"] li')
const containerCards = document.querySelector('[data-container="cards"]')
const containerCardsDetails = document.querySelector('[data-container="card-details"]')
const btnBack = document.querySelector('.btn-back')

const getCoutries = async(url='https://restcountries.eu/rest/v2/all') => {
    const dados = await fetch(url)
    const data =  await dados.json()
    if (data.length) {
        let listaPaises = []
        for(let pais of data) {
            listaPaises.push(
                {
                    'name': pais.name,
                    'flag': pais.flag,
                    'population': pais.population,
                    'region': pais.region,
                    'capital': pais.capital,
                    'nativeName': pais.nativeName,
                    'subRegion': pais.subregion,
                    'topLevelDomain': pais.topLevelDomain,
                    'currencies': pais.currencies.code,
                    'languages': pais.languages,
                    'borderCountries': pais.borders
                }
            )
        }
        return listaPaises
    } else {
        return data
    }

}

const getCountry = country =>  {
    getCoutries(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then(data => buildCardDetails(data))
}

const capitalize = text => text.replace(text[0], text[0].toUpperCase())

function printCountries() {
    let valueSearch = capitalize(this.value.toLowerCase())
    console.log(valueSearch)
    getCoutries().then(data =>{
        if (valueSearch === '') {
            buildCards(data)
        } else {
            let pais = data.find(namePais => namePais.name.startsWith(valueSearch))
            let paisesFiltrados = []
            paisesFiltrados.push(pais)
            buildCards(paisesFiltrados)
        }
    })
}

function printContinents() {
    getCoutries(`https://restcountries.eu/rest/v2/region/${this.getAttribute('value')}`).then(data => buildCards(data))
}

function newElement(tagName, className=false) {
    elem = document.createElement(tagName)
    if (className) {
        elem.classList.add(className)
    }
    return elem
}

function buildCards(paises) {
    containerCards.innerHTML = ''

    for(i = 0; i < paises.length; i++){
        let card =  newElement('div', 'card')
        card.setAttribute('value', paises[i].name)

        // Campo imagem
        let cardImg = newElement('div', 'card-img')
        let img = newElement('img')
        img.setAttribute('src', paises[i].flag)
        img.setAttribute('alt', `Bandeira do(a) ${paises[i].name}`)
        cardImg.appendChild(img)

        let cardContent = newElement('div', 'card-content')
        // Nome do país
        let h1 = newElement('h1')
        let nomePais = paises[i].name.split(" ",  2).join(' ')
        h1.textContent = nomePais
        cardContent.appendChild(h1)

        // Informação do país
        let cardContentInfo = newElement('div')
        cardContentInfo.innerHTML = `
        <div class="info-pais">
                        <span>População:</span> <span>${paises[i].population.toLocaleString('pt-BR')}</span>
                    </div>

                    <div class="info-pais">
                        <span>Região:</span> <span>${paises[i].region}</span>
                    </div>

                    <div class="info-pais">
                        <span>Capital:</span> <span>${paises[i].capital}</span>
                    </div>
        </div>
        ` 
        cardContent.appendChild(cardContentInfo)
        
        card.appendChild(cardImg)
        card.appendChild(cardContent)
        containerCards.appendChild(card)
    }
    containerCards.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            getCountry(card.getAttribute('value'))
        })
    })
}

function buildCardDetails(country) {
    pageCards.style.display = 'none'
    pageDetails.style.display = 'block'
    let contentCardsDetails = newElement('div', 'containerCardsDetails')
    containerCardsDetails.innerHTML = ''

    contentCardsDetails.innerHTML = `
    <div class="wrapper-details-card">
        <div class="img-details-card">
            <img src="${country[0].flag}" alt="">
        </div>
        <div class="content-details-card">
            <h1>${country[0].name}</h1>
            <div class="content-details">
                <div class="rigth-details">
                    <div class="info-details">
                        <span>Native Name: </span>
                        <span>${country[0].nativeName}</span>
                    </div>
                    <div class="info-details">
                        <span>População: </span>
                        <span>${country[0].population.toLocaleString('pt-BR')}</span>
                    </div>
                    <div class="info-details">
                        <span>Region: </span>
                        <span>${country[0].region}</span>
                    </div>
                    <div class="info-details">
                        <span>Sub Region: </span>
                        <span>${country[0].subRegion}</span>
                    </div>
                    <div class="info-details">
                        <span>Capital: </span>
                        <span>${country[0].capital}</span>
                    </div>
                </div>
                <div class="left-details">
                    <div class="info-details">
                        <span>Top Level Domanin: </span>
                        <span>${country[0].topLevelDomain}</span>
                    </div>
                    <div class="info-details">
                        <span>Currencies: </span>
                        <span>${country[0].correncies}</span>
                    </div>
                    <div class="info-details">
                        <span>Languages</span>
                        <span>${country[0].languages.name}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    containerCardsDetails.appendChild(contentCardsDetails)
}



pesquisarPais.addEventListener('keyup', printCountries);

continents.forEach(continent => {
    continent.addEventListener('click', printContinents)
})

window.onload = getCoutries().then(data => buildCards(data))

btnBack.addEventListener('click', () => {
    pageCards.style.display = 'block'
    pageDetails.style.display = 'none'
})