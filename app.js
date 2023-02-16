


const form = document.querySelector(".form")
const appContainer = document.querySelector(".app-container")
const weatherImage = document.querySelector(".weather-img")
const tempNumber = document.querySelector(".temperature-number")
const tempDescription = document.querySelector(".temperature-description")
const humidity = document.querySelector(".humidity-percentage")
const windSpeed = document.querySelector(".wind-speed-number")
const input = document.querySelector(".input")
const placeName = document.querySelector(".place-name")


const key = '854ca17890cc977ec26ea41c65550f95'

form.addEventListener('submit', async function(e){
    e.preventDefault()

    appContainer.classList.remove('shake')
    

    console.log("submitted")
    
    


    if(input.value){

        appContainer.style.borderColor = "white"
        async function fetchWeather(){
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`)
            let data = await response.json()
            return data
     }
 
     const weather = await fetchWeather()

     if(weather.cod === '404'){
        placeName.innerText = 'Oops, Invalid Location'
        tempNumber.innerHTML = 'N/A'
        tempDescription.innerText = "Please enter a valid location"
        humidity.innerText = 'N/A'
        windSpeed.innerText = 'N/A'
        weatherImage.src = "images/incorrect.png"
        appContainer.classList.add("expand")
     }
 
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

        case "Rain":
            weatherImage.src = "images/rainy-day.png"
            break;

        case "Drizzle":
            weatherImage.src = "images/rainy-day.png"
            break;

        case "Mist":
            weatherImage.src = "images/fog.png"
            break;

        

        default:
          // code block
      }

    //   let strArray = weather.weather[0].description.split("")
    //   strArray[0] = strArray[0].toUpperCase()
    //   for(let i = 0; i < strArray.length; i++){
    //     if(strArray[i] == " "){
    //        strArray[i+1] = strArray[i+1].toUpperCase()
    //     }
    //   }
    //   let uppercasedDescription = strArray.join("")
     
      
        placeName.innerText = weather.name
        tempNumber.innerHTML = `${weather.main.temp}<sup> &#8451;</sup>`
        tempDescription.innerText = weather.weather[0].description
        tempDescription.classList.add("capitalize")
        humidity.innerText = `${weather.main.humidity}%`
        windSpeed.innerText = `${weather.wind.speed}km/h`
        appContainer.classList.add("expand")

    } else {
        input.placeholder = "Please enter a location"
        appContainer.style.borderColor = "red"
        appContainer.classList.add("shake")
    }
})
