import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useRole from "../../hooks/useRole"; // ✅ import your hook

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { role, roleLoading } = useRole(); // ✅ get role & loading
  const navigate = useNavigate();
  const axios = useAxios();

  const [stats, setStats] = useState({
    totalOrders: 0,
    paidOrders: 0,
    totalSpent: 0,
    wishlistCount: 0,
    totalReviews: 0,
    avgRating: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email || !user?.uid) return;

    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/user/stats", {
          params: { email: user.email, userId: user.uid },
        });
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch user stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user, axios]);

  // Show loading until role is fetched
  if (!user || roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-16 px-4">
      <title>BookCourier | My Profile Info</title>

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/3 justify-center bg-gradient-to-b from-emerald-500 to-emerald-600 text-white flex flex-col items-center p-8">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <img
              src={user?.photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{user?.displayName || "No Name"}</h2>
          <p className="text-sm opacity-80 mb-2">{user?.email || "No Email"}</p>
          <p className="text-sm opacity-80 mb-6 capitalize badge badge-accent px-3 py-1 rounded-full text-black">
            <span className="font-bold">Role: </span>{role || "user"}
          </p>

          <button
            onClick={() => navigate("/update-profile")}
            className="px-6 py-2 bg-white text-emerald-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            Edit Profile
          </button>
        </div>

        {/* Main Content */}
        <div className="md:w-2/3 p-8">
          <h3 className="text-xl font-bold text-gray-700 mb-6">Profile Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Full Name</p>
              <p className="text-gray-800 font-medium">{user?.displayName || "No Name"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Email Address</p>
              <p className="text-gray-800 font-medium">{user?.email || "No Email"}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Joined</p>
              <p className="text-gray-800 font-medium">
                {stats?.joinedAt
                  ? new Date(stats.joinedAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="text-gray-500 text-sm">Status</p>
              <p className="text-gray-800 font-medium">Active</p>
            </div>
          </div>

          {/* Stats Section */}
          <h3 className="text-xl font-bold text-gray-700 mt-8 mb-4">Account Stats</h3>
          {loading ? (
            <p>Loading stats...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Orders</p>
                <p className="text-gray-800 font-bold text-2xl">{stats.totalOrders}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Wishlist</p>
                <p className="text-gray-800 font-bold text-2xl">{stats.wishlistCount}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Reviews</p>
                <p className="text-gray-800 font-bold text-2xl">{stats.totalReviews}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Avg Rating</p>
                <p className="text-gray-800 font-bold text-2xl">{stats.avgRating}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Paid Orders</p>
                <p className="text-gray-800 font-bold text-2xl">{stats.paidOrders}</p>
              </div>
              <div className="bg-emerald-50 p-4 rounded-lg text-center shadow-sm">
                <p className="text-gray-500 text-sm">Total Spent</p>
                <p className="text-gray-800 font-bold text-2xl">${stats.totalSpent}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
