import React, { useState } from "react";
import {
  MapPin,
  Navigation as NavIcon,
  Banknote,
  ChevronDown,
  User,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ConfirmRidePopUp = ({
  setConfirmRidePopupPanel,
  setRidePopupPanel,
  setCaptainDetailsPanel,
  ride,
}) => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/ride/start-ride`,
        {
          params: {
            rideId: ride._id || ride.rideId,
            otp: otp,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate("/captain-riding", { state: { ride: ride } });
      }
    } catch (error) {
      console.log(error.response?.data?.message || "An error occurred");
    }
  };

  console.log("This is the ride data for captain -> ", ride);

  return (
    <div className="h-full flex flex-col">
      {/* Drag Handle */}
      <button
        onClick={() => {
          setConfirmRidePopupPanel(false);
          setRidePopupPanel(false);
          setCaptainDetailsPanel(true);
        }}
        className="mx-auto flex justify-center w-full py-2"
      >
        <ChevronDown className="h-6 w-6 text-muted-foreground" />
      </button>

      <h3 className="text-xl font-bold font-heading text-foreground mb-4">
        Confirm Ride to Start
      </h3>

      {/* Rider Info */}
      <div className="flex items-center justify-between glass rounded-xl p-4 border border-primary/20 mb-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
            <User className="h-5 w-5 text-muted-foreground" />
          </div>
          <h4 className="text-base font-semibold text-foreground capitalize">
            {ride?.userName}
          </h4>
        </div>
        <span className="text-sm font-medium text-muted-foreground">
          {ride?.distance}
        </span>
      </div>

      {/* Route Details */}
      <div className="space-y-0 flex-1">
        <div className="flex items-start gap-4 p-3 border-b border-border">
          <div className="mt-1 h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
            <MapPin className="h-4 w-4 text-green-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">Pickup</h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ride?.pickup}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-3 border-b border-border">
          <div className="mt-1 h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
            <NavIcon className="h-4 w-4 text-red-400" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              Destination
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">
              {ride?.destination}
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4 p-3">
          <div className="mt-1 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
            <Banknote className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground">
              ₹{ride?.fare}
            </h4>
            <p className="text-xs text-muted-foreground mt-0.5">Cash Payment</p>
          </div>
        </div>
      </div>

      {/* OTP & Actions */}
      <div className="mt-auto pt-4 space-y-3">
        <div className="relative">
          <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            maxLength={6}
            className="w-full bg-secondary border border-border rounded-xl pl-12 pr-4 py-3.5 text-base font-mono tracking-widest text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter OTP"
          />
        </div>
        <button
          onClick={submitHandler}
          className="w-full py-3.5 rounded-xl flex items-center justify-center font-semibold text-sm bg-green-500 text-white hover:bg-green-600 transition shadow-[0_0_20px_rgba(34,197,94,0.3)]"
        >
          Confirm & Start Ride
        </button>
        <button
          onClick={() => {
            setConfirmRidePopupPanel(false);
            setRidePopupPanel(false);
            setCaptainDetailsPanel(true);
          }}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-red-400 text-white hover:bg-red-500 transition border-2 border-red-400 active:border-red-700"
        >
          Cancel Ride
        </button>
      </div>
    </div>
  );
};

export default ConfirmRidePopUp;
