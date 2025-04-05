import React, { useState, useEffect, useRef } from "react";

// ? courses = main categories, dishes = individual dishes within those categories
function App() {
  // * guest info
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  const [guestNum, setGuestNum] = useState(null);

  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const nameRef = useRef(null);

  // * select number options
  const numOptions = [];
  for (let i = 1; i <= 10; i++) numOptions.push(i);

  // * num of dishes per course + button handlers for numOfDishes
  const dishCounters = courses.map((course) => ({
    title: course,
    counter: numOfDishes[course],
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

  useEffect(() => {
    // disable subtract btns to not go into negatives
  }, []);

  //* add new guest
  const handleNewGuest = () => {
    setGuests([...guests, { name: guestName, preference: "", recipe: "" }]);
    if (nameRef.current) nameRef.current.value = "";
  };

  //* guest preference
  const handlePref = (e, guestName) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.name === guestName ? { ...guest, preference: e } : guest
      )
    );
  };

  const handleRemoveGuest = (guestName) => {
    const updatedArr = guests.filter((guest) => guest.name != guestName);
    setGuests(updatedArr);
  };
  // * food restrictions
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  const [restrictionName, setRestrictionName] = useState("");
  // console.log(guests);
  return (
    <>
      <div className="prose">
        <h1 className="text-center">Dinner Party Generator</h1>
      </div>
      {/* PARTY INFO */}
      <div className="border border-red-300 prose">
        <h2 className="text-center">Party Info</h2>
        <p>
          Functionality Goals: get the number of guests (therefore the number of
          dishes that will be made), and let the user divide that number into
          the courses they want
        </p>
        <h3 className="text-center">
          Guests Cooking/number of dishes: {guestNum}
        </h3>
        <select
          defaultValue="0"
          className="select select-primary"
          onChange={(e) => setGuestNum(e.target.value)}
        >
          <option disabled={true} value={0} key={0}>
            Select number of guests...
          </option>
          {numOptions.map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
        <p className="text-center">How many dishes per course?</p>
        <div className="flex flex-col w-full h-fit">
          {dishCounters.map((course) => (
            <div className="flex justify-between" key={course.title}>
              <p>{course.title}</p>
              <div className="flex items-baseline">
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handleAdd(course.title)}
                  disabled={totalDishes >= guestNum}
                >
                  +
                </button>
                <p className="mx-1">
                  {numOfDishes[course.title]}/{guestNum}
                </p>
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handleSubtract(course.title)}
                  disabled={numOfDishes[course.title] === 0}
                >
                  -
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* GUEST INFO */}
      <div className="border border-orange-300 prose">
        <h2 className="text-center">Guest Info</h2>
        <p>
          Functionality Goals: gather names of the guests and their preference
          of what course they want
        </p>
        <div className="w-full h-fit border border-purple-300 flex flex-col justify-center items-center">
          <h2>Guest Names</h2>
          <input
            ref={nameRef}
            type="input"
            className="input validator join-item"
            placeholder="Enter Guest Name..."
            spellCheck={false}
            pattern="[A-Za-z]*"
            minLength="3"
            maxLength="30"
            title="letters only"
            onChange={(e) => setGuestName(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? handleNewGuest() : null)}
            disabled={guests.length >= guestNum}
          />
          <div className="validator-hint hidden">
            <p className="">Name must be 3 to 30 characters with no numbers</p>
          </div>
          <button
            className="btn btn-primary"
            onClick={handleNewGuest}
            disabled={guests.length >= guestNum}
          >
            +Add
          </button>
          <div className="w-full h-fit flex justify-between">
            <p>Name</p>
            <p>Preference</p>
          </div>
          <div className="bg-orange-200 w-full h-36 flex flex-col">
            {guests.map((guest) => (
              <div className="flex justify-between items-baseline">
                <div className="flex items-center">
                  <button
                    className="btn btn-primary btn-xs mr-1"
                    onClick={() => handleRemoveGuest(guest.name)}
                  >
                    X
                  </button>
                  <p className="text-black font-semibold">{guest.name}</p>
                </div>

                <select
                  className="select select-primary select-md w-[50%]"
                  onChange={(e) => handlePref(e.target.value, guest.name)}
                  defaultValue="Any"
                >
                  <option key="Any" value="Any">
                    Any
                  </option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <p>
            Total number of guests: {guests.length}/{guestNum}
          </p>
        </div>
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
