import React, { useState, useEffect, useRef, useContext } from "react";
import db from "../db.json";
import { saveCity, removeCity } from "../Actions/PreferencesActions";
import { AuthContext } from "../Contexts/AuthContexts";

const Search = (props) => {
  const [filter, setFilter] = useState("");
  const cities = db.ciudades;
  const searchRef = useRef(null);
  const saveCities = props.saveCities;
  //console.log(saveCities);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleAddCity = async (ciudad) => {
    if (saveCities.length < 2) {
      await saveCity(currentUser.email, {
        nombre: ciudad.nombre,
        lat: ciudad.lat,
        lon: ciudad.lon,
      });
      //console.log(result);
      props.actualizar(true);
    } else {
      alert("Solo puedes guardar hasta 2 ciudades.");
    }
    setFilter("");
  };

  const handleRemoveCity = async (ciudad) => {
    const result = await removeCity(currentUser.email, ciudad.nombre);
    console.log(result);
    props.actualizar(true);
  };

  const checkInclude = (ciudad) => {
    const ciudadCoords = ciudad.nombre;
    //console.log(ciudad);
    //console.log(saveCities);
    return saveCities.some((city) => city.nombre === ciudadCoords);
  };

  const handleClickOutside = (event) => {
    if (searchRef.current && !searchRef.current.contains(event.target)) {
      setFilter("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const Ciudades = ({ filter }) => {
    const results = cities.filter((city) =>
      city.nombre.toLowerCase().includes(filter.toLowerCase())
    );

    if (filter === "") {
      return null;
    }
    if (results.length > 0) {
      if (results.length < 5) {
        return (
          <div className="absolute left-0 right-0 bottom-full sm:bottom-auto sm:mb-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-full max-h-52 z-10 bg-white dark:bg-gray-600 rounded-md sm:rounded-md">
            {results.map((city) => (
              <div
                key={city.nombre}
                className="flex flex-1 hover:bg-gray-500 dark:hover:bg-gray-500"
                title="Agregar a favoritos"
              >
                <div
                  className="flex items-center justify-between gap-2 p-2 text-lg font-semibold h-full w-full"
                  key={city.nombre}
                >
                  <h1>{city.nombre}</h1>
                </div>
                {checkInclude(city) ? (
                  <button
                    className="gap-2 p-2"
                    onClick={() => handleRemoveCity(city)}
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
                ) : (
                  <button
                    className="gap-2 p-2"
                    onClick={() => handleAddCity(city)}
                  >
                    <div className="flex items-center justify-between hover:scale-110 transition-transform">
                      {saveCities.length >= 2 ? null : (
                        <svg
                          width="24px"
                          height="24px"
                          viewBox="0 0 24 24"
                          className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M8 12H16M12 8V16M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </div>
                  </button>
                )}
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="absolute left-0 p-3 right-0 bottom-full sm:bottom-auto sm:mb-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-full max-h-52 z-10 bg-white dark:bg-gray-600 rounded-md sm:rounded-md">
            Demasiadas coincidencias, sea más específico
          </div>
        );
      }
    } else {
      return (
        <div className="absolute left-0 p-3 right-0 bottom-full sm:bottom-auto sm:mb-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-full max-h-52 z-10 bg-white dark:bg-gray-600 rounded-md sm:rounded-md">
          No se encontraron resultados
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-md relative" ref={searchRef}>
      <input
        type="search"
        placeholder="Buscar ciudad..."
        onChange={handleSearch}
        value={filter}
        className="w-full h-full rounded-md p-2 bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-white"
        title="Buscar ciudad"
      />
      <Ciudades filter={filter} />
    </div>
  );
};

export default Search;
