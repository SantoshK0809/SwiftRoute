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
import Riding from "./pages/Riding";
import CaptainRiding from "./pages/CaptainRiding";
import UserProfile from "./pages/UserProfile";
import EditProfile from "./pages/EditProfile";
import CaptainProfile from "./pages/CaptainProfile";
import CaptainEditProfile from "./pages/CaptainEditProfile";

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
        <Route path="/user/profile" element={
          <UserProtectWrapper>
            <UserProfile />
          </UserProtectWrapper>
        } />
        <Route path="/user/edit" element={
          <UserProtectWrapper>
            <EditProfile />
          </UserProtectWrapper>
        } />
        <Route path="/captain/profile" element={
          <CaptainProtectWapper>
            <CaptainProfile />
          </CaptainProtectWapper>
        } />
        <Route path="/captain/edit" element={
          <CaptainProtectWapper>
            <CaptainEditProfile />
          </CaptainProtectWapper>
        } />
        <Route
          path="/captain-home"
          element={
            <CaptainProtectWapper>
              <CaptainHome />
            </CaptainProtectWapper>
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
        <Route
          path="/riding"
          element={
            <UserProtectWrapper>
              <Riding />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/captain-riding"
          element={
            <CaptainProtectWapper>
              <CaptainRiding />
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
