import { Button, Card } from "@mui/material";
import React from "react";

const KeyCard = ({ item, order }) => {
  return (
    <Card className="flex justify-between items-center p-5">
      <div className="flex items-center space-x-5">
        <img className="h-16 w-16" src={item.property.images[0]} alt="" />
        <div>
          <p> {item.property.name}</p>
          <p>₺{item.totalPrice}</p>
        </div>
      </div>
      <div>
        <Button className="cursor-not-allowed">{order.orderStatus}</Button>
      </div>
    </Card>
  );
};

export default KeyCard;
