import React, { useEffect, useRef, useState } from "react";
const RestrictionsPage = () => {
  const inputRef = useRef(null);
  // * checkboxes
  const [dietRestrictions, setDietRestrictions] = useState([]);
  // * using input for allergies/dislikes
  const [foodRestrictions, setFoodRestrictions] = useState([]);
  const [restrictionName, setRestrictionName] = useState("");
  const diets = ["Vegan", "Vegetarian", "Gluten-free", "Dairy-free"];

  //* loading for api
  const [isLoading, setIsLoading] = useState(false);

  //* for searching Open Food Facts API
  const [search, setSearch] = useState("");
  const [showError, setShowError] = useState(false);
  const [restrictionCap, setRestrictionCap] = useState(false);
  useEffect(() => {
    // * search foodItem
    const searchIngredient = async (ingredient) => {
      const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(
        ingredient
      )}&search_simple=1&json=1`;

      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();

        // if it is a food, add to array
        if (data.products.length > 0) {
          setFoodRestrictions([...foodRestrictions, ingredient]);
          setIsLoading(false);
          console.log("is a food item!");
        } else {
          // if not
          setIsLoading(false);
          setShowError(true);
          console.log("Not a food item!");
        }
      } catch (error) {
        console.log("Error fetching ingredient:", error);
      }

      // clear everything
      setRestrictionName("");
      setSearch("");
      if (inputRef.current) inputRef.current.value = "";
    };

    if (search != "") {
      setIsLoading(true);
      searchIngredient(search);
    }

    // cap off number of allergies/dislikes at 10
    if (foodRestrictions.length >= 10) setRestrictionCap(true);
  }, [search, foodRestrictions]);

  const handleDiet = (e) => {
    // if checked, add to arr
    if (e.target.checked === true) {
      setDietRestrictions([...dietRestrictions, e.target.value]);
    } else {
      // if checked before then unchecked, take it out of the arr
      const newArr = foodRestrictions.filter((item) => item != e.target.value);
      setDietRestrictions(newArr);
    }
  };
  return (
    <div className="h-10/12 px-2 flex flex-col justify-around">
      <h2 className="h-1/8 text-3xl text-center flex justify-center items-center">
        Dietary Restrictions, Allergies, Dislikes
      </h2>
      {/* diet restrictions checkboxes */}
      <div className="h-1/8">
        <h3 className="text-center">Dietary Restrictions</h3>
        <div className="flex flex-wrap">
          {diets.map((diet) => (
            <label key={diet} className="w-1/2 mb-2">
              <input
                className="checkbox checkbox-primary mr-2"
                type="checkbox"
                id={diet}
                value={diet}
                onChange={(e) => handleDiet(e)}
              />
              {diet}
            </label>
          ))}
        </div>
      </div>
      {/* allergies/dislikes */}
      <div className="h-1/8">
        <h3 className="text-center">Allergies/Dislikes</h3>
        <div className="join w-full ">
          <input
            type="text"
            ref={inputRef}
            className="input join-item"
            name="allergies"
            id="allergies"
            minLength="3"
            maxLength="30"
            autoComplete="off"
            placeholder="Enter food item..."
            pattern="[A-Za-z]*"
            onChange={(e) => setRestrictionName(e.target.value)}
          />
          <button
            className="btn btn-primary join-item"
            onClick={() => setSearch(restrictionName)}
          >
            +Add
          </button>
        </div>
      </div>
      {/* display */}
      <div className="h-3/8 border border-blue-400">
        {showError ? (
          <div className="h-full w-full flex flex-col justify-center items-center">
            <p className="text-center mb-2">
              Food item not found. <br /> Please enter a food item.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => setShowError(false)}
            >
              OK
            </button>
          </div>
        ) : (
          <>
            {isLoading ? (
              <div className="h-full w-full flex flex-col justify-center items-center">
                <p className="text-center text-sm">
                  Searching <span className="font-bold">Open Food Facts</span>
                  <br /> for food item...
                </p>
                <span className="loading loading-spinner text-primary"></span>
              </div>
            ) : (
              <div className="h-full w-full flex flex-col items-start p-1">
                {foodRestrictions.map((foodItem) => (
                  <div className="w-1/2 h-1/5 flex items-center mb-1">
                    <button className="btn btn-primary btn-xs mr-1">X</button>
                    <p>{foodItem}</p>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default RestrictionsPage;
