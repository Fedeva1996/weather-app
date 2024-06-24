const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full m-auto">
      <div className="w-full justify-center max-w-md">
        <div className="animate-spin m-auto rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200 border-t-gray-600 border-b-gray-600"></div>
      </div>
    </div>
  );
};

export default Loading;