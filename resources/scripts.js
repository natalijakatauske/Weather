let apiKey = 'af0a2795f5e1efdc2dabd4b6ecb4b82a' // jusu api key
let lang = 'lt' // kalba
let units = 'metric' // naudojama metrine sistema
let city = '' // miestas irasytas inpute

const paieskosLangas = document.createElement('div')
paieskosLangas.style.textAlign = 'center'
paieskosLangas.style.marginTop = '50px'
document.body.appendChild(paieskosLangas)
let cityName = document.getElementById('city')
cityName.style.backgroundColor = 'floralwhite'
cityName.style.padding = '10px'
cityName.style.marginRight = '10px'
cityName.style.borderRadius = '10px'
let searchButton = document.getElementById('search')
searchButton.style.padding = '10px'
searchButton.style.backgroundColor = 'floralwhite'
searchButton.style.borderRadius = '10px'
paieskosLangas.append(cityName, searchButton)

// uzdedu click eventa ant search mygtuko
searchButton.addEventListener('click', getDataFromApi)

// funkcija kuri gauna duomenis is API
function getDataFromApi() {
    // paimu irasyta miesta is input ir nustatau
    city = cityName.value

    // url yra skirtas pasiimti duomenis is api
    let url = 'https://api.openweathermap.org/data/2.5/forecast?' +
        'q=' + city +
        '&units=' + units +
        '&lang=' + lang +
        '&appid=' + apiKey

    // su fetch funkcija pasiimu duomenis is api (asinchronine funkcija)
    fetch(url)
        .then(response => response.json())
        // data => jusu kodas
        .then(function (data) {
            //paduodu gautus duomenis i funkcija
            showWeatherInDom(data)
        });
}

// funkcija kuri gauna duomenis ir juos atvaizduoja
function showWeatherInDom(data) {
    // tikrinu ar mano response yra geras
    if (data.cod === '200') {
        // data tai duomenys, kuriuos mes padavem i funkcija
        // cia atvaizduojam gautus duomenis DOM'e

        // sekantys zingsniai:
        // 1. susikurti div
        // 2. susirinkti is objekto reikiamus duomenis pavyzdiui:
        // miesto pavadinima, laika, oro apibudinima (description)
        //  temperatura min, max
        const card = document.createElement('div')
        card.style.textAlign = 'center'
        document.body.appendChild(card)
        const cityName = document.createElement('h2')
        cityName.innerText = data.city.name.toUpperCase()
        card.append(cityName)
            for (let i=0; i < data.list.length; i++) {
                const oneDay = document.createElement('div')
                oneDay.style.border = '2px solid black'
                oneDay.style.borderRadius = '10px'
                oneDay.style.marginRight = '20px'
                oneDay.style.marginBottom = '20px'
                oneDay.style.display = 'inline-flex'
                oneDay.style.padding = '20px'
                oneDay.style.backgroundColor = 'floralwhite'
                card.append(oneDay)
                const timeInfo = document.createElement('div')
                timeInfo.innerText = data.list[i].dt_txt + "\n"
                oneDay.append(timeInfo)
                for (let j=0; j < data.list[i].weather.length; j++) {
                    const weatherICon = data.list[i].weather[j].icon
                    const weatherIConUrl = 'http://openweathermap.org/img/wn/' + weatherICon + '@2x.png' 
                    const weatherImg = document.createElement('img')
                    weatherImg.src = weatherIConUrl
                    // weatherImg.width = '200px'
                    const weatherDescription = document.createElement('div')
                    weatherDescription.innerText = data.list[i].weather[j].description
                    oneDay.append(weatherImg, weatherDescription)
                }
                const temperaturaMax = document.createElement('div')
                temperaturaMax.innerText = 'Temperatūra yra ' + Math.round(data.list[i].main.temp_max)
                const temperaturaMin = document.createElement('div')
                temperaturaMin.innerText = 'Minimali temperatūra ' + Math.round(data.list[i].main.temp_min)
                oneDay.append(temperaturaMax, temperaturaMin)
    }
            
        
        

        // cia nustatom icon code is gautu duomenu, kad nustatyi iconCode pirma reikes gautame
        // objekte susirasti icon
        // let iconCode = '';
        // let iconUrl = 'http://openweathermap.org/img/wn/' + iconCode + '@2x.png'

        console.log(data)
    } else {
        alert('kazkas negerai, patikrinti konsole')
        console.log('Kazkas negerai',data)
    }

}
