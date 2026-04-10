import React from "react";
import { Link } from "react-router-dom";
import { Navigation } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-[#020617] text-white">
      <header className="fixed top-0 left-0 w-full z-50 bg-black/40 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            to={"/"}
            className="text-xl flex items-center gap-2 font-bold tracking-wide"
          >
            <Navigation className="h-7 w-7 text-blue-400" />
            SwiftRoute
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <span className="hover:text-white cursor-pointer">Ride</span>
            <span className="hover:text-white cursor-pointer">Drive</span>
            <span className="hover:text-white cursor-pointer">Business</span>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/user-login"
              className="border border-white/20 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white"
            >
              Login
            </Link>
            <Link
              to="/user-signup"
              className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </header>

      {/* <header className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Navigation className="h-7 w-7 text-primary" />
            <span className="text-xl font-heading font-bold text-foreground">
              SwiftRoute
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a
              href="#how-it-works"
              className="hover:text-foreground transition-colors"
            >
              How it Works
            </a>
            <a
              href="#features"
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a href="#cta" className="hover:text-foreground transition-colors">
              Join
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button className="border border-white/20 px-4 py-2 rounded-lg hover:bg-white/10 transition">
              <Link to="/user-login">Login</Link>
            </button>
            <button className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              <Link to="/user-signup">Get Started</Link>
            </button>
          </div>
        </div>
      </header> */}
    </div>
  );
};

export default Navbar;
