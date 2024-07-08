import Search from "../Components/Search";

const Footer = () => {
  return (
    <footer className="flex flex-col w-full justify-center items-center min-h-8 px-4 pb-2 mt-4 gap-2 border-t border-gray-300 dark:border-gray-600 sticky top-[100%] shrink-0 md:px-6">
      <div className="flex items-center w-full px-4 shrink-0 md:px-6 sticky  botton-0">
        <div className="flex justify-center mt-3 w-full items-center gap-4 sm:hidden">
          <Search/>
        </div>
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        Hecho por Federico Verón. A base de la API:
        <a
          href="https://www.weatherapi.com/"
          title="Free Weather API"
          className="ml-1 text-gray-600 dark:text-gray-300 hover:text-gray-200"
        >
          WeatherAPI.com
        </a>
      </p>
    </footer>
  );
};
export default Footer;
