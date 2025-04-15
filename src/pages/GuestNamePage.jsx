import React from "react";
const GuestNamePage = () => {
  return (
    <div>
      <h2>Guest Names</h2>
      <p>
        Enter the name of each guest and their preference in what course they
        would like to make. If they have no preference, then they will be
        assigned a random category.
      </p>
      {/* name input */}
      <div className="px-3">
        <div className="join w-full">
          <input type="text" className="input join-item" min={3} max={15} />
          <button className="join-item btn btn-primary">+Add</button>
        </div>
      </div>
      {/* display names + prefs */}
      <div className="mx-2">
        <div className="w-full flex justify-between">
          <p>Name</p>
          <p>Preference</p>
        </div>
        <div className="w-full bg-neutral-400 h-[170px] overflow-y-scroll"></div>
      </div>
    </div>
  );
};

export default GuestNamePage;
