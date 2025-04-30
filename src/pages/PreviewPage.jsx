import React, { useContext, useEffect, useState } from "react";
import PreviewCard from "./PreviewCard";
import { GuestContext } from "../components/contexts/GuestContext";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import AssignDishes from "../components/AssignDishes";

const PreviewPage = () => {
  const { courses, numOfDishes, dishes, setDishes } = useContext(GuestContext);
  const { dietRestrictions, foodRestrictions } =
    useContext(RestrictionsContext);

  const apiKey = import.meta.env.VITE_APP_SPOONACULAR_KEY;

  // filter out unused categories
  const filtered = courses.filter((course) => numOfDishes[course] != 0);

  console.log(filtered);
  const [isLoading, setIsLoading] = useState(false);

  /*
  const [dishes, setDishes] = useState([
    { title: "A", preference: "", course: "Appetizers" },
    { title: "E", preference: "", course: "Entrees" },
    { title: "D", preference: "", course: "Desserts" },
    { title: "D", preference: "", course: "Desserts" },
    { title: "B", preference: "", course: "Beverages" },
  ]);
*/

  useEffect(() => {
    // * fetch dishes including restrictions
    const fetchDishes = async (course) => {
      let specificCourse = "";
      // spoonacular doesn't use the term entrees
      if (course != "Entrees") specificCourse = course.toLowerCase();
      else specificCourse = "main course";

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
      const mainUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&type=${specificCourse}&number=${num}${
        dietRestrictions && dietRestrictions.length > 0 ? `&${dietUrl}` : ""
      }${foodRestrictions && foodRestrictions.length > 0 ? `&${foodUrl}` : ""}`;

      const response = await fetch(mainUrl);
      const data = await response.json();

      let result = data.results.map((dish) => ({
        title: dish.title,
        sourceUrl: dish.sourceUrl,
        image: dish.image,
        course: course,
      }));
      return result;
    };
    // * fetch for each course that isn't 0
    const fetchAll = async () => {
      const fetchCourses = filtered.map((course) => fetchDishes(course));
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
