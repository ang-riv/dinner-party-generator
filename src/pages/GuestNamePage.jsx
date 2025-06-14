import { useRef, useContext, useState, useEffect } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { StylingContext } from "../components/contexts/StylingContext";
import { Checkmark } from "../components/Icons";
const GuestNamePage = () => {
  const { styles } = useContext(StylingContext);
  const {
    guests,
    setGuests,
    guestNum,
    numOfDishes,
    filteredCourses,
    setPrefsValid,
    prefsValid,
  } = useContext(GuestContext);
  const [guestName, setGuestName] = useState("");
  const nameRef = useRef(null);
  const filtered = filteredCourses(numOfDishes);
  const guestsLength = guests.length;
  const [submitDisabled, isSubmitDisabled] = useState(true);

  // *** ERRORS
  const [alert, setAlert] = useState(false);
  const [prefError, setPrefError] = useState(false);

  // check if prefs are valid
  const [count, setCount] = useState({});
  const [invalidCourses, setInvalidCourses] = useState([]);
  const invalidPrefs = [];
  let invalidLength = 0;

  // ** CHECKING PREFS - making sure that the prefs match the amount of dishes picked
  const prefCounter = {};
  for (let i = 0; i < filtered.length; i++) {
    const course = filtered[i];
    prefCounter[course] = 0;
  }

  const guestPrefs = guests.map((guest) => guest.preference);

  useEffect(() => {
    if (guestsLength === Number(guestNum) || prefError) isSubmitDisabled(false);

    if (prefsValid) isSubmitDisabled(true);

    invalidLength = invalidCourses.length;
  }, [guestsLength, submitDisabled, prefsValid, prefError, invalidLength]);

  // check how many times a course was chosen/pref made
  const prefFreq = (arr, target) => {
    // prevent it from running again by making sure it only happens when that course is empty
    if (prefCounter[target] === 0) {
      for (let i = 0; i < arr.length; i++) {
        const pref = arr[i];
        if (pref === target) {
          prefCounter[target] += 1;
        }
      }
    }
  };

  const prefChecker = () => {
    // find how many times a course shows up
    for (const course in filtered) {
      prefFreq(guestPrefs, filtered[course]);
    }

    // pref number should be <= guestNum
    const prefTotal = Object.values(prefCounter).reduce(
      (acc, num) => acc + num,
      0
    );

    if (prefTotal <= guestNum) {
      // check the amounts under each course
      // compare to that course in numOfDishes
      for (const course in prefCounter) {
        let courseValue = prefCounter[course];
        if (courseValue <= numOfDishes[course]) {
          console.log("Valid!");
        } else {
          console.log("Invalid. This course has more than it should: ", course);
          invalidPrefs.push(course);
        }
      }
    }

    // check presence of invalids + show how much they are over by
    if (invalidPrefs != 0) {
      setPrefsValid(false);
      setPrefError(true);
      setInvalidCourses([...invalidPrefs]);
      setCount({ ...prefCounter });
    } else {
      setPrefsValid(true);
      setPrefError(false);
    }
  };

  const handleNewGuest = () => {
    // check if the name is valid
    if (nameRef.current.checkValidity()) {
      const properName =
        guestName.charAt(0).toUpperCase() + guestName.slice(1).toLowerCase();
      setGuests([
        { name: properName, preference: "Any", recipe: "" },
        ...guests,
      ]);
      // if previously had an alert but is now valid, reset alert
      setAlert(false);
    } else {
      setAlert(true);
    }
    if (nameRef.current) nameRef.current.value = "";
  };

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

  // prevents user from making prefs until all guests are inputted
  const prefSelect = () => {
    if (guests.length < guestNum || prefsValid === true) {
      return true;
    } else if (guests.length === guestNum || prefsValid === false) {
      return false;
    }
  };
  return (
    <div className={styles.mainContentWrapper}>
      {/* text */}
      <div className="flex flex-col justify-center items-center py-10">
        <h2 className="text-4xl text-center mb-4">Guest Names</h2>
        <p className="text-center">
          Enter the name of each guest. Once all guests have been added,
          preferences in what course they would like to make can be selected. If
          they have no preference, then they will be assigned a random category.
        </p>
      </div>

      <div className="max-h-4/8 h-full flex flex-col justify-around">
        {/* name input */}
        <div className="h-1/8 w-full flex justify-center items-center flex-col">
        <label htmlFor="guestNameInput" className="sr-only"></label>
          <div className="join max-w-[310px] w-full">
            <input
              ref={nameRef}
              type="text"
              id="guestNameInput"
              placeholder="Enter a guest name..."
              className="input join-item invalid:border-red-400"
              spellCheck={false}
              pattern="[A-Za-z]*"
              minLength="1"
              maxLength="30"
              title="letters only"
              onChange={(e) => setGuestName(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleNewGuest() : null)}
              disabled={guests.length >= guestNum}
            />
            <button
              className="join-item btn btn-primary"
              onClick={handleNewGuest}
              disabled={guests.length >= guestNum}
            >
              +Add
            </button>
          </div>
          {alert && (
            <div className="mt-1.5">
              <p className="text-xs text-red-400 font-bold">
                Names must have letters only, no characters.
              </p>
            </div>
          )}
        </div>
        {/* display names + prefs */}
        <div className="max-h-5/8 h-full mb-1">
          <div className="w-full flex justify-between h-1/8 text-sm">
            <p>Name</p>
            <p>Preference</p>
          </div>
          <div className="w-full h-full border border-blue-300 max-h-7/8 overflow-y-scroll">
            {guests.map((guest, index) => (
              <div
                key={index}
                className="flex justify-between items-baseline p-1"
              >
                <div className="flex items-center">
                  <button
                    className="btn btn-primary btn-xs mr-1"
                    onClick={() => handleRemoveGuest(guest.name)}
                    disabled={prefsValid}
                  >
                    X
                  </button>
                  <p className="font-semibold">{guest.name}</p>
                </div>
                <label htmlFor="guestPrefSelect" className="sr-only"></label>
                <select
                  className="select select-primary select-md w-[50%]"
                  id="guestPrefSelect"
                  onChange={(e) => handlePref(e.target.value, guest.name)}
                  disabled={prefSelect()}
                >
                  <option key="Any" value="Any">
                    Any
                  </option>
                  {filtered.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          {prefError && (
            <div className="flex justify-center items-center flex-col my-2 outline outline-red-400">
              <p className="text-center text-sm p-1">
                Error: Preferences do not match dish number. Please adjust to
                match and re-submit.
              </p>
              <div className="flex flex-col justify-center w-3/6">
                {invalidCourses.map((course, index) => (
                  <div key={index} className="flex justify-between">
                    <p>{course}</p>
                    <div>
                      <p>
                        <span className="text-red-400 font-semibold">
                          {count[course]}
                        </span>
                        /{numOfDishes[course]}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-center">
            <button
              className="btn btn-primary my-3"
              onClick={prefChecker}
              disabled={submitDisabled}
            >
              {!prefsValid ? "Submit Guests" : <Checkmark />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestNamePage;
