document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById("searchBtn");
    const cityInput = document.getElementById("cityInput");
    const weatherInfo = document.getElementById("weatherInfo");
    const loadingMsg = document.getElementById("loadingMsg");
    const errorMsg = document.getElementById("errorMsg");

    const tempEl = document.getElementById("temp");
    const cityEl = document.getElementById("cityName");
    const humidityEl = document.getElementById("humidity");
    const windEl = document.getElementById("wind");
    const iconEl = document.getElementById("icon");

    async function checkWeather(city) {
        // 1. Resetar UI
        weatherInfo.style.display = "none";
        errorMsg.style.display = "none";
        loadingMsg.style.display = "block";

        try {
            // 2. Simular Network Request
            await new Promise(resolve => setTimeout(resolve, 1500)); 

            loadingMsg.style.display = "none";

            // 3. Validação e Mock
            if (!city || city.trim() === "") {
                throw new Error("Cidade inválida");
            }

            // Dados Mockados Inteligentes
            const randomTemp = Math.floor(Math.random() * (32 - 18 + 1)) + 18;
            const randomHumidity = Math.floor(Math.random() * (90 - 40 + 1)) + 40;
            const randomWind = Math.floor(Math.random() * (20 - 5 + 1)) + 5;

            let weatherIcon = "☀️";
            if (randomTemp < 20) weatherIcon = "🌧️";
            else if (randomTemp < 25) weatherIcon = "⛅";
            
            // 4. Atualiza o DOM
            tempEl.innerText = `${randomTemp}°C`;
            cityEl.innerText = city.charAt(0).toUpperCase() + city.slice(1);
            humidityEl.innerText = `${randomHumidity}%`;
            windEl.innerText = `${randomWind} km/h`;
            iconEl.innerText = weatherIcon;

            weatherInfo.style.display = "block";

        } catch (error) {
            loadingMsg.style.display = "none";
            errorMsg.innerText = "Cidade não encontrada ou campo vazio.";
            errorMsg.style.display = "block";
        }
    }

    // Event Listeners
    searchBtn.addEventListener("click", () => checkWeather(cityInput.value));
    
    cityInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") checkWeather(cityInput.value);
    });
});