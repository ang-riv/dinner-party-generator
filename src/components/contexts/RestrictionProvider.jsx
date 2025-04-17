import React, { useState } from "react";
import { RestrictionsContext } from "./RestrictionsContext";
function RestrictionProvider({ children }) {
  // * diet checkboxes
  const [dietRestrictions, setDietRestrictions] = useState([
    "Vegan",
    "Gluten-free",
  ]);
  // * input for allergies/dislikes
  const [foodRestrictions, setFoodRestrictions] = useState([
    "Mushrooms",
    "Tomatoes",
    "Brussel Sprouts",
  ]);
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
