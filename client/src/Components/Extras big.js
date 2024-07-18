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
    if (epaIndex === 1) return ["Muy bueno", "bg-green-500"];
    if (epaIndex === 2) return ["Bueno", "bg-yellow-500"];
    if (epaIndex === 3) return ["Regular", "bg-orange-500"];
    if (epaIndex === 4) return ["Muy malo", "bg-red-500"];
    if (epaIndex === 5) return ["Malo", "bg-purple-500"];
    if (epaIndex === 6) return ["Extremadamente malo", "bg-ambar-500"];
  };

  return (
    <div className="flex flex-col justify-center bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg p-4 min-w-60 w-full">
      <div className="grid grid-cols-1 gap-6 center place-content-evenly">
        <div className="flex flex-row items-center justify-between">
          <div>
            <p className="font-bold text-muted-foreground">Fase lunar</p>
            <div className="flex flex-row font-thin">
              <span className="flex flex-row items-center">
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
        <div>
          <p className="flex flex-row items-center font-bold text-muted-foreground">
            Calidad del aire
          </p>
          <div className="flex flex-row items-center font-thin">
            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 my-2">
              <div
                className={`text-xs font-medium text-black text-center p-0.5 leading-none rounded-full ${epaIndexDescriptions(data.current.air_quality["us-epa-index"])[1]}`}
                style={{
                  width:
                    (100 / 6) * data.current.air_quality["us-epa-index"] + "%",
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
        <div className="flex flex-row items-center justify-evenly">
          <div className="">
            <div className="flex sm:flex-col lg:flex-row items-center">
              <span className="text-sm text-center">
                {data.forecast.forecastday[0].astro.sunrise}
              </span>
              <img
                src={require(
                  `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/horizon sun.svg`
                )}
                alt="Salida del sol"
                width={"60px"}
              />
              <span className="text-sm text-center">
                {data.forecast.forecastday[0].astro.sunrise}
              </span>
            </div>
          </div>
          <div className="border border-spacing-0"></div>
          <div className="">
            <div className="flex sm:flex-col lg:flex-row items-center">
              <span className="text-sm text-center">
                {data.forecast.forecastday[0].astro.moonset}
              </span>
              <img
                src={require(
                  `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/horizon moon.svg`
                )}
                alt="Salida del sol"
                width={"60px"}
              />
              <span className="text-sm text-center">
                {data.forecast.forecastday[0].astro.moonrise}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExtrasBig;
