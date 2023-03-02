const weekDays = (() => {
    const weekDays = document.querySelector('.weekDays')

    function dayName(i) {
        const weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thirsday', 'Friday', 'Saturday'];
        const date = new Date()
        const today = date.getDay()
        let day = 0;
        
        if ((today + i) > 6) {
            day = today + i - 7
        } else {
            day = today + i
        }

        return weekday[day]
    }

    for (let i = 1; i < 7; i++) {
        const div = document.createElement('div')
        const h4 = document.createElement('h4')
        h4.classList.add('weekDay')
        h4.innerHTML = dayName(i)

        div.appendChild(h4)
        weekDays.appendChild(div)
    }
})();

const weatherInfo = (() => {
    const city = document.querySelector('.city')
    const state = document.querySelector('.state')
    const temperature = document.querySelector('.temperature')
    const description = document.querySelector('.description')
    const highest = document.querySelector('.highest')
    const lowest = document.querySelector('.lowest')
    const input = document.querySelector('.searchInput')
    const submitBtn = document.querySelector('button[type="submit"]')
})();

function weatherAPI(selectedCity) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${selectedCity}&APPID=75a0348f82edf39f41dec5c2d6cd790f`)
        .then(response => response.json())
        .then(response => {
            console.log(response)
        }) 
}

function cityHandler(city = null) {
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