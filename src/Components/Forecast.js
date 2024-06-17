const Forecast = ({weatherData}) => {
  const data = weatherData.slice(0, 11);
  const grupedData = Object.groupBy(data, ({ dt_txt }) => dt_txt);
  console.log(grupedData);

  return (
    <aside className="flex-1 flex flex-row items-center justify-center px-4 md:px-6 overflow-x-auto w-[80%] m-auto rounded-md no-scrollbar">
      <div className="mt-8 flex flex-auto gap-3 w-full">
        {Object.entries(grupedData).map(([key, value]) => (
          <div
            key={key}
            className="flex flex-col items-center gap-3 ml-1 hover:scale-110 transition-all duration-300 ease-in-out mt-5 mb-5 min-w-14"
          >
            <div className="text-sm font-medium">
              {key.slice(10, 13) > 12
                ? `0${key.slice(10, 13) - 12} p.m.`
                : `${key.slice(10, 13)} a.m.`}
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${value[0].weather[0].icon}@2x.png`}
              alt={value[0].weather[0].description}
            ></img>
            <div className="text-lg font-bold">{value[0].main.temp}°</div>
            <div className="text-sm font-normal text-gray-300">
              {value[0].weather[0].description}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};
export default Forecast;
