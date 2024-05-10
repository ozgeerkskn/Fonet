import React, { useEffect } from "react";
import "./Home.css";
import MultiItemCarousel from "./MultiItemCarousel";
import RealEstateCard from "../RealEstate/RealEstateCard";
import { useDispatch, useSelector } from "react-redux";
import { getAllRealEstatesAction } from "../State/RealEstate/Action";
import { useNavigate } from "react-router-dom";
import { findCart } from "../State/Cart/Action";

const realEstates = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
const Home = () => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { realEstate } = useSelector((store) => store);
  const navigate = useNavigate();

  console.log("real estate", realEstate);

  useEffect(() => {
    dispatch(getAllRealEstatesAction(jwt));
  }, []);

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">
            Fonet Real Estate
          </p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">
            Find the real estate you want here: House, office, land, store and
            more
          </p>
        </div>

        <div className="cover absolute top-0 left-0 right-0"></div>
        <div className="fadout"></div>
      </section>
      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">
          Best Properties
        </p>
        <MultiItemCarousel />
      </section>

      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-gray-400 pb-5">
          Favorite properties you've viewed before
        </h1>
        <div className="flex flex-wrap items-center justify-around gap-5">
          {realEstate.realEstates.map((item) => (
            <RealEstateCard item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
