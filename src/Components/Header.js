import { Link } from "react-router-dom";
import Search from "./Search";

const Header = (props) => {
  return (
    <header
      className={`flex items-center h-16 px-4 border-b shrink-0 md:px-6 sticky transition-colors top-0 ${
        props.isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="flex w-full justify-between items-center gap-4">
        <Link
          to="#"
          className="flex items-center justify-between gap-2 text-lg font-semibold min-w-48"
        >
          <h1>Weather App</h1>
        </Link>
        <div className="max-sm:hidden w-full flex justify-center">
          <Search isDarkMode={props.isDarkMode} />
        </div>
        <div className="flex items-center gap-2 min-w-48">
          <button onClick={props.handleForecast} className="p-2">
            {props.forecast === "d" ? (
              <h1 className="text-xl hover:scale-110 transition-transform min-w-14">
                Días
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform min-w-14">
                Horas
              </h1>
            )}
          </button>
          <button onClick={props.handleUnits} className="p-2">
            {props.units === "c" ? (
              <h1 className="text-xl hover:scale-110 transition-transform min-w-8">
                C°
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform min-w-8">
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
