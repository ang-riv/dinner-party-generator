import { createContext, useState } from "react";

export const GuestContext = createContext();

export const GuestProvider = ({ children }) => {
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];

  const [guests, setGuests] = useState(null);
  const [guestNum, setGuestNum] = useState(null);

  const [numOfDishes, setNumOfDishes] = useState(null);
  const [dishesSelected, setDishesSelected] = useState(null);
  const [dishes, setDishes] = useState(null);
  const [prefsValid, setPrefsValid] = useState(null);

  const filteredCourses = (dishNum) => {
    const filtered = courses.filter((course) => dishNum[course] != 0);
    return filtered;
  };
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
