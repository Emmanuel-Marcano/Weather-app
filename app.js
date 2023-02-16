


const form = document.querySelector(".form")
const appContainer = document.querySelector(".app-container")
const weatherImage = document.querySelector(".weather-img")
const tempNumber = document.querySelector(".temperature-number")
const tempDescription = document.querySelector(".temperature-description")
const humidity = document.querySelector(".humidity-percentage")
const windSpeed = document.querySelector(".wind-speed-number")
const input = document.querySelector(".input")


const key = '854ca17890cc977ec26ea41c65550f95'

form.addEventListener('submit', async function(e){
    e.preventDefault()


    async function fetchWeather(){
           let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`)
           let data = await response.json()
           return data
    }

    const weather = await fetchWeather()


    console.log(weather)

    if(weather.weather[0].main === "Clouds" || "Haze"){
        weatherImage.src = "images/cloudy.png"
    }

     tempNumber.innerText = weather.main.temp

    tempDescription.innerText = weather.weather[0].description
    humidity.innerText = `${weather.main.humidity}%`
    windSpeed.innerText = `${weather.wind.speed}km/h`

    appContainer.classList.add("expand")

})





