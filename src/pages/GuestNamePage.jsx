import React, { useRef, useContext, useState, useEffect } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { StylingContext } from "../components/contexts/StylingContext";

export function Checkmark(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={40}
      height={40}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="green"
        d="m10.6 16.6l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4T6.325 6.325T4 12t2.325 5.675T12 20m0-8"
      ></path>
    </svg>
  );
}
const GuestNamePage = () => {
  const { styles } = useContext(StylingContext);
  const {
    courses,
    guests,
    setGuests,
    guestNum,
    numOfDishes,
    setPrefsValid,
    prefsValid,
  } = useContext(GuestContext);
  const [guestName, setGuestName] = useState("");
  const nameRef = useRef(null);
  const filtered = courses.filter((course) => numOfDishes[course] != 0);
  const guestsLength = guests.length;
  const [submitDisabled, isSubmitDisabled] = useState(true);

  // * error name input
  const [alert, setAlert] = useState(false);
  // * error guests prefs don't match numOfDishes
  const [prefError, setPrefError] = useState(false);
  const [count, setCount] = useState({});
  const [invalidCourses, setInvalidCourses] = useState([]);
  const invalidPrefs = [];
  let invalidLength = 0;

  //* making sure that the prefs match the amount of dishes picked
  const prefCounter = {};
  for (let i = 0; i < filtered.length; i++) {
    const course = filtered[i];
    prefCounter[course] = 0;
  }

  const guestPrefs = guests.map((guest) => guest.preference);

  useEffect(() => {
    if (guestsLength === Number(guestNum) || prefError) {
      console.log("Cap! All guests have been added. Activate checker.");
      isSubmitDisabled(false);
    }
    if (prefsValid) {
      isSubmitDisabled(true);
    }
    invalidLength = invalidCourses.length;
    console.log("InvalidLength: ", invalidLength);
  }, [guestsLength, submitDisabled, prefsValid, prefError, invalidLength]);

  // check how many times a course was chosen/pref made
  const prefFreq = (arr, target) => {
    // prevent it from doing it by making sure it only happens when that course is empty
    if (prefCounter[target] === 0) {
      for (let i = 0; i < arr.length; i++) {
        const pref = arr[i];
        if (pref === target) {
          prefCounter[target] += 1;
        }
      }
    } else {
      console.log("Already ran once.");
    }
  };

  const prefChecker = () => {
    // loop over the course categories chosen then find how many times it shows up in the prefs arr
    for (const course in filtered) {
      prefFreq(guestPrefs, filtered[course]);
    }

    // check if it matches or is less than the course category
    // 1) compare the pref number, should be <= guestNum as everyone or a few can make a pref
    const prefTotal = Object.values(prefCounter).reduce(
      (acc, num) => acc + num,
      0
    );

    if (prefTotal <= guestNum) {
      // 2) loop through each and check the amounts under each course
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

  //* add new guest
  const handleNewGuest = () => {
    // check if the name is valid first
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

  //* set guest preferences for select onChange
  const handlePref = (e, guestName) => {
    setGuests((prevGuests) =>
      prevGuests.map((guest) =>
        guest.name === guestName ? { ...guest, preference: e } : guest
      )
    );
  };

  //* remove guest
  const handleRemoveGuest = (guestName) => {
    const updatedArr = guests.filter((guest) => guest.name != guestName);
    setGuests(updatedArr);
  };
  return (
    <div className={styles.mainContentWrapper}>
      {/* text */}
      <div className="flex flex-col justify-center items-center py-11">
        <h2 className="text-4xl text-center mb-4">Guest Names</h2>
        <p className="text-center">
          Enter the name of each guest and their preference in what course they
          would like to make. If they have no preference, then they will be
          assigned a random category.
        </p>
      </div>

      <div className="max-h-4/8 h-full flex flex-col justify-around">
        {/* name input */}
        <div className="h-1/8 w-full flex justify-center items-center">
          <div className="join max-w-[310px] w-full">
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter a guest name..."
              className="input join-item invalid:border-red-400"
              spellCheck={false}
              pattern="[A-Za-z]*"
              minLength="3"
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
            <div>
              <p className="text-xs text-red-400">
                Must be longer than 3 letters with no characters.
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
                <select
                  className="select select-primary select-md w-[50%]"
                  onChange={(e) => handlePref(e.target.value, guest.name)}
                  disabled={prefsValid}
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
              <p className="text-center text-sm">
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
            <div className="outline-1 outline-success my-3 flex items-center rounded-xs">
              <Checkmark />
            </div>
            <button
              className="btn btn-primary my-3"
              onClick={prefChecker}
              disabled={submitDisabled}
            >
              Submit Guests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestNamePage;
