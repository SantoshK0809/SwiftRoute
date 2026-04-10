// import React from "react";
// import { Link } from "react-router-dom";

// const UserSignup = () => {
//   return (
//     <div className="relative min-h-screen bg-[#020617] text-white flex items-center justify-center">
//       {/* Background */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="w-[300px] sm:w-[400px] h-[300px] sm:h-[400px] bg-blue-500/20 blur-3xl rounded-full absolute top-10 left-[-50px] sm:left-10"></div>
//         <div className="w-[250px] sm:w-[350px] h-[250px] sm:h-[350px] bg-purple-500/20 blur-3xl rounded-full absolute bottom-10 right-[-50px] sm:right-10"></div>
//       </div>

//       {/* Container */}
//       <div className="relative z-10 w-full px-4 sm:px-6 md:px-8">
//         {/* Card */}
//         <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8">
//           {/* Title */}
//           <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
//             Create Account 🚀
//           </h2>

//           {/* Form */}
//           <form className="flex flex-col gap-4 sm:gap-5">
//             {/* Name Fields */}
//             <div className="flex gap-3">
//               <div className="w-1/2">
//                 <label className="text-sm text-gray-300">First Name</label>
//                 <input
//                   type="text"
//                   required
//                   placeholder="First name"
//                   className="w-full mt-2 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />
//               </div>

//               <div className="w-1/2">
//                 <label className="text-sm text-gray-300">Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Last name"
//                   className="w-full mt-2 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />
//               </div>
//             </div>

//             {/* Email */}
//             <div>
//               <label className="text-sm text-gray-300">Email</label>
//               <input
//                 type="email"
//                 required
//                 placeholder="Enter your email"
//                 className="w-full mt-2 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                            placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="text-sm text-gray-300">Password</label>
//               <input
//                 type="password"
//                 required
//                 placeholder="Create a password"
//                 className="w-full mt-2 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                            placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//               />
//             </div>

//             {/* Button */}
//             <button
//               type="submit"
//               className="mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 py-2.5 sm:py-3 rounded-lg
//                          font-semibold transition text-sm sm:text-base"
//             >
//               Sign Up
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center gap-3 my-5 sm:my-6">
//             <div className="flex-1 h-px bg-white/10"></div>
//             <span className="text-xs sm:text-sm text-gray-400">or</span>
//             <div className="flex-1 h-px bg-white/10"></div>
//           </div>

//           {/* Links */}
//           <div className="text-center text-xs sm:text-sm text-gray-400">
//             <p>
//               Already have an account?{" "}
//               <Link to="/user-login" className="text-blue-400 hover:underline">
//                 Login
//               </Link>
//             </p>

//             <Link
//               to="/captain-signup"
//               className="block mt-3 text-gray-300 hover:text-white"
//             >
//               Sign up as Captain →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserSignup;

import React from "react";
import { Link } from "react-router-dom";
import { Navigation, ArrowLeft } from "lucide-react";

const UserSignup = () => {
  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 text-white text-center px-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <Navigation className="h-10 w-10 text-blue-400" />
            <span className="text-3xl  font-bold">SwiftRoute</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Start Your <span className="text-blue-400">Journey</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-sm mx-auto">
            Join thousands of riders already moving smarter.
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto text-gray-400">
            <p>✔ Instant ride booking</p>
            <p>✔ Real-time tracking</p>
            <p>✔ Smart pricing — no surprises</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          {/* CARD */}
          <div className="rounded-2xl bg-white/5 text-white backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-xl">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Navigation className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">SwiftRoute</span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Create Account</h1>
              <p className="text-gray-400 text-sm">
                Fill in the details to get started
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5">
              {/* NAME */}
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Last name"
                  className={inputClass}
                />
              </div>

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Enter your email"
                className={inputClass}
              />

              {/* PASSWORD */}
              <input
                type="password"
                placeholder="Create a password"
                className={inputClass}
              />

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Create Account
              </button>
            </form>

            {/* FOOTER */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Already have an account?{" "}
              <Link to="/user-login" className="text-blue-400 hover:underline">
                Sign in
              </Link>
              <Link
                to="/captain-signup"
                className="block mt-3 text-gray-300 hover:text-white"
              >
                Sign up as Captain →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignup;
