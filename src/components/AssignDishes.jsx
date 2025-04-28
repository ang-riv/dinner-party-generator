import React, { useContext, useEffect, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
const AssignDishes = ({ dishes }) => {
  const { courses, guests, numOfDishes } = useContext(GuestContext);
  const [isLoading, setIsLoading] = useState(false);

  const testGuests = [
    { name: "A", preference: "Beverages" },
    { name: "B", preference: "Desserts" },
    { name: "C", preference: "Any" },
    { name: "D", preference: "Any" },
    { name: "E", preference: "Appetizers" },
  ];
  // * sorting + assigning recipes --> goal is to sort dishes and guest array to have preferences first then leftovers at the end. Then match them up using indexes.
  // result and copy of guests
  const [sortedGuests, setSortedGuests] = useState([]);
  const remainingGuests = [...guests];

  // result and copy of dishes
  const [sortedDishes, setSortedDishes] = useState([]);
  const remainingDishes = [...dishes];

  // ? sorting dishes
  const sortDishes = async (guestArr) => {
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
    setSortedDishes(finalDish);
  };

  // ? sorting the guests
  const sortGuests = async () => {
    // dishOrder to match -> Apps, Entrees, etc.
    const dishCourses = dishes.map((dish) => dish.course);
    const test = [];
    // count of how many dish slots exist per course
    const courseCount = {};

    dishCourses.forEach((course) => {
      courseCount[course] = (courseCount[course] || 0) + 1;
    });

    // loop through the desired order
    for (const course of dishCourses) {
      // finds the first guest in the guest arr that prefers that course
      const index = remainingGuests.findIndex(
        (guest) => guest.preference === course
      );
      // if found push into the sorted list and take them out of remaining so they aren't matched again
      if (index !== -1) {
        test.push(remainingGuests.splice(index, 1)[0]);
      }
    } // Add unmatched guests with Any at the end of the arr

    const together = [...test, ...remainingGuests];

    if (together.length === dishes.length) {
      setSortedGuests([...together]);
    }
  };

  const [finished, setFinished] = useState(false);
  // ? assigning guests to dishes
  const assign = async () => {
    await sortGuests();
    await sortDishes(sortedGuests);
  };

  const [sorted, setSorted] = useState([]);
  const finalProduct = async () => {
    const finalArr = sortedGuests.map((guest, index) => ({
      ...guest,
      recipe: sortedDishes[index],
    }));
    setSorted(finalArr);
    console.log("dishes");
  };

  useEffect(() => {
    sortGuests();
  }, []);

  useEffect(() => {
    sortDishes(sortedGuests);
  }, [sortedGuests]);

  useEffect(() => {
    setFinished(true);
    finalProduct();
  }, [sortedDishes, finished]);
  return (
    <>
      {isLoading ? (
        <>
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </>
      ) : (
        <>
          {sorted.map((guest) => (
            <h3>
              {guest.name}'s pref: {guest.preference} and is bringing:
              {guest.recipe.title}.
            </h3>
          ))}
        </>
      )}
    </>
  );
};

export default AssignDishes;
