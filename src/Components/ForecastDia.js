import { Rain } from "../Images/svg";

const ForecastDia = ({ weatherData }) => {
  //console.log(weatherData);

  const forecast = weatherData[0].forecast.forecastday;

  //console.log(forecast);

  return (
    <aside className="flex-1 flex flex-row items-center justify-center px-4 md:px-6 overflow-x-auto w-screen m-auto rounded-md no-scrollbar">
      <div className="mt-8 flex flex-auto justify-center gap-2 w-full">
        {forecast.map((day) => (
          <div
            key={day.date_epoch}
            id={day.date}
            className="flex flex-col items-center justify-center gap-2 hover:scale-110 transition-transform duration-300 ease-in-out mt-5 mb-5 min-w-52"
          >
            <div className="text-sm font-medium transition-colors">
              {day.date}
            </div>
            <img src={day.day.condition.icon} alt={day.day.condition.text}></img>
            <div className="text-lg font-bold">
              {weatherData[1] === "c" ? day.day.mintemp_c : day.day.mintemp_f}
              °
              {weatherData[1] === "c" ? day.day.maxtemp_c : day.day.maxtemp_f}
            </div>
            <div className="text-sm font-normal text-center min-h-8 transition-colors">
              {day.day.condition.text}
            </div>
            <div className="flex flex-1 text-sm font-normal text-center transition-colors">
              <Rain prop={weatherData[2]} /> {day.day.daily_chance_of_rain} %
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
export default ForecastDia;
