import React from "react";
import Loading from "./Loading";
import { MapPin, Navigation, CreditCard, ChevronDown } from "lucide-react";

const LookingForDriver = (props) => {
  return (
    <div className="text-gray-700">
      {/* HANDLE */}

      <div className="flex  justify-center mb-4">
        <div className="w-10 h-1 bg-white/20 rounded-full"></div>
      </div>
      
      <h4
        onClick={() => {
          props.setLookingForDriverPanel(false);
        }}
        className="cursor-pointer w-4 p-4"
      >
        <ChevronDown className="text-gray-700" size={22} />
      </h4>

      {/* TITLE */}
      <h3 className="text-xl sm:text-2xl font-semibold mb-2 text-center">
        Looking for a Driver
      </h3>

      <p className="text-xs text-gray-500 text-center mb-5">
        Connecting you with nearby drivers...
      </p>

      {/* LOADING ANIMATION */}

      <div className="flex items-center justify-center gap-2 mb-6">
        <span className="dot"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      {/* VEHICLE IMAGE */}
      <div className="flex justify-center">
        <img
          className="h-20 object-contain opacity-80"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
      </div>

      {/* DETAILS */}
      <div className="w-full mt-6 space-y-3">
        {/* PICKUP */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-blue-400/30">
          <MapPin className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">Pickup</h4>
            <p className="text-xs">{props.pickup}</p>
          </div>
        </div>

        {/* DESTINATION */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border  border-blue-400/30">
          <Navigation className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">Destination</h4>
            <p className="text-xs">{props.destination}</p>
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-blue-400/30">
          <CreditCard className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">₹{props.fare[props.vehicleType] || 0}</h4>
            <p className="text-xs">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LookingForDriver;
