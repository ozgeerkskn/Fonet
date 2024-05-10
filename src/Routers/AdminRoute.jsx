import React from "react";
import { Route, Routes } from "react-router-dom";
import CreateRealEstateForm from "../AdminComponent/CreateRealEstateForm/CreateRealEstateForm";
import Admin from "../AdminComponent/Admin/Admin";
import { useSelector } from "react-redux";

const AdminRoute = () => {
  const { realEstate } = useSelector((store) => store);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            !realEstate.usersRealEstate ? <CreateRealEstateForm /> : <Admin />
            // false ? <CreateRealEstateForm /> : <Admin />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default AdminRoute;
