import React from "react";
import Navbar from "../component/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../component/Home/Home";
import RealEstateDetails from "../component/RealEstate/RealEstateDetails";
import Cart from "../component/Card/Cart";
import Profile from "../component/Profile/Profile";
import Auth from "../component/Auth/Auth";

const CustomerRoute = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account/:register" element={<Home />} />
        <Route
          path="/realEstate/:city/:title/:id"
          element={<RealEstateDetails />}
        />
        <Route path="/card" element={<Cart />} />
        <Route path="/my-profile/*" element={<Profile />} />
      </Routes>
      <Auth />
    </div>
  );
};

export default CustomerRoute;
