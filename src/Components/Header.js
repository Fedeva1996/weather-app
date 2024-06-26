import { Link } from "react-router-dom";
import Search from "./Search";
import { LocationReset, Moon, Sun } from "../Images/svg";

const Header = (props) => {
  return (
    <header className="flex items-center h-16 px-4 border-b shrink-0 sticky transition-colors top-0 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white">
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
        <div className="flex items-center justify-end gap-2 min-w-48">
          <button
            onClick={props.handleUnits}
            className="p-2"
            title="Cambiar unidades"
          >
            {props.units === "c" ? (
              <h1 className="text-xl font-sans hover:scale-110 transition-transform min-w-8">
                C°
              </h1>
            ) : (
              <h1 className="text-xl font-sans hover:scale-110 transition-transform min-w-8">
                F°
              </h1>
            )}
          </button>
          <button
            onClick={props.resetLocation}
            className="p-2"
            title="Restablecer ubicación"
          >
            <h1 className="text-xl hover:scale-110 transition-transform min-w-8">
              <LocationReset prop={props.isDarkMode} />
            </h1>
          </button>
          <button
            onClick={props.handleDarkmode}
            className="p-2"
            title="Cambiar modo oscuro"
          >
            {props.isDarkMode === "dark" ? (
              <h1 className="text-xl hover:scale-110 transition-transform">
                <Sun prop={props.isDarkMode} />
              </h1>
            ) : (
              <h1 className="text-xl hover:scale-110 transition-transform">
                <Moon prop={props.isDarkMode} />
              </h1>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
