import React, { useState, useEffect, useReducer, useContext} from "react";
import Main from "./Main";
import Ciudades from "./Ciudades";
import ForecastHora from "./ForecastHora";
import ForecastDia from "./ForecastDia";
import Alerta from "./Alerta";
import Loading from "./Loading";
import Extras from "./Extras";
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
import { getSaveCities, getPreferences, setPreferences } from "../Actions/PreferencesActions";
import { AuthContext } from "../Contexts/AuthContexts";

const Container = () => {
  const [currentData, setCurrentData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [historyData, setHistoryData] = useState(null);
  const [currentLoaded, setCurrentLoaded] = useState(false);
  const [forecastLoaded, setForecastLoaded] = useState(false);
  const [historyLoaded, setHistoryLoaded] = useState(false); 
  const [extras, setExtra] = useState(true); 
  const [animations, setAnimations] = useState(true); 
  const [units, setUnits] = useState("c"); 
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

  // Verifica cuando currentUser esté cargado
  useEffect(() => {
    if (currentUser) {
      setIsUserLoaded(true);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isUserLoaded && currentUser && currentUser.authenticated) {
      //console.log(currentUser.email);
      async function fetchData() {
        const preferences = await getPreferences(currentUser.email);
        setTheme(preferences.theme);
        setAnimations(preferences.animations);
        setUnits(preferences.units);
        setExtra(preferences.extras);
      }
      fetchData();
    } else if (isUserLoaded) {
      console.log("No estás logueado");
    }
  }, [isUserLoaded, currentUser, theme]);

  useEffect(() => {
    if (isUserLoaded && currentUser && currentUser.authenticated) {
      async function fetchData() {
        const cities = await getSaveCities(currentUser.email);
        dispatch({
          type: "INITIALIZE",
          payload: cities,
        });
      }
      //console.log(saveCities);
      fetchData();
      setActualizar(false);
    } else if (isUserLoaded) {
      console.log("No estás logueado");
    }
  }, [isUserLoaded, currentUser, actualizar]);

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
    setTheme(newTheme);
    console.log({
      theme: newTheme,
      units,
      animations,
      extras,
    });
    await setPreferences(currentUser.email, {
      theme: newTheme,
      units,
      animations,
      extras,
    });
  };
  const handleUnits = async () => {
    const newUnits = units === "c" ? "f" : "c";
    setUnits(newUnits);
    console.log({
      theme,
      units: newUnits,
      animations,
      extras,
    });
    await setPreferences(currentUser.email, {
      theme,
      units: newUnits,
      animations,
      extras,
    });
  };
  const handleExtra = async () => {
    const newExtras = !extras;
    setExtra(newExtras);
    console.log({
      theme,
      units,
      animations,
      extras: newExtras,
    });
    await setPreferences(currentUser.email, {
      theme,
      units,
      animations,
      extras: newExtras,
    });
  };
  const handleAnimations = async () => {
    const newAnimations = !animations;
    setAnimations(newAnimations);
    console.log({
      theme,
      units,
      animations: newAnimations,
      extras,
    });
    await setPreferences(currentUser.email, {
      theme,
      units,
      animations: newAnimations,
      extras,
    });
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

  return (
    <Authentication>
      <div className="flex flex-col h-screen bg-gray-100 text-gray-900 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800 dark:text-white overflow-x-auto">
        <Header
          units={units}
          theme={theme}
          setTheme={setTheme}
          handleTheme={handleTheme}
          actualizar={setActualizar}
          saveCities={saveCities}
          handleUnits={handleUnits}
          resetLocation={resetLocation}
          animations={animations}
          handleAnimations={handleAnimations}
          extra={extras}
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
            {saveCities.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 center place-content-evenly">
                {saveCities.map((city, _id) => (
                  <Ciudades
                    key={_id}
                    Data={[city, units, animations, setActualizar]}
                  />
                ))}
              </div>
            ) : null}
            {extras ? (
              <div className="rounded-md">
                <Extras Data={[forecastData, units, animations]} />
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
