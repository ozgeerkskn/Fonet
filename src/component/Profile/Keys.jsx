import React, { useEffect } from "react";
import KeyCard from "./KeyCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUsersKeys } from "../State/Key/Action";

const Keys = () => {
  const { auth, cart, order } = useSelector((store) => store);
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUsersKeys(jwt));
  }, [auth.jwt]);

  return (
    <div className="flex items-center flex-col">
      <h1 className="text-xl text-center py-7 font-semibold">My Keys</h1>

      <div className="space-y-5 w-full lg:w-1/2">
        {order.orders.map((order) =>
          order.items.map((item) => <KeyCard order={order} />)
        )}
      </div>
    </div>
  );
};

export default Keys;
