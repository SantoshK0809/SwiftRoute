// import { Link } from "react-router-dom";
// import {
//   ArrowLeft,
//   Mail,
//   Phone,
//   MapPin,
//   Star,
//   Calendar,
//   LogOut,
//   Edit3,
//   Navigation,
//   Car,
//   Clock,
//   TrendingUp,
// } from "lucide-react";
// import LoginNavbar from "../components/LoginNavbar";

// const UserProfile = () => {
//   const user = {
//     name: "Santosh",
//     email: "santosh@email.com",
//     phone: "+91 9876543210",
//     location: "Pune, India",
//     memberSince: "2024",
//     rating: 4.8,
//     totalRides: 58,
//     avatarInitials: "SK",
//   };

//   const stats = [
//     { label: "Total Rides", value: user.totalRides, icon: Car },
//     { label: "Rating", value: user.rating, icon: Star },
//     { label: "Hours Saved", value: "12h", icon: Clock },
//     { label: "CO₂ Saved", value: "9kg", icon: TrendingUp },
//   ];

//   const recentRides = [
//     {
//       id: 1,
//       from: "Shivaji Nagar",
//       to: "Hinjewadi",
//       date: "Today",
//       fare: "₹220",
//     },
//     {
//       id: 2,
//       from: "Home",
//       to: "College",
//       date: "Yesterday",
//       fare: "₹80",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-black text-white">
//       <LoginNavbar />

//       <main className="pt-24 px-4 max-w-4xl mx-auto">

//         {/* BACK */}
//         <Link to="/" className="flex items-center gap-2 mb-6 text-gray-400">
//           <ArrowLeft size={16} />
//           Back
//         </Link>

//         {/* PROFILE CARD */}
//         <div className="bg-[#111] p-6 rounded-xl mb-6 border border-white/10">
//           <div className="flex gap-5 items-center">

//             {/* AVATAR */}
//             <div className="h-20 w-20 rounded-xl bg-blue-500 flex items-center justify-center text-xl font-bold">
//               {user.avatarInitials}
//             </div>

//             {/* INFO */}
//             <div>
//               <div className="flex items-center gap-2">
//                 <h1 className="text-xl font-bold">{user.name}</h1>
//                 <span className="text-yellow-400 text-sm flex items-center gap-1">
//                   <Star size={12} /> {user.rating}
//                 </span>
//               </div>
//               <p className="text-gray-400 text-sm">
//                 Member since {user.memberSince}
//               </p>

//               <button className="mt-2 px-3 py-1 bg-blue-500 rounded text-sm flex items-center gap-1">
//                 <Edit3 size={12} /> Edit
//               </button>
//             </div>
//           </div>

//           {/* CONTACT */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-sm">
//             <div className="flex gap-2 items-center">
//               <Mail size={14} /> {user.email}
//             </div>
//             <div className="flex gap-2 items-center">
//               <Phone size={14} /> {user.phone}
//             </div>
//             <div className="flex gap-2 items-center">
//               <MapPin size={14} /> {user.location}
//             </div>
//           </div>
//         </div>

//         {/* STATS */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
//           {stats.map((stat) => {
//             const Icon = stat.icon;
//             return (
//               <div
//                 key={stat.label}
//                 className="bg-[#111] p-4 rounded-lg text-center border border-white/10"
//               >
//                 <Icon className="mx-auto mb-2" size={18} />
//                 <h3 className="font-bold">{stat.value}</h3>
//                 <p className="text-xs text-gray-400">{stat.label}</p>
//               </div>
//             );
//           })}
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">

//           {/* RIDES */}
//           <div className="bg-[#111] p-5 rounded-xl border border-white/10">
//             <h2 className="mb-4 font-bold">Recent Rides</h2>

//             {recentRides.map((ride) => (
//               <div
//                 key={ride.id}
//                 className="mb-3 p-3 bg-black rounded border border-white/10"
//               >
//                 <p className="text-sm">{ride.from} → {ride.to}</p>
//                 <p className="text-xs text-gray-400 flex items-center gap-1">
//                   <Calendar size={12} /> {ride.date}
//                 </p>
//                 <p className="text-sm font-semibold">{ride.fare}</p>
//               </div>
//             ))}
//           </div>

//           {/* ACCOUNT */}
//           <div className="bg-[#111] p-5 rounded-xl border border-white/10">
//             <h2 className="mb-4 font-bold">Account</h2>

