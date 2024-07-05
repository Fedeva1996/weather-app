const Main = ({ Data }) => {
  // console.log(Data);
  const data = Data[0];

  const windDirectionDescriptions = {
    N: "Vientos del norte",
    NNE: "Vientos del norte-noreste",
    NE: "Vientos del noreste",
    ENE: "Vientos del este-noreste",
    E: "Vientos del este",
    ESE: "Vientos del este-sureste",
    SE: "Vientos del sureste",
    SSE: "Vientos del sur-sureste",
    S: "Vientos del sur",
    SSW: "Vientos del sur-suroeste",
    SW: "Vientos del suroeste",
    WSW: "Vientos del oeste-suroeste",
    W: "Vientos del oeste",
    WNW: "Vientos del oeste-noroeste",
    NW: "Vientos del noroeste",
    NNW: "Vientos del norte-noroeste",
  };

  // Función para obtener la descripción de la dirección del viento
  const getWindDescription = (windDir) => {
    return (
      windDirectionDescriptions[windDir] || "Dirección del viento desconocida"
    );
  };
  const uvIndexDescriptions = {
    0: "Bajo: Sin riesgo",
    1: "Bajo: Sin riesgo",
    2: "Bajo: Sin riesgo",
    3: "Moderado: Protección recomendada",
    4: "Moderado: Protección recomendada",
    5: "Moderado: Protección recomendada",
    6: "Alto: Protección adicional necesaria",
    7: "Alto: Protección adicional necesaria",
    8: "Muy alto: Protección extra requerida",
    9: "Muy alto: Protección extra requerida",
    10: "Muy alto: Protección extra requerida",
    11: "Extremo: Evitar la exposición al sol",
  };

  // Función para obtener la descripción del índice UV
  const getUVIndexDescription = (uvIndex) => {
    if (uvIndex <= 2) return uvIndexDescriptions[2];
    if (uvIndex <= 5) return uvIndexDescriptions[5];
    if (uvIndex <= 7) return uvIndexDescriptions[7];
    if (uvIndex <= 10) return uvIndexDescriptions[10];
    return uvIndexDescriptions[11];
  };

  return (
    <div className="bg-slate-300 dark:bg-slate-800 rounded-lg shadow-lg p-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-6xl font-thin">
            {Data[1] === "c" ? data.current.temp_c : data.current.temp_f}°
          </span>
          <h3 className="text-xl mt-2"> {data.current.condition.text}</h3>
          <p className="flex flex-1 font-thin text-muted-foreground pt-2">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              className="mx-1 stroke-2 transition-colors fill-none stroke-slate-800 dark:stroke-slate-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {data.location.name}
          </p>
        </div>
        <div className="flex items-center justify-start">
          {Data[2] === true ? (
            <img
              src={require(
                `../Images/Animated/${(data.current.condition.is_day = 1 ? "day" : "night")}/${data.current.condition.code}.svg`
              )}
              alt={data.current.condition.text}
              width={"128px"}
            />
          ) : (
            <img
              src={data.current.condition.icon}
              alt={data.current.condition.text}
              width={"128px"}
            />
          )}
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-muted-foreground">Sensación</p>
          <p className="font-thin">
            {Data[1] === "c"
              ? data.current.feelslike_c
              : data.current.feelslike_f}
            °
          </p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Precipitation</p>
          <p className="font-thin">
            {data.forecast.forecastday[0].day.daily_chance_of_rain}%
          </p>
        </div>
        {/* <div>
          <p className="font-bold text-muted-foreground">Viento</p>
          <p className="font-thin">
            {getWindDescription(data.current.wind_dir)}
            <span className="flex flex-row items-center">
              <svg
                width="28px"
                height="28px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2 transition-colors fill-none stroke-slate-800 dark:stroke-slate-300"
                xmlns="http://www.w3.org/2000/svg"
                transform={`rotate(${data.current.wind_degree})`}
              >
                <path
                  d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {Data[1] === "c"
                ? data.current.wind_kph + " km/h"
                : data.current.wind_mph + " mph"}
            </span>
          </p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Humedad</p>
          <p className="font-thin">{data.current.humidity}%</p>
        </div> */}
        {/* <div>
          <p className="font-bold text-muted-foreground">UV</p>
          <p className="font-thin"><span className="font-bold">{data.current.uv}</span>: {getUVIndexDescription(data.current.uv)}</p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Visibility</p>
          <p className="font-thin">
            {weatherData[1] === "c"
              ? data.current.vis_km + " km"
              : data.current.vis_miles + " mi"}
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default Main;
