import { Rain } from "../Images/svg";

const Forecast = ({ weatherData }) => {
  //console.log(weatherData);

  const d = new Date();
  let hour = d.getHours();

  const forecast = weatherData[0].forecast.forecastday[0];

  console.log(forecast);

  console.log(forecast.hour.slice(hour));

  return (
    <aside className="flex-1 flex flex-row items-center justify-center px-4 md:px-6 overflow-x-auto w-[80%] m-auto rounded-md no-scrollbar">
      <div className="mt-8 flex flex-auto gap-3 w-full">
        {forecast.hour.slice(hour).map((hour) => (
          <div
            key={hour.time_epoch}
            className="flex flex-col items-center justify-center gap-3 hover:scale-110 transition-all duration-300 ease-in-out mt-5 mb-5 min-w-24"
          >
            <div className="text-sm font-medium">
              {hour.time.slice(10, 13) > 12
                ? `0${hour.time.slice(10, 13) - 12} p.m.`
                : `${hour.time.slice(10, 13)} a.m.`}
            </div>
            <img src={hour.condition.icon} alt={hour.condition.text}></img>
            <div className="text-lg font-bold">
              {weatherData[1] === "c" ? hour.temp_c : hour.temp_f}°
            </div>
            <div className="text-sm font-normal text-gray-300 text-center min-h-16">
              {hour.condition.text}
            </div>
            <div className="flex flex-1 text-sm font-normal text-gray-300 text-center">
              <Rain prop={weatherData[2]} /> {hour.chance_of_rain} %
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
export default Forecast;
