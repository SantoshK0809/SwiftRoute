import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, LogOut, ChevronUp } from "lucide-react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoginNavbar from "../components/LoginNavbar";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true);

  const captainDetailsRef = useRef(null);
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  useGSAP(() => {
    if (captainDetailsPanel) {
      gsap.to(captainDetailsRef.current, {
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });
    } else {
      gsap.to(captainDetailsRef.current, {
        y: "100%",
        duration: 0.5,
        ease: "power2.out",
      });
    }
  }, [captainDetailsPanel]);

  return (
    <div className="h-screen w-full relative bg-background text-foreground overflow-hidden">
      {/* MAP AREA */}
      <div className="absolute inset-0">
        <img
          className="h-full w-full object-cover opacity-60"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />
      </div>

      {/* TOP BAR */}
      {/* <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-5 py-4">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Navigation className="h-5 w-5 text-primary" />
          </div>
          <span className="font-heading font-bold text-lg text-foreground">
            SwiftRoute
          </span>
        </div>
        <Link
          to="/"
          className="h-10 w-10 glass rounded-full flex items-center justify-center hover:bg-secondary transition"
        >
          <LogOut className="h-4 w-4 text-muted-foreground" />
        </Link>
      </div> */}
      <LoginNavbar />

      {/* Online Status Pill */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 z-20">
        <div className="glass rounded-full px-4 py-2 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-medium text-foreground">
            You're Online
          </span>
        </div>
      </div>

      {/* CAPTAIN DETAILS PANEL */}
      <div
        ref={captainDetailsRef}
        className="absolute bottom-0 left-0 right-0 z-20 px-4 pb-4 "
      >
        <div className="glass rounded-2xl p-5 shadow-xl max-w-xl mx-auto border-2 border-gray-300">
          {/* Drag handle */}
          <div className="w-12 h-1 bg-muted-foreground/20 rounded-full mx-auto mb-4" />
          <CaptainDetails setCaptainDetailsPanel={setCaptainDetailsPanel} />
        </div>
      </div>

      {/* RIDE POPUP */}
      <div
        ref={ridePopupRef}
        className={`fixed inset-x-0 bottom-0 z-30 transition-transform duration-300 ease-out ${
          ridePopupPanel ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="glass rounded-t-2xl px-5 py-6 max-w-xl mx-auto shadow-2xl border-t border-border">
          <RidePopUp
            setRidePopupPanel={setRidePopupPanel}
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setCaptainDetailsPanel={setCaptainDetailsPanel}
            confirmRide={() => {
              setRidePopupPanel(false);
              setConfirmRidePopupPanel(true);
            }}
          />
        </div>
      </div>

      {/* CONFIRM RIDE POPUP */}
      <div
        ref={confirmRidePopupRef}
        className={`fixed inset-0 z-40 transition-transform duration-300 ease-out ${
          confirmRidePopupPanel ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="h-full bg-background/95 backdrop-blur-xl px-5 py-6 max-w-xl mx-auto">
          <ConfirmRidePopUp
            setConfirmRidePopupPanel={setConfirmRidePopupPanel}
            setRidePopupPanel={setRidePopupPanel}
            setCaptainDetailsPanel={setCaptainDetailsPanel}
          />
        </div>
      </div>

      {/* DEV: Toggle buttons for testing popups */}
      <div className="absolute top-20 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => {
            setRidePopupPanel(true);
            // captainDetailsRef.current.style.display = 'none';
            // ridePopupRef.current.style.display = 'block';
            // confirmRidePopupRef.current.style.display = 'none';
            setCaptainDetailsPanel(false);
          }}
          className="glass rounded-lg px-3 py-2 text-xs font-medium text-foreground hover:bg-secondary transition"
        >
          <ChevronUp className="h-3 w-3 inline mr-1" />
          Test Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainHome;
