


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
    
    appContainer.classList.remove("shake")


    if(input.value){
        appContainer.style.borderColor = "white"
        async function fetchWeather(){
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`)
            let data = await response.json()
            return data
     }
 
     const weather = await fetchWeather()
 
     console.log(weather)

     switch(weather.weather[0].main) {
        case "Clear":
            weatherImage.src = "images/sun.png"
          break;
        case "Clouds":
            weatherImage.src = "images/cloudy.png"
          
          break;

        case "Haze":
            weatherImage.src = "images/cloudy.png"
          break;


        default:
          // code block
      }

        tempNumber.innerHTML = `${weather.main.temp}<sup> &#8451;</sup>`
        tempDescription.innerText = weather.weather[0].description
        humidity.innerText = `${weather.main.humidity}%`
        windSpeed.innerText = `${weather.wind.speed}km/h`
        appContainer.classList.add("expand")

    } else {
        input.placeholder = "Please enter a location"
        appContainer.style.borderColor = "red"
        appContainer.classList.add("shake")
    }
})