//             <button className="w-full mb-3 p-3 bg-black rounded border border-white/10 text-left">
//               Payment Methods
//             </button>

//             <button className="w-full mb-3 p-3 bg-black rounded border border-white/10 text-left">
//               Settings
//             </button>

//             <button className="w-full p-3 bg-red-500/10 text-red-400 rounded flex items-center justify-center gap-2">
//               <LogOut size={14} />
//               Logout
//             </button>
//           </div>

//         </div>
//       </main>
//     </div>
//   );
// };

// export default UserProfile;

import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Star,
  Calendar,
  LogOut,
  Edit3,
  Navigation,
  Car,
  Clock,
  TrendingUp,
  Settings,
  Shield,
  CreditCard,
} from "lucide-react";
import LoginNavbar from "../components/LoginNavbar";

const UserProfile = () => {
  const user = {
    name: "Santosh",
    email: "santosh@email.com",
    phone: "+91 9876543210",
    location: "Pune, India",
    memberSince: "2024",
    rating: 4.8,
    totalRides: 58,
    avatarInitials: "SK",
  };

  const stats = [
    { label: "Total Rides", value: user.totalRides, icon: Car },
    { label: "Rating", value: user.rating, icon: Star },
    { label: "Hours Saved", value: "12h", icon: Clock },
    { label: "CO₂ Saved", value: "9kg", icon: TrendingUp },
  ];

  const recentRides = [
    {
      id: 1,
      from: "Shivaji Nagar",
      to: "Hinjewadi",
      date: "Today, 2:30 PM",
      fare: "₹220",
    },
    {
      id: 2,
      from: "Home",
      to: "College",
      date: "Yesterday, 9:00 AM",
      fare: "₹80",
    },
  ];

  const accountItems = [
    { label: "Payment Methods", icon: CreditCard },
    { label: "Privacy & Security", icon: Shield },
    { label: "Settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <LoginNavbar />

      {/* BACKGROUND GLOW (IMPORTANT for same feel) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">

          {/* BACK */}
          <Link
            to="/user-home"
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          {/* HERO PROFILE */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">

            <div className="flex gap-6 items-center flex-wrap">

              {/* AVATAR */}
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  {user.avatarInitials}
                </div>
                <button className="absolute -bottom-2 -right-2 h-8 w-8 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                  <Edit3 size={14} />
                </button>
              </div>

              {/* USER INFO */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold">{user.name}</h1>
                  <span className="text-xs bg-blue-500/20 px-2 py-0.5 rounded flex items-center gap-1">
                    <Star size={10} className="fill-yellow-400" />
                    {user.rating}
                  </span>
                </div>

                <p className="text-gray-400 text-sm">
                  Member since {user.memberSince}
                </p>

                <div className="flex gap-2 mt-3">
                  <Link to={"/user/edit"} className="px-3 py-1 bg-blue-500 rounded text-sm flex items-center gap-1">
                    <Edit3 size={12} />
                    Edit Profile
                  </Link>

                  <button className="px-3 py-1 border border-white/20 rounded text-sm flex items-center gap-1">
                    <Navigation size={12} />
                    Book Ride
                  </button>
                </div>
              </div>
            </div>

            {/* CONTACT STRIP */}
            <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-sm">
              <div className="flex items-center gap-2">
                <Mail size={14} /> {user.email}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> {user.phone}
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} /> {user.location}
              </div>
            </div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div key={idx} className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center">
                  <Icon className="mx-auto mb-2 text-blue-400" size={18} />
                  <h3 className="text-lg font-bold">{stat.value}</h3>
                  <p className="text-xs text-gray-400">{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">

            {/* RECENT RIDES */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Recent Rides</h2>

              {recentRides.map((ride, idx) => (
                <div key={idx} className="mb-3 p-3 bg-black/30 rounded-xl border border-white/10 hover:bg-white/5 transition">
                  <p className="text-sm">{ride.from} → {ride.to}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar size={12} /> {ride.date}
                  </p>
                  <p className="text-sm font-semibold mt-1">{ride.fare}</p>
                </div>
              ))}
            </div>

            {/* ACCOUNT */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="font-bold mb-4">Account</h2>

              {accountItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition mb-2">
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}

              <button className="w-full mt-4 p-3 bg-red-500/10 text-red-400 rounded flex items-center justify-center gap-2">
                <LogOut size={14} />
                Logout
              </button>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;