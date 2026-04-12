// import React from "react";
// import { Navigation } from "lucide-react";
// const Home = () => {
//   return (
//     <div className="h-screen w-full relative bg-[#020617] text-white overflow-hidden">
//       {/* MAP */}
//       <div className="absolute inset-0">
//         <img
//           src="https://tse2.mm.bing.net/th/id/OIP.CdPGs2UrpqjBv7cg9JrLTwHaLx?pid=ImgDet&w=198&h=315&c=7&dpr=2&o=7&rm=3"
//           alt="map"
//           className="w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 bg-black/30"></div>
//       </div>

//       {/* LOGO */}
//       <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
//         <Navigation className="text-blue-400" />
//         <span className="font-bold text-lg">SwiftRoute</span>
//       </div>

//       {/* MAIN SEARCH CARD */}
//       <div className="absolute bottom-0 w-full z-20 px-4 sm:px-6 pb-6">
//         <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-5">
//           {/* DRAG HANDLE */}
//           <div className="w-12 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>

//           <h4 className="text-lg sm:text-xl font-semibold mb-4">Find a trip</h4>

//           {/* INPUTS */}
//           <div className="space-y-3 relative">
//             {/* Vertical line */}
//             <div className="absolute left-4 top-5 bottom-5 w-[2px] bg-white/20"></div>

//             <input
//               type="text"
//               placeholder="Add a pick-up location"
//               className="w-full bg-white/10 border border-white/10 rounded-lg px-10 py-3 text-sm sm:text-base
//                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />

//             <input
//               type="text"
//               placeholder="Enter your destination"
//               className="w-full bg-white/10 border border-white/10 rounded-lg px-10 py-3 text-sm sm:text-base
//                          placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>

//           {/* BUTTON */}
//           <button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-3 rounded-lg font-semibold transition">
//             Find Trip
//           </button>
//         </div>
//       </div>

//       {/* BOTTOM SHEETS (STRUCTURED) */}
//       <div className="absolute bottom-0 w-full z-10 space-y-2 px-2 pb-2">
//         {/* Vehicle Panel */}
//         <div className="translate-y-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white">
//           Vehicle Panel
//         </div>

//         {/* Confirm Ride */}
//         <div className="translate-y-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white">
//           Confirm Ride
//         </div>

//         {/* Looking */}
//         <div className="translate-y-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white">
//           Looking for driver
//         </div>

