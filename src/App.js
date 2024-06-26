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
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [units, setUnits] = useState("c");
  const dispatch = useDispatch();
  const coords = useSelector((state) => state.coords.value);
  const saveCities = useSelector((state) => state.saveCities.value);

  const [theme, setTheme] = useState(
    localStorage.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

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

  const handleUnits = () => {
    setUnits(units === "c" ? "f" : "c");
  };

  const resetLocation = () => {
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
  };

  return (
    <div className="flex flex-col w-full h-full min-h-screen transition-colors bg-gray-100 text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800  dark:text-white">
      <Header
        isDarkMode={theme}
        handleDarkmode={toggleTheme}
        units={units}
        handleUnits={handleUnits}
        resetLocation={resetLocation}
      />
      {loaded ? (
        <div className="grid grid-cols-1 gap-6 w-[95%] sm:w-[90%] md:w-[80%] m-auto">
          <div className="h-full w-full p-2">
            {data.alerts && data.alerts.alert[0] && (
              <Alerta weatherData={[data, theme]} />
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 center place-content-evenly">
            <Main weatherData={[data, units, theme]} />
            <ForecastDia weatherData={[data, units, theme]} />
          </div>
          <div className="rounded-md">
            <ForecastHora weatherData={[data, units, theme]} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 center place-content-evenly">
            {saveCities.map((city, index) => (
              <Ciudades key={index} weatherData={[city, units, theme]} />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
      <footer className="flex flex-col w-full justify-center items-center min-h-8 px-4 pb-2 mt-4 gap-2 border-t sticky top-[100%] shrink-0 md:px-6">
        <div className="flex items-center w-full px-4 shrink-0 md:px-6 sticky transition-colors botton-0">
          <div className="flex justify-center mt-3 w-full items-center gap-4 sm:hidden">
            <Search isDarkMode={theme} />
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
