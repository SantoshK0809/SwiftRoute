import React from "react";
import { Link } from "react-router-dom";
import { MapPin, CreditCard, Navigation } from "lucide-react";
import LoginNavbar from "../components/LoginNavbar";
// import LiveTracking from "../components/LiveTracking";

const Riding = () => {
  return (
    <div className="h-screen w-full bg-[#020617] text-white relative overflow-hidden">
      {/* MAP */}
      <div className="h-[55%] lg:h-screen relative">
        {/* <LiveTracking /> */}
        <img
          src="https://tse2.mm.bing.net/th/id/OIP.CdPGs2UrpqjBv7cg9JrLTwHaLx?pid=ImgDet&w=198&h=315&c=7&dpr=2&o=7&rm=3"
          alt="map"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
      </div>

      {/* HOME BUTTON */}
      {/* <Link
        to="/home"
        className="absolute top-4 right-4 z-20 h-10 w-10 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center"
      >
        <Navigation size={18} />
      </Link> */}
      <LoginNavbar />

      {/* BOTTOM PANEL */}
      <div className="absolute bottom-0 w-full px-4 pb-4">
        <div className="max-w-xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-5">
          {/* HANDLE */}
          <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-4"></div>

          {/* DRIVER CARD */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10">
            <img
              className="h-16 object-contain"
              src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
              alt=""
            />

            <div className="text-right">
              <h2 className="text-sm font-semibold">Rahul Sharma</h2>
              <h4 className="text-lg font-bold tracking-wide">MH12 AB 1234</h4>
              <p className="text-xs text-gray-400">Maruti Suzuki Alto</p>
            </div>
          </div>

          {/* TRIP DETAILS */}
          <div className="mt-5 space-y-3">
            {/* DESTINATION */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <MapPin className="text-blue-400 mt-1" size={18} />
              <div>
                <h4 className="text-sm font-semibold">Destination</h4>
                <p className="text-xs text-gray-400">Dagdusheth Mandir, Pune</p>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10">
              <CreditCard className="text-blue-400 mt-1" size={18} />
              <div>
                <h4 className="text-sm font-semibold">₹193</h4>
                <p className="text-xs text-gray-400">Cash Payment</p>
              </div>
            </div>
          </div>

          {/* BUTTON */}
          <button className="w-full mt-6 bg-blue-500 hover:bg-blue-600 py-3 rounded-xl font-semibold transition">
            Make Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default Riding;
