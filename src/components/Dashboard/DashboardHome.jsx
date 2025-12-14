import React from "react";

const DashboardHome = () => {
  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center px-4 md:px-6 py-10">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Right Image Section (MOBILE FIRST) */}
        <div className="flex justify-center order-1 md:order-2">
          <img
            src="/dashboard.png"
            alt="Dashboard Illustration"
            className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-xl"
          />
        </div>

        {/* Left Section */}
        <div className="text-center md:text-left order-2 md:order-1">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary mb-4">
            Welcome to Your Dashboard
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mb-6">
            Manage your profile, books, orders, payments, and users all from a single place.
            Your dashboard gives you full control with a clean and easy-to-use interface.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center md:justify-start">
            <button className="btn btn-primary w-full sm:w-auto">Explore Features</button>
            <button className="btn btn-outline w-full sm:w-auto">View Profile</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
