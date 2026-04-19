import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, ArrowLeft, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ToastContainer, toast } from 'react-toastify';

const CaptainLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const captain = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captain/login`,
        captain,
      );
      console.log("Captain login response:", res.data);
      const data = res.data;

      // Validate response
      if (!data.captain || !data.captain._id) {
        console.error("Invalid captain response:", data);
        alert("Login failed: Invalid response from server");
        return;
      }

      toast.success(res.data.message);

      setCaptain(data.captain);
      localStorage.setItem("token", data.token);
      localStorage.setItem("captain", JSON.stringify(data.captain));
      localStorage.setItem("userId", data.captain._id);
      localStorage.setItem("userRole", "captain");
      navigate("/captain-home");
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message || "Login failed";
      toast.error(errorMsg); // Error notification
    }
    setEmail("");
    setPassword("");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <ToastContainer position="top-center" autoClose={3000} />
      {/* <Navbar /> */}
      <div className="flex flex-1">
        {/* LEFT PANEL */}
        <div className="hidden lg:flex lg:w-1/2 text-white relative items-center justify-center border-r border-white/10 overflow-hidden">
          {/* Glow Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

          <div className="relative z-10 text-center px-12">
            <Link to="/" className="inline-flex items-center gap-3 mb-8">
              <Navigation className="h-10 w-10 text-blue-400" />
              <span className="text-3xl font-bold">SwiftRoute</span>
            </Link>

            <h2 className="text-4xl font-bold mb-4">
              Welcome Back, <span className="text-blue-400">Captain</span>
            </h2>

            <p className="text-gray-400 text-lg max-w-sm mx-auto">
              Get back on the road. Start earning with every ride you take.
            </p>

            <div className="mt-10 space-y-4 text-left max-w-xs mx-auto text-gray-400">
              <p>✔ Flexible working hours</p>
              <p>✔ Consistent ride demand</p>
              <p>✔ Weekly payouts</p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full lg:w-1/2 flex items-center text-white justify-center px-6 sm:px-10">
          <div className="w-full max-w-md">
            {/* Back */}
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="text-sm">Back to home</span>
            </Link>

            {/* CARD */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-xl">
              {/* Mobile Logo */}
              <div className="flex items-center gap-2 mb-6 lg:hidden">
                <Navigation className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">SwiftRoute</span>
              </div>

              {/* Title */}
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Captain Sign In</h1>
                <p className="text-gray-400 text-sm">
                  Access your driver dashboard
                </p>
              </div>

              {/* FORM */}
              <form
                onSubmit={(e) => {
                  handleLogin(e);
                }}
                className="space-y-5"
              >
                {/* EMAIL */}
                <input
                  required
                  type="email"
                  placeholder="Enter your email"
                  className={inputClass}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                {/* PASSWORD */}
                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={`${inputClass} pr-12`}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* BUTTON */}
                <button
                  type="submit"
                  className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
                >
                  Sign In as Captain
                </button>
              </form>

              {/* LINKS */}
              <div className="mt-6 text-center text-sm text-gray-400">
                Don’t have a captain account?{" "}
                <Link
                  to="/captain-signup"
                  className="text-blue-400 hover:underline"
                >
                  Register here
                </Link>
                <Link
                  to="/user-login"
                  className="block mt-3 text-gray-300 hover:text-white"
                >
                  Sign in as User →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default CaptainLogin;
