import React from "react";
const NavButtons = ({ pageNum, setPageNum, pages }) => {
  // each page will have requirements that need to be fulfilled to make the next button active
  return (
    <div className="flex justify-between h-fit items-end">
      <button
        className="btn btn-secondary"
        onClick={() => setPageNum((prev) => prev - 1)}
        disabled={pageNum === 0}
      >
        Back
      </button>
      <button
        className="btn btn-primary"
        onClick={() => setPageNum((prev) => prev + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default NavButtons;
