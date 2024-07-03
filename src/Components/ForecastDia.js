import { Rain, SunRise, SunSet, TempUp, TempDown, Temp } from "../Images/svg";

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
  let prevTempMedia = null;

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-lg p-4">
      <h3 className="text-2xl font-bold">Pronostico extendido</h3>
      <div className="grid grid-flow-col items-center content-center m-auto overflow-x-auto w-[95%] no-scrollbar">
        {forecast.map((day) => {
          const currentTempMin =
            weatherData[1] === "c" ? day.day.mintemp_c : day.day.mintemp_f;
          const currentTempMax =
            weatherData[1] === "c" ? day.day.maxtemp_c : day.day.maxtemp_f;
          const currentTempMedia = (currentTempMin + currentTempMax) / 2;

          const tempMediaChange =
            prevTempMedia !== null ? (
              currentTempMedia > prevTempMedia ? (
                <TempUp />
              ) : currentTempMedia < prevTempMedia ? (
                <TempDown />
              ) : (
                <Temp prop={weatherData[2]} />
              )
            ) : null;
          prevTempMedia = currentTempMedia;
          //console.log(prevTempMedia);
          return (
            <div
              key={day.date_epoch}
              className="flex flex-col items-center justify-center gap-2 mt-5 mb-5 min-w-48 min-h-60"
            >
              <div className="text-sm font-medium transition-colors">
                {getDayLabel(day.date)}
              </div>
              <img
                src={require(`../Images/day/${day.day.condition.code}.svg`)}
                alt={day.day.condition.text}
                width={"64px"}
              />
              {/* <img
                src={data.current.condition.icon}
                alt={data.current.condition.text}
              /> */}
              <div className="flex flex-1 text-lg font-bold">
                {currentTempMin}° /{currentTempMax}°
                <span className="ml-1">{tempMediaChange}</span>
              </div>
              <div className="flex flex-1 text-xs font-normal text-center min-h-8 transition-colors">
                <SunRise prop={weatherData[2]} />
                <p className="content-center font-thin ml-1 mr-1">
                  {day.astro.sunrise}
                </p>
                <SunSet prop={weatherData[2]} />
                <p className="content-center font-thin ml-1 mr-1">
                  {day.astro.sunset}
                </p>
              </div>
              <div className="text-sm font-normal text-center min-h-8 transition-colors">
                {day.day.condition.text}
              </div>
              <div className="flex flex-1 text-sm font-normal text-center transition-colors">
                <Rain prop={weatherData[2]} /> {day.day.daily_chance_of_rain} %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ForecastDia;
