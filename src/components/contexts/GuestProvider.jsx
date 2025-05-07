import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];

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
  const [prefsValid, setPrefsValid] = useState(false);

  const handleGuestReset = async () => {
    setGuests([]);
    setGuestNum(0);
    setNumOfDishes(
      courses.reduce((acc, course) => {
        acc[course] = 0;
        return acc;
      }, {})
    );
    setDishes([]);
    setPrefsValid(false);
  };
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
        prefsValid,
        setPrefsValid,
        handleGuestReset,
      }}
    >
      {children}
    </GuestContext>
  );
}

export default GuestProvider;
