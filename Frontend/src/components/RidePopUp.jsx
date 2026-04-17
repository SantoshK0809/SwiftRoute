import React from "react";
import { MapPin, Navigation, Banknote, ChevronDown, User } from "lucide-react";

const RidePopUp = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  confirmRide,
  setCaptainDetailsPanel,
  rideData,
}) => {
  return (
    <div className="space-y-4 text-white">
      {/* HANDLE */}
      <div
        onClick={() => {
          setRidePopupPanel(false);
          setCaptainDetailsPanel(true);
        }}
        className="flex justify-center"
      >
        <ChevronDown className="h-6 w-6 text-gray-400" />
      </div>

      {/* TITLE */}
      <h3 className="text-lg sm:text-xl text-gray-600 font-bold text-center">
        New Ride Request
      </h3>

      {/* RIDER CARD */}
      <div
        className="flex items-center justify-between p-4 rounded-2xl 
                      bg-white/10  border border-blue-400/30"
      >
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center">
            <User className="h-5 w-5 text-blue-400" />
          </div>

          <h4 className="text-base text-gray-600 font-semibold">
            {rideData ? rideData.userName : "Santosh Kirtane"}
          </h4>
        </div>

        <span className="text-sm text-gray-500 font-medium">
          {rideData ? `${rideData.distance}` : "2.2 KM"}
        </span>
      </div>

      {/* ROUTE DETAILS */}
      <div className="space-y-3">
        {/* PICKUP */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5 border border-blue-400/30"
        >
          <MapPin className="text-green-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-600 font-semibold">Pickup</h4>
            <p className="text-sm text-gray-500">
              {rideData ? rideData.pickup : "562/11-A, Main Road"}
            </p>
          </div>
        </div>

        {/* DESTINATION */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5  border border-blue-400/30"
        >
          <Navigation className="text-red-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-600 font-semibold">
              Destination
            </h4>
            <p className="text-sm text-gray-500">
              {rideData ? rideData.destination : "Third Wave Coffee"}
            </p>
          </div>
        </div>

        {/* PRICE */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5  border border-blue-400/30"
        >
          <Banknote className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-600 font-semibold">
              ₹{rideData ? rideData.fare : "193.20"}
            </h4>
            <p className="text-sm text-gray-500">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* ACTIONS */}
      <div className="flex gap-3 pt-2">
        {/* IGNORE */}
        <button
          onClick={() => {
            setRidePopupPanel(false);
            setCaptainDetailsPanel(true);
          }}
          className="flex-1 py-3 rounded-xl text-gray-600 font-semibold text-base
                           bg-gray-300 border-2 border-white/10 
                           hover:bg-gray-400 transition active:border-gray-900"
        >
          Ignore
        </button>

        {/* ACCEPT */}
        <button
          onClick={() => {
            setRidePopupPanel(false);
            setConfirmRidePopupPanel(true);
            confirmRide();
          }}
          className="flex-1 py-3 rounded-xl font-semibold text-sm 
                           bg-blue-500 hover:bg-blue-600 transition"
        >
          Accept Ride
        </button>
      </div>
    </div>
  );
};

export default RidePopUp;
