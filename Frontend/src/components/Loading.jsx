import React from "react";
import { Navigation } from "lucide-react";

const Loading = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">

      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-500/20 blur-3xl rounded-full absolute top-20 left-[-50px] sm:left-10"></div>
        <div className="w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-500/20 blur-3xl rounded-full absolute bottom-20 right-[-50px] sm:right-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Navigation className="h-8 w-8 text-blue-400 animate-pulse" />
          <span className="text-2xl font-bold">SwiftRoute</span>
        </div>

        {/* Loader Animation */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-150"></span>
          <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-300"></span>
        </div>

        {/* Text */}
        <p className="text-gray-400 text-lg">
          Finding the best route for you...
        </p>

        {/* Progress Bar */}
        <div className="w-64 sm:w-80 h-1 bg-white/10 rounded-full mt-6 overflow-hidden mx-auto">
          <div className="h-full bg-blue-400 animate-[loading_1.5s_linear_infinite]"></div>
        </div>
      </div>

      {/* Custom Animation */}
      <style>
        {`
          @keyframes loading {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
        `}
      </style>
    </div>
  );
};

export default Loading;