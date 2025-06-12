// sort dishes and guest array to have preferences first then leftovers at the end
// then match them up using indexes
import { useContext, useEffect, useState, useMemo, useCallback } from "react";
import { GuestContext } from "./contexts/GuestContext";
import { StylingContext } from "./contexts/StylingContext";
import PreviewCard from "../pages/PreviewCard";
const AssignDishes = () => {
  const { styles } = useContext(StylingContext);
  const { guests, setGuests, dishes, numOfDishes, filteredCourses } =
    useContext(GuestContext);
  const [isLoading, setIsLoading] = useState(false);

  const guestCopy = useMemo(() => [...guests], [guests]);
  const dishesCopy = useMemo(() => [...dishes], [dishes]);
  const [finalCopy, setFinalCopy] = useState([]);
  const updatedDishes = useMemo(() => [...dishes], [dishes]);

  const filtered = filteredCourses(numOfDishes);

  const allocateDishes = useCallback(() => {
    // separate guests by prefs w/ local copies
    const hasPrefs = guests.filter((guest) => guest.preference != "Any");
    const noPrefs = guests.filter((guest) => guest.preference === "Any");
    const updatedHasPrefs = [...hasPrefs];
    const updatedDishesCopy = [...updatedDishes];

    for (let i = 0; i < updatedDishesCopy.length; i++) {
      const dish = updatedDishesCopy[i];
      const course = dish.course;

      // find guest that has the same course AND doesn't have a recipe yet
      const guestMatch = updatedHasPrefs.findIndex(
        (guest) => guest.preference === course && guest.recipe === ""
      );

      // assign that guest that recipe
      if (guestMatch != -1) {
        updatedHasPrefs[guestMatch] = {
          ...updatedHasPrefs[guestMatch],
          recipe: dish,
        };

        dish.assigned = true;
      } else {
        dish.assigned = false;
      }
    }

    // find unassigned dishes then assign to guests that don't have prefs
    const leftoverDishes = updatedDishesCopy.filter(
      (dish) => dish.assigned === false
    );
    const leftoverGuests = noPrefs.map((guest, index) => ({
      ...guest,
      recipe: leftoverDishes[index] || null,
    }));

    // combine the guests and update
    const assignedGuests = [...updatedHasPrefs, ...leftoverGuests];

    // prevent an infinite loop since it's in useEffect
    if (finalCopy.length === 0) {
      setFinalCopy(assignedGuests);
      setGuests(assignedGuests);
    }
  }, [guests, updatedDishes, finalCopy]);

  useEffect(() => {
    // run only when not empty
    if (guestCopy.length && dishesCopy.length) {
      setIsLoading(false);
      allocateDishes();
    } else {
      setIsLoading(true);
    }
  }, [guestCopy, dishesCopy, allocateDishes]);

  return (
    <div className={styles.mainContentWrapper}>
      {isLoading ? (
        <div className="size-full flex flex-col justify-center items-center">
          <h3>Assigning Dishes...</h3>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      ) : (
        <>
          {/* courses */}
          {filtered.map((course, index) => (
            <div key={index} className="my-2">
              <h2 className="text-center text-2xl py-2">{course}</h2>
              <div className=" flex justify-around flex-wrap gap-y-4">
                {/* dishes per course */}
                {finalCopy.map((guest, index) => {
                  if (guest.recipe.course === course) {
                    return (
                      <PreviewCard
                        key={index}
                        name={guest.name}
                        url={guest.recipe.sourceUrl}
                        title={guest.recipe.title}
                        image={guest.recipe.image}
                      />
                    );
                  }
                })}
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AssignDishes;
