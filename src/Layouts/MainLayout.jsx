import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  // Detect route changes
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800); // loader shows for 0.8s
    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      {/* Global Toast Notifications */}
      <Toaster position="top-right" />

      {/* Global Loader on Route Change */}
      {loading && <Loader />}

      <NavBar />
      <div className="min-h-screen">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
