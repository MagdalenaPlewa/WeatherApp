//Connect DOM elemensts function
import { mapDomElements } from "./DOMAction.js";

//Get weather by city function from api service
import { getWeatherByCity } from "./ApiService.js";

class WeatherApp{
    constructor(){
        this.viewElems = {};
        this.initialize();
    }

    initialize = () => {
        this.connectDOMElement();
        this.setupListeners();
    }

    connectDOMElement = () => {
        const listOfId = Array.from(document.querySelectorAll('[id]')).map(elem => elem.id);
        this.viewElems = mapDomElements(listOfId);
    }

    setupListeners = () => {
        this.viewElems.weatherSearchView.addEventListener("keydown", this.handleSubmit);
        this.viewElems.searchButton.addEventListener("click", this.handleSubmit);
        this.viewElems.returnToSearchBtn.addEventListener("click", this.returnToSearch);
    }

//Input submit function
    handleSubmit = () => {
        if(event.key === "Enter" || event.type === "click"){
            this.fadeInOut();
            let city = this.viewElems.searchInput.value;
            getWeatherByCity(city)
            .then(data => {
                this.showWeather(data);
                this.displayChange(data);
                this.fadeInOut();
                this.viewElems.searchInput.style.borderColor = "black";
            })
            .catch(() => {
                this.fadeInOut()
                this.viewElems.searchInput.style.borderColor = "red";
                this.viewElems.searchInput.value = "City name error";
            })
        }
    }

//Weather parameters display
    showWeather = (data) => {
        const weather = data.consolidated_weather[0]

        this.viewElems.weatherCity.innerText = data.title;
        this.viewElems.weatherIcon.src = `https://www.metaweather.com/static/img/weather/${data.consolidated_weather[0].weather_state_abbr}.svg`;

        const currentTemp = weather.the_temp.toFixed(0);
        const minTemp = weather.min_temp.toFixed(0);
        const maxTemp = weather.max_temp.toFixed(0);

        this.viewElems.weatherCurrentTemp.innerText = `Current temperature: ${currentTemp}  °C`;
        this.viewElems.weatherMaxTemp.innerText = `Maximum temperature: ${maxTemp}  °C`;
        this.viewElems.weatherMinTemp.innerText = `Minimum temperature: ${minTemp}  °C`;

    }

//View change function
    displayChange = () => {
        if(this.viewElems.weatherSearchView.style.display !== "none"){
            this.viewElems.weatherSearchView.style.display = "none";
            this.viewElems.weatherForecastView.style.display = "block"
        }
        else{
            this.viewElems.weatherSearchView.style.display = "flex";
            this.viewElems.weatherForecastView.style.display = "none";
            this.viewElems.searchInput.value = "";
        }
    }

//Display fade in/out function
    fadeInOut = () => {
        if(this.viewElems.mainContainer.style.opacity === "1" || this.viewElems.mainContainer.style.opacity === ""){
            this.viewElems.mainContainer.style.opacity = "0";
        }
        else{
            this.viewElems.mainContainer.style.opacity = "1";
        }
    }

    returnToSearch = () => {
        this.fadeInOut();
        setTimeout(() => {
            this.displayChange();
            this.fadeInOut();
        }, 500);
    }
}

document.addEventListener("DOMContentLoaded", new WeatherApp());
