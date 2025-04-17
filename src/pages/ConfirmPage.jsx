import React, { useState, useEffect } from "react";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import { GuestContext } from "../components/contexts/GuestContext";
import Arrow, { DIRECTION, HEAD } from "react-arrows";
const ConfirmPage = () => {
  const testGuests = [
    { name: "Amanda", pref: "Appetizer" },
    { name: "Shayne", pref: "Dessert" },
    { name: "Alex", pref: "Any" },
  ];

  useEffect(() => {}, []);
  return (
    <div className="h-10/12 px-2">
      <h2 className="h-2/10 outline outline-amber-200 flex justify-center items-center text-4xl">
        Guest List
      </h2>
      {/* name + pref */}
      <div className="h-6/10">
        {testGuests.map((guest, index) => {
          const start = `from${index}`;
          const end = `to${index}`;
          return (
            <div className="w-full flex justify-between">
              <div id={start} className="pr-1">
                <p className="relative top-2">{guest.name}</p>
              </div>
              <div id={end} className="pl-1">
                <p className="relative top-2">{guest.pref}</p>
              </div>

              <Arrow
                className="arrow"
                from={{
                  direction: DIRECTION.BOTTOM_RIGHT,
                  node: () => document.getElementById(start),
                  translation: [0, 0],
                }}
                to={{
                  direction: DIRECTION.BOTTOM_LEFT,
                  node: () => document.getElementById(end),
                  translation: [0, 0],
                }}
              />
            </div>
          );
        })}
      </div>
      {/* restrictions */}
      <div className="h-2/10 outline outline-amber-200">
        <h3 className="text-center">
          Dietary Restrictions, Allergies, Dislikes:
        </h3>
      </div>
    </div>
  );
};

export default ConfirmPage;
