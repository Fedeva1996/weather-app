import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Main from "./Components/Main";

export default function Component() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [weatherData, setWeatherData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [coords, setCoords] = useState([-25.3007, -57.6359]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      console.log("Geolocation not supported");
    }

    function success(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      setCoords([latitude, longitude]);
    }

    function error() {
      console.log("Unable to retrieve your location");
    }
  }, []);

  useEffect(() => {
    if (coords.length === 2) {
      const getWeather = async () => {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${coords[0]}&lon=${coords[1]}&appid=${process.env.REACT_APP_API_KEY}&units=metric&lang=es`
        );
        const data = await response.json();
        console.log(data);
        setWeatherData(data);
        setLoaded(true);
      };

      getWeather();
    }
  }, [coords]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };
  return (
    <div
      className={`flex flex-col w-screen h-screen transition-colors ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <header className="flex items-center h-16 px-4 border-b shrink-0 md:px-6">
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="flex items-center justify-between gap-2 text-lg font-semibold md:text-base"
          >
            <span className="sr-only">Weather App</span>
          </Link>{" "}
          <div className="w-full max-w-md">
            <input
              type="search"
              placeholder="Buscar ciudad..."
              value={searchTerm}
              onChange={handleSearch}
              className={`w-full h-full rounded-md p-2 transition-colors ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"
              }`}
            />
          </div>
        </div>
      </header>
      {loaded ? <Main weatherData={weatherData} /> : <div>Loading...</div>}
    </div>
  );
}
