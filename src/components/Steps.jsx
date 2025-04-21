import React from "react";

const Steps = ({ active }) => {
  const pageTitles = ["Dishes", "Names", "Diet", "Confirm", "Preview"];
  const steps = [];
  for (let i = 0; i < pageTitles.length; i++) {
    const stepTitle = pageTitles[i];
    const inactiveSteps = "step text-sm";
    const activeSteps = "step step-primary text-sm";
    i <= active - 1
      ? steps.push(
          <li key={stepTitle} className={activeSteps}>
            {stepTitle}
          </li>
        )
      : steps.push(
          <li key={stepTitle} className={inactiveSteps}>
            {stepTitle}
          </li>
        );
  }
  return (
    <div className="h-fit">
      <ul className="steps">{steps}</ul>
    </div>
  );
};

export default Steps;
