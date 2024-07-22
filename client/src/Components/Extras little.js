import React from "react";
import Tippy from "@tippyjs/react";

const ExtrasLittle = ({ Data }) => {
  //console.log(Data);
  const data = Data[0];

  const uvIndexDescriptions = (uvIndex) => {
    if (uvIndex === 1) return ["Bajo: Sin riesgo", "bg-green-500"];
    if (uvIndex === 2) return ["Bajo: Sin riesgo", "bg-green-500"];
    if (uvIndex === 3)
      return ["Moderado: Protección recomendada", "bg-yellow-500"];
    if (uvIndex === 4)
      return ["Moderado: Protección recomendada", "bg-yellow-500"];
    if (uvIndex === 5)
      return ["Moderado: Protección recomendada", "bg-yellow-500"];
    if (uvIndex === 6)
      return ["Alto: Protección adicional necesaria", "bg-orange-500"];
    if (uvIndex === 7)
      return ["Alto: Protección adicional necesaria", "bg-orange-500"];
    if (uvIndex === 8)
      return ["Muy alto: Protección extra requerida", "bg-red-500"];
    if (uvIndex === 9)
      return ["Muy alto: Protección extra requerida", "bg-red-500"];
    if (uvIndex === 10)
      return ["Muy alto: Protección extra requerida", "bg-red-500"];
    if (uvIndex === 11)
      return ["Extremo: Evitar la exposición al sol", "bg-purple-500"];
  };


  return (
    <div
      className={`bg-gray-100/60 dark:bg-gray-900 rounded-lg shadow-lg p-4 w-full content-center`}
    >
      <div className="grid grid-cols-2 gap-6">
        <div>
          <Tippy content="Dirección y velocidad del viento." arrow={false}>
            <p className="flex flex-row items-center font-bold">
              Viento
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2 fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7639 7C16.3132 6.38625 17.1115 6 18 6C19.6569 6 21 7.34315 21 9C21 10.6569 19.6569 12 18 12H3M8.50926 4.66667C8.87548 4.2575 9.40767 4 10 4C11.1046 4 12 4.89543 12 6C12 7.10457 11.1046 8 10 8H3M11.5093 19.3333C11.8755 19.7425 12.4077 20 13 20C14.1046 20 15 19.1046 15 18C15 16.8954 14.1046 16 13 16H3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            <span className="flex flex-row items-center align-middle">
              <svg
                width="32px"
                height="32px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                transform={`rotate(${data.current.wind_degree})`}
              >
                <path
                  d="M9 13L12 16M12 16L15 13M12 16V8M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {Data[1] === "c"
                ? data.current.wind_kph + " km/h"
                : data.current.wind_mph + " mph"}
            </span>
          </p>
        </div>
        <div>
          <Tippy
            content="Intensidad de la radiación Ultravioleta."
            arrow={false}
          >
            <p className="flex flex-row items-center font-bold text-muted-foreground">
              UV
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 3V4M12 20V21M4 12H3M6.31412 6.31412L5.5 5.5M17.6859 6.31412L18.5 5.5M6.31412 17.69L5.5 18.5001M17.6859 17.69L18.5 18.5001M21 12H20M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            <span
              className={`font-bold ${uvIndexDescriptions(data.current.uv)[1]} rounded-full px-2 py-[0.10rem] text-center`}
            >
              {data.current.uv}
            </span>{" "}
            {uvIndexDescriptions(data.current.uv)[0]}
          </p>
        </div>
        <div>
          <Tippy
            content="Distancia máxima a la que se pueden ver objetos claramente."
            arrow={false}
          >
            <p className="flex flex-row items-center font-bold text-muted-foreground">
              Visibilidad
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12.0012 5C7.52354 5 3.73326 7.94248 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            {Data[1] === "c"
              ? data.current.vis_km + " km"
              : data.current.vis_miles + " mi"}
          </p>
        </div>
        <div>
          <Tippy
            content="Fuerza que ejerce el aire sobre la superficie de la Tierra."
            arrow={false}
          >
            <p className="flex flex-row items-center font-bold text-muted-foreground">
              Presión
              <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="mx-1 fill-gray-800 dark:fill-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                transform="rotate(45)"
              >
                <path d="M9 5C9 4.44772 9.44772 4 10 4C10.5523 4 11 4.44772 11 5V9C11 10.1046 10.1046 11 9 11H5C4.44772 11 4 10.5523 4 10C4 9.44772 4.44772 9 5 9H7.58579L1.29249 2.70711C0.902369 2.31658 0.902369 1.68342 1.29249 1.29249C1.68342 0.902369 2.31658 0.902369 2.70711 1.29249L9 7.58578V5Z" />
                <path d="M15 19C15 19.5523 14.5523 20 14 20C13.4477 20 13 19.5523 13 19V15C13 13.8954 13.8954 13 15 13H19C19.5523 13 20 13.4477 20 14C20 14.5523 19.5523 15 19 15H16.4142L22.7071 21.2929C23.0976 21.6834 23.0976 22.3166 22.7071 22.7071C22.3166 23.0976 21.6834 23.0976 21.2929 22.7071L15 16.4142V19Z" />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            <span className="flex flex-row items-center">
              {Data[1] === "c"
                ? data.current.pressure_mb + " mb"
                : data.current.pressure_in + " in"}
            </span>
          </p>
        </div>
        <div>
          <Tippy
            content="Temperatura a la que el aire debe enfriarse para que el vapor de agua se condense en gotas de agua."
            arrow={false}
          >
            <p className="flex flex-row items-center font-bold text-muted-foreground">
              Punto de rocío
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                className="mx-1 stroke-2  fill-none stroke-gray-800 dark:stroke-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 21.5C13.8565 21.5 15.637 20.7625 16.9497 19.4497C18.2625 18.137 19 16.3565 19 14.5C19 12.5 18 10.6 16 9C14 7.4 12.5 5 12 2.5C11.5 5 10 7.4 8 9C6 10.6 5 12.5 5 14.5C5 16.3565 5.7375 18.137 7.05025 19.4497C8.36301 20.7625 10.1435 21.5 12 21.5V21.5Z" />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            <span className="flex flex-row items-center">
              {Data[1] === "c"
                ? data.current.dewpoint_c + " °C"
                : data.current.dewpoint_f + " °F"}
            </span>
          </p>
        </div>
        <div>
          <Tippy content="Cantidad de vapor de agua en el aire." arrow={false}>
            <p className="flex flex-row items-center font-bold text-muted-foreground">
              Humedad
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                className="mx-1 fill-gray-800 dark:fill-gray-300"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M15.0066 3.25608C16.8483 2.85737 19.1331 2.8773 22.2423 3.65268C22.7781 3.78629 23.1038 4.32791 22.9699 4.86241C22.836 5.39691 22.2931 5.7219 21.7573 5.58829C18.8666 4.86742 16.9015 4.88747 15.4308 5.20587C13.9555 5.52524 12.895 6.15867 11.7715 6.84363L11.6874 6.89494C10.6044 7.55565 9.40515 8.24729 7.82073 8.55069C6.17734 8.82388 4.23602 8.58235 1.62483 7.54187C1.11607 7.33724 0.866674 6.75667 1.0718 6.24513C1.27692 5.73359 1.85889 5.48479 2.37165 5.68943C4.76435 6.6443 6.32295 6.77699 7.492 6.58265C8.67888 6.38535 9.58373 5.83916 10.7246 5.14119C11.855 4.45445 13.1694 3.6538 15.0066 3.25608Z" />
                <path d="M22.2423 7.64302C19.1331 6.86765 16.8483 6.84772 15.0066 7.24642C13.1694 7.64415 11.855 8.44479 10.7246 9.13153C9.58373 9.8295 8.67888 10.3757 7.492 10.573C6.32295 10.7673 4.76435 10.6346 2.37165 9.67977C1.85889 9.47514 1.27692 9.72393 1.0718 10.2355C0.866674 10.747 1.11607 11.3276 1.62483 11.5322C4.23602 12.5727 6.17734 12.8142 7.82073 12.541C9.40515 12.2776 10.6044 11.546 11.6874 10.8853L11.7715 10.834C12.895 10.149 13.9555 9.51558 15.4308 9.19621C16.9015 8.87781 18.8666 8.85777 21.7573 9.57863C22.2931 9.71224 22.836 9.38726 22.9699 8.85275C23.1038 8.31825 22.7781 7.77663 22.2423 7.64302Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M18.9998 10.0266C18.6526 10.0266 18.3633 10.2059 18.1614 10.4772C18.0905 10.573 17.9266 10.7972 17.7089 11.111C17.4193 11.5243 17.0317 12.1082 16.6424 12.7555C16.255 13.3996 15.8553 14.124 15.5495 14.8397C15.2567 15.5213 14.9989 16.2614 14.9999 17.0117C15.0006 17.2223 15.0258 17.4339 15.0604 17.6412C15.1182 17.9872 15.2356 18.4636 15.4804 18.9521C15.7272 19.4446 16.1131 19.9674 16.7107 20.3648C17.3146 20.7664 18.0748 21 18.9998 21C19.9248 21 20.685 20.7664 21.2488 20.3648C21.8864 19.9674 22.2724 19.4446 22.5192 18.9522C22.764 18.4636 22.8815 17.9872 22.9393 17.6413C22.974 17.4337 22.9995 17.2215 22.9998 17.0107C23.0001 16.2604 22.743 15.5214 22.4501 14.8397C22.1444 14.124 21.7447 13.3996 21.3573 12.7555C20.968 12.1082 20.5803 11.5243 20.2907 11.111C20.073 10.7972 19.909 10.573 19.8382 10.4772C19.6363 10.2059 19.3469 10.0266 18.9998 10.0266ZM20.6119 15.6257C20.3552 15.0241 20.0049 14.3848 19.6423 13.782C19.4218 13.4154 19.2007 13.0702 18.9998 12.7674C18.7989 13.0702 18.5778 13.4154 18.3573 13.782C17.9948 14.3848 17.6445 15.0241 17.3878 15.6257L17.3732 15.6595C17.1965 16.0704 16.9877 16.5562 17.0001 17.0101C17.0121 17.3691 17.1088 17.7397 17.2693 18.0599C17.3974 18.3157 17.574 18.5411 17.8201 18.7048C18.06 18.8643 18.4248 19.0048 18.9998 19.0048C19.5748 19.0048 19.9396 18.8643 20.1795 18.7048C20.4256 18.5411 20.6022 18.3156 20.7304 18.0599C20.8909 17.7397 20.9876 17.3691 20.9996 17.01C21.0121 16.5563 20.8032 16.0705 20.6265 15.6597L20.6119 15.6257Z"
                />
                <path d="M14.1296 11.5308C14.8899 11.2447 15.4724 12.076 15.1153 12.7892C14.952 13.1151 14.7683 13.3924 14.4031 13.5214C13.426 13.8666 12.6166 14.3527 11.7715 14.8679L11.6874 14.9192C10.6044 15.5799 9.40516 16.3115 7.82074 16.5749C6.17735 16.8481 4.23604 16.6066 1.62484 15.5661C1.11608 15.3615 0.866688 14.7809 1.07181 14.2694C1.27694 13.7578 1.8589 13.509 2.37167 13.7137C4.76436 14.6685 6.32297 14.8012 7.49201 14.6069C8.67889 14.4096 9.58374 13.8634 10.7246 13.1654C11.8166 12.5021 12.9363 11.9171 14.1296 11.5308Z" />
              </svg>
            </p>
          </Tippy>
          <p className="font-thin">
            <span className="flex flex-row items-center">
              {data.current.humidity}%
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};
export default ExtrasLittle;
