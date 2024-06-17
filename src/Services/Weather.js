const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeatherData = async (lat, lon, units) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=es`
  );
  if (!response.ok) {
    throw new Error("Error al obtener los datos meteorológicos");
  }
  return await response.json();
};

export const fetchForecastData = async (lat, lon, units) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${units}&lang=es`
  );
  if (!response.ok) {
    throw new Error("Error al obtener el pronóstico meteorológico");
  }
  return await response.json();
};
