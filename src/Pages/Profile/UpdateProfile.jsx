import React, { useContext, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import { updateEmail, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const UpdateProfile = () => {
  const { user, updateUserProfile, auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ displayName, photoURL });
      if (email !== user.email) await updateEmail(auth.currentUser, email);
      if (password) await updatePassword(auth.currentUser, password);

      toast.success("✅ Profile updated successfully!");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start py-16 px-4">
      <title>BookCourier | Update Profile</title>
      <Toaster position="top-right" reverseOrder={false} />

      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar Preview */}
        <div className="md:w-1/3 justify-center bg-gradient-to-b from-emerald-500 to-emerald-600 text-white flex flex-col items-center p-8">
          <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-lg mb-4">
            <img
              src={photoURL || "https://via.placeholder.com/150"}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold mb-1">{displayName || "No Name"}</h2>
          <p className="text-sm opacity-80 mb-6">{email || "No Email"}</p>

          <button
            onClick={() => navigate("/profile")}
            className="px-6 py-2 bg-white text-emerald-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            Back to Profile
          </button>
        </div>

        {/* Edit Form */}
        <div className="md:w-2/3 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">Edit Profile</h2>
          <form onSubmit={handleUpdate} className="space-y-5">
            {/* Full Name */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <label className="text-gray-500 text-sm mb-1 block">Full Name</label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Email */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <label className="text-gray-500 text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Photo URL */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <label className="text-gray-500 text-sm mb-1 block">Profile Photo URL</label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                placeholder="Enter photo URL"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Password */}
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <label className="text-gray-500 text-sm mb-1 block">New Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-emerald-500 text-white font-semibold rounded hover:bg-emerald-600 transition flex justify-center items-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                </svg>
              )}
              {loading ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
