import NavButtons from "./components/NavButtons";
import Steps from "./components/Steps";
import React from "react";

const TestStyles = () => {
  return (
    // screen
    <div className="w-screen h-screen border border-green-400 flex justify-center items-center">
      {/* main container */}
      <div className="w-full min-w-xs max-w-[450px] max-h-10/12  outline outline-pink-400 h-full">
        <Steps />
        {/* wrapper */}
        <div className="min-h-8/10 h-8/10 w-full overflow-y-scroll">
          <h2 className="text-3xl h-3/10 text-center outline outline-purple-300 flex justify-center items-center">
            Tester
          </h2>
          <div className="min-h-7/10 outline outline-blue-300 h-7/10">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
              Sed viverra consectetur mollis. Nunc imperdiet ante mi, non
              pharetra ex sagittis a. Quisque at sem sed nisl tristique interdum
              id in ipsum. Aliquam erat volutpat. Sed feugiat neque et quam
              ornare varius. Nulla vulputate bibendum tortor, et eleifend risus
              vehicula sit amet. Aliquam erat volutpat. Donec sed placerat
              purus. Nam consequat justo non lectus commodo, ac pellentesque
              massa gravida. Fusce posuere ut nunc quis venenatis. Curabitur
              vitae dolor ac risus tempor pretium. Duis ac neque eget nibh
              dictum semper. Quisque non magna id mi lobortis elementum et vitae
              neque. Sed viverra consectetur mollis. Nunc imperdiet ante mi, non
              pharetra ex sagittis a. Quisque at sem sed nisl tristique interdum
              id in ipsum. Aliquam erat volutpat. Sed feugiat neque et quam
              ornare varius. Nulla vulputate bibendum tortor, et eleifend risus
              vehicula sit amet. Aliquam erat volutpat. Donec sed placerat
              purus. Nam consequat justo non lectus commodo, ac pellentesque
              massa gravida. Fusce posuere ut nunc quis venenatis. Curabitur
              vitae dolor ac risus tempor pretium. Duis ac neque eget nibh
              dictum semper. Quisque non magna id mi lobortis elementum et vitae
              neque.
            </p>
          </div>
        </div>
        <NavButtons />
      </div>
    </div>
  );
};

export default TestStyles;
