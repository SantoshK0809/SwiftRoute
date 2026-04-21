import { useContext, useEffect, useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Navigation,
  MapPin,
  Search,
  Clock,
  Star,
  Car,
  Bike,
  Truck,
  ChevronRight,
  CarTaxiFront,
  ChevronDown,
} from "lucide-react";
import LocationSearchPanel from "../components/LocationSearchPanel";
import LoginNavbar from "../components/LoginNavbar";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import { SocketDataContext } from "../context/SocketContext";
import { Socket } from "socket.io-client";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking";

const Home = () => {
  const navigate = useNavigate();
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [fare, setFare] = useState({});

  const vehiclePanelRef = useRef(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const { socket, connected } = useContext(SocketDataContext);
  const { user } = useContext(UserDataContext);

  // useEffect(() => {
  //   const storedUserId = localStorage.getItem("userId");
  //   const userId = user?._id || storedUserId;

  //   if (socket && connected && userId) {
  //     console.log("Emitting join event with userId:", userId, "user:", user);
  //     socket.emit("join", { userType: "user", userId });
  //   } else {
  //     console.log(
  //       "Socket join not emitted - socket:",
  //       !!socket,
  //       "connected:",
  //       connected,
  //       "userId:",
  //       userId,
  //     );
  //   }
  // }, [socket, connected, user]);

   useEffect(() => {
      if (!socket || !connected || !user?._id) return;
  
      let watchId;
  
      const updateLocation = (position) => {
        const { latitude, longitude } = position.coords;
        socket.emit("join", {
          userId: user._id,
          userType: "user",
          location: {
            ltd: latitude,
            lng: longitude,
          },
        });
        console.log("Location updated:", { latitude, longitude });
      };
  
      const handleError = (error) => {
        console.error("Error getting location:", error);
      };
  
      if (navigator.geolocation) {
        watchId = navigator.geolocation.watchPosition(
          updateLocation,
          handleError,
          {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
  
      return () => {
        if (watchId) {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    }, [socket, connected, user]);
  
  useEffect(() => {
    socket.on("ride-confirmed", (data) => {
      console.log("Ride confirmed:", data);
      setRide(data);
      setWaitingForDriverPanel(true);
      setLookingForDriverPanel(false);
    });

    socket.on("ride-started", (data) => {
      console.log("Ride started:", data);
      setWaitingForDriverPanel(false);
      navigate("/riding", { state: { ride: data } });
    });
  }, [socket, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  const fetchSuggestions = async (address) => {
    if (!address.trim()) {
      setSuggestions([]);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/map/get-suggestions`,
        {
          params: { address },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setSuggestions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching suggestions:", error);
      setSuggestions([]);
    }
  };

  const debounceRef = useRef(null);

  const debouncedFetchSuggestions = useCallback((address) => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(address);
    }, 500);
  }, []);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const handlePickupChange = (e) => {
    const value = e.target.value;
    setPickup(value);
    setActiveField("pickup");
    debouncedFetchSuggestions(value);
  };

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    setActiveField("destination");
    debouncedFetchSuggestions(value);
  };

  const selectSuggestion = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.description);
    } else if (activeField === "destination") {
      setDestination(suggestion.description);
    }
    setSuggestions([]);
    setPanelOpen(false);
  };

  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "70%",
          padding: 24,
          // opacity:1
        });
        gsap.to(panelCloseRef.current, {
          opacity: 1,
        });
      } else {
        gsap.to(panelRef.current, {
          height: "0%",
          padding: 0,
          // opacity:0
        });
        gsap.to(panelCloseRef.current, {
          opacity: 0,
        });
      }
    },
    [panelOpen],
  );

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [confirmRidePanel]);

  useGSAP(() => {
    if (lookingForDriverPanel) {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(lookingForDriverPanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [lookingForDriverPanel]);

  useGSAP(() => {
    if (waitingForDriverPanel) {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitingForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [waitingForDriverPanel]);

  async function findTrip() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/ride/fares`,
        {
          params: {
            pickup,
            destination,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      // console.log(response.data)
      setFare(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  const createRide = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/ride/create`,
        {
          userId: localStorage.getItem("userId"),
          pickup,
          destination,
          // fare,
          vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error creating ride:", error);
    }
  };

  return (
    <div className="h-screen w-full relative overflow-hidden bg-[#020617] text-white">
      {/* MAP */}
      <div className="absolute inset-0" style={{ touchAction: "none" }}> 

        <LiveTracking role="user" />
        
      </div>

      {/* LOGO */}
      <LoginNavbar />

      {/* MAIN SEARCH */}
      <div className="flex flex-col justify-end mt-10 text-gray-600 h-screen absolute top-0 w-full z-20 px-4 pb-6">
        <div className="max-w-xl mx-auto w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative">
          {/* Close button */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-12 text-gray-700 top-4 text-xl cursor-pointer text-gray-300"
          >
            <ChevronDown size={22} />
          </h5>

          {/* Handle */}
          <div className="w-10 h-1 bg-white/20 mx-auto mb-4 rounded-full"></div>

          <h4 className="text-lg font-semibold mb-4">Where to?</h4>

          <form
            className="relative space-y-3"
            onSubmit={(e) => submitHandler(e)}
          >
            {/* Connector */}
            <div className="absolute left-4 top-5 bottom-5 w-[2px] bg-white/20"></div>

            {/* Pickup */}
            <div className="relative">
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("pickup");
                }}
                value={pickup}
                onChange={handlePickupChange}
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Add a pick-up location"
              />
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={16}
              />
            </div>

            {/* Destination */}
            <div className="relative">
              <input
                onClick={() => {
                  setPanelOpen(true);
                  setActiveField("destination");
                }}
                value={destination}
                onChange={handleDestinationChange}
                className="w-full bg-white/10 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Enter your destination"
              />
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
                size={16}
              />
            </div>
          </form>

          <button
            onClick={() => {
              setPanelOpen(false);
              setVehiclePanel(true);
              findTrip();
            }}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-3 text-white rounded-xl font-semibold transition"
          >
            Find Trip
          </button>
        </div>

        {/* LOCATION SEARCH PANEL */}
        <div
          ref={panelRef}
          className="mt-2 max-w-xl mx-auto w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden"
        >
          <LocationSearchPanel
            suggestions={suggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            selectSuggestion={selectSuggestion}
          />
        </div>
      </div>

      {/* VEHICLE PANEL */}
      <div
        ref={vehiclePanelRef}
        className="fixed bottom-0 w-full z-30 px-4 pb-4 translate-y-full"
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* <VehiclePanel
            selectVehicle={setVehicleType}
            fare={fare}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
          /> */}
          <VehiclePanel
            setConfirmRidePanel={setConfirmRidePanel}
            setVehiclePanel={setVehiclePanel}
            fare={fare}
            setVehicleType={setVehicleType}
            // createRide={createRide}
          />
          {/* <h1 className="text-2xl font-bold">Vehicle Panel</h1> */}
        </div>
      </div>

      {/* CONFIRM RIDE */}
      <div
        ref={confirmRidePanelRef}
        className="fixed bottom-0 w-full z-30 px-4 pb-4 translate-y-full"
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* <ConfirmRide
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setConfirmRidePanel={setConfirmRidePanel}
            setVehicleFound={setVehicleFound}
          /> */}

          <ConfirmRide
            setVehiclePanel={setVehiclePanel}
            setConfirmRidePanel={setConfirmRidePanel}
            setLookingForDriverPanel={setLookingForDriverPanel}
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            ride={ride}
          />
          {/* <h1 className="text-2xl font-bold">Confirm Ride</h1> */}
        </div>
      </div>

      {/* LOOKING FOR DRIVER */}
      <div
        ref={lookingForDriverPanelRef}
        className="fixed bottom-0 w-full z-30 px-4 pb-4 translate-y-full"
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* <LookingForDriver
            createRide={createRide}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
            setVehicleFound={setVehicleFound}
          /> */}

          <LookingForDriver
            setLookingForDriverPanel={setLookingForDriverPanel}
            pickup={pickup}
            destination={destination}
            fare={fare}
            vehicleType={vehicleType}
          />
        </div>
      </div>

      {/* WAITING */}
      <div
        ref={waitingForDriverRef}
        className="fixed bottom-0 w-full z-30 px-4 pb-4 translate-y-full"
      >
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* <WaitingForDriver
            ride={ride}
            setVehicleFound={setVehicleFound}
            setWaitingForDriver={setWaitingForDriver}
            waitingForDriver={waitingForDriver}
          />
        
        */}
          <WaitingForDriver
            setWaitingForDriverPanel={setWaitingForDriverPanel}
            ride={ride}
            confirmRidePanel={setConfirmRidePanel}
            setWaitingForDriver={setWaitingForDriverPanel}
            waitingForDriver={waitingForDriverPanel}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
