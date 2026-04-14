import React, { useContext } from "react";
import { Clock, Gauge, BookOpen } from "lucide-react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {

  const {captain} = useContext(CaptainDataContext);

  return (
    <div className="space-y-5 text-white">
      {/* HEADER CARD */}
      <div
        className="flex items-center justify-between p-4 rounded-2xl 
                      bg-white/10 backdrop-blur-md border border-white/10 shadow-sm"
      >
        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full border border-white/20 overflow-hidden">
            <img
              className="h-full w-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdlMd7stpWUCmjpfRjUsQ72xSWikidbgaI1w&s"
              alt="Captain"
            />
          </div>

          <div>
            <h4 className="text-sm text-gray-600 font-semibold capitalize">{captain?.fullname?.firstname + " " + captain?.fullname?.lastname}</h4>
            <p className="text-xs text-gray-400">Gold Captain</p>
          </div>
        </div>

        {/* RIGHT (EARNINGS) */}
        <div className="text-right">
          <h4 className="text-2xl font-bold text-blue-400">₹295.20</h4>
          <p className="text-xs text-gray-400">Today's Earnings</p>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-3">
        {/* CARD 1 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">10.2</h5>
          <p className="text-xs text-gray-400">Hours Online</p>
        </div>

        {/* CARD 2 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Gauge className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">30.5</h5>
          <p className="text-xs text-gray-400">KM Driven</p>
        </div>

        {/* CARD 3 */}
        <div className="rounded-xl p-3 text-center bg-white/5 border border-white/10 hover:bg-white/10 transition">
          <div className="mx-auto mb-2 h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <BookOpen className="h-5 w-5 text-blue-400" />
          </div>
          <h5 className="text-lg text-gray-600 font-semibold">8</h5>
          <p className="text-xs text-gray-400">Trips Done</p>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
