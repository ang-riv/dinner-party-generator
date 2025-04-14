import { div } from "motion/react-client";
import React from "react";

const Steps = ({ active }) => {
  return (
    <div className="my-2">
      <ul className="steps">
        <li className="step">Dishes</li>
        <li className="step">Names</li>
        <li className="step">Diet</li>
        <li className="step">Confirm</li>
        <li className="step">Preview</li>
      </ul>
    </div>
  );
};

export default Steps;
