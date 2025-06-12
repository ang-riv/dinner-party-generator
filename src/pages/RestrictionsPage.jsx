import { useEffect, useRef, useState, useContext } from "react";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import { StylingContext } from "../components/contexts/StylingContext";
const RestrictionsPage = () => {
  const { styles } = useContext(StylingContext);
  const {
    dietRestrictions,
    setDietRestrictions,
    foodRestrictions,
    setFoodRestrictions,
  } = useContext(RestrictionsContext);
  const inputRef = useRef(null);
  const [restrictionName, setRestrictionName] = useState("");
  const diets = ["Vegan", "Vegetarian", "Gluten-free", "Dairy-free"];
  const [alert, setAlert] = useState(false);

  //* for api
  const [isLoading, setIsLoading] = useState(false);

  //* searching Open Food Facts API
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
        const capitalIngredient =
          ingredient.charAt(0).toUpperCase() +
          ingredient.slice(1).toLowerCase();
        // if it is a food, add to array
        if (data.products.length > 0) {
          setFoodRestrictions([...foodRestrictions, capitalIngredient]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setShowError(true);
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

    foodRestrictions.length >= 5
      ? setRestrictionCap(true)
      : setRestrictionCap(false);
  }, [search, foodRestrictions]);

  const handleDiet = (e) => {
    if (e.target.checked === true) {
      setDietRestrictions([...dietRestrictions, e.target.value]);
    } else {
      // if checked before then unchecked, take it out of the arr
      const newArr = foodRestrictions.filter((item) => item != e.target.value);
      setDietRestrictions(newArr);
    }
  };

  const handleAdd = () => {
    if (inputRef.current.checkValidity()) {
      setSearch(restrictionName);
      setAlert(false);
    } else {
      setAlert(true);
    }
  };
  const handleRemove = (foodItem) => {
    const updatedArr = foodRestrictions.filter((food) => food != foodItem);
    setFoodRestrictions(updatedArr);
  };

  return (
    <div className={styles.mainContentWrapper}>
      <h2 className={styles.sectionTitle}>
        Dietary Restrictions, Allergies, Dislikes
      </h2>
      <div className={styles.sectionContentWrapper}>
        {/* diet restrictions checkboxes */}
        <div className="h-1/8 flex flex-col justify-center items-center">
          <h3 className="text-center mb-1">Dietary Restrictions</h3>
          <div className="flex flex-wrap max-w-[360px]">
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
        <div className="h-1/8 flex flex-col justify-center items-center">
          <h3 className="text-center mb-1">Allergies/Dislikes</h3>
          <div className="join w-full flex justify-center items-center">
            <input
              type="text"
              ref={inputRef}
              className="input join-item invalid:border-red-400"
              name="allergies"
              id="allergies"
              minLength="3"
              maxLength="30"
              autoComplete="off"
              placeholder="Enter food item..."
              pattern="[A-Za-z]*"
              onChange={(e) => setRestrictionName(e.target.value)}
              onKeyDown={(e) => (e.key === "Enter" ? handleAdd() : null)}
              disabled={restrictionCap}
            />
            <button
              className="btn btn-primary join-item"
              onClick={handleAdd}
              disabled={restrictionCap}
            >
              +Add
            </button>
          </div>
          {alert && (
            <div>
              <p className="text-xs text-red-400">
                Must be more than 3 letters and characters only.
              </p>
            </div>
          )}
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
                    <div
                      key={foodItem}
                      className="w-1/2 h-1/5 flex items-center mb-1"
                    >
                      <button
                        className="btn btn-primary btn-xs mr-1"
                        onClick={() => handleRemove(foodItem)}
                      >
                        X
                      </button>
                      <p>{foodItem}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestrictionsPage;
