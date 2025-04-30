import React, { useContext, useEffect } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
const DishesPage = () => {
  const { courses, guestNum, setGuestNum, numOfDishes, setNumOfDishes } =
    useContext(GuestContext);

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

  // * dishes in total
  const totalDishes = Object.values(numOfDishes).reduce(
    (acc, value) => acc + value,
    0
  );
  return (
    <div className="h-10/12 flex flex-col px-2 justify-between">
      <h2 className="flex justify-center items-center text-center text-4xl  h-2/8">
        Dish Info
      </h2>
      {/* guest number */}
      <div className="h-1/8">
        <p className="mb-1.5">How many people will be cooking?</p>
        <select
          defaultValue="0"
          className="select select-primary"
          name="dishes"
          id="dishes"
          onChange={(e) => setGuestNum(e.target.value)}
        >
          <option disabled={true} value={0} key={0}>
            Select number of guests...
          </option>
          {numOptions.map((num) => (
            <option className="option" key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>
      {/* number of dishes per course */}
      <div className=" h-4/8 flex flex-col justify-center">
        <p className="mb-1.5">How many dishes per course?</p>
        <div className="w-full">
          {dishCounters.map((course) => (
            <div className="flex justify-between mb-2" key={course.title}>
              <p>{course.title}</p>
              <div className="flex items-baseline">
                <button
                  className="btn btn-xs btn-primary"
                  onClick={() => handleAdd(course.title)}
                  disabled={totalDishes >= guestNum}
                >
                  +
                </button>
                <p className="w-10 flex justify-center">
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
    </div>
  );
};

export default DishesPage;
