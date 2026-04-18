import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MapPin, CreditCard, Navigation } from "lucide-react";
import LoginNavbar from "../components/LoginNavbar";
import LiveTracking from "../components/LiveTracking";
import { SocketDataContext } from "../context/SocketContext";

const Riding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const { socket } = useContext(SocketDataContext);
  const navigate = useNavigate();

  socket.on("ride-ended", () => {
    navigate("/home");
  });

  return (
    <div className="h-screen w-full bg-[#020617] text-gray-700 relative overflow-hidden">
      {/* MAP */}
      <div className="h-screen relative" style={{ touchAction: "none" }}>
        <LiveTracking ride={ride} role="user" />
      </div>

      {/* HOME BUTTON */}
      
      <LoginNavbar />

      {/* BOTTOM PANEL */}
      <div className="absolute bottom-0 w-full px-4 pb-4">
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-5">
          {/* HANDLE */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>

          {/* DRIVER CARD */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-blue-400/20">
            <img
              className="h-16 object-contain"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt=""
            />

            <div className="text-right">
              <h2 className="text-sm font-semibold capitalize">
                {ride?.captainId?.fullname?.firstname}{" "}
                {ride?.captainId?.fullname?.lastname}
              </h2>
              <h4 className="text-lg font-bold tracking-wide">
                {ride?.captainId?.vehicle?.plate}
              </h4>
              <p className="text-xs text-gray-400 capitalize">
                {ride?.captainId?.vehicle?.vehicleType}
              </p>
            </div>
          </div>

          {/* TRIP DETAILS */}
          <div className="mt-5 space-y-3">
            {/* DESTINATION */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-blue-400/20">
              <MapPin className="text-blue-400 mt-1" size={18} />
              <div>
                <h4 className="text-sm font-semibold">Destination</h4>
                <p className="text-xs text-gray-400">{ride?.destination || "..."}</p>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-blue-400/20">
              <CreditCard className="text-blue-400 mt-1" size={18} />
              <div>
                <h4 className="text-sm font-semibold">₹{ride?.fare || "..."}</h4>
                <p className="text-xs text-gray-400">Cash Payment</p>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 py-3 rounded-xl font-semibold transition">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
