import React from "react";
import EventCard from "./EventCard";

const Events = () => {
  return (
    <div className="mt-5 ml-5 pt-5 flex flex-wrap gap-5">
      {[1, 1, 1].map((item) => (
        <EventCard />
      ))}
    </div>
  );
};

export default Events;
