// import React from "react";
// import { Link } from "react-router-dom";

// const CaptainSignup = () => {
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
//         <div className="w-full max-w-md md:max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-xl p-6 sm:p-8">
//           {/* Title */}
//           <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
//             Become a Captain 🚗
//           </h2>

//           <form className="flex flex-col gap-6">
//             {/* PERSONAL INFO */}
//             <div>
//               <h3 className="text-sm text-gray-400 mb-3">Personal Details</h3>

//               <div className="flex gap-3">
//                 <div className="w-1/2">
//                   <input
//                     type="text"
//                     required
//                     placeholder="First name"
//                     className="w-full p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                                placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                   />
//                 </div>

//                 <div className="w-1/2">
//                   <input
//                     type="text"
//                     placeholder="Last name"
//                     className="w-full p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                                placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                   />
//                 </div>
//               </div>

//               <input
//                 type="email"
//                 required
//                 placeholder="Email"
//                 className="w-full mt-3 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                            placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//               />

//               <input
//                 type="password"
//                 required
//                 placeholder="Password"
//                 className="w-full mt-3 p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                            placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//               />
//             </div>

//             {/* VEHICLE INFO */}
//             <div>
//               <h3 className="text-sm text-gray-400 mb-3">Vehicle Details</h3>

//               <div className="grid grid-cols-2 gap-3">
//                 <input
//                   type="text"
//                   placeholder="Vehicle Color"
//                   className="p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />

//                 <input
//                   type="text"
//                   required
//                   placeholder="Plate Number"
//                   className="p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />

//                 <input
//                   type="number"
//                   required
//                   placeholder="Capacity"
//                   className="p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              placeholder-gray-400 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 />

//                 <select
//                   required
//                   className="p-2.5 sm:p-3 rounded-lg bg-white/10 border border-white/20
//                              text-gray-300 outline-none focus:border-blue-500 text-sm sm:text-base"
//                 >
//                   <option
//                     className="bg-gray-400 text-white"
//                     value=""
//                     disabled
//                     selected
//                   >
//                     Vehicle Type
//                   </option>
//                   <option className="bg-gray-600 text-white" value="car">
//                     Car
//                   </option>
//                   <option className="bg-gray-600 text-white" value="auto">
//                     Auto
//                   </option>
//                   <option className="bg-gray-600 text-white" value="motorcycle">
//                     Motorcycle
//                   </option>
//                 </select>
//               </div>
//             </div>

//             {/* BUTTON */}
//             <button
//               type="submit"
//               className="bg-blue-500 hover:bg-blue-600 py-2.5 sm:py-3 rounded-lg
//                          font-semibold transition text-sm sm:text-base"
//             >
//               Register as Captain
//             </button>
//           </form>

//           {/* LINKS */}
//           <div className="text-center text-xs sm:text-sm text-gray-400 mt-6">
//             <p>
//               Already have an account?{" "}
//               <Link
//                 to="/captain-login"
//                 className="text-blue-400 hover:underline"
//               >
//                 Login
//               </Link>
//             </p>

//             <Link
//               to="/user-signup"
//               className="block mt-3 text-gray-300 hover:text-white"
//             >
//               Sign up as User →
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CaptainSignup;

import React from "react";
import { Link } from "react-router-dom";
import { Navigation, ArrowLeft } from "lucide-react";

const CaptainSignup = () => {
  const inputClass =
    "w-full h-12 px-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition";

  return (
    <div className="min-h-screen bg-[#020617] flex">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center border-r border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>

        <div className="relative z-10 text-center text-white px-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <Navigation className="h-10 w-10 text-blue-400" />
            <span className="text-3xl font-bold">SwiftRoute</span>
          </Link>

          <h2 className="text-4xl font-bold mb-4">
            Drive with <span className="text-blue-400">SwiftRoute</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-sm mx-auto">
            Earn on your schedule. Join as a captain and start driving today.
          </p>

          <div className="mt-10 space-y-4 text-left max-w-xs mx-auto text-gray-400">
            <p>✔ Flexible earnings</p>
            <p>✔ Consistent ride demand</p>
            <p>✔ Simple onboarding process</p>
          </div>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="w-full lg:w-1/2 flex items-center lg:mt-24 mt-12 justify-center px-6 sm:px-10">
        <div className="w-full max-w-2xl">
          {/* Back */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="text-sm">Back to home</span>
          </Link>

          {/* CARD */}
          <div className="rounded-2xl bg-white/5 text-white backdrop-blur-xl border border-white/10 p-6 sm:p-8 shadow-xl">
            {/* Mobile Logo */}
            <div className="flex items-center gap-2 mb-6 lg:hidden">
              <Navigation className="h-6 w-6 text-blue-400" />
              <span className="text-lg font-bold">SwiftRoute</span>
            </div>

            {/* Title */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Become a Captain</h1>
              <p className="text-gray-400 text-sm">
                Enter your details to start driving
              </p>
            </div>

            <form className="flex flex-col gap-6">
              {/* PERSONAL */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Personal Details</h3>

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

                <input
                  type="email"
                  placeholder="Email"
                  className={`${inputClass} mt-3`}
                />

                <input
                  type="password"
                  placeholder="Password"
                  className={`${inputClass} mt-3`}
                />
              </div>

              {/* VEHICLE */}
              <div>
                <h3 className="text-sm text-gray-400 mb-3">Vehicle Details</h3>

                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Vehicle Color"
                    className={inputClass}
                  />
                  <input
                    type="text"
                    placeholder="Plate Number"
                    className={inputClass}
                  />
                  <input
                    type="number"
                    placeholder="Capacity"
                    className={inputClass}
                  />

                  <select className={inputClass}>
                    <option className="bg-gray-400 text-white" value="">
                      Vehicle Type
                    </option>
                    <option className="bg-gray-600 text-white" value="car">
                      Car
                    </option>
                    <option className="bg-gray-600 text-white" value="auto">
                      Auto
                    </option>
                    <option
                      className="bg-gray-600 text-white"
                      value="motorcycle"
                    >
                      Motorcycle
                    </option>
                  </select>
                </div>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full h-12 bg-blue-500 hover:bg-blue-600 rounded-lg font-semibold transition"
              >
                Register as Captain
              </button>
            </form>

            {/* LINKS */}
            <div className="text-center text-sm text-gray-400 mt-6">
              Already have an account?{" "}
              <Link
                to="/captain-login"
                className="text-blue-400 hover:underline"
              >
                Login
              </Link>
              <Link
                to="/user-signup"
                className="block mt-3 text-gray-300 hover:text-white"
              >
                Sign up as User →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaptainSignup;
