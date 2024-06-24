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
    dispatch(removeSaveCities(ciudad));
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
          <div className="flex flex-col items-left justify-center gap-2 fixed sm:absolute top-[67.5%] sm:top-14 overflow-y-auto min-w-[448px] w-auto max-h-52 z-auto bg-slate-800 rounded-b-md">
            {results.map((city) => (
              <div key={city.nombre} className="flex flex-1">
                <button
                  onClick={() => handleClick(city)}
                  className="flex items-center justify-between gap-2 p-2 text-lg font-semibold hover:bg-slate-500 h-full w-full"
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
                        {saveCities.length >= 2 ? (
                          null
                        ) : (
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
          <div className="flex flex-col items-left justify-center gap-2 absolute overflow-y-auto min-w-[448px] w-auto max-h-52 z-50 bg-slate-800">
            Demasiadas coincidencias, sea más específico
          </div>
        );
      }
    } else {
      return (
        <div className="flex flex-col items-left justify-center gap-2 absolute overflow-y-auto min-w-[448px] w-auto max-h-52 z-50 bg-slate-800">
          No se encontraron resultados
        </div>
      );
    }
  };

  return (
    <div className="w-full max-w-md">
      <input
        type="search"
        placeholder="Buscar ciudad..."
        onChange={handleSearch}
        value={filter}
        className={`w-full h-full rounded-md p-2 transition-colors bg-gray-200 dark:bg-gray-800 ${
          props.isDarkMode
            ? "bg-gray-700 text-white"
            : "bg-gray-200 text-gray-700"
        }`}
      />
      <Ciudades filter={filter} />
    </div>
  );
};

export default Search;
