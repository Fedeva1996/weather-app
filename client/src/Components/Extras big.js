const ExtrasBig = ({ Data }) => {
  //console.log(Data);
  const data = Data[0];

  const trangrayMoonPhase = (moonPhase) => {
    if (moonPhase === "New Moon") return "Luna Nueva";
    if (moonPhase === "Waxing Crescent") return "Luna Creciente";
    if (moonPhase === "First Quarter") return "Cuarto Creciente";
    if (moonPhase === "Waxing Gibbous") return "Luna Gibosa Creciente";
    if (moonPhase === "Full Moon") return "Luna Llena";
    if (moonPhase === "Waning Gibbous") return "Luna Gibosa Menguante";
    if (moonPhase === "Last Quarter") return "Cuarto Menguante";
    if (moonPhase === "Waning Crescent") return "Luna Menguante";
  };

  const epaIndexDescriptions = (epaIndex) => {
    if (epaIndex === 1) return ["Buena", "bg-green-500"];
    if (epaIndex === 2) return ["Moderada", "bg-yellow-500"];
    if (epaIndex === 3)
      return ["Insalubre para grupos sensibles", "bg-orange-500"];
    if (epaIndex === 4) return ["Insalubre", "bg-red-500"];
    if (epaIndex === 5) return ["Muy insalubre", "bg-purple-500"];
    if (epaIndex === 6) return ["Peligrosoa", "bg-ambar-500"];
  };

  return (
    <div
      className={`flex flex-col justify-center bg-gray-100/60 dark:bg-gray-900 rounded-lg shadow-lg p-4 min-w-60 w-full`}
    >
      <div className="grid grid-cols-1 gap-6 center place-content-evenly">
        {data.forecast.forecastday[0].astro ? (
          <div className="flex flex-row items-center justify-between">
            <div>
              <p className="font-bold text-xl">Fase lunar</p>
              <div className="flex flex-row font-thin">
                <span className="flex flex-row items-center text-lg">
                  {trangrayMoonPhase(
                    data.forecast.forecastday[0].astro.moon_phase
                  )}
                </span>
              </div>
            </div>
            <img
              src={require(
                `../Images/${data.forecast.forecastday[0].astro.moon_phase}.svg`
              )}
              alt={data.forecast.forecastday[0].astro.moon_phase}
              width={"60px"}
            />
          </div>
        ) : null}
        {data.current.air_quality["us-epa-index"] ? (
          <div>
            <p className="font-bold text-xl">Calidad del aire</p>
            <div className="flex flex-row items-center font-thin">
              <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-2">
                <div
                  className={`text-lg font-medium text-black text-center p-0.5 leading-none rounded-full ${epaIndexDescriptions(data.current.air_quality["us-epa-index"])[1]}`}
                  style={{
                    width:
                      (100 / 6) * data.current.air_quality["us-epa-index"] +
                      "%",
                  }}
                >
                  {
                    epaIndexDescriptions(
                      data.current.air_quality["us-epa-index"]
                    )[0]
                  }
                </div>
              </div>
            </div>
          </div>
        ) : null}
        {data.forecast.forecastday[0].astro ? (
          <div>
            <p className="font-bold text-xl">Puesta y salidad</p>
            <div className="flex flex-row items-center justify-evenly">
              <div>
                <div className="flex sm:flex-col lg:flex-row items-center">
                  <span className="text-lg text-center" title="Salida del sol">
                    {data.forecast.forecastday[0].astro.sunrise}
                  </span>
                  <img
                    src={require(
                      `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/horizon sun.svg`
                    )}
                    alt="Horizonte"
                    width={"60px"}
                  />
                  <span className="text-lg text-center" title="Puesta del sol">
                    {data.forecast.forecastday[0].astro.sunrise}
                  </span>
                </div>
              </div>
              <div className="border border-spacing-0"></div>
              <div>
                <div className="flex sm:flex-col lg:flex-row items-center">
                  <span
                    className="text-lg text-center"
                    title="Puesta de la luna"
                  >
                    {data.forecast.forecastday[0].astro.moonset}
                  </span>
                  <img
                    src={require(
                      `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/horizon moon.svg`
                    )}
                    alt="Horizonte"
                    width={"60px"}
                  />
                  <span
                    className="text-lg text-center"
                    title="Salida de la luna"
                  >
                    {data.forecast.forecastday[0].astro.moonrise}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default ExtrasBig;
