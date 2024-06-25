const API_KEY = process.env.REACT_APP_API_KEY;

export const fetchWeatherData = async (lat, lon) => {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=5&aqi=yes&alerts=yes&lang=es`
  );
  if (!response.ok) {
    throw new Error("Error al obtener los datos meteorológicos");
  }
  return await response.json();
};