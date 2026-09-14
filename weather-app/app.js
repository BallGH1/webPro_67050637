const apiKey = "95c97c850956b4c7a46e5fc356b88f2a";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const loading = document.getElementById("loading");
const weatherResult = document.getElementById("weatherResult");
const errorDiv = document.getElementById("error");
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

let tempChart = null;

async function fetchWeather(city) {
    const url = `${baseUrl}?q=${city}&units=metric&lang=th&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

async function fetchForecast(city) {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=th&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`เกิดข้อผิดพลาด: ${response.status}`);
    }
    const data = await response.json();
    return data;
}

function processForecast(list) {
    const days = ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์"];
    const dailyMap = {};

    list.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        if (!dailyMap[date]) {
            dailyMap[date] = { temps: [], icon: item.weather[0].icon, dt: item.dt };
        }
        dailyMap[date].temps.push(item.main.temp);
        if (item.dt_txt.includes("12:00:00")) {
            dailyMap[date].icon = item.weather[0].icon;
        }
    });

    return Object.keys(dailyMap).slice(0, 5).map((date, idx) => {
        const entry = dailyMap[date];
        let dayName = idx === 0 ? "วันนี้" : idx === 1 ? "พรุ่งนี้" : days[new Date(entry.dt * 1000).getDay()];
        return {
            day: dayName,
            maxTemp: Math.round(Math.max(...entry.temps)),
            minTemp: Math.round(Math.min(...entry.temps)),
            icon: entry.icon
        };
    });
}

function renderChart(forecastDays) {
    const ctx = document.getElementById("tempChart").getContext("2d");

    if (tempChart) tempChart.destroy();

    tempChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: forecastDays.map(f => f.day),
            datasets: [
                {
                    data: forecastDays.map(f => f.maxTemp),
                    backgroundColor: '#f97316',
                    borderRadius: 2,
                    barPercentage: 0.65,
                    categoryPercentage: 0.45
                },
                {
                    data: forecastDays.map(f => f.minTemp),
                    backgroundColor: '#0984e3',
                    borderRadius: 2,
                    barPercentage: 0.65,
                    categoryPercentage: 0.45
                }
            ]
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: {
                    min: 0,
                    max: 40,
                    ticks: { stepSize: 10, font: { size: 10 } },
                    grid: { color: '#f1f5f9' }
                },
                x: {
                    ticks: { font: { size: 10 } },
                    grid: { display: false }
                }
            }
        }
    });
}

function displayWeather(data, city, forecastDays) {
    const temp = Math.round(data.main.temp);
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const pressure = data.main.pressure;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;

    const forecastCardsHtml = forecastDays.map(item => `
        <div class="forecast-card">
            <span class="f-day">${item.day}</span>
            <span class="f-icon">
                <img src="https://openweathermap.org/img/wn/${item.icon}.png" alt="icon">
            </span>
            <span class="f-max">${item.maxTemp}°C</span>
            <span class="f-min">${item.minTemp}°C</span>
        </div>
    `).join("");

    const html = `
        <div class="weather-card">
            <div class="weather-main">
                <div class="weather-icon">
                    <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="icon">
                </div>
                <div class="weather-info">
                    <h2>${temp}°C</h2>
                    <p class="city-name">${city}, ${data.sys.country}</p>
                    <p class="desc">${description}</p>
                </div>
            </div>
            <div class="details">
                <p>💧 ความชื้น: ${humidity}%</p>
                <p>💨 ความเร็วลม: ${wind} m/s</p>
                <p>⏱ ความกดอากาศ: ${pressure} hPa</p>
            </div>
        </div>

        <div class="forecast-title">พยากรณ์อากาศ 5 วัน (ตัวอย่าง)</div>
        <div class="forecast-grid">${forecastCardsHtml}</div>

        <div class="chart-header">
            <div class="chart-title">กราฟอุณหภูมิรายวัน</div>
            <div class="chart-legend">
                <span><span class="legend-box max-box"></span>สูงสุด</span>
                <span><span class="legend-box min-box"></span>ต่ำสุด</span>
            </div>
        </div>
        <div class="chart-wrapper">
            <canvas id="tempChart"></canvas>
        </div>
    `;
    weatherResult.innerHTML = html;
    weatherResult.classList.remove("hidden");
    renderChart(forecastDays);
}

async function loadWeatherData(city) {
    try {
        loading.classList.remove("hidden");
        errorDiv.classList.add("hidden");
        weatherResult.classList.add("hidden");

        const data = await fetchWeather(city);
        const forecastRaw = await fetchForecast(city);
        const forecastDays = processForecast(forecastRaw.list);

        displayWeather(data, city, forecastDays);
    } catch (error) {
        errorDiv.textContent = `เกิดข้อผิดพลาด: ${error.message}`;
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function selectCity(city) {
    cityInput.value = city;
    loadWeatherData(city);
}

function displayMultipleCities(results, cities) {
    if (tempChart) {
        tempChart.destroy();
        tempChart = null;
    }

    const cardsHtml = results.map((data, index) => {
        const city = cities[index];
        const temp = Math.round(data.main.temp);
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const description = data.weather[0].description;
        const icon = data.weather[0].icon;

        return `
            <div class="multi-card" onclick="selectCity('${city}')">
                <div class="multi-card-header">
                    <h4>${city}, ${data.sys.country}</h4>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="icon">
                </div>
                <div class="multi-card-body">
                    <div class="multi-temp">${temp}°C</div>
                    <div class="multi-desc">${description}</div>
                </div>
                <div class="multi-details">
                    <span>💧 ${humidity}%</span>
                    <span>💨 ${wind} m/s</span>
                </div>
            </div>
        `;
    }).join("");

    weatherResult.innerHTML = `
        <div class="multi-cities-container">
            <div class="multi-title">สภาพอากาศหลายเมือง</div>
            <div class="multi-grid">
                ${cardsHtml}
            </div>
        </div>
    `;
    weatherResult.classList.remove("hidden");
}

async function loadMultipleCities(cities) {
    try {
        loading.classList.remove("hidden");
        errorDiv.classList.add("hidden");
        weatherResult.classList.add("hidden");

        const promises = cities.map(city => fetchWeather(city));
        const results = await Promise.all(promises);
        displayMultipleCities(results, cities);
    } catch (error) {
        errorDiv.textContent = "เกิดข้อผิดพลาดในการดึงข้อมูลหลายเมือง";
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function handleSearch() {
    const input = cityInput.value.trim();
    if (!input) return;

    if (input.includes(",")) {
        const cities = input.split(",").map(c => c.trim()).filter(c => c);
        loadMultipleCities(cities);
    } else {
        loadWeatherData(input);
    }
}

searchBtn.addEventListener("click", handleSearch);

cityInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        handleSearch();
    }
});