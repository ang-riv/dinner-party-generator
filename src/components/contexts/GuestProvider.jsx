import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  // page changes from buttons
  const [page, setPage] = useState("Intro");

  const [guests, setGuests] = useState([]);
  const [guestNum, setGuestNum] = useState(5);
  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );
  return (
    <GuestContext
      value={{
        page,
        setPage,
        courses,
        guestNum,
        setGuestNum,
        numOfDishes,
        setNumOfDishes,
        guests,
        setGuests,
      }}
    >
      {children}
    </GuestContext>
  );
}

export default GuestProvider;
