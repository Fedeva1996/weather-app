import Search from "../Components/Search";

const Footer = (props) => {
  return (
    <footer className="flex flex-col w-full justify-center items-center min-h-8 px-4 pb-2 mt-4 gap-2 border-t bg-gray-100 dark:bg-gray-950 border-gray-300 dark:border-gray-800 sticky top-[100%] shrink-0 md:px-6">
      <div className="flex items-center w-full px-4 shrink-0 md:px-6 sticky  botton-0">
        <div className="flex justify-center mt-3 w-full items-center gap-4 sm:hidden">
          <Search saveCities={props.saveCities} actualizar={props.actualizar} />
        </div>
      </div>
      <div className="flex items-center w-full justify-between">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Hecho por Federico Verón. A base de la API:
          <a
            href="https://www.weatherapi.com/"
            title="Free Weather API"
            className="ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-700 hover:dark:text-gray-200"
          >
            WeatherAPI.com
          </a>
        </p>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com/Fedeva1996/weather-app/"
            title="Repositorio de Github"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              data-testid="geist-icon"
              height="20"
              width="20"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              className="mx-1 stroke-2 fill-gray-800 dark:fill-gray-300"
            >
              <g clipPath="url(#clip0_872_3147)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 0C3.58 0 0 3.57879 0 7.99729C0 11.5361 2.29 14.5251 5.47 15.5847C5.87 15.6547 6.02 15.4148 6.02 15.2049C6.02 15.0149 6.01 14.3851 6.01 13.7154C4 14.0852 3.48 13.2255 3.32 12.7757C3.23 12.5458 2.84 11.836 2.5 11.6461C2.22 11.4961 1.82 11.1262 2.49 11.1162C3.12 11.1062 3.57 11.696 3.72 11.936C4.44 13.1455 5.59 12.8057 6.05 12.5957C6.12 12.0759 6.33 11.726 6.56 11.5261C4.78 11.3262 2.92 10.6364 2.92 7.57743C2.92 6.70773 3.23 5.98797 3.74 5.42816C3.66 5.22823 3.38 4.40851 3.82 3.30888C3.82 3.30888 4.49 3.09895 6.02 4.1286C6.66 3.94866 7.34 3.85869 8.02 3.85869C8.7 3.85869 9.38 3.94866 10.02 4.1286C11.55 3.08895 12.22 3.30888 12.22 3.30888C12.66 4.40851 12.38 5.22823 12.3 5.42816C12.81 5.98797 13.12 6.69773 13.12 7.57743C13.12 10.6464 11.25 11.3262 9.47 11.5261C9.76 11.776 10.01 12.2558 10.01 13.0056C10.01 14.0752 10 14.9349 10 15.2049C10 15.4148 10.15 15.6647 10.55 15.5847C12.1381 15.0488 13.5182 14.0284 14.4958 12.6673C15.4735 11.3062 15.9996 9.67293 16 7.99729C16 3.57879 12.42 0 8 0Z"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_872_3147">
                  <rect width="20" height="20" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/federico-veron/"
            title="Linkedin"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              data-testid="geist-icon"
              height="20"
              width="20"
              strokeLinejoin="round"
              viewBox="0 0 16 16"
              className="mx-1 stroke-2 fill-gray-800 dark:fill-gray-300"
            >
              <path
                id="Subtract"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M2 0C0.895431 0 0 0.895431 0 2V14C0 15.1046 0.895431 16 2 16H14C15.1046 16 16 15.1046 16 14V2C16 0.895431 15.1046 0 14 0H2ZM5 6.75V13H3V6.75H5ZM5 4.50008C5 5.05554 4.61409 5.5 3.99408 5.5H3.98249C3.38582 5.5 3 5.05554 3 4.50008C3 3.93213 3.39765 3.5 4.00584 3.5C4.61409 3.5 4.98845 3.93213 5 4.50008ZM8.5 13H6.5C6.5 13 6.53178 7.43224 6.50007 6.75H8.5V7.78371C8.5 7.78371 9 6.75 10.5 6.75C12 6.75 13 7.59782 13 9.83107V13H11V10.1103C11 10.1103 11 8.46616 9.7361 8.46616C8.4722 8.46616 8.5 9.93972 8.5 9.93972V13Z"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
