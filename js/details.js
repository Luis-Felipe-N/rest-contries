
const getCoutries = async(url='https://restcountries.eu/rest/v2/region/oceania') => {
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
    // console.log(listaPaises)
}

const initDetails = country =>  {
    getCoutries(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`).then(data => initCardDetails(data))
}



function initCardDetails(country) {
    window.location.replace('/card-details.html')
    const btnBack = document.querySelector('[data-btn="btn-back"]')
    containerCardsDetails.innerHTML = ''

    let contentCardsDetails = newElement('div', 'containerCardsDetails')
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
                        <span>${country[0].population}</span>
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
                        <span>${country[0].languages}</span>
                    </div>
                </div>
            </div>
            <div class="border-countries">
                <span class="weight-600">Border Countries:</span>
                <div class="btns-countries">
                    <button class="btn btn-coutries">${country[0].borderCountries}</button>

                </div>
            </div>
        </div>
    </div>
    `
    containerCardsDetails.appendChild(contentCardsDetails)

    btnBack.addEventListener('click', () => {
        window.location.replace('/index.html')
    })
}
