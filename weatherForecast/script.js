document.addEventListener("DOMContentLoaded", function() {
    const loadingContainer = document.getElementById("loadingContainer")
    let index = 0
    const counter = function() {
        const loadingDots = document.getElementById("loadingDots")
        const loadingText = document.getElementById("loadingText")
        const loadingHeader = document.querySelector("#loadingContainer h2")
        if (index < 101) {
            loadingText.textContent = `${index}%`
            index++
            if (index === 33) loadingDots.textContent = "."
            else if (index === 66) loadingDots.textContent = ".."
            else if (index === 75) {
                loadingText.style.transform = "scale(0.80)"
                loadingText.style.letterSpacing = "5px"
            }
        } else {
            loadingDots.textContent = "..."
            loadingText.style.transform = "scale(1.3)"
            setTimeout(function() {
                loadingContainer.style.height = "0"
                loadingHeader.style.opacity = "0"
            }, 1000)
            return
        } 
    }
    setInterval(function() {
        counter()
    }, 15)
    setTimeout(function() {
        loadingContainer.style.display = "none"
    }, 3900) 
})
const cityInput = document.getElementById("cityInput")
let cityInputValue
let delayTimer
cityInput.addEventListener("input", function() {
    clearTimeout(delayTimer)
    delayTimer = setTimeout(function () {
        cityInputValue = cityInput.value
        const weatherIcons = document.querySelectorAll("#container i")
        for (let i = 0; i < weatherIcons.length; i++) {
            const icons = weatherIcons[i]
            setTimeout(function() {
                icons.style.opacity = "1"
            }, 80)
        }
        const containerSpans = document.querySelectorAll("#container span")
        for (let i = 0; i < containerSpans.length; i++) {
            const spans = containerSpans[i]
            setTimeout(function() {
                spans.style.opacity = "1"
            }, 80)
        }
        fetch(`https://api.weatherbit.io/v2.0/current?key=86f1b43470484e83846e2f5bf1f81e46&city=${cityInputValue}`)
            .then(response => response.json())
            .then(data => { console.log(data)
            const precip = data.data[0].precip
            const city = data.data[0].city_name
            const country = data.data[0].country_code
            const temp = data.data[0].temp
            const tempFeeling = data.data[0].app_temp
            const uvAPI = data.data[0].uv
            const weatherDescAPI = data.data[0].weather.description
            const windSpeedAPI = data.data[0].wind_spd
            const humidity = data.data[0].rh
            const pressureAPI = data.data[0].pres
            const windDirection = data.data[0].wind_cdir
            const sunrise = data.data[0].sunrise
            const sunset = data.data[0].sunset
            const fromTimeZone = "Europe/London"
            let timeZone = data.data[0].timezone
            const toTimeZone = timeZone
            const sunriseFirst = moment(sunrise, "HH:mm")
            const fromTimeZoneOffsetSunrise = sunriseFirst.clone().tz(fromTimeZone).utcOffset()
            const convertedSunrise = sunriseFirst.clone().utcOffset(fromTimeZoneOffsetSunrise, true).tz(toTimeZone)
            const formattedSunrise = convertedSunrise.format("HH:mm")
            const sunsetFirst = moment(sunset, "HH:mm")
            const fromTimeZoneOffsetSunset = sunsetFirst.clone().tz(fromTimeZone).utcOffset()
            const convertedSunset = sunsetFirst.clone().utcOffset(fromTimeZoneOffsetSunset, true).tz(toTimeZone)
            const formattedSunset = convertedSunset.format("HH:mm")
            const pressure = Math.round(pressureAPI)
            const windSpeed = Math.round(windSpeedAPI)
            const uv = Math.round(uvAPI)
            const weatherDesc = weatherDescAPI.split(" ")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")
            const precipText = document.getElementById("precipText")
            const locationText = document.getElementById("locationText")
            const tempText = document.getElementById("tempText")
            const feelingText = document.getElementById("feelingText")
            const uvText = document.getElementById("uvText")
            const sunriseText = document.getElementById("sunriseText")
            const sunsetText = document.getElementById("sunsetText")
            const humidityText = document.getElementById("humidityText")
            const pressureText = document.getElementById("pressureText")
            const windText = document.getElementById("windText")
            const descText = document.getElementById("descText")
            precipText.textContent = `${precip} mm`
            locationText.textContent = `${city}, ${country}`
            tempText.textContent = `${temp.toFixed(1)} °C / ${((temp * 1.8) + 32).toFixed(1)} °F`
            feelingText.textContent = `${tempFeeling.toFixed(1)} °C / ${((tempFeeling * 1.8) + 32).toFixed(1)} °F`
            uvText.textContent = uv
            humidityText.textContent = `${humidity} %`
            pressureText.textContent = `${pressure} hPa`
            sunriseText.textContent = formattedSunrise
            sunsetText.textContent = formattedSunset
            windText.textContent = `${windSpeed} m/s, ${windDirection}`
            descText.textContent = weatherDesc
        })
        .catch(error => {
            const containerSpans = document.querySelectorAll("#container span")
            for (let i = 0; i < containerSpans.length; i++) {
                const spans = containerSpans[i]
                setTimeout(function() {
                    spans.style.opacity = "0"
                }, 80)
            }
            const weatherIcons = document.querySelectorAll("#container i")
            for (let i = 0; i < weatherIcons.length; i++) {
                const icons = weatherIcons[i]
                setTimeout(function() {
                    icons.style.opacity = "0"
                }, 80)
            }
            console.error("Error fetching weather data:", error)
        })
    }, 1000);
})