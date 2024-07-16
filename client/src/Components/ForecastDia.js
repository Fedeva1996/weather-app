import Loading from "./Loading";

const ForecastDia = ({ Data }) => {
  //console.log(Data);

  const forecast = Data[0].forecast.forecastday;
  let history = null;
  Data[3].forecast.forecastday[0]
    ? (history = Data[3].forecast.forecastday[0])
    : console.log("No hay datos de la historia");
  //console.log(history);
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
    <div className="bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg p-4">
      <h3 className="text-2xl font-bold">Pronostico extendido</h3>
      <div className="grid grid-flow-col items-center content-center m-auto overflow-x-auto w-[95%] no-scrollbar snap-mandatory snap-x">
        {history ? (
          <div
            key={history.date_epoch}
            className="scroll-ml-6 snap-start flex flex-col items-center justify-around gap-1 min-w-48 font-thin"
          >
            <div className="text-sm ">Ayer</div>
            <img
              src={require(
                `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/day/${history.day.condition.code}.svg`
              )}
              alt={history.day.condition.text}
              title={history.day.condition.text}
              width={"64px"}
            />
            <div className="flex flex-1 text-md font-bold max-h-7">
              {Data[1] === "c" ? history.day.avgtemp_c : history.day.avgtemp_f}°
              de media
            </div>
            <div className="flex flex-1 items-center text-xs text-center min-h-8  max-h-8">
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="content-center font-thin ml-1 mr-1">
                {history.astro.sunrise}
              </p>
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="content-center font-thin ml-1 mr-1">
                {history.astro.sunset}
              </p>
            </div>
            <div className="flex flex-1 items-center text-sm font-normal text-center  max-h-8">
              <svg
                width="16px"
                height="16px"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`mx-1 stroke-2 stroke-gray-800 dark:stroke-gray-300 ${history.day.daily_chance_of_rain > 50 ? "fill-gray-800 dark:fill-gray-300" : "fill-none"}`}

              >
                <path
                  d="M21 14.7C21 18.1794 19.0438 21 15.5 21C11.9562 21 10 18.1794 10 14.7C10 11.2206 15.5 3 15.5 3C15.5 3 21 11.2206 21 14.7Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M8 8.2C8 9.7464 7.11083 11 5.5 11C3.88917 11 3 9.7464 3 8.2C3 6.6536 5.5 3 5.5 3C5.5 3 8 6.6536 8 8.2Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {history.day.daily_chance_of_rain} %
            </div>
            {/* <div className="text-sm text-center min-h-8 ">
              {history.day.condition.text}
            </div> */}
          </div>
        ) : (
          <Loading />
        )}

        {forecast.map((day) => {
          const currentTempMin =
            Data[1] === "c" ? day.day.mintemp_c : day.day.mintemp_f;
          const currentTempMax =
            Data[1] === "c" ? day.day.maxtemp_c : day.day.maxtemp_f;
          const currentTempMedia = (currentTempMin + currentTempMax) / 2;

          const tempMediaChange =
            prevTempMedia !== null ? (
              currentTempMedia > prevTempMedia ? (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="mx-1 stroke-2  fill-none stroke-red-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 3V21M18 3L15 6M18 3L21 6M7 15.9998C6.44772 15.9998 6 16.4475 6 16.9998C6 17.5521 6.44772 17.9998 7 17.9998C7.55228 17.9998 8 17.5521 8 16.9998C8 16.4475 7.55228 15.9998 7 15.9998ZM7 15.9998V11.9998M7 16.9998L7.00707 17.0069M11 16.9998C11 19.209 9.20914 20.9998 7 20.9998C4.79086 20.9998 3 19.209 3 16.9998C3 15.9854 3.37764 15.0591 4 14.354L4 6C4 4.34315 5.34315 3 7 3C8.65685 3 10 4.34315 10 6V14.354C10.6224 15.0591 11 15.9854 11 16.9998Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : currentTempMedia < prevTempMedia ? (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="mx-1 stroke-2  fill-none stroke-blue-600"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 3V21M18 21L15 18M18 21L21 18M7 16C6.44772 16 6 16.4477 6 17C6 17.5523 6.44772 18 7 18C7.55228 18 8 17.5523 8 17C8 16.4477 7.55228 16 7 16ZM7 16V12M7 17L7.00707 17.0071M11 17C11 19.2091 9.20914 21 7 21C4.79086 21 3 19.2091 3 17C3 15.9856 3.37764 15.0593 4 14.3542L4 6.00017C4 4.34332 5.34315 3.00017 7 3.00017C8.65685 3.00017 10 4.34332 10 6.00017V14.3542C10.6224 15.0593 11 15.9856 11 17Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 15.9998C11.4477 15.9998 11 16.4475 11 16.9998C11 17.5521 11.4477 17.9998 12 17.9998C12.5523 17.9998 13 17.5521 13 16.9998C13 16.4475 12.5523 15.9998 12 15.9998ZM12 15.9998L12.0071 10.5M12 16.9998L12.0071 17.0069M16 16.9998C16 19.209 14.2091 20.9998 12 20.9998C9.79086 20.9998 8 19.209 8 16.9998C8 15.9854 8.37764 15.0591 9 14.354L9 6C9 4.34315 10.3431 3 12 3C13.6569 3 15 4.34315 15 6V14.354C15.6224 15.0591 16 15.9854 16 16.9998Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )
            ) : null;
          prevTempMedia = currentTempMedia;
          //console.log(prevTempMedia);
          return (
            <div
              key={day.date_epoch}
              className="scroll-ml-6 snap-start flex flex-col items-center justify-around gap-1 min-w-48"
            >
              <div className="text-sm font-medium ">
                {getDayLabel(day.date)}
              </div>
              <img
                src={require(
                  `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/day/${day.day.condition.code}.svg`
                )}
                alt={day.day.condition.text}
                title={day.day.condition.text}
                width={"64px"}
              />
              <div className="flex flex-1 items-center text-lg font-bold max-h-7">
                {currentTempMin}° /{currentTempMax}°
                <span>{tempMediaChange}</span>
              </div>
              <div className="flex flex-1 items-center text-xs font-normal text-center min-h-8  max-h-8">
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 10V3M12 3L9 6M12 3L15 6M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="content-center font-thin ml-1 mr-1">
                  {day.astro.sunrise}
                </p>
                <svg
                  width="20px"
                  height="20px"
                  viewBox="0 0 24 24"
                  className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 12L5 11M18 12L19 11M3 18H21M5 21H19M7 18C7 15.2386 9.23858 13 12 13C14.7614 13 17 15.2386 17 18M12 3V10M12 10L15 7M12 10L9 7"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="content-center font-thin ml-1 mr-1">
                  {day.astro.sunset}
                </p>
              </div>
              {/* <div className="text-sm font-normal text-center min-h-8 ">
                {day.day.condition.text}
              </div> */}
              <div className="flex flex-1 items-center text-sm font-normal text-center max-h-8">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className={`mx-1 stroke-2 stroke-gray-800 dark:stroke-gray-300 ${day.day.daily_chance_of_rain > 50 ? "fill-gray-800 dark:fill-gray-300" : "fill-none"}`}
                >
                  <path
                    d="M21 14.7C21 18.1794 19.0438 21 15.5 21C11.9562 21 10 18.1794 10 14.7C10 11.2206 15.5 3 15.5 3C15.5 3 21 11.2206 21 14.7Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8.2C8 9.7464 7.11083 11 5.5 11C3.88917 11 3 9.7464 3 8.2C3 6.6536 5.5 3 5.5 3C5.5 3 8 6.6536 8 8.2Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {day.day.daily_chance_of_rain} %
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ForecastDia;
