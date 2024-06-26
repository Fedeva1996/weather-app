import { useState } from "react";
import db from "../db.json";
import { useDispatch, useSelector } from "react-redux";
import { setCoords, setSaveCities, removeSaveCities } from "../redux/reducers";
import { Add, Thrash } from "../Images/svg";

const Search = (props) => {
  const [filter, setFilter] = useState("");
  const cities = db.ciudades;
  const dispatch = useDispatch();
  const saveCities = useSelector((state) => state.saveCities.value);

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (ciudad) => {
    const ciudadCoords = [ciudad.lat, ciudad.lon];
    //console.log(ciudadCoords);
    dispatch(setCoords(ciudadCoords));
    setFilter("");
  };
  const handleAddCity = (ciudad) => {
    const ciudadCoords = [ciudad.lat, ciudad.lon];
    //console.log(ciudadCoords);
    dispatch(setSaveCities(ciudadCoords));
    setFilter("");
  };

  const handleRemoveCity = (ciudad) => {
    const ciudadCoords = [ciudad.lat, ciudad.lon];
    //console.log(ciudadCoords);
    dispatch(removeSaveCities(ciudadCoords));
  };

  const checkInclude = (ciudad) => {
    let includes = saveCities.some(
      (a) => saveCities.length && ciudad.every((v, i) => v === a[i])
    );
    return includes;
  };
  const Ciudades = ({ filter }) => {
    const results = cities.filter((city) =>
      city.nombre.toLowerCase().includes(filter.toLowerCase())
    );

    //console.log(results);
    if (filter === "") {
      return;
    }
    if (results.length > 0) {
      if (results.length < 5) {
        return (
          <div className="absolute left-0 right-0 bottom-full sm:bottom-auto sm:mb-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-full max-h-52 z-10 bg-slate-300 dark:bg-slate-600 rounded-md sm:rounded-md">
            {results.map((city) => (
              <div
                key={city.nombre}
                className="flex flex-1 hover:bg-slate-500 dark:hover:bg-slate-500"
                title="Agregar a favoritos"
              >
                <button
                  onClick={() => handleClick(city)}
                  className="flex items-center justify-between gap-2 p-2 text-lg font-semibold h-full w-full"
                  key={city.nombre}
                >
                  <h1>{city.nombre}</h1>
                </button>
                {
                  //revisar nuevamente para ver correctamente el saveCities.length

                  checkInclude([city.lat, city.lon]) ? (
                    <button
                      className="gap-2 p-2"
                      onClick={() => handleRemoveCity(city)}
                      title="Eliminar de favoritos"
                    >
                      <div className="flex items-center justify-between hover:scale-110 transition-transform">
                        <Thrash prop={props.isDarkMode} />
                      </div>
                    </button>
                  ) : (
                    <button
                      className="gap-2 p-2"
                      onClick={() => handleAddCity(city)}
                    >
                      <div className="flex items-center justify-between hover:scale-110 transition-transform">
                        {saveCities.length >= 2 ? null : (
                          <Add prop={props.isDarkMode} />
                        )}
                      </div>
                    </button>
                  )
                }
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div className="absolute left-0 right-0 bottom-full sm:bottom-auto sm:mb-2 p-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-[448px] w-auto max-h-52 z-50  bg-slate-300 dark:bg-slate-600 rounded-md sm:rounded-md">
            Demasiadas coincidencias, sea más específico
          </div>
        );
      }
    } else {
      return (
        <div className="absolute left-0 right-0 bottom-full sm:bottom-auto sm:mb-2 p-2 flex flex-col items-left justify-center gap-2 overflow-y-auto min-w-[448px] w-auto max-h-52 z-50  bg-slate-300 dark:bg-slate-600 rounded-md sm:rounded-md">
          No se encontraron resultados
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-md relative">
      <input
        type="search"
        placeholder="Buscar ciudad..."
        onChange={handleSearch}
        value={filter}
        className="w-full h-full rounded-md p-2 transition-colors bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white"
        title="Buscar ciudad"
      />
      <Ciudades filter={filter} />
    </div>
  );
};

export default Search;
