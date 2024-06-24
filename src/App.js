import React, { useState, useEffect } from "react";
import Main from "./Components/Main";
import Ciudades from "./Components/Ciudades";
import ForecastHora from "./Components/ForecastHora";
import ForecastDia from "./Components/ForecastDia";
import Alerta from "./Components/Alerta";
import Loading from "./Components/Loading";
import { fetchWeatherData } from "./Services/Weather";
import Header from "./Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setCoords } from "./redux/reducers";
import Search from "./Components/Search";

const Component = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [units, setUnits] = useState("c");
  const [forecast, setForecast] = useState("d");
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coords.value);
  const saveCities = useSelector((state) => state.saveCities.value);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocalización no soportada");
    }

    function success(position) {
      const { latitude, longitude } = position.coords;
      const userCoords = [latitude, longitude];
      dispatch(setCoords(userCoords));
    }

    function error() {
      console.log("No se pudo recuperar la ubicación");
    }
  }, [dispatch]);

  useEffect(() => {
    if (coords.length === 2) {
      fetchWeatherData(coords[0], coords[1], units)
        .then((data) => {
          setCurrentData(data);
          setLoaded(true);
        })
        .catch((error) => console.error(error));
    }
  }, [coords, units]);

  const handleDarkmode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleUnits = () => {
    setUnits(units === "c" ? "f" : "c");
  };

  const handleForecast = () => {
    setForecast(forecast === "d" ? "h" : "d");
  };

  return (
    <div
      className={`flex flex-col w-full h-full min-h-screen transition-colors ${
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
      />
      {loaded ? (
        <div className="grid center place-content-evenly h-full w-screen">
          <Main weatherData={[data, units, isDarkMode]} />
          {data.alerts && data.alerts.alert[0] && (
            <Alerta weatherData={[data, isDarkMode]} />
          )}
          {forecast === "d" ? (
            <ForecastDia weatherData={[data, units, isDarkMode]} />
          ) : (
            <ForecastHora weatherData={[data, units, isDarkMode]} />
          )}
          <div
            className={`flex flex-col sm:flex-row w-[80%] sm:w-full rounded-md justify-center m-auto ${
              isDarkMode ? "bg-indigo-950 text-white" : "bg-white text-gray-900"
            }`}
          >
            {saveCities.map((city, index) => (
              <Ciudades key={index} weatherData={[city, units, isDarkMode]} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <footer className="flex flex-col w-full justify-center items-center min-h-8 px-4 mt-4 border-t sticky top-[100%] shrink-0 md:px-6">
        <div className="flex items-center w-full px-4 shrink-0 md:px-6 sticky transition-colors botton-0">
          <div className="flex justify-center mt-3 w-full items-center gap-4 sm:hidden">
            <Search isDarkMode={isDarkMode} />
          </div>
        </div>
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
