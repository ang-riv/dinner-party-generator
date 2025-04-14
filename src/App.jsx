import { div, li } from "motion/react-client";
import React, { useState, useEffect, useRef } from "react";
import AssignDishes from "./AssignDishes";
import filter from "daisyui/components/filter";

// ? courses = main categories, dishes = individual dishes within those categories
function App() {
  // * API
  const apiKey = import.meta.env.VITE_APP_SPOONACULAR_KEY;
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
  // filter just in case they don't want specific categories
  const filteredCourses = courses.filter((course) => numOfDishes[course] != 0);
  const [guests, setGuests] = useState([]);
  const [guestName, setGuestName] = useState("");
  const nameRef = useRef(null);
  const restrictionRef = useRef(null);
  const restrictionArrRef = useRef([]);

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
  // * food restrictions
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  const [restrictionName, setRestrictionName] = useState("");
  const [dietRestrictions, setDietRestrictions] = useState([]);

  const [searchFood, setSearchFood] = useState("");
  const [foodError, setFoodError] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const diets = ["Vegan", "Vegetarian", "Gluten-free", "Dairy-free"];

  //* API - search foodItem and get random dishes
  const [getDishes, setGetDishes] = useState(false);
  const [dishes, setDishes] = useState([]);
  const [assign, setAssign] = useState(false);
  useEffect(() => {
    // * search foodItem
    const searchIngredient = async (ingredient) => {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        ingredient
      )}&search_simple=1&json=1`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();

        // if it is a food
        if (data.products.length > 0) {
          setFoodRestrictions([...foodRestrictions, ingredient]);
          console.log("is a food item!");
        } else {
          // if not
          setFoodError(true);
          console.log("Not a food item!");
        }
      } catch (error) {
        console.log("Error fetching ingredient:", error);
      }

      // clear everything
      setRestrictionName("");
      setSearchFood("");
      if (restrictionRef.current) {
        restrictionRef.current.value = "";
      }
    };

    if (searchFood != "") {
      searchIngredient(searchFood);
    }

    if (foodError && isFocused) {
      setFoodError(false);
    }

    // * fetch dishes
    const fetchDishes = async (course) => {
      let specificCourse = "";
      if (course != "Entrees") specificCourse = course.toLowerCase();
      else specificCourse = "main course";
      const num = numOfDishes[course];
      const dietUrl =
        dietRestrictions && dietRestrictions.length > 0
          ? `diet=${dietRestrictions.toString()}`
          : "";
      const foodUrl =
        foodRestrictions && foodRestrictions.length > 0
          ? `excludeIngredients=${foodRestrictions.toString()}`
          : "";
      const mainUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${specificCourse}&number=${num}${
        dietRestrictions && dietRestrictions.length > 0 ? `&${dietUrl}` : ""
      }${foodRestrictions && foodRestrictions.length > 0 ? `&${foodUrl}` : ""}`;

      const response = await fetch(mainUrl);
      const data = await response.json();
      console.log(data.results);
      let result = data.results.map((dish) => ({
        title: dish.title,
        sourceUrl: dish.sourceUrl,
        image: dish.image,
        course: course,
      }));
      return result;
    };
    // * fetch for each course that isn't 0
    const fetchAll = async () => {
      const fetchCourses = filteredCourses.map((course) => fetchDishes(course));
      const dishes = await Promise.all(fetchCourses);
      setDishes(dishes.flat());
      setGetDishes(false);
    };
    // * get dishes
    getDishes && fetchAll();

    if (assign) {
    }
  }, [getDishes, assign, searchFood, foodError, isFocused]);
  //* add new guest
  const handleNewGuest = () => {
    setGuests([...guests, { name: guestName, preference: "Any", recipe: "" }]);
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
  const handleRemove = (foodItem) => {
    const updatedArr = foodRestrictions.filter((food) => food != foodItem);
    setFoodRestrictions(updatedArr);
  };

  const handleDiet = (e) => {
    if (e.target.checked === true) {
      setDietRestrictions([...dietRestrictions, e.target.value]);
    } else {
      const newArr = foodRestrictions.filter((item) => item != e.target.value);
      setDietRestrictions(newArr);
    }
  };

  // * sorting + assigning recipes --> goal is to sort dishes and guest array to have preferences first then leftovers at the end. Then match them up using indexes.
  // dishOrder to match
  const dishCourses = dishes.map((dish) => dish.course);
  console.log(dishCourses);

  // count of how many dish slots exist per course
  const courseCount = {};
  dishCourses.forEach((course) => {
    courseCount[course] = (courseCount[course] || 0) + 1;
  });
  let final = [];
  // result and copy of guests
  const sortedGuests = [];
  const remaining = [...guests];
  const assigningDishes = () => {
    console.log("working");

    // loop through the desired order
    for (const course of dishCourses) {
      // finds the first guest in the guest arr that prefers that course
      const index = remaining.findIndex((guest) => guest.pref === course);
      // if found push into the sorted list and take them out of remaining so they aren't matched again
      if (index !== -1) {
        sortedGuests.push(remaining.splice(index, 1)[0]); // assign guest to course
      }
    }
  };
  // Add unmatched guests with Any at the end
  sortedGuests.push(...remaining);
  final = sortedGuests.map((guest, index) => ({
    ...guest,
    recipe: dishes[index],
  }));
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
        <p>
          Functionality Goals: Gather any food restrictions from diet,
          allergies, dislikes. Use API to check if it is a real food (or at
          least a real word).
        </p>
        {/* diet */}
        <div className="">
          <h3 className="text-center">Dietary Restrictions</h3>
          <div className="flex flex-wrap">
            {diets.map((diet) => (
              <label key={diet} className="w-1/2">
                <input
                  className="checkbox checkbox-primary mr-2"
                  type="checkbox"
                  id={diet}
                  value={diet}
                  onChange={(e) => handleDiet(e)}
                />
                {diet}
              </label>
            ))}
          </div>

          {/* allergies/dislikes */}
          <div>
            <h3 className="text-center">Allergies/Dislikes</h3>
            <div className="w-full flex flex-wrap justify-center">
              <div className="join">
                <input
                  ref={restrictionRef}
                  className="input join-item"
                  type="text"
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  minLength="3"
                  maxLength="30"
                  placeholder="Enter food item..."
                  pattern="[A-Za-z]*"
                  onChange={(e) => setRestrictionName(e.target.value)}
                />
                <button
                  className="btn btn-primary join-item"
                  onClick={() => setSearchFood(restrictionName)}
                >
                  +Add
                </button>
              </div>
              <div
                className="w-65 h-fit border border-primary"
                hidden={foodError ? false : true}
              >
                <p>Not a food item!</p>
              </div>
              <div className="w-8/12 h-60 bg-primary">
                {foodRestrictions.map((foodItem) => (
                  <div className="flex items-center">
                    <button
                      className="btn btn-secondary btn-sm mr-2"
                      onClick={() => handleRemove(foodItem)}
                    >
                      X
                    </button>
                    <p>{foodItem}</p>
                  </div>
                ))}
              </div>
              <div className="w-8/12 h-30 bg-secondary">
                {dietRestrictions.map((foodItem) => (
                  <div className="flex items-center">
                    <p>{foodItem}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* CONFIRMATION */}
      <div className="border border-green-300 prose">
        <h2 className="text-center">Confirm Info</h2>
        <p>
          Functionality Goals: Display all of the gathered information to let
          the user confirm is everything is correct before making the API call.
        </p>
        <h3 className="text-center">Guest List</h3>
        <div className="flex flex-col w-full h-fit">
          {guests.map((guest) => (
            <div className="flex justify-between">
              <p>{guest.name}</p>
              <p>{guest.preference}</p>
            </div>
          ))}
        </div>
        <p className="text-center font-semibold">
          Total Number of Guests Attending: {guests.length}
        </p>
        <h4 className="text-center">Dishes per Course</h4>
        <div className="flex">
          {courses.map((course) => (
            <p>
              {course}: {numOfDishes[course]}
            </p>
          ))}
        </div>
        <p className="text-center">
          Dietary Restrictions, Allergies, and Dislikes:
        </p>
        {/* options: ✧ ➤ ➢ ➺*/}
        <ul className="list-none p-0 m-0">
          {foodRestrictions.map((foodItem) => (
            <li className="before:content-['✧'] before:pr-3" key={foodItem}>
              {foodItem}
            </li>
          ))}
        </ul>
      </div>
      {/* MENU */}
      <div className="border border-purple-300 prose">
        <h2 className="text-center">Menu Info</h2>
        <p>
          Functionality Goals: Using the spoonacular API, retrieve the random
          recipes depending on the courses listed and the diet restrictions.
        </p>
        <div className="flex justify-around">
          <button
            className="btn btn-primary"
            onClick={() => setGetDishes(true)}
          >
            Fetch Dishes
          </button>
          <button className="btn btn-secondary" onClick={assigningDishes}>
            Assign Dishes
          </button>
        </div>
        <div className="prose border border-blue-300">
          <h2 className="text-center">Preview Section</h2>
          {final.map((guest) => (
            <p>
              {guest.name} is bringing {guest.recipe.title}.
            </p>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
