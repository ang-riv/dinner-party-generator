import { div } from "motion/react-client";
import React from "react";

const Steps = ({ active }) => {
  const pageTitles = ["Dishes", "Names", "Diet", "Confirm", "Preview"];
  const steps = [];
  for (let i = 0; i < pageTitles.length; i++) {
    const stepTitle = pageTitles[i];
    const inactiveSteps = "step";
    const activeSteps = "step step-primary";
    i <= active
      ? steps.push(<li className={activeSteps}>{stepTitle}</li>)
      : steps.push(<li className={inactiveSteps}>{stepTitle}</li>);
  }
  return (
    <div className="my-2">
      <ul className="steps">{steps}</ul>
    </div>
  );
};

export default Steps;
