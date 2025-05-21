import { useContext, useEffect, useState } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import AssignDishes from "../components/AssignDishes";

const PreviewPage = () => {
  const { numOfDishes, setDishes, filteredCourses } = useContext(GuestContext);
  const { dietRestrictions, foodRestrictions } =
    useContext(RestrictionsContext);
  const apiKey = import.meta.env.VITE_APP_SPOONACULAR_KEY;

  const filtered = filteredCourses(numOfDishes);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // * fetch the total number of dishes within a course including restrictions
    const fetchDishes = async (course) => {
      let specificCourse = "";
      // spoonacular doesn't use the term entrees
      if (course != "Entrees") specificCourse = course.toLowerCase();
      else specificCourse = "main course";

      // dishes we need from this course
      const num = numOfDishes[course];

      // restrictions urls
      const dietUrl =
        dietRestrictions && dietRestrictions.length > 0
          ? `diet=${dietRestrictions.toString()}`
          : "";
      const foodUrl =
        foodRestrictions && foodRestrictions.length > 0
          ? `excludeIngredients=${foodRestrictions.toString()}`
          : "";
      const mainUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${specificCourse}${
        dietRestrictions && dietRestrictions.length > 0 ? `&${dietUrl}` : ""
      }${foodRestrictions && foodRestrictions.length > 0 ? `&${foodUrl}` : ""}`;

      // ** first call to get the totalResults - need to do or it won't be random, will pick the first dish every single time
      const response = await fetch(mainUrl);
      const data = await response.json();

      const totalResults = data.totalResults - num;

      // pick random num for dishes
      const randomDishNum = Math.floor(Math.random() * totalResults);

      // ** second call for random dishes
      const dishUrl = `${mainUrl}&offset=${randomDishNum}&number=${num}&addRecipeInformation=true`;
      const dishRes = await fetch(dishUrl);
      const dishData = await dishRes.json();

      let result = dishData.results.map((dish) => ({
        title: dish.title,
        sourceUrl: dish.sourceUrl,
        image: dish.image,
        course: course,
      }));
      return result;
    };

    // * fetch the correct number of dishes based on the random numbers
    const fetchAll = async () => {
      // grab the number of dishes per course
      const fetchCourses = filtered.map((course) => fetchDishes(course));
      // puts all the fetched dishes under each course together
      const dishes = await Promise.all(fetchCourses);
      setDishes(dishes.flat());
      setIsLoading(false);
    };

    fetchAll();
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center">
          <h2 className="mb-3">Grabbing dishes...</h2>
          <span className="loading loading-spinner text-primary loading-xl"></span>
        </div>
      ) : (
        <>
          <AssignDishes />
        </>
      )}
    </>
  );
};

export default PreviewPage;
