import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="w-24 h-24 border-8 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
