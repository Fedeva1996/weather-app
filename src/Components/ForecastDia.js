import { Rain, SunRise, SunSet } from "../Images/svg";

const ForecastDia = ({ weatherData }) => {
  //console.log(weatherData);

  const forecast = weatherData[0].forecast.forecastday;

  const getDayLabel = (date) => {
    const today = new Date();
    const forecastDate = new Date(date);
    forecastDate.setDate(forecastDate.getDate() + 1);

    // Asegurarse de que solo se comparen las fechas sin las horas
    today.setHours(0, 0, 0, 0);
    forecastDate.setHours(0, 0, 0, 0);

    const diffTime = forecastDate.getTime() - today.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Hoy";
    if (diffDays === 1) return "Mañana";
    if (diffDays === 2) return "Pasado";
    return forecastDate.toLocaleDateString("es-ES", { weekday: "long" });
  };
  //console.log(forecast);

  return (
    <aside className="flex-1 flex flex-row items-center justify-center overflow-x-auto w-[90%] m-auto rounded-md no-scrollbar">
      <div className="mt-4 flex flex-auto gap-2 w-full">
        {forecast.map((day) => (
          <div
            key={day.date_epoch}
            className="flex flex-col items-center justify-center gap-2 hover:scale-110 transition-transform duration-300 ease-in-out mt-5 mb-5 min-w-52"
          >
            <div className="text-sm font-medium transition-colors">
              {getDayLabel(day.date)}
            </div>
            <img
              src={day.day.condition.icon}
              alt={day.day.condition.text}
            ></img>
            <div className="text-lg font-bold">
              {weatherData[1] === "c" ? day.day.mintemp_c : day.day.mintemp_f}°
              / {weatherData[1] === "c" ? day.day.maxtemp_c : day.day.maxtemp_f}
              °
            </div>
            <div className="flex flex-1 text-xs font-normal text-center min-h-8 transition-colors">
              <SunRise prop={weatherData[2]} />
              <p className="content-center ml-1 mr-1">{day.astro.sunrise}</p>
              <SunSet prop={weatherData[2]} />
              <p className="content-center ml-1 mr-1">{day.astro.sunset}</p>
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
