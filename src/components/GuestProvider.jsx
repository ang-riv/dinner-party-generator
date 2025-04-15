import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  // page changes from buttons
  const [page, setPage] = useState("Intro");
  const [guestNum, setGuestNum] = useState(0);
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
      }}
    >
      {children}
    </GuestContext>
  );
}

export default GuestProvider;
