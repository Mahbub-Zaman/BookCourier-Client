import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import toast from 'react-hot-toast';
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { AiTwotoneDashboard } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { LiaUserEditSolid } from "react-icons/lia";

const NavBar = () => {
  const { user, logOut } = useAuth();
  const { role, roleLoading } = useRole();
  const navigate = useNavigate();

  // Theme toggle state
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const handleLogout = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
      navigate('/');
    } catch (error) {
      console.error(error);
      toast.error("Logout failed");
    }
  };

  const links = (
    <>
      <li><NavLink to="/" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700"}>Home</NavLink></li>
      <li><NavLink to="/books" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700"}>Books</NavLink></li>
      <li><NavLink to="/coverage" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700"}>Coverage</NavLink></li>
      {user && <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700"}>Dashboard</NavLink></li>}
      <li><NavLink to="/faq" className={({ isActive }) => isActive ? "text-primary font-bold" : "text-gray-700"}>FAQ</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm">
      {/* Left - Logo and Mobile Menu */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {links}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost flex items-center gap-2 text-xl text-primary">
          <img src="/logo.png" alt="Logo" className="w-8 h-8" />
          BookCourier
        </Link>
      </div>

      {/* Center - Menu Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{links}</ul>
      </div>

      {/* Right - Theme & User */}
      <div className="navbar-end flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className="relative w-10 h-10 rounded-full overflow-hidden shadow-inner bg-gray-200 dark:bg-gray-700 transition-colors duration-500"
          title="Toggle Light/Dark"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/light.png"
              alt="Light Theme"
              className={`transition-transform duration-500 ${theme === "light" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} w-6 h-6`}
            />
            <img
              src="/dark.png"
              alt="Dark Theme"
              className={`absolute transition-transform duration-500 ${theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"} w-6 h-6`}
            />
          </div>
        </button>

        {user ? (
          <>
            {/* User Info - Name & Role */}
            <div className="hidden lg:flex flex-col items-end mr-3">
              <span className="text-sm font-semibold">{user.displayName || 'User'}</span>
              {roleLoading ? (
                <span className="text-xs text-gray-500">Loading role...</span>
              ) : (
                <span className="text-xs text-gray-500 capitalize">{role || 'user'}</span>
              )}
            </div>

            {/* Avatar Dropdown */}
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img alt="User Avatar" src={user.photoURL || "./Avatar.jpeg"} title={user.displayName || user.email} />
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-green-50 rounded-box z-50 mt-3 w-64 p-2 shadow-lg">
                <li className="menu-title">
                  <div className="flex flex-col gap-1 px-2 py-2">
                      <span className="font-bold text-base">{user.displayName || 'User'}</span>
                      <span className="text-xs text-gray-600">{user.email}</span> {/* email only here */}
                    </div>
                </li>
                <div className="divider my-0"></div>
                <li><NavLink to="/dashboard"><AiTwotoneDashboard />Dashboard</NavLink></li>
                <li><NavLink to="/profile"><CgProfile />My Profile</NavLink></li>
                <li><NavLink to="/update-profile"><LiaUserEditSolid />Update Profile</NavLink></li>
                <div className="divider my-0"></div>
                <button onClick={handleLogout} className="btn btn-error btn-sm mt-1 ml-2 h-8 w-auto text-[15px] px-4 flex items-center gap-2">
                  <FiLogOut /> Logout
                </button>
              </ul>
            </div>
          </>
        ) : (
          <Link to="/login">
            <button className="btn btn-primary btn-sm ml-2 h-10 w-auto text-[15px] px-4 flex items-center gap-2">
              <FiLogIn /> Login
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default NavBar;
