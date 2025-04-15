import React, { useState } from "react";
const RestrictionsPage = () => {
  return (
    <div>
      <h2>Dietary Restrictions, Allergies, Dislikes</h2>
      {/* diet restrictions checkboxes */}
      <div>
        <h3>Dietary Restrictions</h3>
        <div></div>
      </div>
      {/* allergies/dislikes */}
      <div>
        <h3>Allergies/Dislikes</h3>
        <div className="join">
          <input type="text join-item" name="" id="" />
          <button className="join-item"></button>
        </div>
      </div>
      {/* display */}
      <div></div>
    </div>
  );
};

export default RestrictionsPage;
