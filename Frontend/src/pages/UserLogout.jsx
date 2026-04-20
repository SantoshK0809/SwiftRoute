import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";
import Loading from "../components/Loading";

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
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");
            navigate("/user-login");
          }
        })
        .catch((err) => {
          console.log(err.response?.data?.message || "Something went wrong");
        });
    };

    handleLogout();
  }, [navigate, setUser]);

  return <Loading/>;
};

export default UserLogout;
