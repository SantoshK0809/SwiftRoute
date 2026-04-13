// import React from "react";
// import { MapPin, Navigation, Banknote, ChevronDown, User } from "lucide-react";

// const RidePopUp = ({
//   setRidePopupPanel,
//   setConfirmRidePopupPanel,
//   confirmRide,
//   setCaptainDetailsPanel,
// }) => {
//   return (
//     <div className="space-y-4">
//       {/* Drag Handle */}
//       <button
//         onClick={() => {
//           setRidePopupPanel(false);
//           setCaptainDetailsPanel(true);
//         }}
//         className="mx-auto flex justify-center w-full"
//       >
//         <ChevronDown className="h-6 w-6 text-muted-foreground" />
//       </button>

//       <h3 className="text-xl font-bold font-heading text-foreground">
//         New Ride Request
//       </h3>

//       {/* Rider Info */}
//       <div className="flex items-center justify-between glass rounded-xl p-4 border border-primary/20">
//         <div className="flex items-center gap-3">
//           <div className="h-11 w-11 rounded-full bg-secondary flex items-center justify-center overflow-hidden">
//             <User className="h-5 w-5 text-muted-foreground" />
//           </div>
//           <h4 className="text-base font-semibold text-foreground">
//             Rider Name
//           </h4>
//         </div>
//         <span className="text-sm font-medium text-muted-foreground">
//           2.2 KM
//         </span>
//       </div>

//       {/* Route Details */}
//       <div className="space-y-0">
//         <div className="flex items-start gap-4 p-3 border-b border-border">
//           <div className="mt-1 h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
//             <MapPin className="h-4 w-4 text-green-400" />
//           </div>
//           <div>
//             <h4 className="text-sm font-semibold text-foreground">
//               Pickup Location
//             </h4>
//             <p className="text-xs text-muted-foreground mt-0.5">
//               562/11-A, Main Road
//             </p>
//           </div>
//         </div>
//         <div className="flex items-start gap-4 p-3 border-b border-border">
//           <div className="mt-1 h-8 w-8 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
//             <Navigation className="h-4 w-4 text-red-400" />
//           </div>
//           <div>
//             <h4 className="text-sm font-semibold text-foreground">
//               Destination
//             </h4>
//             <p className="text-xs text-muted-foreground mt-0.5">
//               Third Wave Coffee, Koramangala
//             </p>
//           </div>
//         </div>
//         <div className="flex items-start gap-4 p-3">
//           <div className="mt-1 h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
//             <Banknote className="h-4 w-4 text-primary" />
//           </div>
//           <div>
//             <h4 className="text-sm font-semibold text-foreground">₹193.20</h4>
//             <p className="text-xs text-muted-foreground mt-0.5">Cash Payment</p>
//           </div>
//         </div>
//       </div>

//       {/* Actions */}
//       <div className="flex gap-3 pt-2">
//         <button
//           onClick={() => setRidePopupPanel(false)}
//           className="flex-1 py-3 rounded-xl font-semibold text-sm bg-secondary text-foreground hover:bg-secondary/80 transition border border-border"
//         >
//           Ignore
//         </button>
//         <button
//           onClick={() => {
//             setRidePopupPanel(false);
//             setConfirmRidePopupPanel(true);
//           }}
//           className="flex-1 py-3 rounded-xl font-semibold text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
//         >
//           Accept Ride
//         </button>
//       </div>
//     </div>
//   );
// };

// export default RidePopUp;

import React from "react";
import { MapPin, Navigation, Banknote, ChevronDown, User } from "lucide-react";

const RidePopUp = ({
  setRidePopupPanel,
  setConfirmRidePopupPanel,
  confirmRide,
  setCaptainDetailsPanel,
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
            Santosh Kirtane
          </h4>
        </div>

        <span className="text-sm text-gray-500 font-medium">2.2 KM</span>
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
            <p className="text-sm text-gray-500">562/11-A, Main Road</p>
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
            <p className="text-sm text-gray-500">Third Wave Coffee</p>
          </div>
        </div>

        {/* PRICE */}
        <div
          className="flex items-start gap-4 p-4 rounded-xl 
                        bg-white/5  border border-blue-400/30"
        >
          <Banknote className="text-blue-400 mt-1" size={18} />
          <div>
            <h4 className="text-base text-gray-600 font-semibold">₹193.20</h4>
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
