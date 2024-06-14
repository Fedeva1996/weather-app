import { useState, useEffect } from "react";

const Forecast = () => {
  const [coords, setCoords] = useState([-25.3007, -57.6359]);
  const [weatherData, setWeatherData] = useState([]);

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
        setWeatherData(data.list);
        console.log(data);
      };

      getWeather();
    }
  }, [coords]);

  const data = weatherData.slice(1, 11);
  const grupedData = Object.groupBy(data, ({ dt_txt }) => dt_txt);
  console.log(grupedData);
  return (
    <aside className="flex-1 flex flex-row items-center justify-center px-4 md:px-6 overflow-x-auto w-[80%] m-auto rounded-md no-scrollbar">
      <div className="mt-8 flex flex-auto gap-4 w-full">
        {Object.entries(grupedData).map(([key, value]) => (
          <div key={key} className="flex flex-col items-center gap-3 ml-1">
            <div className="text-sm font-medium">
              {key.slice(10, 13) > 12
                ? `0${key.slice(10, 13) - 12} p.m.`
                : `${key.slice(10, 13)} a.m.`}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${value[0].weather[0].icon}@2x.png`}
              alt={value[0].weather[0].description}
            ></img>
            <div className="text-lg font-bold">{value[0].main.temp}°</div>
            <div className="text-sm font-medium">
              {value[0].weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
export default Forecast;
