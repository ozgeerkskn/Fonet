import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { categorizeFeatures } from "../util/catogarizeFeatures";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../State/Cart/Action";

const demo = [
  {
    category: "Features",
    features: [
      "Swimming Pool",
      "GYM",
      "outdoor parking lot",
      "Parking Garage",
      "apartment attendant service",
      "game room",
    ],
  },
];
const PropertyCard = ({ item }) => {
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const dispatch = useDispatch();
  const handleCheckBoxChange = (itemName) => {
    console.log("value", itemName);
    if (selectedFeatures.includes(itemName)) {
      setSelectedFeatures(selectedFeatures.filter((item) => item !== itemName));
    } else {
      setSelectedFeatures([...selectedFeatures, itemName]);
    }
  };
  const handleAddItemToCart = (e) => {
    e.preventDefault();
    const reqData = {
      token: localStorage.getItem("jwt"),
      cartItem: {
        propertyId: item.id,
        quantity: 1,
        features: selectedFeatures,
      },
    };
    dispatch(addItemToCart(reqData));
    console.log("reqData", reqData);
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[10rem] h-[10rem] object-cover"
              src={item.images[0]}
              alt=""
            />

            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₺{item.price}</p>
              <p className="text-gray-400">
                <LocationOnIcon />
                {item.description}
              </p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeFeatures(item.features)).map((category) => (
              <div>
                <p>{category}</p>
                <FormGroup>
                  {categorizeFeatures(item.features)[category].map((item) => (
                    <FormControlLabel
                      key={item.id}
                      control={
                        <Checkbox
                          oncahange={() => handleCheckBoxChange(item.name)}
                        />
                      }
                      label={item.name}
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={false} type="submit">
              {true ? "Add to Real Estate" : "This real estate was kept"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default PropertyCard;
