import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ForecastHora = ({ Data }) => {
  const svgRef = useRef();

  const date = new Date();
  let hours = date.getHours() + 1;

  const forecast = [
    ...Data[0].forecast.forecastday[0].hour,
    ...Data[0].forecast.forecastday[1].hour,
    ...Data[0].forecast.forecastday[2].hour,
  ];

  const hourlyForecast = forecast.slice(hours, 24 + hours);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 2304;
    const height = 180;
    const margin = { top: 70, right: 48, bottom: 70, left: 48 };

    const x = d3
      .scaleLinear()
      .domain([0, hourlyForecast.length - 1])
      .range([margin.left, width - margin.right]);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(hourlyForecast, (data) => data.temp_c)])
      .nice()
      .range([height - margin.bottom, margin.top]);

    const line = d3
      .line()
      .x((data, index) => x(index))
      .y((data) => y(data.temp_c))
      .curve(d3.curveMonotoneX);

    svg
      .append("path")
      .datum(hourlyForecast)
      .attr("fill", "none")
      .attr("stroke", "gray")
      .attr("stroke-width", 1)
      .attr("d", line);

    svg
      .selectAll(".dot")
      .data(hourlyForecast)
      .enter()
      .append("circle")
      .attr("class", "dot")
      .attr("cx", (data, index) => x(index))
      .attr("cy", (data) => y(data.temp_c))
      .attr("r", 2)
      .attr("fill", "white");
  }, [hourlyForecast]);

  return (
    <div className={`bg-gray-100/60 dark:bg-gray-900 rounded-lg shadow-lg p-4`}>
      <h3 className="text-2xl font-bold">Pronóstico del día</h3>
      <div className="flex flex-col overflow-x-auto w-full no-scrollbar">
        <div className="grid grid-flow-col items-center content-center m-auto">
          {forecast.slice(hours, 24 + hours).map((hour) => (
            <div
              key={hour.time}
              id={hour.time}
              className="flex flex-col items-center justify-between gap-2 mt-5 mb-5 min-w-24"
            >
              <div className="text-sm font-medium ">
                {hour.time.slice(10, 13) > 12
                  ? hour.time.slice(10, 13) - 12 < 10
                    ? `0${hour.time.slice(10, 13) - 12} p.m.`
                    : `${hour.time.slice(10, 13) - 12} p.m.`
                  : `${hour.time.slice(10, 13)} a.m.`}
              </div>
              <img
                src={require(
                  `../Images/${Data[2] === true ? "Animated" : "NoAnimated"}/${hour.is_day === 1 ? "day" : "night"}/${hour.condition.code}.svg`
                )}
                alt={hour.condition.text}
                title={hour.condition.text}
                width={"64px"}
              />

              <div className="text-lg font-bold">
                {Data[1] === "c" ? hour.temp_c : hour.temp_f}°
              </div>
              {/* <div className="text-sm font-normal text-center min-h-8 ">
                {hour.condition.text}
              </div> */}
            </div>
          ))}
        </div>
        <div>
          <svg ref={svgRef} className="w-[2304px] items-center h-auto"></svg>
        </div>
        <div className="grid grid-flow-col items-center content-center m-auto">
          {forecast.slice(hours, 24 + hours).map((hour) => (
            <div
              key={hour.time}
              id={hour.time}
              className="flex flex-col items-center justify-between gap-2 min-w-24"
            >
              <div className="flex flex-1 items-center text-sm font-normal text-center  max-h-6">
                <svg
                  width="16px"
                  height="16px"
                  viewBox="0 0 24 24"
                  className={`mx-1 stroke-2 stroke-gray-800 dark:stroke-gray-300 ${hour.chance_of_rain > 50 ? "fill-gray-800 dark:fill-gray-300" : "fill-none"}`}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 14.7C21 18.1794 19.0438 21 15.5 21C11.9562 21 10 18.1794 10 14.7C10 11.2206 15.5 3 15.5 3C15.5 3 21 11.2206 21 14.7Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8 8.2C8 9.7464 7.11083 11 5.5 11C3.88917 11 3 9.7464 3 8.2C3 6.6536 5.5 3 5.5 3C5.5 3 8 6.6536 8 8.2Z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {hour.chance_of_rain} %
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ForecastHora;
