import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];

  // filter out the courses that the user didn't pick

  const [guests, setGuests] = useState([]);
  const [guestNum, setGuestNum] = useState(0);
  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [dishes, setDishes] = useState([]);
  return (
    <GuestContext
      value={{
        courses,
        guestNum,
        setGuestNum,
        numOfDishes,
        setNumOfDishes,
        guests,
        setGuests,
        dishes,
        setDishes,
        setFilteredCourses,
        filteredCourses,
      }}
    >
      {children}
    </GuestContext>
  );
}

export default GuestProvider;
