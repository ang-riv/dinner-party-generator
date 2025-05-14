import { createContext, useState } from "react";

export const RestrictionsContext = createContext();

export const RestrictionProvider = ({ children }) => {
  // * diet checkboxes
  const [dietRestrictions, setDietRestrictions] = useState(null);
  // * input for allergies/dislikes
  const [foodRestrictions, setFoodRestrictions] = useState(null);

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
};
