import { mapDomElements } from "./DOMAction.js";
import { getWeatherCity } from "./ApiService.js";

const initialize = () => {
    connectDOMElement();
    setupListeners();
}

let viewElems = {};

const connectDOMElement = () => {
    const listOfId = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
    viewElems = mapDomElements(listOfId);
}

const setupListeners = () => {
    viewElems.weatherSearchView.addEventListener("keydown", handleSubmit);
    viewElems.searchButton.addEventListener("click", handleSubmit);
    viewElems.returnToSearchBtn.addEventListener("click", returnToSearch);
}

const handleSubmit = () => {
    if(event.key === "Enter" || event.type === "click"){
        fadeInOut();
        let city = viewElems.searchInput.value;
        getWeatherCity(city)
        .then(data => {
            showWeather(data);
            displayChange(data);
            fadeInOut();
            viewElems.searchInput.style.borderColor = "black";
        })
        .catch(() => {
            console.log("error")
            fadeInOut()
            viewElems.searchInput.style.borderColor = "red";
            viewElems.searchInput.value = "City name error";
        })

    }

}

const showWeather = (data) => {
    const weather = data.consolidated_weather[0]

    viewElems.weatherCity.innerText = data.title;
    viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`;

    const currentTemp = weather.the_temp.toFixed(0);
    const minTemp = weather.min_temp.toFixed(0);
    const maxTemp = weather.max_temp.toFixed(0);

    viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp}  °C`;
    viewElems.weatherMaxTemp.innerText = `Maximum temperature: ${maxTemp}  °C`;
    viewElems.weatherMinTemp.innerText = `Minimum temperature: ${minTemp}  °C`;

}

const displayChange = () => {
    if(viewElems.weatherSearchView.style.display !== "none"){
        viewElems.weatherSearchView.style.display = "none";
        viewElems.weatherForecastView.style.display = "block"
    }
    else{
        viewElems.weatherSearchView.style.display = "flex";
        viewElems.weatherForecastView.style.display = "none";
        viewElems.searchInput.value = "";
    }
}

const fadeInOut = () => {
    if(viewElems.mainContainer.style.opacity === "1" || viewElems.mainContainer.style.opacity === ""){
        viewElems.mainContainer.style.opacity = "0";
    }
    else{
        viewElems.mainContainer.style.opacity = "1";
    }
}

const returnToSearch = () => {
    fadeInOut();
    setTimeout(() => {
        displayChange();
        fadeInOut();
    }, 500);
    
}

document.addEventListener("DOMContentLoaded", initialize);
