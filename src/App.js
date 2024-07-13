import React, { useState, useEffect } from "react";
import Main from "./Components/Main";
import Ciudades from "./Components/Ciudades";
import ForecastHora from "./Components/ForecastHora";
import ForecastDia from "./Components/ForecastDia";
import Alerta from "./Components/Alerta";
import Loading from "./Components/Loading";
import Extras from "./Components/Extras";
import {
  fetchHistoryWeatherData,
  fetchCurrentWeatherData,
  fetchForecastWeatherData,
} from "./Services/Weather";
import Header from "./Components/Header";
import { useDispatch, useSelector } from "react-redux";
import { setCoords } from "./redux/reducers";
import Footer from "./Components/Footer";
import "../src/App.css";
import Authentication from "./Components/Authentication";

const App = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [currentLoaded, setCurrentLoaded] = useState(false);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false); // Nuevo estado para cargar datos históricos
  const [extra, setExtra] = useState(true);
  const [units, setUnits] = useState("c");
  const [animations, setAnimations] = useState(true);
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

  const handleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleAnimations = () => {
    setAnimations(!animations);
  };

  function getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return `${mm}-${dd}-${yyyy}`;
  }

  useEffect(() => {
    resetLocation();
  }, []);

  useEffect(() => {
    if (coords.length === 2) {
      setCurrentLoaded(false);
      setForecastLoaded(false);
      setHistoryLoaded(false); // Reinicia el estado de carga de datos históricos
      fetchCurrentWeatherData(coords[0], coords[1])
        .then((data) => {
          //console.log("Current Weather Data:", data); // Debugging
          if (data) {
            setCurrentData(data);
          } else {
            console.error("Current weather data is null or undefined.");
          }
          setCurrentLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });
    }
  }, [coords]);
  useEffect(() => {
    if (coords.length === 2) {
      setForecastLoaded(false);
      setHistoryLoaded(false); // Reinicia el estado de carga de datos históricos
      fetchForecastWeatherData(coords[0], coords[1])
        .then((data) => {
          //console.log("Current Weather Data:", data); // Debugging
          if (data) {
            setForecastData(data);
          } else {
            console.error("Current weather data is null or undefined.");
          }
          setForecastLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching current weather data:", error);
        });
    }
  }, [coords]);

  useEffect(() => {
    if (coords.length === 2) {
      setHistoryLoaded(false);
      fetchHistoryWeatherData(coords[0], coords[1], getYesterdayDate())
        .then((data) => {
          //console.log("History Weather Data:", data); // Debugging
          if (data) {
            setHistoryData(data);
          } else {
            console.error("Historical weather data is null or undefined.");
          }
          setHistoryLoaded(true);
        })
        .catch((error) => {
          console.error("Error fetching historical weather data:", error);
        });
    }
  }, [coords]);

  const handleUnits = () => {
    setUnits(units === "c" ? "f" : "c");
  };
  const handleExtra = () => {
    setExtra(!extra);
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
    <Authentication>
      <div className="flex flex-col h-screen  bg-gray-100 text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800 dark:text-white overflow-x-auto">
        <Header
          isDarkMode={theme}
          handleDarkmode={handleTheme}
          units={units}
          handleUnits={handleUnits}
          resetLocation={resetLocation}
          animations={animations}
          handleAnimations={handleAnimations}
          extra={extra}
          handleExtra={handleExtra}
        />
        {currentLoaded && forecastLoaded && historyLoaded ? (
          <div className="grid grid-cols-1 gap-6 w-[95%] sm:w-[90%] md:w-[80%] m-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 center place-content-evenly">
              <Main Data={[currentData, units, animations]} />
              {historyData && (
                <ForecastDia
                  Data={[forecastData, units, animations, historyData]}
                />
              )}
            </div>
            {forecastData &&
              forecastData.alerts &&
              forecastData.alerts.alert[0] && (
                <div className="min-h-0 h-full w-full p-2">
                  <Alerta Data={[forecastData]} />
                </div>
              )}
            <div className="rounded-md">
              <ForecastHora Data={[forecastData, units, animations]} />
            </div>
            {saveCities.map((city, index) => (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 center place-content-evenly">
                <Ciudades key={index} Data={[city, units, animations]} />
              </div>
            ))}
            {extra ? (
              <div className="rounded-md">
                <Extras Data={[forecastData, units, animations]} />
              </div>
            ) : null}
          </div>
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </Authentication>
  );
};

export default App;
