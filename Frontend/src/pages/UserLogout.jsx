import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogout = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);

  useEffect(() => {
    const handleLogout = async () => {
      const token = localStorage.getItem("token");

      const res = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/user/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            setUser(null);
            localStorage.removeItem("token");
            navigate("/user-login");
          }
        })
        .catch((err) => {
          console.log(err.response?.data?.message || "Something went wrong");
        });
    };

    handleLogout();
  }, [navigate, setUser]);

  return <div>Logging out...</div>;
};

export default UserLogout;
