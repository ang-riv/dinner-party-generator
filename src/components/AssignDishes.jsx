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
  // ? Watching bools
  const [guestsDone, setGuestsDone] = useState(false);
  const [dishesDone, setDishesDone] = useState(false);

  // result and copy of guests
  const [sortedGuests, setSortedGuests] = useState([]);
  const remainingGuests = [...guests];
  // result and copy of dishes
  const [sortedDishes, setSortedDishes] = useState([]);
  const remainingDishes = [...dishes];
  const [sorted, setSorted] = useState([]);
  // ? sorting dishes
  const sortDishes = async (guestArr) => {
    if (!Array.isArray(guestArr)) {
      console.warn("guestArr is invalid:", guestArr);
      return []; // empty array to prevent .map crash
    }
    const guestPrefs = guestArr.map((guest) => guest.preference);
    const dishCount = {};
    const test = [];
    guestPrefs.forEach((course) => {
      dishCount[course] = (dishCount[course] || 0) + 1;
    });

    // loop through the desired order
    for (const course of guestPrefs) {
      // finds the first guest in the guest arr that prefers that course
      const index = remainingDishes.findIndex((dish) => dish.course === course);
      // if found push into the sorted list and take them out of remaining so they aren't matched again
      if (index !== -1) {
        test.push(remainingDishes.splice(index, 1)[0]);
      }
    } // Add unmatched guests with Any at the end of the arr
    const finalDish = [...test, ...remainingDishes];
    console.log("Sorted dishes in sortDishes", finalDish);
    setSortedDishes(finalDish);

    const finalArr = guestArr.map((guest, index) => ({
      ...guest,
      recipe: finalDish[index],
    }));

    console.log("Assigned array.", finalArr);
    return finalArr;
  };

  // ? sorting the guests
  const sortGuests = async () => {
    // dishOrder to match -> Apps, Entrees, etc.
    const dishCourses = dishes.map((dish) => dish.course);
    const remaining = [...remainingGuests];
    const test = [];
    // count of how many dish slots exist per course
    const courseCount = {};

    dishCourses.forEach((course) => {
      courseCount[course] = (courseCount[course] || 0) + 1;
    });
    // loop through the desired order
    for (const course of dishCourses) {
      // finds the first guest in the guest arr that prefers that course
      const index = remaining.findIndex((guest) => guest.preference === course);
      // if found push into the sorted list and take them out of remaining so they aren't matched again
      if (index !== -1) {
        test.push(remaining.splice(index, 1)[0]);
      }
    } // Add unmatched guests with Any at the end of the arr

    const together = [...test, ...remaining];
    if (together.length === dishes.length) {
      setSortedGuests([...together]);
      return together;
    } else {
      console.warn("Mismatch in guest/dish count. Returning what we have.");
      return together;
    }
  };

  const [finished, setFinished] = useState(false);
  // ? assigning guests to dishes
  const assign = async () => {
    const guestArr = await sortGuests();
    const matchedArr = await sortDishes(guestArr);
    return matchedArr;
  };

  const finalProduct = async () => {
    const finalArr = sortedGuests.map((guest, index) => ({
      ...guest,
      recipe: sortedDishes[index],
    }));
    return finalArr;
  };

  const gCopy = useMemo(() => [...guests], [guests]);
  const dCopy = useMemo(() => [...dishes], [dishes]);

  const [guestCopy, setGuestCopy] = useState([...guests]);
  const [finalCopy, setFinalCopy] = useState([]);
  const [finalRender, setFinalRender] = useState(false);
  const [matchedGuests, setMatchedGuests] = useState([...guests]);
  let dishCopy = [...dishes];
  const [show, setShow] = useState(false);
  const allocateDishes = () => {
    // 1) take the guests and separate w/ local copies
    const hasPrefs = guests.filter((guest) => guest.preference != "Any");
    const noPrefs = guests.filter((guest) => guest.preference === "Any");
    const updatedHasPrefs = [...hasPrefs];
    const updatedDishes = [...dishCopy];
    // 2) map over the dishes
    for (let i = 0; i < updatedDishes.length; i++) {
      const dish = updatedDishes[i];
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
    const leftoverDishes = updatedDishes.filter(
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
    setFinalRender(true);
    console.log(assignedGuests);
  };
  useEffect(() => {
    if (gCopy.length && dCopy.length) allocateDishes();
  }, [gCopy, dCopy]);

  // ? Different way of assigning the dishes without needing to sort too much

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
