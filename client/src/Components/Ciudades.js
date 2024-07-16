import { useState, useEffect, useContext } from "react";
import Loading from "./Loading";
import { fetchForecastWeatherData } from "../Services/Weather";
import { removeCity } from "../Actions/PreferencesActions";
import { AuthContext } from "../Contexts/AuthContexts";

const Ciudades = ({ Data }) => {
  //console.log(Data);
  const [data, setCurrentData] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const city = Data[0];
  const units = Data[1];
  const { currentUser } = useContext(AuthContext);

  //console.log(data);

  useEffect(() => {
    fetchForecastWeatherData(city.lat, city.lon)
      .then((data) => {
        setCurrentData(data);
        setLoaded(true);
      })
      .catch((error) => console.error(error));
  }, [city]);

  const handleRemoveCity = async () => {
    await removeCity(currentUser.email, city.nombre);
    Data[3](true);
  };

  return loaded ? (
    <div className="flex-1 flex flex-col items-center justify-center m-auto min-w-full bg-gray-300 dark:bg-gray-900 rounded-lg shadow-lg p-4">
      <div className="flex flex-row end-full justify-end w-full max-h-[0px]">
        <button
          onClick={() => handleRemoveCity()}
          title="Eliminar de favoritos"
        >
          <div className="flex items-center justify-between hover:scale-110 transition-transform">
            <svg
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 12L14 16M14 12L10 16M18 6L17.1991 18.0129C17.129 19.065 17.0939 19.5911 16.8667 19.99C16.6666 20.3412 16.3648 20.6235 16.0011 20.7998C15.588 21 15.0607 21 14.0062 21H9.99377C8.93927 21 8.41202 21 7.99889 20.7998C7.63517 20.6235 7.33339 20.3412 7.13332 19.99C6.90607 19.5911 6.871 19.065 6.80086 18.0129L6 6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>
      <div className="flex flex-row items-center gap-3">
        <div className="flex flex-col items-center gap-2">
          <img
            src={require(
              `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/${(data.current.condition.is_day = 1 ? "day" : "night")}/${data.current.condition.code}.svg`
            )}
            alt={data.current.condition.text}
            width={"64px"}
          />
          {/* <img
            src={data.current.condition.icon}
            alt={data.current.condition.text}
          /> */}
          <div className="text-3xl font-bold">
            {units === "c" ? data.current.temp_c : data.current.temp_f}°
          </div>
        </div>
        <div className="flex flex-col justify-between h-full items-center gap-2">
          <div className="flex flex-1 text-xl font-medium">
            {data.location.name}
          </div>
          <div className="flex flex-row justify-between h-full items-center gap-2">
            <div className="text-md font-thin">
              {data.current.condition.text}
            </div>
            -
            <div className="flex flex-1 text-sm font-thin ">
              {units === "c"
                ? data.forecast.forecastday[0].day.mintemp_c
                : data.forecast.forecastday[0].day.mintemp_f}
              ° /{" "}
              {units === "c"
                ? data.forecast.forecastday[0].day.maxtemp_c
                : data.forecast.forecastday[0].day.maxtemp_f}
              °
            </div>
          </div>
          <div className="flex flex-row justify-between h-full items-center gap-2">
            <div className="text-md font-thin ">
              Humedad: {data.forecast.forecastday[0].day.avghumidity}
            </div>
            -
            <div className="flex flex-1 text-sm font-thin ">
              Lluvia: {data.forecast.forecastday[0].day.daily_chance_of_rain} %
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};
export default Ciudades;
