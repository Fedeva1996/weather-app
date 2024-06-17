import { useState, useEffect } from "react";
import Main from "./Components/Main";
import ForecastHora from "./Components/ForecastHora";
import ForecastDia from "./Components/ForecastDia";
import Alerta from "./Components/Alerta";
import Loading from "./Components/Loading";
import db from "./db.json";
import { fetchWeatherData } from "./Services/Weather";
import Header from "./Components/Header";

const Component = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coords, setCoords] = useState([-25.3007, -57.6359]);
  const [originalCoords, setOriginalCoords] = useState([]);
  const [units, setUnist] = useState("c");
  const [forecast, setForecast] = useState("d");

  // Obtener la ubicación del usuario
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocalización no soportada");
    }

    function success(position) {
      const { latitude, longitude } = position.coords;
      const userCoords = [latitude, longitude];
      setCoords(userCoords);
      setOriginalCoords(userCoords);
    }

    function error() {
      console.log("No se pudo recuperar la ubicación");
    }
  }, []);

  // Obtener los datos meteorológicos actuales
  useEffect(() => {
    if (coords.length === 2) {
      fetchWeatherData(coords[0], coords[1], units)
        .then((data) => {
          setCurrentData(data);
          //console.log(data)
          setLoaded(true);
        })
        .catch((error) => console.error(error));
    }
  }, [coords, units]);

  // Función para buscar una ciudad por nombre
  const findCityByName = (nombreCiudad) => {
    return db.ciudades.filter(
      (ciudad) => ciudad.nombre.toLowerCase() === nombreCiudad.toLowerCase()
    );
  };

  // Manejar la búsqueda de ciudades
  const handleSearch = (e) => {
    const searchValue = e.target.value;
    const results = findCityByName(searchValue);

    if (results.length > 0) {
      const { lat, lon } = results[0];
      setCoords([lat, lon]);
    } else {
      setCoords(originalCoords);
    }
  };

  // Alternar el modo oscuro
  const handleDarkmode = () => {
    setIsDarkMode(!isDarkMode);
  };
  // Alternar el sistema de unidades
  const handleUnits = () => {
    setUnist(units === "c" ? "f" : "c");
  };
  // Alternar el tipo de forecast
  const handleForecast = () => {
    setForecast(forecast === "d" ? "h" : "d");
  };

  return (
    <div
      className={`flex flex-col w-screen h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <Header
        isDarkMode={isDarkMode}
        handleDarkmode={handleDarkmode}
        units={units}
        handleUnits={handleUnits}
        forecast={forecast}
        handleForecast={handleForecast}
        handleSearch={handleSearch}
      />
      {loaded ? (
        <div className="grid center place-content-evenly h-full w-full">
          <Main weatherData={[data, units, isDarkMode]} />
          {data.alerts.alert[0] ? (
            <Alerta weatherData={[data, isDarkMode]} />
          ) : ("")}
          {forecast === "d" ? (
            <ForecastDia weatherData={[data, units, isDarkMode]} />
          ) : (
            <ForecastHora weatherData={[data, units, isDarkMode]} />
          )}
        </div>
      ) : (
        <Loading />
      )}
      <footer className="flex justify-center items-center min-h-8 px-4 border-t shrink-0 md:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hecho por Federico Verón y Jorge Ozuna. A base de la API{" "}
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            className="hover:text-gray-200"
          >
            WeatherAPI.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Component;
