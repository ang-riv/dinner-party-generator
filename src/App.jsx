import React, { useState, useEffect } from "react";

// ? courses = main categories, dishes = individual dishes within those categories
function App() {
  // * guest info
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  const [guestNum, setGuestNum] = useState(0);
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");

  // * food restrictions
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  const [restrictionName, setRestrictionName] = useState("");
  return (
    <>
      <div className="prose">
        <h1 className="text-center">Dinner Party Generator</h1>
      </div>
      {/* PARTY INFO */}
      <div className="border border-red-300 prose">
        <h2 className="text-center">Party Info</h2>
        <p>Functionality Goals: </p>
      </div>
      {/* GUEST INFO */}
      <div className="border border-orange-300 prose">
        <h2 className="text-center">Guest Info</h2>
        <p>Functionality Goals: </p>
      </div>
      {/* RESTRICTIONS */}
      <div className="border border-blue-300 prose">
        <h2 className="text-center">Restriction Info</h2>
        <p>Functionality Goals: </p>
      </div>
      {/* CONFIRMATION */}
      <div className="border border-green-300 prose">
        <h2 className="text-center">Confirm Info</h2>
        <p>Functionality Goals: </p>
      </div>
      {/* MENU */}
      <div className="border border-purple-300 prose">
        <h2 className="text-center">Menu Info</h2>
        <p>Functionality Goals: </p>
      </div>
    </>
  );
}

export default App;
