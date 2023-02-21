
const form = document.querySelector(".form")
const appContainer = document.querySelector(".app-container")
const weatherImage = document.querySelector(".weather-img")
const tempNumber = document.querySelector(".temperature-number")
const tempDescription = document.querySelector(".temperature-description")
const humidity = document.querySelector(".humidity-percentage")
const windSpeed = document.querySelector(".wind-speed-number")
const input = document.querySelector(".input")
const placeName = document.querySelector(".place-name")
const btn  = document.querySelector(".btn")
const icon = document.querySelector(".icon")
const key = '854ca17890cc977ec26ea41c65550f95'
let unit;



const btnContainer = document.querySelector(".btn-container")
const unitBtn = document.querySelector(".unit-btn")




btnContainer.addEventListener("click", function(){


    if(btnContainer.classList.contains("slide-right"))
    {
        btnContainer.classList.remove("slide-right")
        unitBtn.innerHTML = "<sup>&#8451;</sup>"
    }
    else{
        btnContainer.classList.add("slide-right")
        unitBtn.innerHTML = "<sup>&#8457;</sup>"
        

    }



})


form.addEventListener('submit', async function(e){
    e.preventDefault()
   
    console.log("submitted")
    
    if(input.value){

        if(btnContainer.classList.contains("slide-right")){
             unit = "imperial"
        }

        else{
            unit = "metric"
        }

        appContainer.style.borderColor = "black"
        icon.classList.remove("red")
        async function fetchWeather(){
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=${unit}`)
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
            weatherImage.src = "images/sun-2.png"
          break;
        case "Clouds":
            weatherImage.src = "images/cloudy-2.png"
          break;

        case "Haze":
            weatherImage.src = "images/cloudy-2.png"
          break;

        case "Rain":
            weatherImage.src = "images/rainy-2.png"
            break;

        case "Drizzle":
            weatherImage.src = "images/rainy-2.png"
            break;

        case "Mist":
            weatherImage.src = "images/fog-2.png"
            break;

        case "Snow":
            weatherImage.src = "images/snow.png"
            break;


        default:
          // code block
      }

     

        placeName.innerText = weather.name
        tempNumber.innerHTML = `${Math.trunc(weather.main.temp)}${ unit == "metric" ? "<sup>&#8451;</sup>" : "<sup>&#8457;</sup>"  }`
        tempDescription.innerText = weather.weather[0].description
        tempDescription.classList.add("capitalize")
        humidity.innerText = `${weather.main.humidity}%`
        windSpeed.innerText = `${Math.trunc(weather.wind.speed * 3.6)}km/h`
        appContainer.classList.add("expand")

    } else {

        input.placeholder = " Please enter a location"
        icon.classList.add("red")
        appContainer.style.borderColor = "red"
        appContainer.classList.add("shake")
      
    }
})




btn.addEventListener("click", function(){

    if(appContainer.classList.contains("shake")){
        appContainer.classList.remove("shake")

    }
})








