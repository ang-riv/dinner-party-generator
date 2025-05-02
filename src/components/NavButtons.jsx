import React, { useContext, useEffect, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
const NavButtons = ({ pageNum, setPageNum }) => {
  const { guestNum, guests, prefsValid } = useContext(GuestContext);
  const [btnState, setBtnState] = useState(true);

  // each page will have requirements that need to be fulfilled to make the next button active
  useEffect(() => {
    switch (pageNum) {
      case 1:
        guestNum != 0 ? setBtnState(false) : setBtnState(true);
        break;
      case 2:
        guests.length === Number(guestNum) && prefsValid === true
          ? setBtnState(false)
          : setBtnState(true);
        break;
      case 3:
      case 4:
        setBtnState(false);
        break;
      case 5:
      default:
        setBtnState(true);
        break;
    }
    console.log("Guests and guestNum: ", guests.length, guestNum);
    console.log("Prefs Valid State:", prefsValid);
  }, [pageNum, guestNum, guests, prefsValid]);
  return (
    <div className="flex justify-between h-fit items-end">
      {pageNum != 5 ? (
        <>
          <button
            className="btn btn-secondary"
            onClick={() => setPageNum((prev) => prev - 1)}
            disabled={pageNum === 0}
          >
            {pageNum != 4 ? "Back" : "Go Back"}
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setPageNum((prev) => prev + 1)}
            disabled={btnState}
          >
            {/* Changing the text based on page */}
            {pageNum != 4 ? "Next" : "Confirm"}
          </button>
        </>
      ) : (
        <>
          <p>Generate menu invites?</p>
          <div>
            <button
              className="btn btn-secondary mr-1"
              onClick={() => setPageNum((prev) => prev + 1)}
            >
              Yes
            </button>
            <button className="btn btn-primary">No</button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavButtons;
