import React, { useState } from "react";
import { RestrictionsContext } from "./RestrictionsContext";
function RestrictionProvider({ children }) {
  // * diet checkboxes
  const [dietRestrictions, setDietRestrictions] = useState([]);
  // * input for allergies/dislikes
  const [foodRestrictions, setFoodRestrictions] = useState([]);

  const handleFoodReset = async () => {
    setDietRestrictions([]);
    setFoodRestrictions([]);
  };
  return (
    <RestrictionsContext
      value={{
        dietRestrictions,
        setDietRestrictions,
        foodRestrictions,
        setFoodRestrictions,
        handleFoodReset,
      }}
    >
      {children}
    </RestrictionsContext>
  );
}

export default RestrictionProvider;
