import React from "react";

const Loading = () => {
  return (
    <div className="flex flex-col items-center pt-64 pb-72">
      <div role="status"></div>
      <div className="flex flex-col bg-red-500 items-center mx-20 px-24 py-3 rounded-md">
        <h1 className="text-3xl text-white text-center">Loading...</h1>
        <span className="h-12 w-12 my-2 border-solid border-4 border-white border-b-transparent rounded-full animate-spin"></span>
      </div>
    </div>
  );
};

export default Loading;
