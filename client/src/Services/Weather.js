export const fetchCurrentWeatherData = async (lat, lon) => {
  //console.log(lat, lon);
  const uri = `${process.env.REACT_APP_SERVER_PATH}/weather/current/?lat=${lat}&lon=${lon}`;

  const getOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(uri, getOptions, { mode: "cors" });
  //console.log(lat, lon);
  const data = await response.json();
  console.log(data);
  return data;
};
export const fetchForecastWeatherData = async (lat, lon) => {
  //console.log(lat, lon);
  const uri = `${process.env.REACT_APP_SERVER_PATH}/weather/forecast?lat=${lat}&lon=${lon}`;
  const getOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(uri, getOptions, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  return data;
};
export const fetchHistoryWeatherData = async (lat, lon, date) => {
  //console.log(lat, lon);

  const uri = `${process.env.REACT_APP_SERVER_PATH}/weather/history?lat=${lat}&lon=${lon}&date=${date}`;

  const getOptions = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(uri, getOptions, { mode: "cors" });
  const data = await response.json();
  console.log(data);
  return data;
};
