import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import Loading from "../components/Loading";

const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      navigate("/user-login");
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL || "http://localhost:3000"}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => {
      if (res.status === 200) {
        console.log("User profile fetched successfully");
        setUser(res.data);
        setIsLoading(false);
      }
    }).catch((err) => {
      console.error("Error fetching user profile:", err);
      localStorage.removeItem("token");
      navigate("/user-login");
    });
  }, [token, navigate, setUser]);

  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
