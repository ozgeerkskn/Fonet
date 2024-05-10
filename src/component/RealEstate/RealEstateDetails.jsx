import {
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PropertyCard from "./PropertyCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getRealEstateById,
  getRealEstatesCategory,
} from "../State/RealEstate/Action";
import { getPropertyItemsByRealEstateId } from "../State/Property/Action";

const propertyTypes = [
  { label: "All", value: "all" },
  { label: "Rent", value: "rent" },
  { label: "Non-Rent", value: "non_rent" },

  { label: "Sale", value: "sale" },
];

const property = [1, 1, 1, 1, 1, 1, 1, 1];

const RealEstateDetails = () => {
  const [propertyType, setPropertyType] = useState("all");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { auth, realEstate, property } = useSelector((store) => store);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { id, city } = useParams();

  const handleFilter = (e) => {
    setPropertyType(e.target.value);
    console.log(e.target.value, e.target.name);
  };

  const handleFilterCategory = (e, value) => {
    setSelectedCategory(value);
    console.log(e.target.value, e.target.name, value);
  };

  console.log("Real Estate", realEstate);

  useEffect(() => {
    dispatch(getRealEstateById({ jwt, realEstateId: id }));
    dispatch(getRealEstatesCategory({ jwt, realEstateId: id }));
  }, []);

  useEffect(() => {
    dispatch(
      getPropertyItemsByRealEstateId({
        jwt,
        realEstateId: id,
        rent: propertyType === "rent",
        nonrent: propertyType === "non_rent",
        sale: propertyType === "sale",
        propertyCategory: selectedCategory,
      })
    );
  }, [selectedCategory, propertyType]);

  return (
    <div className="px-5 lg:px-20">
      <section>
        <h3 className="text-gray-500 py-2 mt-10">
          Home/Turkey/Yıldız Real Estate Consultancy/3
        </h3>
        <div>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <img
                className="w-full h-[40vh] object-cover"
                src={realEstate.realEstate?.images[0]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={realEstate.realEstate?.images[1]}
                alt=""
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <img
                className="w-full h-[40vh] object-cover"
                src={realEstate.realEstate?.images[2]}
                alt=""
              />
            </Grid>
          </Grid>
        </div>
        <div className="pt-3 pb-5">
          <h1 className="text-4xl font-semibold">
            {realEstate.realEstate?.name}
          </h1>
          <p className="text-gray-500 mt-1">
            {realEstate.realEstate?.description}
          </p>
          <div className="space-y-3 mt-3">
            <p className="text-gray-500 flex items-center gap-3">
              <LocationOnIcon />
              <span>Turkey / Alacaatlı Mah.</span>
            </p>
            <p className="text-gray-500 flex items-center gap-3">
              <CalendarTodayIcon />
              <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <Divider />
      <section className="pt-[2rem] lg:flex relative">
        <div
          className="space-y-10 lg:w-[20%] filter p-5 
        "
        >
          <div className="box space-y-5 lg:sticky top-28">
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Property Type
              </Typography>

              <FormControl className="py-10 space-y-5" components={"fieldset"}>
                <RadioGroup
                  onChange={handleFilter}
                  name="propertyType"
                  value={propertyType}
                >
                  {propertyTypes.map((item) => (
                    <FormControlLabel
                      key={item.value}
                      value={item.value}
                      control={<Radio />}
                      label={item.label}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
            <Divider />
            <div>
              <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                Property Category
              </Typography>

              <FormControl className="py-10 space-y-5" components={"fieldset"}>
                <RadioGroup
                  onChange={handleFilterCategory}
                  name="property_category"
                  value={selectedCategory}
                >
                  {realEstate.categories.map((item) => (
                    <FormControlLabel
                      key={item}
                      value={item}
                      control={<Radio />}
                      label={item.name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </div>
          </div>
        </div>
        <div className="space-y-5 lg:w-[80%] lg:pl-10">
          {property.propertyItems.map((item) => (
            <PropertyCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default RealEstateDetails;
