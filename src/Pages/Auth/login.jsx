import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const { signInUser, signInWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      await signInUser(email, password);
      setSuccess(true);
      toast.success("✅ Login successful!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      toast.success("✅ Signed in with Google!");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <title>SkillSwap | LogIn</title>
      <Toaster position="top-right" reverseOrder={false} />
      <div>
        <h1 className="text-4xl font-bold text-primary mb-6 text-center">Welcome Back!</h1>
        <form onSubmit={handleLogin} className="bg-white shadow-md rounded-lg p-8 w-96">
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-400"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 pr-20 focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-2 px-2 py-1 bg-gray-100 rounded text-gray-600 hover:bg-gray-200 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <div className="mb-4 text-right">
            <Link to="/forgot-password" className="text-green-600 text-sm hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full btn-primary text-white font-semibold py-2 rounded-md transition-colors duration-300"
          >
            Login
          </button>

          {error && <p className="text-red-500 mt-3">{error}</p>}
          {success && <p className="text-green-500 mt-3">✅ Logged in successfully!</p>}

          <h3 className="text-center font-semibold mt-2 text-primary">or</h3>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="btn bg-white text-black border w-full flex items-center justify-center py-2 mt-2 gap-2"
          >
            <FcGoogle className="text-xl" /> {/* Google Icon */}
            Sign in with Google
          </button>
        </form>

        <div className="bg-white shadow-md rounded-lg p-4 w-96 mt-2 flex justify-center">
          <h3>
            New Here?{" "}
            <Link to="/signup" className="text-primary underline">
              Create an account
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Login;
