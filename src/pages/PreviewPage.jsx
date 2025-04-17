import React, { useContext } from "react";
import PreviewCard from "./PreviewCard";
import { GuestContext } from "../components/contexts/GuestContext";
import { div } from "motion/react-client";
const PreviewPage = () => {
  const { courses, numOfDishes } = useContext(GuestContext);
  // filter out the courses that aren't wanted
  // making the course sections
  return (
    <div className=" w-full h-9/10">
      <h2 className="flex justify-center items-center text-center text-4xl  h-2/10 ">
        Courses
      </h2>
      <div className="overflow-y-scroll  w-full h-8/10">
        {courses.map((course) => (
          <div className="w-full h-fit ">
            <div className="w-full h-fit mb-2">
              <h2 className="text-center text-xl font-bold py-2">{course}</h2>

              <div className="w-full h-fit flex flex-wrap justify-around">
                <PreviewCard title="Testing" name="Amanda" />
                <PreviewCard title="Testing" name="Amanda" />
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* courses container */}
      {/* <div className="overflow-y-scroll border border-green-800 w-full h-6/10">
        
      </div> */}
    </div>
  );
};

export default PreviewPage;
