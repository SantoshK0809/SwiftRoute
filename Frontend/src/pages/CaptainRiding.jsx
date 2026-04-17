import React, { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";
import { Navigation, LogOut } from "lucide-react";
import FinishRide from "../components/FinishRide";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const [completeRidePanel, setCompleteRidePanel] = useState(true);
  const finishRidePanelRef = useRef(null);
  const completeRideRef = useRef(null);

  const location = useLocation();
  const rideData = location.state?.ride;

  useGSAP(
    function () {
      if (finishRidePanel) {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(finishRidePanelRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [finishRidePanel],
  );

  useGSAP(
    function () {
      if (completeRidePanel) {
        gsap.to(completeRideRef.current, {
          transform: "translateY(0)",
        });
      } else {
        gsap.to(completeRideRef.current, {
          transform: "translateY(100%)",
        });
      }
    },
    [completeRidePanel],
  );

  return (
    <div className="h-screen relative  text-white overflow-hidden">
      {/* MAP */}
      <div className="absolute inset-0 z-0" style={{ touchAction: "none" }}>
        <LiveTracking ride={rideData} role="captain" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background"></div> */}
      </div>

      {/* TOP BAR */}
      <div className="absolute top-4 left-0 right-0 z-20 px-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
            <Navigation className="text-blue-400" size={18} />
            <span className="text-sm font-semibold">Captain Mode</span>
          </div>

          <Link
            to="/captain-home"
            className="h-10 w-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
          >
            <LogOut size={18} />
          </Link>
        </div>
      </div>

      {/* BOTTOM ACTION BAR */}
      <div ref={completeRideRef}
        className="absolute bottom-0 w-full px-4 pb-4 z-20"
        onClick={() => setFinishRidePanel(true)}
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4">
          {/* HANDLE */}
          <div className="w-10 h-1 bg-white/20 mx-auto mb-3 rounded-full"></div>

          <div className="flex items-center justify-between">
            {/* DISTANCE */}
            <div>
              <p className="text-xs text-gray-400">Distance to drop</p>
              <h4 className="text-lg text-gray-500 font-semibold">{rideData?.distance || "4 KM"} away</h4>
            </div>

            {/* BUTTON */}
            <button
              onClick={() => {
                setFinishRidePanel(true);
                setCompleteRidePanel(false);
              }}
              className="bg-blue-500 cursor-pointer hover:bg-blue-600 px-5 py-2.5 rounded-xl font-semibold text-sm transition"
            >
              Complete Ride
            </button>
          </div>
        </div>
      </div>

      {/* FINISH RIDE PANEL */}
      <div
        ref={finishRidePanelRef}
        className="fixed bottom-0 w-full z-30 px-4 pb-4 translate-y-full"
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* <FinishRide ride={rideData} setFinishRidePanel={setFinishRidePanel} /> */}
          <FinishRide
            ride={rideData}
            setFinishRidePanel={setFinishRidePanel}
            setCompleteRidePanel={setCompleteRidePanel}
          />
        </div>
      </div>
    </div>
  );
};

export default CaptainRiding;
