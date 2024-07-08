const Alerta = ({ Data }) => {
  //console.log(weatherData);
  const data = Data[0].alerts.alert[0];
  //console.log(data);

  // Divide la cadena original en un arreglo de elementos
  const items = data.desc.split("\n");

  return (
    <aside className="flex-1 flex flex-col items-center justify-center m-auto p-4 bg-orange-100 border-l-4 border-orange-400 text-orange-600 dark:bg-orange-300 dark:border-orange-600 dark:text-orange-700">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center">
          <div className="text-xl font-bold ">
            {data.event}
          </div>
        </div>
        <div className="text-sm font-medium ">
          <ul className="list-disc list-inside">
            {items.map((key, index) => (
              <li key={index}>{key.slice(1)}</li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
};
export default Alerta;
