import { Humidity, Wind, Location } from "../Images/svg";

const Main = ({ weatherData }) => {
  //console.log(weatherData);
  const data = weatherData[0];
  return (
    <main className="flex-1 flex flex-col items-center justify-center m-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          ></img>
          <div className="text-6xl font-bold">
            {weatherData[1] === "c" ? data.current.temp_c : data.current.temp_f}
            °
          </div>
        </div>
        <div className="text-2xl font-medium">
          {data.current.condition.text}
        </div>
        <div className="flex flex-1 text-2l font-thin">
          <Humidity prop={weatherData[2]} /> Humedad del {data.current.humidity}
          %
        </div>
        <div className="flex flex-1 text-2l font-thin">
          <Wind prop={weatherData[2]} /> Vientos a{" "}
          {weatherData[1] === "c"
            ? data.current.wind_kph + " km/h"
            : data.current.wind_mph + " mph"}
        </div>
        <div className="flex flex-1 text-gray-500 dark:text-gray-400">
          <Location prop={weatherData[2]} /> {data.location.name}
        </div>
      </div>
    </main>
  );
};
export default Main;
