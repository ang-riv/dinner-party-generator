import React, { useContext } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { div, h2 } from "motion/react-client";
const MenuPage = () => {
  const { guests, numOfDishes, courses } = useContext(GuestContext);
  const filtered = courses.filter((course) => numOfDishes[course] != 0);

  return (
    <div className="size-full bg-blue-300 flex justify-center items-center">
      <div className="w-11/12 h-11/12 bg-white rounded-t-full outline-3 outline-blue-400">
        <h1 className="text-blue-400 text-[55px] leading-none text-center relative top-30">
          Dinner Party Menu
        </h1>
        {/* courses + dishes */}
        {filtered.map((course) => {
          const courseTitle = course.toUpperCase();
          <h2 className="font-bold underline text-center text-blue-400">
            {courseTitle}
          </h2>;
          <div>
            {guests.map((guest) => {
              if (guest.recipe.course === course) {
                return <p>{guest.recipe.title}</p>;
              }
            })}
          </div>;
        })}
      </div>
    </div>
  );
};

export default MenuPage;
