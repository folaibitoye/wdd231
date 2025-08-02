const apiKey = 'YOUR_API_KEY';
const city = 'Timbuktu';
const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
        const current = data.list[0];
        const forecast = data.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);

        document.getElementById('current-weather').innerHTML = `
      <p>${current.weather[0].description}</p>
      <p>Temp: ${current.main.temp}°C</p>
    `;

        document.getElementById('forecast').innerHTML = forecast.map(day => `
      <p>${new Date(day.dt_txt).toLocaleDateString(undefined, { weekday: 'long' })}: ${day.main.temp}°C</p>
    `).join('');
    });