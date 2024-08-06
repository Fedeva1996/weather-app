import React, { useState, useEffect, useReducer, useContext } from "react";
import Main from "./Main";
import Ciudades from "./Ciudades";
import ForecastHora from "./ForecastHora";
import ForecastDia from "./ForecastDia";
import Alerta from "./Alerta";
import Loading from "./Loading";
import ExtrasLittle from "./Extras little";
import ExtrasBig from "./Extras big";
import {
  fetchHistoryWeatherData,
  fetchCurrentWeatherData,
  fetchForecastWeatherData,
} from "../Services/Weather";
import preferencesReducer from "../Reducers/preferencesReducer";
import Header from "./Header";
import Footer from "./Footer";
import "../App.css";
import Authentication from "./Authentication";
import {
  getSaveCities,
  getPreferences,
  setPreferences,
} from "../Actions/PreferencesActions";
import { AuthContext } from "../Contexts/AuthContexts";

const Container = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [currentLoaded, setCurrentLoaded] = useState(false);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false);
  const [extras, setExtra] = useState(localStorage.getItem("extras") || true);
  const [animations, setAnimations] = useState(
    localStorage.getItem("animations") || true
  );
  const [units, setUnits] = useState(localStorage.getItem("units") || "c");
  const [theme, setTheme] = useState(
    localStorage.theme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light")
  );
  const [coords, setCoords] = useState([]);
  const [saveCities, dispatch] = useReducer(preferencesReducer, []);
  const { currentUser } = useContext(AuthContext);
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [actualizar, setActualizar] = useState(false);
  //console.log(localStorage);
  //console.log(currentUser);

  useEffect(() => {
    if (currentUser) {
      setIsUserLoaded(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isUserLoaded && currentUser && currentUser.authenticated) {
      async function fetchDataPreferences() {
        const preferences = await getPreferences(currentUser.email);
        setTheme(preferences.theme);
        setAnimations(preferences.animations);
        setUnits(preferences.units);
        setExtra(preferences.extras);
      }
      async function fetchDataSaveCities() {
        const cities = await getSaveCities(currentUser.email);
        dispatch({
          type: "INITIALIZE",
          payload: cities,
        });
      }
      //console.log(saveCities);
      fetchDataPreferences();
      setActualizar(false);
      fetchDataSaveCities();
    } else if (isUserLoaded) {
      //console.log("No estás logueado");
    }
  }, [isUserLoaded, currentUser, actualizar]);

  function getYesterdayDate() {
    const today = new Date();
    today.setDate(today.getDate() - 1);

    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const yyyy = today.getFullYear();

    return `${yyyy}-${mm}-${dd}`;
  }

  useEffect(() => {
    resetLocation();
    const intervalTime = 10 * 60 * 1000;
    const intervalId = setInterval(resetLocation, intervalTime);
    //console.log("Actualizando localización");
    return () => clearInterval(intervalId);
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

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const handleTheme = async () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    const prevTheme = theme;
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (currentUser.authenticated) {
      try {
        await setPreferences(currentUser.email, {
          theme: newTheme,
          units,
          animations,
          extras,
        });
      } catch (error) {
        console.error("Failed to update theme preferences:", error);
        setTheme(prevTheme);
      }
    }
  };
  const handleUnits = async () => {
    const newUnits = units === "c" ? "f" : "c";
    const prevUnits = units;
    setUnits(newUnits);
    localStorage.setItem("units", newUnits);
    if (currentUser.authenticated) {
      try {
        await setPreferences(currentUser.email, {
          theme,
          units: newUnits,
          animations,
          extras,
        });
      } catch (error) {
        console.error("Failed to update units preferences:", error);
        setUnits(prevUnits);
      }
    }
  };

  const handleExtra = async () => {
    const newExtras = !extras;
    const prevExtras = extras;
    setExtra(newExtras);
    localStorage.setItem("extras", newExtras);

    if (currentUser.authenticated) {
      try {
        await setPreferences(currentUser.email, {
          theme,
          units,
          animations,
          extras: newExtras,
        });
      } catch (error) {
        console.error("Failed to update extras preferences:", error);
        setExtra(prevExtras);
      }
    }
  };

  const handleAnimations = async () => {
    const newAnimations = !animations;
    const prevAnimations = animations;
    setAnimations(newAnimations);
    localStorage.setItem("animations", newAnimations);

    if (currentUser.authenticated) {
      try {
        await setPreferences(currentUser.email, {
          theme,
          units,
          animations: newAnimations,
          extras,
        });
      } catch (error) {
        console.error("Failed to update animations preferences:", error);
        setAnimations(prevAnimations);
      }
    }
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
      setCoords(userCoords);
    }

    function error() {
      console.log("No se pudo recuperar la ubicación");
    }
  };

  const now = new Date();
  let hour = now.getHours();
  let changeOfRain;
  
  if (forecastData) {
    changeOfRain = forecastData.forecast.forecastday[0].hour.slice(
      hour,
      hour + 1
    )[0].chance_of_rain;
  }

  const getBackgroundColor = () => {
    if (changeOfRain > 50) {
      return "bg-gradient-to-b from-gray-800 to-gray-600";
    } else {
      if (hour >= 5 && hour < 7) {
        return "bg-gradient-to-b from-blue-950 to-orange-500";
      } else if (hour >= 7 && hour < 17) {
        return "bg-gradient-to-b from-blue-400 to-blue-300";
      } else if (hour >= 17 && hour < 20) {
        return "bg-gradient-to-b from-indigo-950 to-orange-400";
      } else {
        return "bg-gradient-to-b from-purple-950 to-indigo-800";
      }
    }
  };
  return (
    <Authentication>
      <div
        className={`flex flex-col h-screen ${getBackgroundColor()} text-gray-900 dark:bg-gradient-to-b dark:from-gray-950 dark:to-gray-900 dark:text-white overflow-x-auto`}
      >
        <Header
          units={units}
          handleUnits={handleUnits}
          theme={theme}
          handleTheme={handleTheme}
          animations={animations}
          handleAnimations={handleAnimations}
          extra={extras}
          handleExtra={handleExtra}
          saveCities={saveCities}
          resetLocation={resetLocation}
          actualizar={setActualizar}
        />
        {currentLoaded && forecastLoaded && historyLoaded ? (
          <div className="grid grid-cols-1 gap-2 w-[95%] sm:w-[90%] md:w-[80%] m-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 center place-content-evenly">
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
            {saveCities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 center place-content-evenly">
                {saveCities.map((city, _id) => (
                  <Ciudades
                    key={_id}
                    Data={[city, units, animations, setActualizar]}
                  />
                ))}
              </div>
            ) : null}
            {extras ? (
              <div className="flex flex-col sm:flex-row gap-2">
                <ExtrasLittle Data={[forecastData, units, animations]} />
                <ExtrasBig Data={[forecastData, units, animations]} />
              </div>
            ) : null}
          </div>
        ) : (
          <Loading />
        )}
        <Footer saveCities={saveCities} actualizar={setActualizar} />
      </div>
    </Authentication>
  );
};

export default Container;
