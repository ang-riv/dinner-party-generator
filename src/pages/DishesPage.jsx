import { useContext, useEffect, useState } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { StylingContext } from "../components/contexts/StylingContext";
const DishesPage = () => {
  const { styles } = useContext(StylingContext);
  const {
    courses,
    guestNum,
    setGuestNum,
    numOfDishes,
    setNumOfDishes,
    setDishesSelected,
  } = useContext(GuestContext);

  const [disableAdd, setDisableAdd] = useState(true);

  const numOptions = [];
  for (let i = 1; i <= 10; i++) numOptions.push(i);

  const dishCounters = courses.map((course) => ({
    title: course,
    counter: numOfDishes[course],
  }));

  // * add + subtract btn handlers
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

  const totalDishes = Object.values(numOfDishes).reduce(
    (acc, value) => acc + value,
    0
  );

  useEffect(() => {
    if (guestNum > 0) {
      setDisableAdd(false);
      // prevent user from adding more
      if (totalDishes === Number(guestNum)) {
        setDisableAdd(true);
        setDishesSelected(true);
      } else {
        setDishesSelected(false);
      }
    } else {
      setDisableAdd(true);
    }
  }, [totalDishes, guestNum]);
  return (
    <div className={styles.mainContentWrapper}>
      <h2 className={styles.sectionTitle}>Dish Info</h2>
      <div className={styles.sectionContentWrapper}>
        {/* guest number */}
        <div className="flex items-center justify-center w-full">
          <div className="flex flex-col justify-center w-full max-w-[340px]">
            <label htmlFor="dishesInput" className="mb-2">
              How many people will be cooking?
            </label>
            <select
              defaultValue="0"
              className="select select-primary"
              name="dishes"
              id="dishesInput"
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
        </div>
        {/* number of dishes per course */}
        <div className=" h-3/8 flex flex-col items-center w-full">
          <div className="flex flex-col max-w-[340px] w-full h-full justify-center">
            <h3 className="mb-2">How many dishes per course?</h3>
            <div className="w-full">
              {dishCounters.map((course) => (
                <div className="flex justify-between mb-2" key={course.title}>
                  <p>{course.title}</p>
                  <div className="flex items-baseline">
                    <button
                      className="btn btn-xs btn-primary text-lg"
                      onClick={() => handleAdd(course.title)}
                      disabled={disableAdd}
                    >
                      +
                    </button>
                    <p className="w-10 flex justify-center">
                      {numOfDishes[course.title]}/{guestNum}
                    </p>
                    <button
                      className="btn btn-xs btn-primary text-lg"
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
    </div>
  );
};

export default DishesPage;
