import React, { useContext, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
const PrefCounter = () => {
  const { guests, guestNum, numOfDishes } = useContext(GuestContext);

  const guestPrefs = guests.map((guest) => guest.preference);

  //* making sure that the prefs match the amount of dishes picked
  const prefCounter = {};
  for (let i = 0; i < filtered.length; i++) {
    const course = filtered[i];
    prefCounter[course] = 0;
  }

  const prefFreq = (arr, target) => {
    // prevent it from doing it by making sure it only happens when that course is empty
    if (prefCounter[target] === 0) {
      for (let i = 0; i < arr.length; i++) {
        const pref = arr[i];
        if (pref === target) {
          prefCounter[target] += 1;
        }
      }
    } else {
      console.log("Already ran once.");
    }
  };

  const prefChecker = () => {
    // loop over the course categories chosen then find how many times it shows up in the prefs arr
    for (const course in filtered) {
      prefFreq(guestPrefs, filtered[course]);
    }

    // check if it matches or is less than the course category
    // 1) compare the pref number, should be <= guestNum as everyone or a few can make a pref
    const prefTotal = Object.values(prefCounter).reduce(
      (acc, num) => acc + num,
      0
    );

    if (prefTotal <= guestNum) {
      // 2) loop through each and check the amounts under each course
      for (const course in prefCounter) {
        let courseValue = prefCounter[course];
        if (courseValue <= numOfDishes[course]) {
          console.log("Valid!");
        } else {
          console.log("Invalid. This course has more than it should: ", course);
        }
      }
    }

    console.log("Test counter: ", prefCounter);
    console.log("Needs to match: ", numOfDishes);
  };
  return <></>;
};

export default PrefCounter;
