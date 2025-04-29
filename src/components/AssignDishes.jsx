import React, { useContext, useEffect, useState, useRef, useMemo } from "react";
import { GuestContext } from "./contexts/GuestContext";
const AssignDishes = () => {
  const { courses, guests, numOfDishes, dishes } = useContext(GuestContext);
  const [isLoading, setIsLoading] = useState(false);

  const testGuests = [
    { name: "A", preference: "Beverages" },
    { name: "B", preference: "Desserts" },
    { name: "C", preference: "Any" },
    { name: "D", preference: "Any" },
    { name: "E", preference: "Appetizers" },
  ];

  // * sorting + assigning recipes --> goal is to sort dishes and guest array to have preferences first then leftovers at the end. Then match them up using indexes.

  const guestCopy = useMemo(() => [...guests], [guests]);
  const dishesCopy = useMemo(() => [...dishes], [dishes]);

  const [finalCopy, setFinalCopy] = useState([]);
  const updatedDishes = useMemo(() => [...dishes], [dishes]);

  const allocateDishes = () => {
    // 1) take the guests and separate w/ local copies
    const hasPrefs = guests.filter((guest) => guest.preference != "Any");
    const noPrefs = guests.filter((guest) => guest.preference === "Any");
    const updatedHasPrefs = [...hasPrefs];
    const updatedDishesCopy = [...updatedDishes];
    // 2) map over the dishes
    for (let i = 0; i < updatedDishesCopy.length; i++) {
      const dish = updatedDishesCopy[i];
      const course = dish.course;

      // 3) search the guests - find the the guest has the same course AND doesn't have a recipe yet.
      const guestMatch = updatedHasPrefs.findIndex(
        (guest) => guest.preference === course && guest.recipe === ""
      );

      // 4) assign that guest that recipe and change the assigned value to true for that dish
      if (guestMatch != -1) {
        updatedHasPrefs[guestMatch] = {
          ...updatedHasPrefs[guestMatch],
          recipe: dish,
        };

        dish.assigned = true;
      } else {
        dish.assigned = false;
      }
    }

    // 5) filter out the dishes array for the ones that haven't been assigned yet
    const leftoverDishes = updatedDishesCopy.filter(
      (dish) => dish.assigned === false
    );

    // 6) assign the leftover dishes to the guests that don't have a pref
    const leftoverGuests = noPrefs.map((guest, index) => ({
      ...guest,
      recipe: leftoverDishes[index] || null,
    }));

    // 7) combine the guests and update
    const assignedGuests = [...updatedHasPrefs, ...leftoverGuests];

    setFinalCopy(assignedGuests);
    console.log(assignedGuests);
  };

  useEffect(() => {
    // run only when they aren't empty
    if (guestCopy.length && dishesCopy.length) allocateDishes();
  }, [guestCopy, dishesCopy]);

  return (
    <>
      {isLoading ? (
        <>
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </>
      ) : (
        <>
          {finalCopy.map((guest, index) => (
            <p key={index}>
              {guest.name}'s preference is {guest.preference}. They are bringing{" "}
              {guest.recipe.title}.
            </p>
          ))}
        </>
      )}
    </>
  );
};

export default AssignDishes;
