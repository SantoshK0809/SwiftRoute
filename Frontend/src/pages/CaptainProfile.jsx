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
  Car,
  Clock,
  Gauge,
  Wallet,
  TrendingUp,
  Award,
  FileText,
  Shield,
  Settings,
  BadgeCheck,
} from "lucide-react";
import LoginNavbar from "../components/LoginNavbar";
import { useEffect, useState } from "react";
import axios from "axios";

const CaptainProfile = () => {
  const [currCaptain, setCurrCaptain] = useState(null);

  const captain = {
    name: "Santosh",
    email: "captain@email.com",
    phone: "+91 9876543210",
    location: "Pune, India",
    memberSince: "2023",
    rating: 4.9,
    totalTrips: 320,
    tier: "Gold Captain",
    avatarInitials: "SK",
    vehicle: {
      model: "Swift Dzire",
      plate: "MH12AB1234",
      color: "White",
      type: "Sedan",
    },
  };

  const todayStats = [
    { label: "Earnings", value: "₹1,250", icon: Wallet },
    { label: "Hours", value: "8.5h", icon: Clock },
    { label: "KM Driven", value: "120", icon: Gauge },
    { label: "Trips", value: "12", icon: Car },
  ];

  const lifetimeStats = [
    { label: "Total Trips", value: captain.totalTrips, icon: Car },
    { label: "Rating", value: captain.rating, icon: Star },
    { label: "Acceptance", value: "95%", icon: TrendingUp },
    { label: "Awards", value: "6", icon: Award },
  ];

  const recentTrips = [
    {
      id: 1,
      from: "Shivaji Nagar",
      to: "Hinjewadi",
      date: "Today",
      earned: "₹220",
    },
    {
      id: 2,
      from: "Baner",
      to: "Kothrud",
      date: "Today",
      earned: "₹180",
    },
  ];

  const accountItems = [
    { label: "Vehicle Docs", icon: FileText },
    { label: "Payout Methods", icon: Wallet },
    { label: "Security", icon: Shield },
    { label: "Settings", icon: Settings },
  ];

  // useEffect(async () => {
  //   try {
  //   const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
  //     headers: {
  //       Authorization: `Bearer ${localStorage.getItem("captainToken")}`,
  //     },
  //   });
  //   console.log("Captain profile data:", res.data);
  //   } catch (error) {
  //     console.error("Error fetching captain profile:", error.response?.data || error.message);
  //   }
  // }, []);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProfile() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
          },
        );

        // console.log("Captain profile data:", res.data);
        setCurrCaptain(res.data.captain);

        console.log("Captain profile data:", res.data);
      } catch (error) {
        if (error.name === "CanceledError") return;

        console.error(
          "Error fetching captain profile:",
          error.response?.data || error.message,
        );
      }
    }

    fetchProfile();

    return () => {
      controller.abort(); // cleanup
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <LoginNavbar />

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 pt-24 pb-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* BACK */}
          <Link
            to="/captain-home"
            className="flex gap-2 hover:text-white text-gray-400 mb-6"
          >
            <ArrowLeft size={16} />
            Back to dashboard
          </Link>

          {/* HERO */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
            <div className="flex gap-6 items-center flex-wrap">
              {/* AVATAR */}
              <div className="relative">
                {currCaptain && (
                  <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                    {currCaptain?.profileImage}
                  </div>
                )}
                <span className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-400 rounded-full border border-black animate-pulse" />
              </div>

              {/* INFO */}
              <div className="flex-1">
                {/* <div className="flex gap-2 items-center flex-wrap">
                  <h1 className="text-2xl font-bold">{captain.name}</h1>

                  <span className="text-xs bg-blue-500/20 px-2 rounded flex items-center gap-1">
                    <Star size={10} /> {captain.rating}
                  </span>

                  <span className="text-xs bg-purple-500/20 px-2 rounded flex items-center gap-1">
                    <BadgeCheck size={10} /> {captain.tier}
                  </span>
                </div> */}

                {currCaptain && (
                  <div className="flex gap-2 items-center flex-wrap">
                    <h1 className="text-2xl font-bold">
                      {currCaptain.fullname.firstname}{" "}
                      {currCaptain.fullname.lastname}
                    </h1>

                    <span className="text-xs bg-blue-500/20 px-2 rounded flex items-center gap-1">
                      <Star size={10} /> {currCaptain?.rating || "N/A"}
                    </span>

                    <span className="text-xs bg-purple-500/20 px-2 rounded flex items-center gap-1">
                      <BadgeCheck size={10} /> {currCaptain?.tier || "N/A"}
                    </span>
                  </div>
                )}

                {currCaptain && (
                  <p className="text-gray-400 text-sm">
                    Driving since{" "}
                    {new Date(currCaptain.createdAt).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      },
                    )}
                  </p>
                )}

                <div className="flex gap-2 mt-3">
                  <Link
                    to="/captain/edit"
                    className="px-3 py-1 bg-blue-500 rounded flex items-center gap-1 text-sm"
                  >
                    <Edit3 size={12} />
                    Edit
                  </Link>
                  <Link
                    to="/captain-home"
                    className="px-3 py-1 border border-white/20 rounded text-sm flex items-center gap-1"
                  >
                    <Car size={12} />
                    Dashboard
                  </Link>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            {/* <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-sm">
              <div className="flex gap-2"><Mail size={14} /> {captain.email}</div>
              <div className="flex gap-2"><Phone size={14} /> {captain.phone}</div>
              <div className="flex gap-2"><MapPin size={14} /> {captain.location}</div>
            </div> */}
            {currCaptain && (
              <div className="grid sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-white/10 text-sm">
                <div className="flex gap-2">
                  <Mail size={16} /> {currCaptain?.email}
                </div>
                <div className="flex gap-2">
                  <Phone size={16} /> {currCaptain?.phone || "Not provided"}
                </div>
                <div className="flex gap-2">
                  <MapPin size={16} /> {currCaptain?.address || "Pune, India"}
                </div>
              </div>
            )}
          </div>

          {/* TODAY STATS */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {todayStats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center"
                >
                  <Icon className="mx-auto mb-2 text-blue-400" size={18} />
                  <h3 className="font-bold">{s.value}</h3>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* VEHICLE */}
          <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 mb-6">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              Vehicle <BadgeCheck size={14} className="text-green-400" />
            </h2>

            {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              <div><p className="text-gray-400">Model</p>{captain.vehicle.model}</div>
              <div><p className="text-gray-400">Plate</p>{captain.vehicle.plate}</div>
              <div><p className="text-gray-400">Color</p>{captain.vehicle.color}</div>
              <div><p className="text-gray-400">Type</p>{captain.vehicle.type}</div>
            </div> */}
            {currCaptain && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-400">Model</p>
                  {currCaptain.vehicle.model}
                </div>
                <div>
                  <p className="text-gray-400">Plate</p>
                  {currCaptain.vehicle.plate}
                </div>
                <div className="capitalize">
                  <p className="text-gray-400">Color</p>
                  {currCaptain.vehicle.color}
                </div>
                <div className="capitalize">
                  <p className="text-gray-400">Type</p>
                  {currCaptain.vehicle.vehicleType}
                </div>
              </div>
            )}
          </div>

          {/* LIFETIME */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {lifetimeStats.map((s, idx) => {
              const Icon = s.icon;
              return (
                <div
                  key={idx}
                  className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4 text-center"
                >
                  <Icon className="mx-auto mb-2 text-blue-400" size={18} />
                  <h3 className="font-bold">{s.value}</h3>
                  <p className="text-xs text-gray-400">{s.label}</p>
                </div>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {/* TRIPS */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="mb-4 font-bold">Recent Trips</h2>

              {recentTrips.map((t, idx) => (
                <div
                  key={idx}
                  className="mb-3 p-3 bg-black/30 rounded-xl border border-white/10"
                >
                  <p>
                    {t.from} → {t.to}
                  </p>
                  <p className="text-xs text-gray-400 flex gap-1 items-center">
                    <Calendar size={12} /> {t.date}
                  </p>
                  <p className="font-semibold">+{t.earned}</p>
                </div>
              ))}
            </div>

            {/* ACCOUNT */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="mb-4 font-bold">Account</h2>

              {accountItems.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 mb-2"
                  >
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}

              <Link
                to={"/captain/logout"}
                className="w-full mt-4 p-3 bg-red-500/10 text-red-400 rounded flex items-center justify-center gap-2"
              >
                <LogOut size={14} />
                Logout
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CaptainProfile;
