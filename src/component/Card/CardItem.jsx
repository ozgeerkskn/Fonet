import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Chip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeCartItem, updateCartItem } from "../State/Cart/Action";
const CardItem = ({ item }) => {
  const { auth, cart } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatcher = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleUpdateCartItem = (value) => {
    if (value === -1 && item.quantity === 1) {
      handleRemoveCartItem();
    }
    const data = { cartItemId: item.id, quantity: item.quantity + value };
    dispatcher(updateCartItem({ data, jwt }));
  };

  const handleRemoveCartItem = () => {
    dispatcher(removeCartItem({ cartItemId: item.id, jwt: auth.jwt || jwt }));
  };
  return (
    <div className="px-5">
      <div className="lg:flex items-center lg:space-x-5">
        <div>
          <img
            className="w-[7rem] h-[7rem] object-cover"
            src={item.property.images[0]}
            alt=""
          />
        </div>
        <div className="flex items-center justify-between lg:w-[70%]">
          <div className="space-y-1 lg:space-y-3 w-full">
            <p>{item.property.name}</p>
            <div className="flex items-center justify-between">
              <p>₺{item.totalPrice}</p>
              <div className="flex items-center space-x-1">
                <IconButton onClick={() => handleUpdateCartItem(-1)}>
                  <RemoveCircleOutlineIcon />
                </IconButton>
                <div className="w-5 h-5 text-xs flex items-center justify-center">
                  {item.quantity}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-3 space-x-2">
        {item.features.map((feature) => (
          <Chip label={feature} />
        ))}
      </div>
    </div>
  );
};

export default CardItem;
