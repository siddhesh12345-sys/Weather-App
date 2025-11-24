async function getWeather() {
    const city = document.getElementById("cityInput").value;

    if (city === "") {
        document.getElementById("error").innerText = "Please enter a city name";
        return;
    }

    const apiKey = "66c23aadae641313a47f029705f8f55b";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod !== 200) {
            document.getElementById("error").innerText = "City not found!";
            return;
        }

        document.getElementById("error").innerText = "";

        // Show card
        document.getElementById("weatherCard").classList.remove("hidden");

        // Basic info
        document.getElementById("cityName").innerText = data.name;
        document.getElementById("temperature").innerText = `${data.main.temp}°C`;
        document.getElementById("humidity").innerText = `${data.main.humidity}%`;
        document.getElementById("wind").innerText = `${data.wind.speed} km/h`;
        document.getElementById("condition").innerText = data.weather[0].description;

        // Circle animation
        const tempDeg = (data.main.temp / 40) * 360;
        document.querySelector(".circle").style.background =
            `conic-gradient(#ffeb3b ${tempDeg}deg, #333 ${tempDeg}deg)`;

        // Extra Info
        document.getElementById("country").innerText = data.sys.country;
        document.getElementById("coords").innerText =
            `Lat: ${data.coord.lat}, Lon: ${data.coord.lon}`;
        document.getElementById("feelsLike").innerText = `${data.main.feels_like}°C`;
        document.getElementById("pressure").innerText = `${data.main.pressure} hPa`;
        document.getElementById("visibility").innerText =
            `${(data.visibility / 1000).toFixed(1)} km`;

        // Sunrise & Sunset
        document.getElementById("sunrise").innerText =
            new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        document.getElementById("sunset").innerText =
            new Date(data.sys.sunset * 1000).toLocaleTimeString();

        // Local Time Convert
        const timezoneOffset = data.timezone;
        const localTime = new Date(Date.now() + timezoneOffset * 1000);
        document.getElementById("localTime").innerText =
            localTime.toUTCString().slice(17, 29);

    } catch (error) {
        document.getElementById("error").innerText = "Error fetching weather!";
    }
}
