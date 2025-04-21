import React, { useContext, useEffect, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
import { RestrictionsContext } from "./contexts/RestrictionsContext";
const NavButtons = ({ pageNum, setPageNum, pageCap }) => {
  const { guestNum, numOfDishes, guests } = useContext(GuestContext);
  const [btnState, setBtnState] = useState(true);

  // each page will have requirements that need to be fulfilled to make the next button active
  useEffect(() => {
    switch (pageNum) {
      case 1:
        guestNum != 0 ? setBtnState(false) : setBtnState(true);
        break;
      case 2:
        guests.length != guestNum ? setBtnState(true) : setBtnState(false);
        break;
      case 3:
        setBtnState(false);
        break;
      case pageCap:
      default:
        setBtnState(true);
        break;
    }
  }, [pageNum, guestNum, guests]);
  return (
    <div className="flex justify-between h-fit items-end">
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
    </div>
  );
};

export default NavButtons;
