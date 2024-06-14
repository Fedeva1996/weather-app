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
        <div className="text-2xl font-medium">Cielo {data.weather[0].description}</div>
        <div className="text-2l font-thin">Maximas de {data.main.temp_min}°/{data.main.temp_max}°</div>
        <div className="text-gray-500 dark:text-gray-400">{data.name} 📍</div>
      </div>
    </main>
  );
};
function SunIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}
export default Main;
