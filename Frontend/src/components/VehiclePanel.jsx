import React from "react";
import { User, ChevronDown } from "lucide-react";

const VehiclePanel = (props) => {
  return (
    <div className="text-white">
      {/* HANDLE */}
      <div className="flex justify-center mb-4">
        <div className="w-10 h-1 bg-white/20 rounded-full"></div>
      </div>
      <h5
        className="cursor-pointer p-4 h-10 w-10 "
        onClick={() => {
          props.setVehiclePanel(false);
        }}
      >
        <ChevronDown className="text-white" size={20} />
      </h5>
      {/* TITLE */}
      <h3 className="text-xl sm:text-2xl font-semibold mb-5 text-center">
        Choose a Vehicle
      </h3>

      {/* CARD 1 */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-4 mb-3 rounded-2xl 
                      bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
      >
        <img
          className="h-10 object-contain"
          src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
          alt=""
        />

        <div className="flex-1 mx-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            SwiftGo
            <span className="text-xs text-gray-400 text-white flex items-center gap-1">
              <User size={16} /> 4
            </span>
          </h4>

          <p className="text-xs text-white">2 mins away</p>
          <p className="text-xs text-white">Affordable, compact rides</p>
        </div>

        <h2 className="text-sm font-semibold">₹193</h2>
      </div>

      {/* CARD 2 */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-4 mb-3 rounded-2xl 
                      bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
      >
        <img
          className="h-10 w-15 object-contain"
          src="https://cn-geo1.uber.com/image-proc/crop/resizecrop/udam/format=auto/width=552/height=552/srcb64=aHR0cHM6Ly90Yi1zdGF0aWMudWJlci5jb20vcHJvZC91ZGFtLWFzc2V0cy85NTM4NTEyZC1mZGUxLTRmNzMtYmQ1MS05Y2VmZjRlMjU0ZjEucG5n"
          alt=""
        />

        <div className="flex-1 mx-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            Moto
            <span className="text-xs text-gray-400 flex text-white items-center gap-1">
              <User size={16} /> 1
            </span>
          </h4>

          <p className="text-xs text-white">3 mins away</p>
          <p className="text-xs text-white">Affordable motorcycle rides</p>
        </div>

        <h2 className="text-sm font-semibold">₹65</h2>
      </div>

      {/* CARD 3 */}
      <div
        onClick={() => {
          props.setConfirmRidePanel(true);
        }}
        className="flex items-center justify-between p-4 rounded-2xl 
                      bg-white/5 border border-white/10 hover:bg-white/10 transition cursor-pointer"
      >
        <img
          className="h-10 object-contain"
          src="https://clipart-library.com/2023/Uber_Auto_312x208_pixels_Mobile.png"
          alt=""
        />

        <div className="flex-1 mx-3">
          <h4 className="text-sm font-semibold flex items-center gap-2">
            SwiftAuto
            <span className="text-medium text-white flex items-center gap-1">
              <User size={16} /> 3
            </span>
          </h4>

          <p className="text-xs text-white">3 mins away</p>
          <p className="text-xs text-white">Affordable auto rides</p>
        </div>

        <h2 className="text-sm font-semibold">₹110</h2>
      </div>
    </div>
  );
};

export default VehiclePanel;
