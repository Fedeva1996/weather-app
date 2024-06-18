import { Humidity, Wind, Location, Arrow } from "../Images/svg";

const Main = ({ weatherData }) => {
  //console.log(weatherData);
  const data = weatherData[0];

  return (
    <main className="flex-1 flex flex-col items-center justify-center m-auto p-4">
      <div className="flex flex-col items-center gap-3">
        <div className="flex items-center gap-2">
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          ></img>
          <div className="text-6xl font-bold transition-colors">
            {weatherData[1] === "c" ? data.current.temp_c : data.current.temp_f}
            °
          </div>
        </div>
        <div className="text-2xl font-medium transition-colors">
          {data.current.condition.text}
        </div>
        <div className="flex flex-1 font-thin transition-colors">
          <Humidity prop={weatherData[2]} /> Humedad del {data.current.humidity}
          %
        </div>
        <div className="flex flex-1 font-thin transition-colors">
          <Wind prop={weatherData[2]} />
          <p className="mr-2">Vientos a</p>
          {weatherData[1] === "c"
            ? data.current.wind_kph + " km/h"
            : data.current.wind_mph + " mph"}
          <p className="mr-2 ml-1">- Dirección:</p>
          <Arrow prop={weatherData[2]} transform={data.current.wind_degree} />
        </div>
        <div className="flex flex-1 font-thin transition-colors">
          <Location prop={weatherData[2]} /> {data.location.name}
        </div>
      </div>
    </main>
  );
};
export default Main;
