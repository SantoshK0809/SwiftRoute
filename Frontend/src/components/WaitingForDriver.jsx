import React from "react";
import { MapPin, Navigation, CreditCard, ChevronDown } from "lucide-react";

const WaitingForDriver = (props) => {
  return (
    <div className="text-white">
      {/* HANDLE */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-1 bg-white/20 rounded-full"></div>
      </div>

      <h4
        onClick={() => {
          props.setWaitingForDriverPanel(false);
        }}
        className="cursor-pointer w-4 p-4"
      >
        <ChevronDown className="text-white" size={22} />
      </h4>

      {/* DRIVER CARD */}
      <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
        <img
          className="h-12 object-contain"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="text-right">
          <h2 className="text-sm font-semibold capitalize">
            {props.ride?.captainId?.fullname.firstname}{" "}
            {props.ride?.captainId?.fullname.lastname}
          </h2>
          <h4 className="text-lg font-bold tracking-wide">
            {props.ride?.captainId?.vehicle?.plate}
          </h4>
          <p className="text-xs text-gray-400 capitalize">
            {props.ride?.captainId?.vehicle?.vehicleType}
          </p>

          {/* OTP (highlighted) */}
          <div className="mt-2 inline-block px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-400/30">
            <span className="text-lg font-bold tracking-widest text-blue-400">
              {props.ride?.otp}
            </span>
          </div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="w-full mt-6 space-y-3">
        {/* PICKUP */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <MapPin className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">Pickup</h4>
            <p className="text-xs text-gray-400">{props.ride?.pickup}</p>
          </div>
        </div>

        {/* DESTINATION */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <Navigation className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">Destination</h4>
            <p className="text-xs text-gray-400">{props.ride?.destination}</p>
          </div>
        </div>

        {/* PRICE */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
          <CreditCard className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-sm font-semibold">{props.ride?.fare}</h4>
            <p className="text-xs text-gray-400">Cash Payment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaitingForDriver;
