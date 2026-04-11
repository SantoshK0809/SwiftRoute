import React, { useContext, useEffect, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading.jsx";

const CaptainProtectWapper = ({ children }) => {
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/captain-login");
      return;
    }

    axios
      .get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          setCaptain(res.data?.captain);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err?.response?.data?.message || "Something went wrong");
        localStorage.removeItem("token");
        navigate("/captain-login");
      });
  }, [token]);

  //   try {
  //     async function getCaptain() {
  //       const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/captain/profile`, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(res => {
  //         if(res.status === 200){
  //           setCaptain(res.data?.captain)
  //           setIsLoading(false);
  //         }
  //       }).catch(err => {
  //         console.log(err?.response?.data?.message || "Something went wrong");
  //         localStorage.removeItem("token")
  //         navigate("/captain-login")
  //       })
  //     }
  //   } catch (err) {
  //     console.log(err?.response?.data?.message || "Something went wrong");
  //     localStorage.removeItem("token")
  //     navigate("/captain-login")
  //   }

  if (isLoading) {
    return <Loading />;
  }
  return children;
};

export default CaptainProtectWapper;
