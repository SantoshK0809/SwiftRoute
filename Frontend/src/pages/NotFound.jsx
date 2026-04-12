import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center px-6">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-500/20 blur-3xl rounded-full absolute top-20 left-[-50px] sm:left-10"></div>
        <div className="w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-500/20 blur-3xl rounded-full absolute bottom-20 right-[-50px] sm:right-10"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-xl">
        {/* Logo */}
        <div className="flex justify-center items-center gap-2 mb-6">
          <Navigation className="h-8 w-8 text-blue-400" />
          <span className="text-2xl font-bold">SwiftRoute</span>
        </div>

        {/* 404 */}
        <h1 className="text-6xl sm:text-7xl font-bold text-blue-400 mb-4">
          404
        </h1>

        {/* Message */}
        <h2 className="text-2xl sm:text-3xl font-semibold mb-3">
          Page Not Found
        </h2>

        <p className="text-gray-400 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/home"
            className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
          >
            Go to Home
          </Link>

          <Link
            to="/user-login"
            className="border border-white/20 px-6 py-3 rounded-lg hover:bg-white/10 transition"
          >
            Login
          </Link>
        </div>

        {/* Extra Link */}
        <div className="mt-6 text-sm text-gray-400">
          Or{" "}
          <Link to="/user-signup" className="text-blue-400 hover:underline">
            create an account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
