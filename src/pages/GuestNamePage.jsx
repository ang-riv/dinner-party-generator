import React, { useRef, useContext, useState, useEffect } from "react";
import { GuestContext } from "../components/contexts/GuestContext";

const GuestNamePage = () => {
  const {
    courses,
    guests,
    setGuests,
    guestNum,
    numOfDishes,
    setFilteredCourses,
  } = useContext(GuestContext);
  const [guestName, setGuestName] = useState("");
  const nameRef = useRef(null);

  const filtered = courses.filter((course) => numOfDishes[course] != 0);
  useEffect(() => {
    if (numOfDishes.length) setFilteredCourses(filtered);
  }, []);
  //* add new guest
  const handleNewGuest = () => {
    const properName =
      guestName.charAt(0).toUpperCase() + guestName.slice(1).toLowerCase();
    setGuests([{ name: properName, preference: "Any", recipe: "" }, ...guests]);
    if (nameRef.current) nameRef.current.value = "";
  };

  //* set guest preferences
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
    <div className="h-10/12 flex flex-col justify-between px-2">
      {/* text */}
      <h2 className="h-2/8 flex justify-center items-center text-center text-4xl  ">
        Guest Names
      </h2>
      <p className="h-2/8 text-sm text-center">
        Enter the name of each guest and their preference in what course they
        would like to make. If they have no preference, then they will be
        assigned a random category.
      </p>
      {/* name input */}
      <div className="h-1/8">
        <div className="join w-full">
          <input
            ref={nameRef}
            type="text"
            className="input join-item"
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
      </div>
      {/* display names + prefs */}
      <div className="h-3/8 mb-1">
        <div className="w-full flex justify-between h-1/8 text-sm">
          <p>Name</p>
          <p>Preference</p>
        </div>
        <div className="w-full border border-blue-300 h-7/8 overflow-y-scroll">
          {guests.map((guest, index) => (
            <div
              key={index}
              className="flex justify-between items-baseline p-1"
            >
              <div className="flex items-center">
                <button
                  className="btn btn-primary btn-xs mr-1"
                  onClick={() => handleRemoveGuest(guest.name)}
                >
                  X
                </button>
                <p className="font-semibold">{guest.name}</p>
              </div>
              <select
                className="select select-primary select-md w-[50%]"
                onChange={(e) => handlePref(e.target.value, guest.name)}
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
      </div>
    </div>
  );
};

export default GuestNamePage;
