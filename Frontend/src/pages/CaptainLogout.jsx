import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainLogout = () => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      // e.preventDefault();
      const token = localStorage.getItem("token");

      const res = await axios
        .get(`${import.meta.env.VITE_BASE_URL}/api/captain/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            console.log(res.data);
            setCaptain(null);
            localStorage.removeItem("token");
            navigate("/captain-login");
          }
        })
        .catch((err) => {
          console.log(err?.response?.data?.message || "Something went wrong");
        });
    };

    handleLogout();
  }, [navigate, setCaptain]);

  return <div>Wait for logout process...</div>;
};

export default CaptainLogout;