//         {/* Waiting */}
//         <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-white">
//           Waiting for Driver
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import {
//   Navigation,
//   MapPin,
//   Search,
//   Clock,
//   Star,
//   Car,
//   Bike,
//   Truck,
//   Menu,
//   User,
//   CarTaxiFront,
//   ChevronRight,
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import LoginNavbar from "../components/LoginNavbar";

// const Home = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");

//   const rides = [
//     { icon: Bike, name: "Bike", time: "2 min" },
//     { icon: Car, name: "Car", time: "4 min" },
//     { icon: CarTaxiFront, name: "Auto", time: "3 min" },
//     { icon: Truck, name: "XL", time: "6 min" },
//   ];

//   const locations = [
//     { name: "Home", address: "Kothrud, Pune", icon: Star },
//     { name: "Office", address: "Hinjewadi Phase 1", icon: Clock },
//   ];

//   return (
//     <div className="h-screen w-full relative bg-[#020617] text-white overflow-hidden">
//       {/* MAP */}
//       <div className="absolute inset-0">
//         <img
//           src="https://tse2.mm.bing.net/th/id/OIP.CdPGs2UrpqjBv7cg9JrLTwHaLx?pid=ImgDet&w=198&h=315&c=7&dpr=2&o=7&rm=3"
//           className="w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>

//       {/* TOP BAR */}
//       {/* <LoginNavbar /> */}

//       {/* SEARCH PANEL */}
//       <div className="absolute bottom-0 w-full z-20 px-4 pb-6">
//         <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
//           {/* Handle */}
//           <div className="w-10 h-1 bg-white/20 mx-auto rounded-full mb-4"></div>

//           <h3 className="text-lg font-semibold mb-4">Where to?</h3>

//           {/* Inputs */}
//           <div className="space-y-3 relative">
//             {/* connector */}
//             <div className="absolute left-4 top-6 bottom-6 w-[2px] bg-white/20"></div>

//             {/* Pickup */}
//             <div className="relative">
//               <input
//                 value={pickup}
//                 onChange={(e) => setPickup(e.target.value)}
//                 placeholder="Add pickup location"
//                 className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <MapPin
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
//                 size={16}
//               />
//             </div>

//             {/* Destination */}
//             <div className="relative">
//               <input
//                 value={destination}
//                 onChange={(e) => setDestination(e.target.value)}
//                 placeholder="Enter destination"
//                 className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 pr-10 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//               <Search
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
//                 size={16}
//               />
//             </div>
//           </div>

//           {/* Ride Options */}
//           <div className="flex gap-2 mt-4 overflow-x-auto">
//             {rides.map((ride, i) => (
//               <div
//                 key={i}
//                 className="min-w-[80px] flex flex-col items-center gap-1 px-4 py-3 rounded-xl bg-white/10 border border-white/10"
//               >
//                 <ride.icon size={18} />
//                 <span className="text-xs">{ride.name}</span>
//                 <span className="text-[10px] text-gray-400">{ride.time}</span>
//               </div>
//             ))}
//           </div>

//           {/* Button */}
//           <button className="w-full mt-4 bg-blue-500 py-3 rounded-lg font-semibold hover:bg-blue-600">
//             Find Trip
//           </button>

//           {/* Recent */}
//           <div className="mt-4 space-y-2">
//             {locations.map((loc, i) => (
//               <div
//                 key={i}
//                 className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10"
//               >
//                 <loc.icon size={16} />
//                 <div className="flex-1">
//                   <p className="text-sm">{loc.name}</p>
//                   <p className="text-xs text-gray-400">{loc.address}</p>
//                 </div>
//                 <ChevronRight size={16} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

// import React, { useState } from "react";
// import {
//   Navigation,
//   MapPin,
//   Search,
//   Clock,
//   Star,
//   Car,
//   Bike,
//   Truck,
//   ChevronRight,
//   CarTaxiFront,
// } from "lucide-react";

// const Home = () => {
//   const [pickup, setPickup] = useState("");
//   const [destination, setDestination] = useState("");
//   const [activePanel, setActivePanel] = useState("search");

//   const rides = [
//     { icon: Bike, name: "Bike", price: "₹40" },
//     { icon: Car, name: "Car", price: "₹120" },
//     { icon: CarTaxiFront, name: "Auto", price: "₹80" },
//     { icon: Truck, name: "XL", price: "₹180" },
//   ];

//   const locations = [
//     { name: "Home", address: "Kothrud, Pune", icon: Star },
//     { name: "Office", address: "Hinjewadi Phase 1", icon: Clock },
//   ];

//   return (
//     <div className="h-screen w-full relative bg-[#020617] text-white overflow-hidden">
//       {/* MAP */}
//       <div className="absolute inset-0">
//         <img
//           src="https://tse2.mm.bing.net/th/id/OIP.CdPGs2UrpqjBv7cg9JrLTwHaLx"
//           className="w-full h-full object-cover opacity-70"
//         />
//         <div className="absolute inset-0 bg-black/40"></div>
//       </div>

//       {/* ================= SEARCH PANEL ================= */}
//       {activePanel === "search" && (
//         <BottomSheet>
//           <h3 className="text-lg font-semibold mb-4">Where to?</h3>

//           <InputSection
//             pickup={pickup}
//             setPickup={setPickup}
//             destination={destination}
//             setDestination={setDestination}
//           />

//           <button
//             onClick={() => setActivePanel("vehicle")}
//             className="w-full mt-4 bg-blue-500 py-3 rounded-lg"
//           >
//             Find Trip
//           </button>
//         </BottomSheet>
//       )}

//       {/* ================= VEHICLE PANEL ================= */}
//       {activePanel === "vehicle" && (
//         <BottomSheet>
//           <h3 className="text-lg font-semibold mb-4">Choose Ride</h3>

//           {rides.map((ride, i) => (
//             <div
//               key={i}
//               onClick={() => setActivePanel("confirm")}
//               className="flex justify-between items-center p-3 rounded-lg hover:bg-white/10"
//             >
//               <div className="flex items-center gap-3">
//                 <ride.icon />
//                 <span>{ride.name}</span>
//               </div>
//               <span>{ride.price}</span>
//             </div>
//           ))}
//         </BottomSheet>
//       )}

//       {/* ================= CONFIRM PANEL ================= */}
//       {activePanel === "confirm" && (
//         <BottomSheet>
//           <h3 className="text-lg font-semibold mb-4">Confirm Ride</h3>

//           <p className="text-sm text-gray-400 mb-4">
//             {pickup} → {destination}
//           </p>

//           <button
//             onClick={() => setActivePanel("searching")}
//             className="w-full bg-blue-500 py-3 rounded-lg"
//           >
//             Confirm Ride
//           </button>
//         </BottomSheet>
//       )}

//       {/* ================= SEARCHING ================= */}
//       {activePanel === "searching" && (
//         <BottomSheet>
//           <h3 className="text-lg font-semibold">Finding Driver...</h3>
//           <p className="text-gray-400 mt-2">Please wait</p>

//           <button
//             onClick={() => setActivePanel("waiting")}
//             className="mt-4 text-blue-400"
//           >
//             Simulate Found Driver →
//           </button>
//         </BottomSheet>
//       )}

//       {/* ================= WAITING ================= */}
//       {activePanel === "waiting" && (
//         <BottomSheet>
//           <h3 className="text-lg font-semibold">Driver Found 🚗</h3>
//           <p className="text-gray-400 mt-2">Arriving in 3 mins</p>
//         </BottomSheet>
//       )}
//     </div>
//   );
// };

// export default Home;

// /* ================= REUSABLE COMPONENTS ================= */

// const BottomSheet = ({ children }) => (
//   <div className="absolute bottom-0 w-full px-4 pb-6">
//     <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
//       {/* Handle */}
//       <div className="w-10 h-1 bg-white/20 mx-auto mb-4 rounded-full"></div>

//       {children}
//     </div>
//   </div>
// );

// const InputSection = ({ pickup, setPickup, destination, setDestination }) => (
//   <div className="space-y-3 relative">
//     <div className="absolute left-4 top-6 bottom-6 w-[2px] bg-white/20"></div>

//     <div className="relative">
//       <input
//         value={pickup}
//         onChange={(e) => setPickup(e.target.value)}
//         placeholder="Pickup"
//         className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 py-3"
//       />
//       <MapPin
//         className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
//         size={16}
//       />
//     </div>

//     <div className="relative">
//       <input
//         value={destination}
//         onChange={(e) => setDestination(e.target.value)}
//         placeholder="Destination"
//         className="w-full bg-white/10 border border-white/10 rounded-lg pl-10 py-3"
//       />
//       <Search
//         className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
//         size={16}
//       />
//     </div>
//   </div>
// );

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
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

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [lookingForDriverPanel, setLookingForDriverPanel] = useState(false);
  const [waitingForDriverPanel, setWaitingForDriverPanel] = useState(false);

  const vehiclePanelRef = useRef(null);

  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const lookingForDriverPanelRef = useRef(null);
  const waitingForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
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

  return (
    <div className="h-screen relative overflow-hidden bg-[#020617] text-white">
      {/* MAP */}
      <div className="absolute inset-0">
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.CdPGs2UrpqjBv7cg9JrLTwHaLx?pid=ImgDet&w=198&h=315&c=7&dpr=2&o=7&rm=3"
          alt="map"
          className="w-full h-full object-cover opacity-70"
        />

        {/* <LiveTracking /> */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
      </div>

      {/* LOGO */}
      {/* <div className="absolute top-5 left-5 z-20 flex items-center gap-2">
        <Navigation className="text-blue-400" />
        <span className="font-bold">SwiftRoute</span>
      </div> */}
      <LoginNavbar />

      {/* MAIN SEARCH */}
      <div className="flex flex-col justify-end mt-10 h-screen absolute top-0 w-full z-20 px-4 pb-6">
        <div className="max-w-xl mx-auto w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5 relative">
          {/* Close button */}
          <h5
            ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className="absolute opacity-0 right-12 text-white top-4 text-xl cursor-pointer text-gray-300"
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
                  // setActiveField("pickup");
                }}
                // value={pickup}
                // onChange={handlePickupChange}
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
                  // setActiveField("destination");
                }}
                // value={destination}
                // onChange={handleDestinationChange}
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
            // onClick={findTrip}
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition"
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
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
          />
          {/* <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestions
                : destinationSuggestions
            } 
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />*/}
          {/* <h1 className="text-2xl font-bold">Location Search Panel</h1> */}
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
          <WaitingForDriver setWaitingForDriverPanel={setWaitingForDriverPanel} />
        </div>
      </div>
    </div>
  );
};

export default Home;
