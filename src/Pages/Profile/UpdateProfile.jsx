import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import {
  updateEmail,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useContext(AuthContext); // user is Firebase user
  const navigate = useNavigate();

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName || "");
      setEmail(user.email || "");
      setPhotoURL(user.photoURL || "");
    }
  }, [user]);

  // Reauthenticate using the user object from context
  const reauthenticateUser = async (password) => {
    if (!password) throw new Error("Current password is required!");
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential); // <-- use `user` directly
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not loaded yet!");

    setLoading(true);
    try {
      // Update display name & photo
      await updateUserProfile({ displayName, photoURL });

      // Update email
      if (email !== user.email) {
        await reauthenticateUser(currentPassword);
        await updateEmail(user, email); // <-- use `user` directly
      }

      // Update password
      if (password) {
        await reauthenticateUser(currentPassword);
        await updatePassword(user, password); // <-- use `user` directly
      }

      toast.success("✅ Profile updated successfully!");
      setPassword("");
      setCurrentPassword("");
      setTimeout(() => navigate("/dashboard/profile"), 1500);
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen whitebg flex justify-center items-start py-16 px-4">
      <title>BookCourier | Update Profile</title>
      <Toaster position="top-right" />

      <div className="w-full max-w-5xl graybg rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="md:w-1/3 bg-gradient-to-b from-emerald-500 to-emerald-600 text-white flex flex-col items-center p-8">
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
            onClick={() => navigate("/dashboard/profile")}
            className="px-6 py-2 bg-white text-emerald-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition duration-300"
          >
            Back to Profile
          </button>
        </div>

        {/* Form */}
        <div className="md:w-2/3 p-8 flex flex-col justify-center space-y-6">
          <h2 className="text-2xl font-bold text-secondary mb-4 border-b pb-2">
            Edit Profile
          </h2>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label className="block text-sm font-medium description mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium description mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <label className="block text-sm font-medium description mb-1">
                Profile Photo URL
              </label>
              <input
                type="text"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            {/* Current Password */}
            <div className="relative">
              <label className="block text-sm font-medium description mb-1">
                Current Password (required for email/password)
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            {/* New Password */}
            <div className="relative">
              <label className="block text-sm font-medium description mb-1">
                New Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
              <div
                className="absolute right-3 top-[36px] cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 flex justify-center items-center gap-2"
            >
              {loading && (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
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
