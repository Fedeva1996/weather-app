import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Main from "./Components/Main";
import Forecast from "./Components/Forecast";
import Loading from "./Components/Loading";
import db from "./db.json";
import { fetchWeatherData } from "./Services/Weather";

const Component = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [coords, setCoords] = useState([-25.3007, -57.6359]);
  const [originalCoords, setOriginalCoords] = useState([]);
  const [units, setUnist] = useState("c");

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

  return (
    <div
      className={`flex flex-col w-screen h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex w-full justify-between items-center gap-4">
          <Link
            to="#"
            className="flex items-center justify-between gap-2 text-lg font-semibold md:text-base hover:text-gray-900 dark:hover:text-gray-500"
          >
            <h1>Weather App</h1>
          </Link>
          <div className="w-full max-w-md">
            <input
              type="search"
              placeholder="Buscar ciudad..."
              onChange={handleSearch}
              className={`w-full h-full rounded-md p-2 transition-colors ${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-900"
              }`}
            />
          </div>
          <div>
            <button onClick={handleUnits} className="p-2">
              {units === "c" ? (
                <h1 className="text-xl hover:scale-110 transition-transform">
                  C°
                </h1>
              ) : (
                <h1 className="text-xl hover:scale-110 transition-transform">
                  F°
                </h1>
              )}
            </button>
            <button onClick={handleDarkmode} className="p-2">
              {isDarkMode ? (
                <h1 className="text-xl hover:scale-110 transition-transform">
                  🌞
                </h1>
              ) : (
                <h1 className="text-xl hover:scale-110 transition-transform">
                  🌜
                </h1>
              )}
            </button>
          </div>
        </div>
      </header>
      {loaded ? (
        <div className="grid center place-content-evenly h-full">
          <Main weatherData={[data, units, isDarkMode]} />
          <Forecast weatherData={[data, units, isDarkMode]} />
        </div>
      ) : (
        <Loading />
      )}
      <footer className="flex justify-center items-center h-16 px-4 border-t shrink-0 md:px-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hecho por Federico Verón y Jorge Ozuna. A base de la API{" "}
          <a href="https://www.weatherapi.com/" title="Free Weather API" className="hover:text-gray-200">
            WeatherAPI.com
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Component;
