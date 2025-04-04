import React, { useState, useEffect } from "react";

// ? courses = main categories, dishes = individual dishes within those categories
function App() {
  // * guest info
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  const [guestNum, setGuestNum] = useState(0);

  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");

  // * select number options
  const numOptions = [];
  for (let i = 1; i <= 10; i++) numOptions.push(i);

  // * num of dishes per course + button handlers for numOfDishes
  const dishCounters = courses.map((course, index) => ({
    title: course,
    counter: numOfDishes[index],
  }));

  const handleAdd = (course) => {
    setNumOfDishes((prevNum) => ({
      ...prevNum,
      [course]: prevNum[course] + 1,
    }));
  };
  const handleSubtract = (course) => {
    setNumOfDishes((prevNum) => ({
      ...prevNum,
      [course]: prevNum[course] - 1,
    }));
  };

  // * dish total
  const totalDishes = Object.values(numOfDishes).reduce(
    (acc, value) => acc + value,
    0
  );

  useEffect(() => {}, []);

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
        <h3 className="text-center">
          Guests Cooking/number of dishes: {guestNum}
        </h3>
        <select
          defaultValue="Select number of guests..."
          className="select select-primary"
          onChange={(e) => setGuestNum(e.target.value)}
        >
          <option disabled={true}>Select number of guests...</option>
          {numOptions.map((num) => (
            <option value={num}>{num}</option>
          ))}
        </select>
        <p className="text-center">How many dishes per course?</p>
        <div className="flex flex-col w-full h-28">
          <div className="flex justify-between">
            <p>Title</p>
            <div className="flex items-baseline">
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleAdd("Appetizers")}
              >
                +
              </button>
              <p className="mx-1">
                {numOfDishes.Appetizers}/{guestNum}
              </p>
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleSubtract("Appetizers")}
              >
                -
              </button>
            </div>
          </div>
        </div>
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
