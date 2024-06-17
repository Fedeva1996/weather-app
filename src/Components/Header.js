import { Link } from "react-router-dom";

const Header = (props) => {
  return (
    <header
      className={`flex items-center h-16 px-4 border-b shrink-0 md:px-6 sticky top-0 ${
        props.isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex w-full justify-between items-center gap-4">
        <Link
          to="#"
          className="flex items-center justify-between gap-2 text-lg font-semibold md:text-base hover:text-gray-900 dark:hover:text-gray-500"
        >
          <h1>Weather App</h1>
        </Link>
        <div className="w-full max-w-md">
          <input
            type="search"
            placeholder="Buscar ciudad..."
            onChange={props.handleSearch}
            className={`w-full h-full rounded-md p-2 transition-colors bg-gray-200 dark:bg-gray-800 ${
              props.isDarkMode
                ? "bg-gray-700 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          />
        </div>
        <div className="flex items-center gap-2">
          <button onClick={props.handleForecast} className="p-2">
            {props.forecast === "d" ? (
              <h1 className="text-xl hover:scale-110 transition-transform">
                Días
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform">
                Horas
              </h1>
            )}
          </button>
          <button onClick={props.handleUnits} className="p-2">
            {props.units === "c" ? (
              <h1 className="text-xl hover:scale-110 transition-transform">
                C°
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform">
                F°
              </h1>
            )}
          </button>
          <button onClick={props.handleDarkmode} className="p-2">
            {props.isDarkMode ? (
              <h1 className="text-xl hover:scale-110 transition-transform">
                🌞
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform">
                🌜
              </h1>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
