import React from "react";
import {
  MapPin,
  Navigation,
  CreditCard,
  User,
  ChevronDown,
} from "lucide-react";
import { Link } from "react-router-dom";

const FinishRide = (props) => {
  return (
    <div className="text-white">
      {/* HANDLE */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-1 bg-white/20 rounded-full">
          <div
            onClick={() => {
              props.setFinishRidePanel(false);
              props.setCompleteRidePanel(true);
            }}
            className="flex cursor-pointer justify-center"
          >
            <ChevronDown className="h-6 w-6 text-gray-400" />
          </div>
        </div>
      </div>

      {/* TITLE */}
      <h3 className="text-xl sm:text-2xl text-gray-500 font-semibold mb-5 text-center">
        Finish this Ride
      </h3>

      {/* RIDER CARD */}
      <div
        className="flex items-center  justify-between p-4 rounded-2xl 
                      bg-white/10  border border-blue-400/30"
      >
        <div className="flex items-center gap-3">
          <img
            className="h-12 w-12 rounded-full object-cover border border-white/20"
            src="https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"
            alt=""
          />

          <div>
            <h4 className="text-base text-gray-500 font-semibold">
              Rider Name
            </h4>
            <p className="text-sm text-gray-400">Passenger</p>
          </div>
        </div>

        <span className="text-sm font-semibold text-gray-400">2.2 KM</span>
      </div>

      {/* DETAILS */}
      <div className="mt-5 space-y-3">
        {/* PICKUP */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5  border border-blue-400/30"
        >
          <MapPin className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-500 font-semibold">Pickup</h4>
            <p className="text-sm text-gray-400">Mantri Heights, Pune</p>
          </div>
        </div>

        {/* DESTINATION */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5  border border-blue-400/30"
        >
          <Navigation className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-500 font-semibold">
              Destination
            </h4>
            <p className="text-sm text-gray-400">Dagdusheth Mandir, Pune</p>
          </div>
        </div>

        {/* PAYMENT */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5 border border-blue-400/30"
        >
          <CreditCard className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-500 font-semibold">₹193</h4>
            <p className="text-sm text-gray-400">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <Link
        to={"/captain-home"}
        onClick={() => {
          props.setFinishRidePanel(false);
        }}
        className="flex items-center justify-center w-full mt-6 bg-blue-500 hover:bg-blue-600 
                   py-3 rounded-xl font-semibold transition"
      >
        Finish Ride
      </Link>
      <p className="text-center text-red-500 text-sm mt-4">
        Click on Finish Ride button to end the ride after completion of the
        payment
      </p>
    </div>
  );
};

export default FinishRide;
