import { useState, useEffect } from "react";
import Loading from "./Loading";
import { fetchWeatherData } from "../Services/Weather";

const Ciudades = ({ weatherData }) => {
  //console.log(weatherData);
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const coords = weatherData[0];
  const units = weatherData[1];

  console.log("coords", coords);

  useEffect(() => {
    fetchWeatherData(coords.lat, coords.lon)
      .then((data) => {
        setCurrentData(data);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [coords]);

  return loaded ? (
    <main className="flex-1 flex flex-col items-center justify-center m-auto min-w-full bg-slate-300 dark:bg-slate-800 rounded-lg shadow-lg p-4">
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <img
            src={require(`../Images/${data.current.condition.is_day = 1 ? "day" : "night"}/${data.current.condition.code}.svg`)}
            alt={data.current.condition.text}
            width={"64px"}
          />
          {/* <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          /> */}
          <div className="text-3xl font-bold transition-colors">
            {units === "c" ? data.current.temp_c : data.current.temp_f}°
          </div>
        </div>
        <div className="flex flex-col justify-between h-full items-center gap-2">
          <div className="flex flex-1 text-xl font-medium transition-colors">
            {data.location.name}
          </div>
          <div className="flex flex-row justify-between h-full items-center gap-2">
            <div className="text-md font-thin transition-colors">
              {data.current.condition.text}
            </div>
            -
            <div className="flex flex-1 text-sm font-thin transition-colors">
              {units === "c"
                ? data.forecast.forecastday[0].day.mintemp_c
                : data.forecast.forecastday[0].day.mintemp_f}
              ° /{" "}
              {units === "c"
                ? data.forecast.forecastday[0].day.maxtemp_c
                : data.forecast.forecastday[0].day.maxtemp_f}
              °
            </div>
          </div>
          <div className="flex flex-row justify-between h-full items-center gap-2">
            <div className="text-md font-thin transition-colors">
              Humedad: {data.forecast.forecastday[0].day.avghumidity}
            </div>
            -
            <div className="flex flex-1 text-sm font-thin transition-colors">
              Lluvia: {data.forecast.forecastday[0].day.daily_chance_of_rain} %
            </div>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <Loading />
  );
};
export default Ciudades;
