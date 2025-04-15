import React, { useState } from "react";
import { RestrictionsContext } from "./RestrictionsContext";
function RestrictionProvider({ children }) {
  // * diet checkboxes
  const [dietRestrictions, setDietRestrictions] = useState([]);
  // * input for allergies/dislikes
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  return (
    <RestrictionsContext
      value={{
        dietRestrictions,
        setDietRestrictions,
        foodRestrictions,
        setFoodRestrictions,
      }}
    >
      {children}
    </RestrictionsContext>
  );
}

export default RestrictionProvider;
