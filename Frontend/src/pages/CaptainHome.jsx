import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, LogOut, ChevronUp } from "lucide-react";
import axios from "axios";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LoginNavbar from "../components/LoginNavbar";
import { SocketDataContext } from "../context/SocketContext";
import { CaptainDataContext } from "../context/CaptainContext";
import LiveTracking from "../components/LiveTracking";

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const [captainDetailsPanel, setCaptainDetailsPanel] = useState(true);
  const [rideData, setRideData] = useState(null);

  const captainDetailsRef = useRef(null);
  const ridePopupRef = useRef(null);
  const confirmRidePopupRef = useRef(null);

  const { socket, connected } = useContext(SocketDataContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const userId = captain?._id || storedUserId;

    if (socket && connected && userId) {
      console.log("Emitting join event with userId:", userId, "user:", captain);
      socket.emit("join", { userType: "captain", userId });
    } else {
      console.log(
        "Socket join not emitted - socket:",
        !!socket,
        "connected:",
        connected,
        "userId:",
        userId,
      );
    }
  }, [socket, connected, captain]);

  // Listen for new ride requests
  // useEffect(() => {
  //   if (!socket) return;

  //   const handleNewRide = (data) => {
  //     console.log("New ride request received:", data);
  //     setRideData(data);
  //     setRidePopupPanel(true);
  //     setCaptainDetailsPanel(false);
  //   };

  //   socket.on("new-ride", handleNewRide);

  //   return () => {
  //     socket.off("new-ride", handleNewRide);
  //   };
  // }, [socket]);

  socket?.on("new-ride", (data) => {
    console.log("New ride request received:", data);
    setRideData(data);
    setRidePopupPanel(true);
    setCaptainDetailsPanel(false);
  });

  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ride/confirm`,
        {
          rideId: rideData.rideId,
          captainId: captain._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data?.message || error.message);
    }
  }

  // Location update interval
  useEffect(() => {
    if (!socket || !connected || !captain?._id) return;

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("update-location-captain", {
              userId: captain._id,
              userType: "captain",
              location: {
                ltd: latitude,
                lng: longitude,
              },
            });
            console.log("Location updated:", { latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          },
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    // Update location immediately
    updateLocation();

    // Set interval to update every 10 seconds
    const intervalId = setInterval(updateLocation, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [socket, connected, captain]);

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
    <div className="h-screen w-full relative bg-[#020617] bg-background text-foreground overflow-hidden">
      {/* MAP AREA */}
      <div className="absolute inset-0" style={{ touchAction: "none" }}>
        {/* <img
          className="h-full w-full object-cover opacity-60"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="map"
        /> */}
        <LiveTracking role="captain" />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" /> */}
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
          <span className="text-base font-medium text-foreground">
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
            confirmRidePanelSet={() => {
              setRidePopupPanel(false);
              setConfirmRidePopupPanel(true);
            }}
            confirmRide={confirmRide}
            rideData={rideData}
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
            ride={rideData}
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
          className="glass rounded-lg px-3 py-2 text-base cursor-pointer font-medium text-foreground hover:bg-secondary transition"
        >
          <ChevronUp className=" inline mr-1" size={22} />
          Test Ride
        </button>
      </div>
    </div>
  );
};

export default CaptainHome;
