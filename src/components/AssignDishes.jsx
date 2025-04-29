import React, { useContext, useEffect, useState, useRef } from "react";
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

  const [finalSort, setFinalSort] = useState([]);
  const [fullArr, setFullArr] = useState(false);
  // initial render sort the guests
  const renderCount = useRef(1); // starts at 1 for the initial render

  useEffect(() => {
    renderCount.current += 1;
    console.log("Render count:", renderCount.current);
    console.log("1) Sorting guests...");
    const fetchArr = async () => {
      const guestArr = await sortGuests();
      if (!Array.isArray(guestArr)) {
        console.error("sortGuests did not return an array:", guestArr);
        return;
      }
      const matchedArr = await sortDishes(guestArr);
      if (!Array.isArray(matchedArr)) {
        console.error("sortDishes did not return a valid array");
        return;
      }
      const final = matchedArr.map((guest) => <p>{guest.name}</p>);
      setFinalSort(final);
    };

    fetchArr();
  }, []);

  useEffect(() => {
    console.log("working");
    setFullArr(true);
  }, [finalSort, fullArr]);
  /*
  useEffect(() => {
    console.log("Guests sorted.");
    console.log("2) Sorting dishes...");
    //assign();
  }, [sortedGuests]);

  useEffect(() => {
    console.log("Dishes sorted.");
    console.log("3) Matching dishes to guests...");
  }, [sortedDishes]);

  const [trigger, setTrigger] = useState(false);
  useEffect(() => {
    console.log("All matched.");
    setTrigger(true);
  }, [sorted]);

  useEffect(() => {
    console.log("Last render.");
    console.log(sorted);
  }, [trigger]);
  */

  return (
    <>
      {isLoading ? (
        <>
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </>
      ) : (
        <>{fullArr ? finalSort : <></>}</>
      )}
    </>
  );
};

export default AssignDishes;
