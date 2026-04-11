// import React from "react";
// import { Link } from "react-router-dom";

// const Home = () => {
//   return (
//     <div>
//       <div className="bg-cover bg-center bg-[url(https://media.istockphoto.com/id/526811099/vector/traffic-lights.jpg?s=612x612&w=0&k=20&c=tPhxqLdoGJ4Wrnj3sUr7a46mIh1lg_Z7Z8qIUXm1rbE=)] h-screen pt-8 w-full flex justify-between flex-col bg-red-500">
//         <img
//           className="w-16 ml-8"
//           src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
//           alt="swiftroute_logo"
//         />
//         <div className="bg-white py-4 pb-7 px-4">
//           <h2 className="text-3xl font-bold">Get Started with SwiftRoute</h2>
//           <Link
//             to={"/user-signup"}
//             className="flex items-center justify-center w-full bg-black text-white py-3 rounded mt-5"
//           >
//             Continue
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Navigation, Car, Shield, Zap } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="bg-[#020617] text-white min-h-screen">
      {/* HEADER */}

      {/* HERO */}
      <section className="pt-28 pb-20 px-6 md:px-16 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT */}
        <div>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Ride the Future <br /> with SwiftRoute
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Fast, reliable, and smart transportation at your fingertips.
            Experience seamless rides built for modern cities.
          </p>

          <div className="flex gap-4 mt-8">
            <Link
              to="/user-signup"
              className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded-lg font-semibold transition"
            >
              Get Started
            </Link>

            <Link
              to="/user-login"
              className="border border-gray-500 px-6 py-3 rounded-lg hover:bg-white/10 transition"
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 blur-3xl"></div>

          <img
            src="https://media.istockphoto.com/id/526811099/vector/traffic-lights.jpg?s=612x612&w=0&k=20&c=tPhxqLdoGJ4Wrnj3sUr7a46mIh1lg_Z7Z8qIUXm1rbE="
            alt="car"
            className="relative rounded-2xl shadow-2xl border border-white/10"
          />
        </div>
      </section>

      {/* HOW IT WORKS */}

      <section className="px-6 md:px-16 py-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
            Simple & Fast
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            How It Works
          </h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MapPin,
              title: "Sign Up",
              desc: "Create your account in seconds. Just your name, phone, and you're in.",
              step: "01",
            },
            {
              icon: Navigation,
              title: "Book a Ride",
              desc: "Enter pickup & drop-off locations. Choose your ride type and confirm.",
              step: "02",
            },
            {
              icon: Car,
              title: "Enjoy the Ride",
              desc: "Your driver arrives fast. Sit back, relax, and enjoy the journey.",
              step: "03",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="group relative p-8 rounded-2xl bg-white/5 border border-white/10 
                   hover:border-blue-400/40 transition-all duration-300 
                   hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
            >
              {/* Step Number */}
              <span
                className="absolute top-6 right-6 text-6xl font-bold text-white/5 
                         group-hover:text-blue-400/10 transition-colors"
              >
                {item.step}
              </span>

              {/* Icon */}
              <div
                className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 
                        group-hover:bg-blue-500/20 transition-colors"
              >
                <item.icon className="h-6 w-6 text-blue-400" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {item.title}
              </h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}

      <section className="px-6 md:px-16 py-24 bg-white/[0.03]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-blue-400 text-sm font-semibold uppercase tracking-wider mb-3">
              Why SwiftRoute
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Built Different
            </h2>
          </div>

          {/* Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: MapPin,
                title: "Real-time Tracking",
                desc: "Track your ride live on the map with pinpoint precision and ETA updates.",
              },
              {
                icon: Shield,
                title: "Verified Drivers",
                desc: "Every driver is background-checked and rated. Safety is our top priority.",
              },
              {
                icon: Zap,
                title: "Smart Pricing",
                desc: "AI-powered fare estimates. No surge surprises — transparent pricing always.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group p-8 rounded-2xl bg-white/5 border border-white/10 
                     hover:border-blue-400/40 transition-all duration-300 
                     hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]"
              >
                {/* Icon */}
                <div
                  className="h-12 w-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-5 
                          group-hover:bg-blue-500/20 transition-colors"
                >
                  <item.icon className="h-6 w-6 text-blue-400" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.title}
                </h3>

                {/* Desc */}
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="py-24 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <div
            className="relative p-10 md:p-16 rounded-3xl bg-white/5 border border-white/10 
                    shadow-[0_0_60px_rgba(59,130,246,0.15)] overflow-hidden"
          >
            {/* Glow Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>

            <div className="relative">
              {/* Heading */}
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Start Your Journey <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>

              {/* Description */}
              <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
                Join thousands of riders already moving smarter with SwiftRoute.
              </p>

              {/* Button */}
              <Link
                to="/user-signup"
                className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-lg font-semibold transition group"
              >
                Join SwiftRoute
                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
    </div>
  );
};

export default LandingPage;
