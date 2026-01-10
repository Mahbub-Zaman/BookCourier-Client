import React, { useEffect, useState } from "react";
import { NavLink, Link, Outlet } from "react-router-dom";
import useRole from "../hooks/useRole";
import useAuth from "../hooks/useAuth";

import {
  FaHome,
  FaClipboardList,
  FaRegCreditCard,
  FaUsers,
} from "react-icons/fa";
import { ImCart, ImBooks } from "react-icons/im";
import { FaBookMedical } from "react-icons/fa";
import { GiBookCover } from "react-icons/gi";
import { FaBoxArchive } from "react-icons/fa6";
import { MdOutlinePayments } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import { TbBrowserMaximize, TbWindowMinimize } from "react-icons/tb";
import { VscGraph } from "react-icons/vsc";

const DashboardLayout = () => {
  const { role } = useRole();
  const { user, logOut } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  /* ================= Theme ================= */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme(theme === "light" ? "dark" : "light");

  const roleColor =
    role === "admin"
      ? "text-green-400"
      : role === "librarian"
      ? "text-blue-400"
      : "text-[#FCB700]";

  const handleLogout = async () => {
    await logOut();
  };

  
const SidebarItem = ({ to, icon, label, collapsed, end }) => (
  <li>
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-lg transition
        ${
          isActive
            ? "bg-primary/30 text-primary font-semibold"
            : "hover:bg-primary/20"
        }`
      }
    >
      <span className="text-lg">{icon}</span>
      {!collapsed && <span>{label}</span>}
    </NavLink>
  </li>
);

const MenuTitle = ({ title }) => (
  <li className="menu-title text-xs uppercase text-gray-500 px-3 mt-3">
    {title}
  </li>
);

  return (
    <div className="flex h-screen primary-bg">

      <aside
        className={`bg-primary/10 border-r flex flex-col transition-all duration-300
        ${collapsed ? "w-16" : "w-64"}`}
      >
        {/* Logo */}
        <Link
          to="/"
          className="border-b p-3 flex items-center gap-2"
        >
          <img src="/logo.png" className="w-10 h-10" />
          {!collapsed && (
            <span className="text-xl font-semibold text-primary">
              BookCourier
            </span>
          )}
        </Link>

        {/* Menu */}
        <ul className="menu flex-1 overflow-y-auto p-2 gap-1">

          {/* Common */}
          <SidebarItem
            to="/dashboard"
            icon={<FaHome />}
            label="Dashboard"
            collapsed={collapsed}
            end
          />
          <SidebarItem
            to="/dashboard/my-orders"
            icon={<ImCart />}
            label="My Orders"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/dashboard/wishlist"
            icon={<FaClipboardList />}
            label="Wishlist"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/dashboard/payment-history"
            icon={<FaRegCreditCard />}
            label="Payments"
            collapsed={collapsed}
          />
          <SidebarItem
            to="/dashboard/profile"
            icon={<BsPersonCircle />}
            label="Profile"
            collapsed={collapsed}
          />

          {/* USER */}
          {/* {role === "user" && (
            <>
              {!collapsed && <MenuTitle title="User Area" />}
              <SidebarItem
                to="/dashboard/my-orders"
                icon={<ImCart />}
                label="My Orders"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/wishlist"
                icon={<FaClipboardList />}
                label="Wishlist"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/payment-history"
                icon={<FaRegCreditCard />}
                label="Payments"
                collapsed={collapsed}
              />
            </>
          )} */}

          {/* LIBRARIAN */}
          {role === "librarian" && (
            <>
              {!collapsed && <MenuTitle title="Librarian Area" />}
              <SidebarItem
                to="/dashboard/add-book"
                icon={<FaBookMedical />}
                label="Add Book"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/my-books"
                icon={<GiBookCover />}
                label="My Books"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/orders"
                icon={<FaBoxArchive />}
                label="Orders"
                collapsed={collapsed}
              />
            </>
          )}

          {/* ADMIN */}
          {role === "admin" && (
            <>
              {!collapsed && <MenuTitle title="Admin Area" />}
              <SidebarItem
                to="/dashboard/stats"
                icon={<VscGraph />}
                label="Analytics"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/all-users"
                icon={<FaUsers />}
                label="All Users"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/manage-books"
                icon={<ImBooks />}
                label="Manage Books"
                collapsed={collapsed}
              />
              <SidebarItem
                to="/dashboard/transactions"
                icon={<MdOutlinePayments />}
                label="Transactions"
                collapsed={collapsed}
              />
            </>
          )}
        </ul>

        {/* Collapse Button */}
        <div className="p-2 border-t flex justify-center">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-10 h-10 rounded hover:bg-primary/20 flex items-center justify-center transition"
          >
            {collapsed ? (
              <TbBrowserMaximize size={22} />
            ) : (
              <TbWindowMinimize size={24} />
            )}
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col">

        <nav className="bg-primary/10 border-b h-[65px] px-4 py-2 flex items-center justify-between">

          <div className="w-1/3">
          <h1 className="text-xl font-semibold">Dashboard</h1></div>

          <div className="w-1/3 text-center hidden md:block">
            <span className="text-gray-500 mr-1">Welcome,</span>
            <span className={`font-semibold ${roleColor}`}>
              {user?.displayName || "User"}
            </span>
          </div>

          <div className="w-1/3 flex justify-end items-center gap-4">

            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full shadow-inner flex items-center justify-center"
            >
              <img
                src={theme === "light" ? "/light.png" : "/dark.png"}
                className="w-6 h-6"
              />
            </button>

            {/* Profile Menu */}
            {user && (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                  <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img
                      src={user.photoURL || "/Avatar.jpeg"}
                      alt="profile"
                    />
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-200 rounded-box mt-3 w-64 p-2 shadow-lg"
                >
                  <li className="menu-title">
                    <span className="font-bold">{user.displayName}</span>
                    <span className="text-xs text-gray-500">{user.email}</span>
                  </li>
                  <div className="divider my-0" />
                  <li>
                    <NavLink to="/dashboard/profile">
                      My Profile
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/update-profile">
                      Update Profile
                    </NavLink>
                  </li>
                  <div className="divider my-0" />
                  <li>
                    <button
                      onClick={handleLogout}
                      className="btn btn-error btn-sm w-full"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </nav>

        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

