import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import UserLogout from "./pages/UserLogout";
import CaptainLogout from "./pages/CaptainLogout";
import CaptainHome from "./pages/CaptainHome";
import NotFound from "./pages/NotFound";
import CaptainProtectWapper from "./pages/CaptainProtectWapper";
import LoginNavbar from "./components/LoginNavbar";

const App = () => {
  const token = localStorage.getItem("token");
  return (
    <div>
      {/* {token ? <LoginNavbar /> : <Navbar />} */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/user-signup" element={<UserSignup />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/captain-signup" element={<CaptainSignup />} />
        <Route path="/captain-login" element={<CaptainLogin />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-home"
          element={
            <UserProtectWrapper>
              <CaptainHome />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/user/logout"
          element={
            <UserProtectWrapper>
              <UserLogout />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain/logout"
          element={
            <CaptainProtectWapper>
              <CaptainLogout />
            </CaptainProtectWapper>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* {token ? null : <Footer />} */}
    </div>
  );
};

export default App;
