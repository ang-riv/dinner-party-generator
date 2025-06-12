import { useContext, useEffect, useState } from "react";
import { GuestContext } from "./contexts/GuestContext";
const NavButtons = ({ pageNum, setPageNum }) => {
  const { guestNum, guests, prefsValid, dishesSelected } =
    useContext(GuestContext);
  const [btnState, setBtnState] = useState(true);

  // specific page requirements to make the next btn active
  useEffect(() => {
    switch (pageNum) {
      case 1:
        dishesSelected ? setBtnState(false) : setBtnState(true);
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
  }, [pageNum, guestNum, guests, prefsValid, dishesSelected]);
  return (
    <div className="flex justify-between items-end h-1/10 px-1.5 w-full">
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
          <p>Create menu invitations ⟶</p>
          <div>
            <button
              className="btn btn-primary"
              onClick={() => setPageNum((prev) => prev + 1)}
            >
              OK
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavButtons;
