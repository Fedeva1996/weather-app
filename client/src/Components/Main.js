const Main = ({ Data }) => {
  //console.log(Data);
  const data = Data[0];

  return (
    <div className={`bg-gray-100 dark:bg-gray-900 rounded-lg shadow-lg p-4`}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <span className="text-6xl font-normal">
            {Data[1] === "c" ? data.current.temp_c : data.current.temp_f}°
          </span>
          <h3 className="text-xl mt-2"> {data.current.condition.text}</h3>
          <p className="flex flex-1 font-thin text-muted-foreground pt-2">
            <svg
              width="20px"
              height="20px"
              viewBox="0 0 24 24"
              className="mx-1 stroke-2 fill-none stroke-gray-800 dark:stroke-gray-300"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {data.location.name}
          </p>
        </div>
        <img
          src={require(
            `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/${(data.current.condition.is_day = 1 ? "day" : "night")}/${data.current.condition.code}.svg`
          )}
          alt={data.current.condition.text}
          width={"160px"}
          className="justify-self-center"
        />
      </div>
      <div>
        <h2 className="my-2 font-thin text-xl text-gray-500 dark:text-gray-300">
          Sensación térmica de{" "}
          {Data[1] === "c"
            ? data.current.feelslike_c
            : data.current.feelslike_f}
          °
        </h2>
      </div>
    </div>
  );
};
export default Main;
