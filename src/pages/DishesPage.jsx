import React, { useContext, useState } from "react";
import Steps from "../components/Steps";
import { GuestContext } from "../components/GuestContext";
const DishesPage = () => {
  const { courses } = useContext(GuestContext);
  const [guestNum, setGuestNum] = useState(0);
  // * object that holds the number of dishes
  const [numOfDishes, setNumOfDishes] = useState(
    courses.reduce((acc, course) => {
      acc[course] = 0;
      return acc;
    }, {})
  );

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
    <div className="h-10/12 flex flex-col justify-center gap-13">
      <h2 className="text-center text-4xl">Dish Info</h2>
      <div className="px-2">
        {/* guest number */}
        <div className="mb-8">
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
        <div>
          <p className="mb-1.5">How many people will be cooking?</p>
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
      </div>
    </div>
  );
};

export default DishesPage;
