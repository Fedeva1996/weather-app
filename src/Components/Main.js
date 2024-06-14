const Main = (weatherData) => {
  const data = weatherData.weatherData;
  return (
    <main className="flex-1 flex flex-col items-center justify-center m-auto">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            alt={data.weather[0].description}
          ></img>
          <div className="text-6xl font-bold">{data.main.temp}°</div>
        </div>
        <div className="text-2xl font-medium">
          Cielo {data.weather[0].description}
        </div>
        <div className="text-2l font-thin">
          Maximas de {data.main.temp_min}°/{data.main.temp_max}°
        </div>
        <div className="text-gray-500 dark:text-gray-400">{data.name} 📍</div>
      </div>
    </main>
  );
};
export default Main;
