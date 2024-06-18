import { useState } from "react";
import db from "../db.json";
import { useDispatch } from "react-redux";
import { setCoords } from "../redux/reducers";

const Search = (props) => {
  const [filter, setFilter] = useState("");
  const cities = db.ciudades;
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    setFilter(event.target.value);
  };

  const handleClick = (ciudad) => {
    const ciudadCoords = [ciudad.lat, ciudad.lon];
    //console.log(ciudadCoords);
    dispatch(setCoords(ciudadCoords));
    setFilter("");
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
      if (results.length < 10) {
        return (
          <div className="flex flex-col items-left justify-center gap-2 absolute overflow-y-auto min-w-[448px] w-auto max-h-52 z-50 bg-slate-800 rounded-b-md">
            {results.map((city) => (
              <button
                onClick={() => handleClick(city)}
                className="flex items-center justify-between gap-2 p-2 text-lg font-semibold hover:bg-slate-500 h-full w-full"
                key={city.nombre}
              >
                <h1>{city.nombre}</h1>
              </button>
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
