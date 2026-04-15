import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, ArrowLeft, Eye, EyeOff } from "lucide-react";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const UserSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState({});

  const { user, setUser } = useContext(UserDataContext);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/register`,
        newUser,
      );
      if (res.status === 201) {
        const data = res.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("userId", data.user._id);
        localStorage.setItem("userRole", "user");
        navigate("/user-login");
      }
    } catch (err) {
      console.log(err.response.data); // THIS is what you should read
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 text-white text-center px-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <Navigation className="h-10 w-10 text-blue-400" />
            <span className="text-3xl  font-bold">SwiftRoute</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Start Your <span className="text-blue-400">Journey</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-sm mx-auto">
            Join thousands of riders already moving smarter.
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto text-gray-400">
            <p>✔ Instant ride booking</p>
            <p>✔ Real-time tracking</p>
            <p>✔ Smart pricing — no surprises</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          {/* CARD */}
          <div className="rounded-2xl bg-white/5 text-white backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-xl">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Navigation className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">SwiftRoute</span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm">
                Fill in the details to get started
              </p>
            </div>

            {/* FORM */}
            <form onSubmit={handleSignup} className="space-y-5">
              {/* NAME */}
              <div className="flex gap-3">
                <input
                  required
                  type="text"
                  placeholder="First name"
                  className={inputClass}
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className={inputClass}
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                />
              </div>

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
                  placeholder="Create a password"
                  className={inputClass}
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
                Create Account
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/user-login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
              <Link
                to="/captain-signup"
                className="block mt-3 text-gray-300 hover:text-white"
              >
                Sign up as Captain →
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSignup;
