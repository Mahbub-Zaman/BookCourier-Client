import React, { useState } from "react";
import { FaClipboardList, FaHome, FaMotorcycle, FaRegCreditCard, FaTasks, FaUserPlus, FaUsers } from "react-icons/fa";
import { Link, NavLink, Outlet } from "react-router";
import useRole from "../hooks/useRole";
import { FaBookMedical } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { FaBoxArchive } from "react-icons/fa6";
import { ImBooks, ImCart } from "react-icons/im";
import { MdOutlinePayments } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { TbWindowMinimize } from "react-icons/tb";
import { TbBrowserMaximize } from "react-icons/tb";

const DashboardLayout = () => {
  const { role } = useRole();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          collapsed ? "w-16" : "w-64"
        } bg-base-200 flex flex-col transition-all duration-300 h-screen`}
      >
        {/* Scrollable Menu */}
        <div className="flex-1 bg-[#c7ead1] overflow-y-auto">
          <ul className="menu p-2">
            {/* Logo */}
            <li>
              <Link to="/">
                <img
                  src="/logo.png"
                  alt="logo"
                  className={`${collapsed && "Home"}`}
                />
              </Link>
            </li>
            
            <li className="items-center">
              {/* Theme toggle */}
                <button
                onClick={toggleTheme}
                className="relative w-9 h-9 rounded-full overflow-hidden shadow-inner bg-gray-200 dark:bg-gray-700 transition-colors duration-500 mb-1 mt-1"
                title="Toggle Light/Dark"
                >
                {/* Image wrapper for centering */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {/* Light theme logo */}
                    <img
                    src="/light.png"
                    alt="Light Theme"
                    className={`transition-transform duration-500 ${
                        theme === "light" ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    } w-6 h-6`}
                    />

                    {/* Dark theme logo */}
                    <img
                    src="/dark.png"
                    alt="Dark Theme"
                    className={`absolute transition-transform duration-500 ${
                        theme === "dark" ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0"
                    } w-6 h-6`}
                    />
                </div>
                </button>
            </li>

            {/* Common Links */}
            <li className="text-[18px] font-semibold">
              <NavLink to="/dashboard" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                <FaHome /> {!collapsed && "Home"}
              </NavLink>
            </li>
            <li className="text-[18px] font-semibold">
              <NavLink to="/dashboard/profile" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                <BsPersonCircle /> {!collapsed && "My Profile"}
              </NavLink>
            </li>
            

            {/* ===== User LINKS ===== */}
            {role === "user" && (
              <>
                <li className="mt-2 text-xs text-center text-black">  
                  {!collapsed && "------- USER AREA -------"}
                </li>

                <li className="text-[18px] font-semibold">
              <NavLink to="/dashboard/my-orders" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                <ImCart /> {!collapsed && "My Orders"}
              </NavLink>
            </li>
            <li className="text-[18px] font-semibold">
              <NavLink to="/dashboard/wishlist" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                <FaClipboardList /> {!collapsed && "My Wishlist"}
              </NavLink>
            </li>
            <li className="text-[18px] font-semibold">
              <NavLink to="/dashboard/payment-history" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                <FaRegCreditCard /> {!collapsed && "Payment Invoices"}
              </NavLink>
            </li>
              </>
            )}
            

            {/* ===== LIBRARIAN LINKS ===== */}
            {role === "librarian" && (
              <>
                <li className="mt-2 text-xs text-center text-black">
                  {!collapsed && "------- LIBRARIAN AREA -------"}
                </li>

                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/add-book" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <FaBookMedical /> {!collapsed && "Add Book"}
                  </NavLink>
                </li>
                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/my-books" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <GiBookCover /> {!collapsed && "My Books"}
                  </NavLink>
                </li>
                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/orders" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <FaBoxArchive /> {!collapsed && "Orders"}
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink to="/dashboard/assigned-deliveries" className="flex gap-3 items-center">
                    <FaTasks /> {!collapsed && "Assigned Deliveries"}
                  </NavLink>
                </li> */}

                {/* <li>
                  <NavLink to="/dashboard/completed-deliveries" className="flex gap-3 items-center">
                    <SiGoogletasks /> {!collapsed && "Completed Deliveries"}
                  </NavLink>
                </li> */}
              </>
            )}

            {/* ===== ADMIN LINKS ===== */}
            {role === "admin" && (
              <>
                <li className="mt-2 mb-2 text-xs text-center text-black">
                  {!collapsed && "------- ADMIN AREA -------"}
                </li>

                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/all-users" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <FaUsers /> {!collapsed && "All Users"}
                  </NavLink>
                </li>
                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/manage-books" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <ImBooks /> {!collapsed && "Manage Books"}
                  </NavLink>
                </li>
                <li className="text-[18px] font-semibold">
                  <NavLink to="/dashboard/transactions" className="flex items-center gap-3 px-2 py-2 rounded hover:bg-gray-300">
                    <MdOutlinePayments /> {!collapsed && "Transactions"}
                  </NavLink>
                </li>

                {/* <li>
                  <NavLink to="/dashboard/add-book" className="flex gap-3 items-center">
                    <FaBookMedical /> {!collapsed && "Add Book"}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/manage-books" className="flex gap-3 items-center">
                    <ImBooks /> {!collapsed && "Manage Books"}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/orders" className="flex gap-3 items-center">
                    <FaBoxArchive /> {!collapsed && "Orders"}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/transactions" className="flex gap-3 items-center">
                    <MdOutlinePayments /> {!collapsed && "Transactions"}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/users-management" className="flex gap-3 items-center">
                    <FaUsers /> {!collapsed && "Users Management"}
                  </NavLink>
                </li>

                <li>
                  <NavLink to="/dashboard/approve-librarian" className="flex gap-3 items-center">
                    <FaUserPlus /> {!collapsed && "Approve Librarian"}
                  </NavLink>
                </li> */}

              </>
            )}
          </ul>
        </div>

        {/* Collapse Button */}
        <div className="p-2 border-t bg-[#90c09d] border-gray-300 flex-shrink-0 flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-full flex items-center justify-center p-3 rounded hover:bg-gray-700 hover:text-white transition-all duration-300 hover:scale-105"
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {/* Maximize Icon */}
            <span
              className={`text-2xl inline-block transition-all duration-500
                ${collapsed ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-0 rotate-90"}
              `}
            >
              <TbBrowserMaximize />
            </span>

            {/* Minimize Icon */}
            <span
              className={`text-3xl inline-block transition-all duration-500 absolute
                ${collapsed ? "opacity-0 scale-0 -rotate-90" : "opacity-100 scale-100 rotate-0"}
              `}
            >
              <TbWindowMinimize />
            </span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto h-screen p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;
