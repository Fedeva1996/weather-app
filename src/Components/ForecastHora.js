import { Rain } from "../Images/svg";

const ForecastHora = ({ weatherData }) => {
  //console.log(weatherData);

  const date = new Date();
  let hours = date.getHours() + 1;

  const forecast = [
    ...weatherData[0].forecast.forecastday[0].hour,
    ...weatherData[0].forecast.forecastday[1].hour,
    ...weatherData[0].forecast.forecastday[2].hour,
  ];

  //console.log(forecast);

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-lg p-4">
      <h3 className="text-2xl font-bold">Pronostico del día</h3>
      <div className="grid grid-flow-col gap-8 items-center content-center m-auto overflow-x-auto w-[95%] no-scrollbar">
        {forecast.slice(hours, 24 + hours).map((hour) => (
          <div
            key={hour.time}
            id={hour.time}
            className="flex flex-col items-center justify-center gap-2 mt-5 mb-5 min-w-24 min-h-60"
          >
            <div className="text-sm font-medium transition-colors">
              {hour.time.slice(10, 13) > 12
                ? hour.time.slice(10, 13) - 12 < 10
                  ? `0${hour.time.slice(10, 13) - 12} p.m.`
                  : `${hour.time.slice(10, 13) - 12} p.m.`
                : `${hour.time.slice(10, 13)} a.m.`}
            </div>
            <img src={hour.condition.icon} alt={hour.condition.text}></img>
            <div className="text-lg font-bold">
              {weatherData[1] === "c" ? hour.temp_c : hour.temp_f}°
            </div>
            <div className="text-sm font-normal text-center min-h-16 transition-colors">
              {hour.condition.text}
            </div>
            <div className="flex flex-1 text-sm font-normal text-center transition-colors">
              <Rain prop={weatherData[2]} /> {hour.chance_of_rain} %
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ForecastHora;
