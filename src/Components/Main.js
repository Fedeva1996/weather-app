import { Location, Arrow } from "../Images/svg";

const Main = ({ weatherData }) => {
  //console.log(weatherData);
  const data = weatherData[0];

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
          <h3 className="text-2xl font-bold"> {data.current.condition.text}</h3>
          <p className="flex flex-1 font-thin text-muted-foreground">
            <Location prop={weatherData[2]} />
            {data.location.name}
          </p>
        </div>
        <div className="flex items-center">
          <span className="text-4xl font-thin">
            {weatherData[1] === "c" ? data.current.temp_c : data.current.temp_f}
            °
          </span>
          <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          ></img>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="font-bold text-muted-foreground">Sensación</p>
          <p className="font-thin">
            {weatherData[1] === "c"
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
        <div>
          <p className="font-bold text-muted-foreground">Viento</p>
          <p className="font-thin">
            {getWindDescription(data.current.wind_dir)}
            <span className="flex flex-row">
              <Arrow
                prop={weatherData[2]}
                transform={data.current.wind_degree}
              />
              {weatherData[1] === "c"
                ? data.current.wind_kph + " km/h"
                : data.current.wind_mph + " mph"}
            </span>
          </p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Humedad</p>
          <p className="font-thin">{data.current.humidity}%</p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">UV</p>
          <p className="font-thin">{getUVIndexDescription(data.current.uv)}</p>
        </div>
        <div>
          <p className="font-bold text-muted-foreground">Visibility</p>
          <p className="font-thin">
            {weatherData[1] === "c"
              ? data.current.vis_km + " km"
              : data.current.vis_miles + " mi"}
          </p>{" "}
        </div>
      </div>
    </div>
  );
};
export default Main;
