import React, { useContext, useEffect, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
const AssignDishes = ({ dishes }) => {
  const { guests } = useContext(GuestContext);
  const [isLoading, setIsLoading] = useState(true);
  const [vibes, setVibes] = useState([]);
  // * sorting + assigning recipes --> goal is to sort dishes and guest array to have preferences first then leftovers at the end. Then match them up using indexes.
  // dishOrder to match -> Apps, Entrees, etc.
  const dishCourses = dishes.map((dish) => dish.course);
  console.log(dishCourses);

  // count of how many dish slots exist per course
  const courseCount = {};

  dishCourses.forEach((course) => {
    courseCount[course] = (courseCount[course] || 0) + 1;
  });
  // result and copy of guests
  const sortedGuests = [];
  const remaining = [...guests];
  const assigningDishes = () => {
    console.log("working");

    // loop through the desired order
    for (const course of dishCourses) {
      // finds the first guest in the guest arr that prefers that course
      const index = remaining.findIndex((guest) => guest.preference === course);
      // if found push into the sorted list and take them out of remaining so they aren't matched again
      if (index !== -1) {
        sortedGuests.push(remaining.splice(index, 1)[0]);
      }
    }
  };

  // Add unmatched guests with Any at the end of the arr
  sortedGuests.push(...remaining);
  const finals = sortedGuests.map((guest, index) => ({
    ...guest,
    recipe: dishes[index],
  }));
  useEffect(() => {
    assigningDishes();
    setVibes(finals);
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timeoutId);
  }, []);
  console.log("vibes:");
  console.log(vibes);
  return (
    <>
      {isLoading ? (
        <>
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </>
      ) : (
        <>
          {vibes.map((guest) => (
            <h3>
              {guest.name} is bringing{" "}
              {guest.recipe.title != undefined ? guest.recipe.title : "none"}.
            </h3>
          ))}
        </>
      )}
    </>
  );
};

export default AssignDishes;
