import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import useAxios from "../../hooks/useAxios";
import useRole from "../../hooks/useRole";
import { 
  FaUserCircle, FaBook, FaShoppingCart, FaCreditCard, FaHeart, FaClipboardList, FaBoxOpen, FaTruck, FaCheck, FaExclamationTriangle 
} from "react-icons/fa";

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole();
  const axios = useAxios();

  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const roleColor =
    role === "admin"
      ? "text-green-400"
      : role === "librarian"
      ? "text-blue-400"
      : "text-purple-400";

  useEffect(() => {
    if (!user?.email || !user?.uid) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        // General user stats
        const res = await axios.get("/user/stats", {
          params: { email: user.email, userId: user.uid },
        });

        let statsData = { ...res.data };

        // Librarian-specific stats
        if (role === "librarian") {
          const booksRes = await axios.get("/librarian/books", { params: { email: user.email } });
          const ordersRes = await axios.get("/librarian/orders", { params: { email: user.email } });

          const books = booksRes.data?.books || booksRes.data || [];
          const totalBooksAdded = books.length;

          const publishedBooks = books.filter(
            (b) => b?.status?.toLowerCase() === "publish"
          ).length;

          const unpublishedBooks = totalBooksAdded - publishedBooks;

          const orders = ordersRes.data || [];
          const totalLibrarianOrders = orders.length;
          const pendingOrders = orders.filter(o => o?.Orderstatus?.toLowerCase() === "pending").length;
          const shippedOrders = orders.filter(o => o?.Orderstatus?.toLowerCase() === "shipped").length;
          const deliveredOrders = orders.filter(o => o?.Orderstatus?.toLowerCase() === "delivered").length;

          statsData = {
            ...statsData,
            totalBooksAdded,
            totalLibrarianOrders,
            pendingOrders,
            shippedOrders,
            deliveredOrders,
            publishedBooks,
            unpublishedBooks,
          };
        }

        setStats(statsData);
      } catch (err) {
        console.error("Failed to fetch user/librarian stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, role, axios]);

  if (!user || roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const pendingPayment = (stats.totalOrders || 0) - (stats.paidOrders || 0);

  const statsArray = [
    { title: "Books Ordered", value: stats.totalOrders || 0, icon: <FaShoppingCart />, bgColor: "bg-emerald-500", iconBg: "bg-emerald-100 text-emerald-600" },
    { title: "Wishlist", value: stats.wishlistCount || 0, icon: <FaHeart />, bgColor: "bg-pink-500", iconBg: "bg-pink-100 text-pink-600" },
    { title: "Payments", value: `$${stats.totalSpent || 0}`, icon: <FaCreditCard />, bgColor: "bg-yellow-500", iconBg: "bg-yellow-100 text-yellow-600" },
    { title: "Reviews", value: stats.totalReviews || 0, icon: <FaUserCircle />, bgColor: "bg-blue-500", iconBg: "bg-blue-100 text-blue-600" },
    { title: "Avg Rating", value: Number(stats.avgRating || 0).toFixed(1), icon: <FaUserCircle />, bgColor: "bg-indigo-500", iconBg: "bg-indigo-100 text-indigo-600" },
    { title: "Paid Orders", value: stats.paidOrders || 0, icon: <FaCreditCard />, bgColor: "bg-emerald-600", iconBg: "bg-emerald-200 text-emerald-700" },
    { title: "Pending Payment", value: pendingPayment, icon: <FaExclamationTriangle />, bgColor: "bg-red-500", iconBg: "bg-red-100 text-red-600" },
  ];

  const librarianStatsArray = role === "librarian" ? [
    { title: "Books Added", value: stats.totalBooksAdded || 0, icon: <FaBook />, bgColor: "bg-purple-500", iconBg: "bg-purple-100 text-purple-600" },
    { title: "Published Books", value: stats.publishedBooks || 0, icon: <FaBook />, bgColor: "bg-green-500", iconBg: "bg-green-100 text-green-600" },
    { title: "Unpublished Books", value: stats.unpublishedBooks || 0, icon: <FaBook />, bgColor: "bg-red-500", iconBg: "bg-red-100 text-red-600" },
    { title: "Orders Received", value: stats.totalLibrarianOrders || 0, icon: <FaClipboardList />, bgColor: "bg-blue-500", iconBg: "bg-blue-100 text-blue-600" },
    { title: "Pending Orders", value: stats.pendingOrders || 0, icon: <FaBoxOpen />, bgColor: "bg-yellow-500", iconBg: "bg-yellow-100 text-yellow-600" },
    { title: "Shipped Orders", value: stats.shippedOrders || 0, icon: <FaTruck />, bgColor: "bg-orange-500", iconBg: "bg-orange-100 text-orange-600" },
    { title: "Delivered Orders", value: stats.deliveredOrders || 0, icon: <FaCheck />, bgColor: "bg-green-500", iconBg: "bg-green-100 text-green-600" },
  ] : [];

  const actionsArray = [
    { title: "Browse Books", icon: <FaBook />, bgColor: "bg-purple-500 hover:bg-purple-600", link: "/books" },
    { title: "Orders", icon: <FaBook />, bgColor: "bg-blue-500 hover:bg-blue-600", link: "/dashboard/my-orders" },
    { title: "Wishlist", icon: <FaHeart />, bgColor: "bg-pink-500 hover:bg-pink-600", link: "/dashboard/wishlist" },
    { title: "Payments", icon: <FaCreditCard />, bgColor: "bg-yellow-500 hover:bg-yellow-600", link: "/dashboard/payment-history" },
    { title: "Edit Profile", icon: <FaUserCircle />, bgColor: "bg-green-500 hover:bg-green-600", link: "/dashboard/update-profile" },
  ];

  return (
    <div className="min-h-screen whitebg px-4 md:px-6 py-12">
      <title>BookCourier | Dashboard</title>
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Welcome / Hero */}
        <div className="text-center bg-[var(--color-bg)] rounded-2xl p-8 shadow-md space-y-4">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Welcome back, <span className={`ml-2 ${roleColor}`}>{user.displayName || "User"}</span>
          </h1>
          <p className="description text-base sm:text-lg md:text-lg max-w-3xl mx-auto">
            Manage your profile, books, wishlist, orders, payments, and reviews from a single place. Your dashboard gives you full control with a professional interface.
          </p>
        </div>

        {/* User Stats */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-8">Your Stats</h2>
          {loading ? (
            <p className="text-center text-gray-400">Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statsArray.map((stat) => (
                <div
                  key={stat.title}
                  className={`${stat.bgColor} flex items-center p-6 rounded-2xl shadow-md hover:shadow-xl transition`}
                >
                  <div className={`w-14 h-14 flex items-center justify-center rounded-full mr-6 ${stat.iconBg} text-2xl`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-white uppercase text-sm font-semibold">{stat.title}</p>
                    <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Librarian Stats */}
        {role === "librarian" && (
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-center mb-8">Librarian Stats</h2>
            {loading ? (
              <p className="text-center text-gray-400">Loading stats...</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {librarianStatsArray.map((stat) => (
                  <div
                    key={stat.title}
                    className={`${stat.bgColor} flex items-center p-6 rounded-2xl shadow-md hover:shadow-xl transition`}
                  >
                    <div className={`w-14 h-14 flex items-center justify-center rounded-full mr-6 ${stat.iconBg} text-2xl`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-white uppercase text-sm font-semibold">{stat.title}</p>
                      <p className="text-white text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-3xl font-semibold text-center mb-8">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {actionsArray.map((action) => (
              <Link
                key={action.title}
                to={action.link}
                className={`p-6 rounded-2xl border ${action.bgColor} transition-all text-white text-center flex flex-col items-center`}
              >
                <div className="text-2xl mb-2">{action.icon}</div>
                <span>{action.title}</span>
              </Link>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardHome;
