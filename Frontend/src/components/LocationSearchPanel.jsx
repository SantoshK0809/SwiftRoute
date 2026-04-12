// import React from "react";
// import { MapPin } from "lucide-react";

// const LocationSearchPanel = () => {
//   return (
//     <div className="flex gap-4 my-4 items-center justify-start">
//       <h2 className="bg-[#eee] text-[#020617] p-2 rounded-lg">
//         <MapPin size={16} />
//       </h2>

//     </div>
//   );
// };

// export default LocationSearchPanel;

import React from "react";
import { MapPin } from "lucide-react";

const LocationSearchPanel = (props) => {
  const locations = [
    {
      name: "Mantri Heights",
      address: "Behind wellness medical, Shaniwar Peth, Pune",
      icon: MapPin,
    },
    {
      name: "ABC Chowk",
      address: "Near Dagdusheth Mandir, Pune",
      icon: MapPin,
    },
    {
      name: "FC Road",
      address: "Fergusson College Road, Pune",
      icon: MapPin,
    },
  ];
  return (
    <div className="flex flex-col gap-2 py-2">
      {/* ITEM 1 */}
      {locations.map((e, idx) => {
        return (
          <div
            key={idx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setPanelOpen(false);
            }}
            className="flex items-start gap-3 active:border-blue-400 border-2 border-gray-500 p-3 rounded-xl hover:bg-white/10 transition"
          >
            <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-500/10">
              <MapPin className="text-black" size={16} />
            </div>

            <div>
              <p className="text-sm font-medium text-white">{e.name}</p>
              <p className="text-xs text-white">{e.address}</p>
            </div>
          </div>
        );
      })}

      {/* ITEM 2 */}
      {/* <div className="flex items-start gap-3 p-3 active:border-blue-400 border-2 border-gray-500 rounded-xl hover:bg-white/10 transition">
        <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-500/10">
          <MapPin className="text-black" size={16} />
        </div>

        <div>
          <p className="text-sm font-medium text-white">ABC Chowk</p>
          <p className="text-xs text-gray-400">Near Dagdusheth Mandir, Pune</p>
        </div>
      </div> */}

      {/* ITEM 3 */}
      {/* <div className="flex items-start gap-3 p-3 border-2 border-gray-500 active:border-blue-400 rounded-xl hover:bg-white/10 transition">
        <div className="h-9 w-9 flex items-center justify-center rounded-lg bg-blue-500/10">
          <MapPin className="text-black" size={16} />
        </div>

        <div>
          <p className="text-sm font-medium text-white">FC Road</p>
          <p className="text-xs text-gray-400">Fergusson College Road, Pune</p>
        </div>
      </div> */}
    </div>
  );
};

export default LocationSearchPanel;
