function weatherAPI(selectedCity) {
    const city = document.querySelector('.city')
    const country = document.querySelector('.country')
    const temperature = document.querySelector('.temperature')
    const description = document.querySelector('.description')
    const highest = document.querySelector('.highest')
    const lowest = document.querySelector('.lowest')
    const iconImg = document.querySelector('.iconImg')

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=75a0348f82edf39f41dec5c2d6cd790f`)
        .then(response => response.json())
        .then(response => {
            city.innerHTML = response.name
            country.innerHTML = `, ${response.sys.country}`
            temperature.innerHTML = Math.round(response.main.temp - 273.15)
            description.innerHTML = response.weather[0].description
            highest.innerHTML = `H: ${Math.round(response.main.temp_max - 273.15)}`
            lowest.innerHTML = `L: ${Math.round(response.main.temp_min - 272.15)}`
            iconImg.src = `animated/${response.weather[0].icon}.svg`
            iconImg.alt = response.weather[0].description
            console.log(response)
        })
}

function cityHandler(city = null) {
    if (city === '') return 'São José'
    if (city === null) {
        if (localStorage.city) {
            selectedCity = JSON.parse(localStorage.getItem('city'))
            return selectedCity
        } 
    }
    if (localStorage.city) {
        selectedCity = JSON.parse(localStorage.getItem('projects'))
    }
    if (city === null) return 'São José'
    selectedCity = city
    localStorage.city = JSON.stringify(selectedCity)
    return selectedCity
}

document.querySelector('button[type="submit"]').addEventListener('click', () => {
    const input = document.querySelector('.searchInput')
    cityHandler(input.value)
})

const fahrenheit = (() => {
    const h1 = document.querySelector('h1')
    const highest = document.querySelector('.highest')
    const lowest = document.querySelector('.lowest')

    h1.addEventListener('click', () => {
        if(h1.dataset.value === '°C') {
            let convertedDegree = (h1.innerHTML * 9/5) + 32
            let convertedHighest = ((highest.innerHTML).slice(-2) * 9/5) + 32
            let convertedLowest = ((lowest.innerHTML).slice(-2) * 9/5) + 32
            h1.innerHTML = Math.round(convertedDegree)
            highest.innerHTML = `H: ${Math.round(convertedHighest)}`
            lowest.innerHTML = `L: ${Math.round(convertedLowest)}`
            h1.setAttribute('data-value', '°F')            
        } else {
            let convertedDegree = (h1.innerHTML - 32) * 5/9
            let convertedHighest = ((highest.innerHTML).slice(-2) - 32) * 5/9
            let convertedLowest = ((lowest.innerHTML).slice(-2) - 32) * 5/9
            h1.innerHTML = Math.round(convertedDegree)
            highest.innerHTML = `H: ${Math.round(convertedHighest)}`
            lowest.innerHTML = `L: ${Math.round(convertedLowest)}`
            h1.setAttribute('data-value', '°C') 
        }
    })
})();

weatherAPI(cityHandler())


