import React, { useEffect } from "react";
import AdminSideBar from "./AdminSideBar";
import { Route, Routes } from "react-router-dom";

import Orders from "../Orders/Orders";
import Property from "../Property/Property";
import PropertyCategory from "../PropertyCategory/PropertyCategory";
import Features from "../Features/Features";
import Events from "../Events/Events";
import RealEstateDetails from "./RealEstateDetails";
import RealEstateDashboard from "../Dashboard/Dashboard";
import CreatePropertyForm from "../Property/CreatePropertyForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealEstateById,
  getRealEstatesCategory,
} from "../../component/State/RealEstate/Action";
import { getPropertyItemsByRealEstateId } from "../../component/State/Property/Action";
import { getUsersKeys } from "../../component/State/Key/Action";
import { fetchRealEstatesOrder } from "../../component/State/Real Estate Order/Action";

const Admin = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { realEstate } = useSelector((store) => store);
  const handleClose = () => {};
  useEffect(() => {
    dispatch(
      getRealEstatesCategory({
        jwt,
        realEstateId: realEstate.usersRealEstate?.id,
      })
    );
    dispatch(
      fetchRealEstatesOrder({
        jwt,
        realEstateId: realEstate.usersRealEstate?.id,
      })
    );
  }, []);
  return (
    <div>
      <div className="lg:flex justify-between">
        <div>
          <AdminSideBar handleClose={handleClose} />
        </div>
        <div className="lg:w-[80%]">
          <Routes>
            <Route path="/" element={<RealEstateDashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/property" element={<Property />} />
            <Route path="/category" element={<PropertyCategory />} />
            <Route path="/features" element={<Features />} />
            <Route path="/event" element={<Events />} />
            <Route path="/details" element={<RealEstateDetails />} />
            <Route path="/add-property" element={<CreatePropertyForm />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Admin;
