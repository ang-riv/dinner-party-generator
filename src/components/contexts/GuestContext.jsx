import { createContext, useState } from "react";

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];

  const [guests, setGuests] = useState(null);
  const [guestNum, setGuestNum] = useState(null);

  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(null);
  const [dishesSelected, setDishesSelected] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [prefsValid, setPrefsValid] = useState(null);

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
    setDishesSelected(false);
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
        dishesSelected,
        setDishesSelected,
      }}
    >
      {children}
    </GuestContext>
  );
};
