import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navigation, ArrowLeft, Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CaptainSignup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [capacity, setCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [captainData, setCaptainData] = useState({});

  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const newCaptain = {
      fullname: {
        firstname: firstName,
        lastname: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: color,
        plate: plate,
        capacity: capacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/captain/register`,
        newCaptain,
      );
      console.log(`Captain Data -> ${res.data}`);
      if (res.status === 201) {
        const data = res.data;
        localStorage.setItem("token", data.token);
        setCaptain(data.captain);
        navigate("/captain-login");
      }
    } catch (err) {
      console.log(err.response?.message);
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setColor("");
    setPlate("");
    setCapacity("");
    setVehicleType("");
  };

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex flex-col">
      <Navbar/>
      <div className="flex flex-1">
        {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 text-center text-white px-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <Navigation className="h-10 w-10 text-blue-400" />
            <span className="text-3xl font-bold">SwiftRoute</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Drive with <span className="text-blue-400">SwiftRoute</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-sm mx-auto">
            Earn on your schedule. Join as a captain and start driving today.
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto text-gray-400">
            <p>✔ Flexible earnings</p>
            <p>✔ Consistent ride demand</p>
            <p>✔ Simple onboarding process</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center lg:mt-24 mt-12 justify-center px-6 sm:px-10">
        <div className="w-full max-w-2xl">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          {/* CARD */}
          <div className="rounded-2xl bg-white/5 text-white backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-xl">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Navigation className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">SwiftRoute</span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Become a Captain</h1>
              <p className="text-gray-400 text-sm">
                Enter your details to start driving
              </p>
            </div>

            <form
              onSubmit={(e) => {
                handleSignup(e);
              }}
              className="flex flex-col gap-6"
            >
              {/* PERSONAL */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Personal Details</h3>

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

                <input
                  required
                  type="email"
                  placeholder="Email"
                  className={`${inputClass} mt-3`}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />

                <div className="relative">
                  <input
                    required
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className={`${inputClass} mt-3`}
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
              </div>

              {/* VEHICLE */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Vehicle Details</h3>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Vehicle Color"
                    className={inputClass}
                    value={color}
                    onChange={(e) => {
                      setColor(e.target.value);
                    }}
                  />
                  <input
                    required
                    type="text"
                    placeholder="Plate Number"
                    className={inputClass}
                    value={plate}
                    onChange={(e) => {
                      setPlate(e.target.value);
                    }}
                  />
                  <input
                    required
                    type="number"
                    placeholder="Capacity"
                    className={inputClass}
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                    }}
                  />

                  <select
                    required
                    className={inputClass}
                    value={vehicleType}
                    onChange={(e) => {
                      setVehicleType(e.target.value);
                    }}
                  >
                    <option className="bg-gray-400 text-white" value="">
                      Vehicle Type
                    </option>
                    <option className="bg-gray-600 text-white" value="car">
                      Car
                    </option>
                    <option className="bg-gray-600 text-white" value="auto">
                      Auto
                    </option>
                    <option
                      className="bg-gray-600 text-white"
                      value="motorcycle"
                    >
                      Motorcycle
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Register as Captain
              </button>
            </form>

            {/* LINKS */}
            <div className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/captain-login"
                className="text-blue-400 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/user-signup"
                className="block mt-3 text-gray-300 hover:text-white"
              >
                Sign up as User →
              </Link>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer/>
    </div>
  );
};

export default CaptainSignup;
