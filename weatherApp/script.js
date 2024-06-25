function getWeather(type) {
    const apiKey = 'fbcbeca09eb1d90a95dc7cda60ebcad5'; // Reemplaza con tu clave de API de OpenWeatherMap
    const city = document.getElementById('cityInput').value;
    if (city) {
        if (type === 'current') {
            const currentUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            fetch(currentUrl)
                .then(response => response.json())
                .then(data => displayCurrentWeather(data))
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('weatherResult').innerHTML = 'No se pudo obtener la información del clima actual.';
                });
        } else if (type === 'forecast') {
            const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

            fetch(forecastUrl)
                .then(response => response.json())
                .then(data => displayWeather(data, type))
                .catch(error => {
                    console.error('Error:', error);
                    document.getElementById('weatherResult').innerHTML = 'No se pudo obtener el pronóstico del clima a 5 días.';
                });
        }
    } else {
        document.getElementById('weatherResult').innerHTML = 'Por favor, ingresa una ciudad.';
    }
}
function displayCurrentWeather(data) {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = '';
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const cityName = data.name;
    const imageUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    resultDiv.innerHTML = `
        <p>Clima actual en ${cityName}: ${description}, ${temperature}°C</p>
        <img src="${imageUrl}" alt="Imagen del clima actual">
    `;
}


function displayWeather(data, type) {
    const resultDiv = document.getElementById('weatherResult');
    resultDiv.innerHTML = '';
    if (type === 'current') {
        const temperature = data.main.temp;
        const description = data.weather[0].description;
        const cityName = data.name;
        resultDiv.innerHTML = `<p>Clima actual en ${cityName}: ${description}, ${temperature}°C</p>`;
    } else if (type === 'forecast') {
        const cityName = data.city.name;
        const forecastList = data.list;
        resultDiv.innerHTML = `<p>Pronóstico del clima a 5 días para ${cityName}:</p>`;
        for (let i = 0; i < forecastList.length; i++) {
            const date = new Date(forecastList[i].dt * 1000);
            const temperature = forecastList[i].main.temp;
            const description = forecastList[i].weather[0].description;
            const iconCode = forecastList[i].weather[0].icon;
            resultDiv.innerHTML += `<p>${date.toDateString()}: ${description}, ${temperature}°C</p>`;
            const iconUrl = `http://openweathermap.org/img/wn/${iconCode}.png`;
            resultDiv.innerHTML += `<img src="${iconUrl}" alt="${description}">`;
        }
    }
}
