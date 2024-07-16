import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import DropdownMenu from "../Components/DropdowMenu";

const Header = (props) => {
  return (
    <header className="flex items-center h-16 px-4 mb-4 border-b shrink-0 sticky top-0 border-gray-300 dark:border-gray-600 text-gray-900 bg-slate-100 dark:bg-gray-900 dark:text-white">
      <div className="flex w-full justify-between items-center gap-4">
        <Link
          to="#"
          className="flex items-center justify-between gap-2 text-lg font-semibold min-w-28"
        >
          <h1>Weather App</h1>
        </Link>
        <div className="max-sm:hidden w-full flex justify-center">
          <Search saveCities={props.saveCities} actualizar={props.actualizar} />
        </div>
        <div className="flex items-center justify-end gap-2">
          <DropdownMenu
            handleUnits={props.handleUnits}
            units={props.units}
            isDarkMode={props.theme}
            resetLocation={props.resetLocation}
            handleDarkmode={props.handleTheme}
            animations={props.animations}
            handleAnimations={props.handleAnimations}
            extra={props.extra}
            handleExtra={props.handleExtra}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
