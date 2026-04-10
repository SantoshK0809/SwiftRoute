// import React from "react";
// import { Link } from "react-router-dom";

// const UserLogin = () => {
//   return (
//     <div className="p-7">
//       <div>
//         <form>
//           <h3 className="text-xl mb-2">What's your email</h3>
//           <input
//             className="bg-white"
//             required
//             type="email"
//             placeholder="Enter your email"
//           />
//           <h3>Enter password</h3>
//           <input required type="password" placeholder="Enter your password" />
//           <button type="submit">Login</button>
//         </form>
//       </div>
//       <div>
//         <p>
//           Don't have an account?{" "}
//           <span>
//             <Link to={"/user-signup"}>sign up</Link>
//           </span>
//         </p>
//         <Link to={"/captain-signup"}>Sign in as Captain</Link>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

// import React from "react";
// import { Link } from "react-router-dom";

// const UserLogin = () => {
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
//         <div className="w-full max-w-sm sm:max-w-md mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl
//                         p-6 sm:p-8">

//           {/* Title */}
//           <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
//             Welcome Back 👋
//           </h2>

//           {/* Form */}
//           <form className="flex flex-col gap-4 sm:gap-5">

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

//             <div>
//               <label className="text-sm text-gray-300">Password</label>
//               <input
//                 type="password"
//                 required
//                 placeholder="Enter your password"
//                 className="w-full mt-2 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                            placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//               />
//             </div>

//             <button
//               type="submit"
//               className="mt-3 sm:mt-4 bg-blue-500 hover:bg-blue-600 py-2.5 sm:py-3 rounded-lg
//                          font-semibold transition text-sm sm:text-base"
//             >
//               Login
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
//               Don’t have an account?{" "}
//               <Link
//                 to="/user-signup"
//                 className="text-blue-400 hover:underline"
//               >
//                 Sign up
//               </Link>
//             </p>

//             <Link
//               to="/captain-signup"
//               className="block mt-3 text-gray-300 hover:text-white"
//             >
//               Sign in as Captain →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserLogin;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navigation, ArrowLeft, Eye, EyeOff } from "lucide-react";

const UserLogin = () => {
  const [showPassword, setShowPassword] = useState(false);

  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex text-white lg:w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        {/* Glow Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 text-center px-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <Navigation className="h-10 w-10 text-blue-400" />
            <span className="text-3xl font-bold">SwiftRoute</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Welcome <span className="text-blue-400">Back</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-sm mx-auto">
            Your next ride is just a login away. Fast, safe, and reliable.
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 text-white flex items-center justify-center px-6 sm:px-10">
        <div className="w-full max-w-md">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          {/* CARD */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 shadow-xl">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Navigation className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">SwiftRoute</span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Sign In</h1>
              <p className="text-gray-400 text-sm">
                Enter your credentials to access your account
              </p>
            </div>

            {/* FORM */}
            <form className="space-y-5">
              {/* EMAIL */}
              <input
                type="email"
                placeholder="Enter your email"
                className={inputClass}
              />

              {/* PASSWORD */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Sign In
              </button>
            </form>

            {/* LINKS */}
            <div className="mt-6 text-center text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link to="/user-signup" className="text-blue-400 hover:underline">
                Create one
              </Link>
              <Link
                to="/captain-login"
                className="block mt-3 text-gray-300 hover:text-white"
              >
                Sign in as Captain →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
