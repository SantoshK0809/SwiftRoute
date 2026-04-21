import { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  MapPin,
  Save,
  X,
  Camera,
} from "lucide-react";
import LoginNavbar from "../components/LoginNavbar.jsx";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "Santosh",
    lastName: "Kirtane",
    email: "santosh@email.com",
    phone: "+91 9876543210",
    location: "Pune, India",
    bio: "MERN developer building real-time apps.",
    avatarInitials: "SK",
  });

  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profileImage, setprofileImage] = useState("");
  const [address, setAddress] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUserProfile() {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
          },
        );
        const user = res.data.user;
        setFirstname(user.fullname.firstname || "");
        setLastname(user.fullname.lastname || "");
        setEmail(user.email || "");
        setPhone(user.phone || "");
        setAddress(user.location || "");
        setprofileImage(user.profileImage?.url || "");
      } catch (error) {
        console.log(
          `Failed while fetching user profile. ERROR MESSAGE - ${error.message}, FULL ERROR ${error}`,
        );
      }
    }
    fetchUserProfile();
  }, []);

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
  };

  const validate = () => {
    let err = {};
    if (!formData.firstName) err.firstName = "Required";
    if (!formData.email.includes("@")) err.email = "Invalid email";
    if (!formData.phone) err.phone = "Required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("fullname", JSON.stringify({
      firstname,
      lastname,
    }));
    formDataToSend.append("email", email);
    formDataToSend.append("phone", phone);
    formDataToSend.append("location", address);
    
    // Only append file if user selected one
    if (selectedFile) {
      formDataToSend.append("profileImage", selectedFile);
    }

    setIsSaving(true);

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/user/update-profile`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      toast.success(res.data.message);
      setPhone("");
      setFirstname("");
      setLastname("");
      setEmail("");
      setAddress("");
      setSelectedFile(null);
      navigate("/user/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white relative overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />
      <LoginNavbar />

      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-32 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <main className="relative z-10 pt-24 px-4 pb-12">
        <div className="max-w-3xl mx-auto">
          {/* BACK */}
          <Link
            to="/profile"
            className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
          >
            <ArrowLeft size={16} />
            Back to profile
          </Link>

          {/* HEADER */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold">Edit Profile</h1>
            <p className="text-gray-400 text-sm">
              Update your personal information
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* AVATAR */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex gap-6 items-center">
              <div className="relative">
                <div className="h-24 w-24 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-xl font-bold">
                  <img
                    src={selectedFile ? URL.createObjectURL(selectedFile) : profileImage}
                    alt="image"
                  />
                </div>
                {/* <input type="file" className="absolute -bottom-2 -right-2 h-8 w-8 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10">
                  <Camera size={14} />
                </input> */}
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setSelectedFile(file);
                      console.log("File selected:", file.name);
                    }
                  }}
                  className="hidden"
                  id="avatarInput"
                  ref={fileInputRef}
                />
                <label
                  htmlFor="avatarInput"
                  className="absolute -bottom-2 -right-2 h-8 w-8 bg-gray-800 rounded-lg flex items-center justify-center border border-white/10 cursor-pointer hover:bg-gray-700"
                >
                  <Camera size={14} />
                </label>
              </div>

              <div>
                <h2 className="font-semibold">Profile Photo</h2>
                <p className="text-sm text-gray-400">JPG, PNG. Max 5MB</p>
              </div>
            </div>

            {/* PERSONAL INFO */}
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold mb-4">Personal Info</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* FIRST NAME */}
                <div>
                  <label className="text-sm text-gray-400">First Name</label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={14}
                    />
                    <input
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-red-400 text-xs">{errors.firstName}</p>
                  )}
                </div>

                {/* LAST NAME */}
                <div>
                  <label className="text-sm text-gray-400">Last Name</label>
                  <div className="relative">
                    <User
                      className="absolute left-3 top-3 text-gray-400"
                      size={14}
                    />
                    <input
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>

                {/* EMAIL */}
                <div className="sm:col-span-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <div className="relative">
                    <Mail
                      className="absolute left-3 top-3 text-gray-400"
                      size={14}
                    />
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs">{errors.email}</p>
                  )}
                </div>

                {/* PHONE */}
                <div>
                  <label className="text-sm text-gray-400">Phone</label>
                  <div className="relative">
                    <Phone
                      className="absolute left-3 top-3 text-gray-400"
                      size={14}
                    />
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>

                {/* LOCATION */}
                <div>
                  <label className="text-sm text-gray-400">Location</label>
                  <div className="relative">
                    <MapPin
                      className="absolute left-3 top-3 text-gray-400"
                      size={14}
                    />
                    <input
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 p-2 mt-1 bg-black/40 border border-white/10 rounded"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* BIO */}
            {/* <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6">
              <h2 className="font-semibold mb-3">About</h2>

              <textarea
                value={formData.bio}
                onChange={handleChange("bio")}
                className="w-full p-3 bg-black/40 border border-white/10 rounded resize-none"
                rows={4}
              />
            </div> */}

            {/* ACTIONS */}
            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => navigate("/user/profile")}
                className="px-4 py-2 border border-white/20 rounded flex items-center gap-2"
              >
                <X size={14} /> Cancel
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

export default EditProfile;
