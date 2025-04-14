import React, { useState } from "react";

const AssignDishes = (guest) => {
  return (
    <>
      <h3>
        {guest.name} is bringing: {guest.recipe.title}. Their preference is{" "}
        {guest.course}.
      </h3>
    </>
  );
};

export default AssignDishes;
