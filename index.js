const weatherForm = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.city');
const card = document.querySelector('#card');
const apiKey ="58a6f17b9fd56089fa464aa0dccc1e2f"


weatherForm.addEventListener('submit',async event => {
    event.preventDefault();

    const city = cityInput.value;
     
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            displayError("An error occured while fetching the weather data");
        }
    } else {
        displayError("Please enter a city");
    }
});






displayError = (message) => {
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;

    errorDisplay.classList.add('errorDisplay');

    card.textContent = '';
    card.style.display= "flex";
    card.appendChild(errorDisplay);


}

async function getWeatherData(city){

const apiUrl =`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
const response = await fetch(apiUrl);

console.log(response);

if(response.status === 404){
    throw new Error("City not found");

}

return await response.json();
}


function displayWeatherInfo(data){
    const{name: city, main: {temp, humidity}, weather: [{description,id}]} = data;
card.textContent = '';
card.style.display = "flex";

const cityDisplay = document.createElement('h1');
const tempDisplay = document.createElement('p');
const humidityDisplay = document.createElement('p');
const weatherDisplay = document.createElement('p');
const descDisplay= document.createElement('p');
const weatherEmoji = document.createElement('p');

cityDisplay.textContent = city;
tempDisplay.textContent = `Temperature: ${(temp-273.15).toFixed(1)}C`;
humidityDisplay.textContent = `Humidity: ${humidity}%`;
descDisplay.textContent = description;
weatherEmoji.textContent = getWeatherEmoji(id);
cityDisplay.classList.add('cityDisplay');
tempDisplay.classList.add('tempDisplay');
humidityDisplay.classList.add('humidityDisplay');
descDisplay.classList.add('descDisplay');
weatherEmoji.classList.add('weatherEmoji');
card.appendChild(cityDisplay);
card.appendChild(tempDisplay);
card.appendChild(humidityDisplay);
card.appendChild(descDisplay);
card.appendChild(weatherEmoji);

}


function getWeatherEmoji(id){
    if(id >= 200 && id < 300){
        return "⛈️";
    }
    if(id >= 300 && id < 400){
        return "🌧️";
    }
    if(id >= 500 && id < 600){
        return "☔";
    }
    if(id >= 600 && id < 700){
        return "❄️";
    }
    if(id >= 700 && id < 800){
        return "🌫️";
    }
    if(id === 800){
        return "☀️";
    }
    if(id > 800){
        return "☁️";
    }
}