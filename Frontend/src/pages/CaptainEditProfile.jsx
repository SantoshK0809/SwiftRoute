import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Save,
  X,
  Camera,
} from "lucide-react";
import LoginNavbar from "../components/LoginNavbar";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const CaptainEditProfile = () => {
  const navigate = useNavigate();

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [plate, setPlate] = useState("");
  const [phone, setPhone] = useState("");
  const [capacity, setCapacity] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [address, setAddress] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const captain = res.data.captain;
        setFirstname(captain.fullname.firstname || "");
        setLastname(captain.fullname.lastname || "");
        setEmail(captain.email || "");
        setPhone(captain.phone || "");
        setAddress(captain.address || "");
        setModel(captain.vehicle.model || "");
        setPlate(captain.vehicle.plate || "");
        setColor(captain.vehicle.color || "");
        setVehicleType(captain.vehicle.vehicleType || "");
        setCapacity(captain.vehicle.capacity || "");
        setprofileImage(captain.profileImage || "");
      } catch (error) {
        toast.error("Failed to load profile data.");
      }
    };
    fetchProfile();
  }, []);

  const updatedCaptain = {
    fullname: {
      firstname,
      lastname,
    },
    phone,
    email,
    address,
    profileImage,
    vehicle: {
      color,
      capacity,
      model,
      vehicleType,
      plate,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!validate()) return;

    // setIsSaving(true);
    // setTimeout(() => {
    //   setIsSaving(false);
    //   navigate("/captain-profile");
    // }, 800);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/captain/update-profile`,
        updatedCaptain,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        },
      );
      toast.success(res.data.message);
      setPhone("")
      setFirstname("");
      setLastname("")
      setEmail("")
      setAddress("")
      setColor("")
      setPlate("")
      setVehicleType("")
      setModel("")
      navigate("/captain/profile");
    } catch (error) {
      toast.error("Failed to update profile.");
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />
      <LoginNavbar />

      {/* BACKGROUND */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full" />
      </div>

      <main className="relative z-10 pt-24 px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* BACK */}
          <Link
            to="/captain/profile"
            className="flex gap-2 hover:text-white text-gray-400 mb-6"
          >
            <ArrowLeft size={16} />
            Back to profile
          </Link>

          <h1 className="text-2xl font-bold mb-6">Edit Captain Profile</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AVATAR */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex gap-6 items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                  {/* {formData.avatarInitials} */}
                </div>

                <input type="file" id="avatar" className="hidden" />

                <label
                  htmlFor="avatar"
                  className="absolute -bottom-2 -right-2 h-8 w-8 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10 cursor-pointer"
                >
                  <Camera size={14} />
                </label>
              </div>

              <div>
                <h2 className="font-semibold">Profile Photo</h2>
                <p className="text-sm text-gray-400">Upload new avatar</p>
              </div>
            </div>

            {/* PERSONAL */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="mb-4 font-semibold">Personal Info</h2>

              <div className="grid gap-4">
                <div>
                  <label className="text-sm text-gray-400">Name</label>

                  <div className="relative">
                    <input
                      value={firstname}
                      onChange={(e) => {
                        setFirstname(e.target.value);
                      }}
                      placeholder="Enter firstname"
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                    <input
                      value={lastname}
                      onChange={(e) => {
                        setLastname(e.target.value);
                      }}
                      placeholder="Enter lastname"
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-4 text-gray-400"
                      size={14}
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-4 text-gray-400"
                      size={14}
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter your mobile number"
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm text-gray-400">Location</label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-4 text-gray-400"
                      size={14}
                    />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your address"
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="mb-4 font-semibold">Vehicle Details</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Model</label>
                  <input
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    placeholder="Enter your vehicle model"
                    className="w-full p-2 mt-1 bg-black/40 border border-white/10 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Plate</label>
                  <input
                    value={plate}
                      onChange={(e) => setPlate(e.target.value)}
                      placeholder="Enter your vehicle number plate"
                      className="w-full p-2 mt-1 bg-black/40 border border-white/10 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Color</label>
                  <input
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="Enter your vehicle color"
                    className="w-full p-2 mt-1 bg-black/40 border border-white/10 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Type</label>
                  <input
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    placeholder="Enter your vehicle type"
                    className="w-full p-2 mt-1 bg-black/40 border border-white/10 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Capacity</label>
                  <input
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    placeholder="Enter vehicle capacity"
                    className="w-full p-2 mt-1 bg-black/40 border border-white/10 rounded"
                  />
                </div>
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => navigate("/captain/profile")}
                className="px-4 py-2 border border-white/20 rounded flex items-center gap-2"
              >
                <X size={14} />
                Cancel
              </button>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 rounded flex items-center gap-2"
              >
                <Save size={14} />
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CaptainEditProfile;
