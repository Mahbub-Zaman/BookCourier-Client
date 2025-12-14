import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

const App = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Only show loader for a short delay if navigation takes time
    const showLoader = setTimeout(() => setLoading(true), 100); // small delay before showing loader
    const hideLoader = setTimeout(() => setLoading(false), 600); // hide loader after page mounts

    return () => {
      clearTimeout(showLoader);
      clearTimeout(hideLoader);
    };
  }, [location]);

  return (
    <>
      {loading && <Loader />}
      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default App;
