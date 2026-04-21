
// import React, { useState } from "react";
// import { Menu, User, Navigation, X } from "lucide-react";
// import { Link } from "react-router-dom";

// const LoginNavbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [profileOpen, setProfileOpen] = useState(false);

//   return (
//     <>
//       {/* NAVBAR */}
//       <div className="absolute fixed top-4 left-0 text-white right-0 z-30 px-4">
//         <div className="max-w-xl mx-auto flex justify-between items-center">
//           {/* LEFT MENU */}
//           <button
//             onClick={() => setMenuOpen(true)}
//             className="h-10 w-10 rounded-xl text-white bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
//           >
//             <Menu className="text-white" size={18} />
//           </button>

//           {/* LOGO (floating style) */}
//           <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10">
//             <Navigation className="text-blue-400" size={18} />
//             <span className="font-semibold text-white text-sm">SwiftRoute</span>
//           </div>

//           {/* PROFILE */}
//           <Link
//             to="/profile"
//             className="h-10 w-10 rounded-xl text-white bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
//           >
//             <User size={18} />
//           </Link>
//         </div>
//       </div>

//       {/* SIDEBAR */}
//       <div
//         className={`fixed inset-0 z-40 transition ${
//           menuOpen ? "visible" : "invisible"
//         }`}
//       >
//         {/* Overlay */}
//         <div
//           onClick={() => setMenuOpen(false)}
//           className={`absolute inset-0 bg-black/50 transition-opacity ${
//             menuOpen ? "opacity-100" : "opacity-0"
//           }`}
//         ></div>

//         {/* Drawer */}
//         <div
//           className={`absolute left-0 top-0 h-full w-64 bg-[#020617] border-r border-white/10 p-5 transform transition-transform ${
//             menuOpen ? "translate-x-0" : "-translate-x-full"
//           }`}
//         >
//           <div className="flex justify-between items-center mb-6">
//             <span className="font-semibold">Menu</span>
//             <button onClick={() => setMenuOpen(false)}>
//               <X />
//             </button>
//           </div>

//           <div className="space-y-4 text-gray-300">
//             <Link to="/" className="block hover:text-white">
//               Home
//             </Link>
//             <Link to="/user-login" className="block hover:text-white">
//               User Login
//             </Link>
//             <Link to="/captain-login" className="block hover:text-white">
//               Captain Login
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default LoginNavbar;



import React, { useState, useEffect } from "react";
import {
  Menu,
  User,
  Navigation,
  X,
  Home,
  LogIn,
  Car,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const CaptainLoginNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Navigation items (DON’T hardcode JSX like before)
  const navItems = [
    { to: "/captain-home", label: "Home", icon: Home },
    { to: "/captain-riding", label: "Book Ride", icon: Car },
    { to: "/captain/logout", label: "Captain Logout", icon: LogIn },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="fixed top-4 left-0 right-0 z-30 px-4">
        <div className="max-w-xl mx-auto flex justify-between items-center">

          {/* MENU BUTTON */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="h-10 w-10 rounded-xl bg-black/40 text-white backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
          >
            <Menu size={18} />
          </button>

          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10"
          >
            <Navigation size={18} className="text-blue-400" />
            <span className="font-semibold text-white text-sm">SwiftRoute</span>
          </Link>

          {/* PROFILE */}
          <Link
            to="/captain/profile"
            className="h-10 w-10 rounded-xl text-white bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-black/60 transition"
          >
            <User size={18} />
          </Link>
        </div>
      </header>

      {/* SIDEBAR */}
      <div
        className={`fixed inset-0 z-40 ${
          menuOpen ? "visible" : "invisible"
        }`}
      >
        {/* OVERLAY */}
        <div
          onClick={() => setMenuOpen(false)}
          className={`absolute inset-0 bg-black/50 transition-opacity ${
            menuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* DRAWER */}
        <div
          className={`absolute left-0 top-0 h-full w-64 bg-[#020617] border-r border-white/10 p-5 transform transition-transform ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold">Menu</span>
            <button onClick={() => setMenuOpen(false)}>
              <X />
            </button>
          </div>

          {/* NAV ITEMS */}
          <div className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${
                    isActive
                      ? "bg-blue-500/20 text-blue-400"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon size={18} />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainLoginNavbar;