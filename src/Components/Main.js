import { Humidity, Wind, Location, Arrow } from "../Images/svg";

const Main = ({ weatherData }) => {
  //console.log(weatherData);
  const data = weatherData[0];

  const compassDirections = {
    N: 0,
    NNE: 22.5,
    NE: 45,
    ENE: 67.5,
    E: 90,
    ESE: 112.5,
    SE: 135,
    SSE: 157.5,
    S: 180,
    SSW: 202.5,
    SW: 225,
    WSW: 247.5,
    W: 270,
    WNW: 292.5,
    NW: 315,
    NNW: 337.5,
  };

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
          <Wind prop={weatherData[2]} /> Vientos a {" "}
          {weatherData[1] === "c"
            ? data.current.wind_kph + " km/h"
            : data.current.wind_mph + " mph "}{" "}
             - Dirección: 
          <Arrow
            prop={weatherData[2]}
            transform={compassDirections[data.current.wind_dir]}
          />
        </div>
        <div className="flex flex-1 font-thin transition-colors">
          <Location prop={weatherData[2]} /> {data.location.name}
        </div>
      </div>
    </main>
  );
};
export default Main;
