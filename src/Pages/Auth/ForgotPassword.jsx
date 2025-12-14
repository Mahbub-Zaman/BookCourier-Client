import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const ForgotPassword = () => {
  const { resetPassword } = useAuth();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // ✅ Pre-fill email if it was passed via state (from Login page)
  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      await resetPassword(email);
      setMessage("✅ Password reset email sent! Please check your Gmail.");
      // Redirect user to Gmail after 1 seconds
      setTimeout(() => {
        window.open("https://mail.google.com", "_blank");
      }, 1000);
    } catch (err) {
      console.error("Error sending reset email:", err);
      if (err.code === "auth/user-not-found") {
        setError("No account found with this email.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address.");
      } else {
        setError("Failed to send reset email. Try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white shadow-md rounded-lg p-8 w-96">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Reset Password
        </h1>

        <form onSubmit={handleResetPassword}>
          {/* Email Field */}
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
              required
            />
          </div>

          {/* Reset Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 rounded-md transition-colors duration-300"
          >
            Send Reset Link
          </button>

          {/* Messages */}
          {message && <p className="text-green-500 mt-3">{message}</p>}
          {error && <p className="text-red-500 mt-3">{error}</p>}
        </form>

        {/* Back to Login */}
        <p className="text-center mt-4 text-sm">
          Remember your password?{" "}
          <Link to="/login" className="text-purple-500 underline">
            Go back to Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
