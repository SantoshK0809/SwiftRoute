import React from "react";
import { MapPin, Navigation, CreditCard, ChevronDown } from "lucide-react";

const ConfirmRide = (props) => {
  return (
    <div className="text-white">
      {/* HANDLE */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-1 bg-white/20 rounded-full"></div>
      </div>
      <h4
        onClick={() => {
          props.setConfirmRidePanel(false);
        }}
        className="cursor-pointer p-4"
      >
        <ChevronDown className="text-white" size={22} />
      </h4>
      {/* TITLE */}
      <h3
        onClick={() => {
          props.setVehiclePanel(false);
        }}
        className="text-xl sm:text-2xl cursor-pointer font-semibold mb-5 text-center"
      >
        Confirm your Ride
      </h3>

      {/* VEHICLE IMAGE */}
      <div className="flex justify-center">
        <img
          className="h-20 object-contain"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />
      </div>

      {/* DETAILS */}
      <div className="w-full mt-6 space-y-3">
        {/* PICKUP */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <MapPin className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold text-medium">Pickup</h4>
            <p className="text-xs text-white">{props.pickup}</p>
          </div>
        </div>

        {/* DESTINATION */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <Navigation className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">Destination</h4>
            <p className="text-xs text-white">{props.destination}</p>
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <CreditCard className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">₹{props.fare[props.vehicleType] || 0}</h4>
            <p className="text-xs text-white">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <button
        onClick={() => {
          props.setLookingForDriverPanel(true);
          props.setConfirmRidePanel(false);
          props.createRide();
        }}
        className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition"
      >
        Confirm Ride
      </button>
    </div>
  );
};

export default ConfirmRide;
