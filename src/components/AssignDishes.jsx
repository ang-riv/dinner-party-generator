import React, { useContext, useEffect, useState, useMemo } from "react";
import { GuestContext } from "./contexts/GuestContext";
import { div, h2 } from "motion/react-client";
import PreviewCard from "../pages/PreviewCard";
const AssignDishes = () => {
  const { courses, guests, setGuests, dishes, numOfDishes } =
    useContext(GuestContext);
  const [isLoading, setIsLoading] = useState(false);

  // * sorting + assigning recipes --> goal is to sort dishes and guest array to have preferences first then leftovers at the end. Then match them up using indexes.

  const guestCopy = useMemo(() => [...guests], [guests]);
  const dishesCopy = useMemo(() => [...dishes], [dishes]);

  const [finalCopy, setFinalCopy] = useState([]);
  const updatedDishes = useMemo(() => [...dishes], [dishes]);

  const filtered = courses.filter((course) => numOfDishes[course] != 0);

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
    setGuests(assignedGuests);
  };

  useEffect(() => {
    // run only when they aren't empty
    if (guestCopy.length && dishesCopy.length) {
      setIsLoading(false);
      allocateDishes();
    } else {
      setIsLoading(true);
    }
  }, [guestCopy, dishesCopy, isLoading, allocateDishes]);

  return (
    <div className="size-full">
      {isLoading ? (
        <div className="size-full flex flex-col justify-center items-center">
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      ) : (
        <>
          {/* courses */}
          {filtered.map((course, index) => (
            <div key={index} className="my-2">
              <h2 className="text-center text-2xl py-2">{course}</h2>
              <div className=" flex justify-around flex-wrap">
                {/* dishes per course */}
                {finalCopy.map((guest, index) => {
                  if (guest.recipe.course === course) {
                    return (
                      <PreviewCard
                        key={index}
                        name={guest.name}
                        title={guest.recipe.title}
                        image={guest.recipe.image}
                      />
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AssignDishes;
