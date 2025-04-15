import React, { useState, useEffect } from "react";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import { GuestContext } from "../components/contexts/GuestContext";
const ConfirmPage = () => {
  return (
    <div className="h-10/12 px-2">
      <h2 className="h-2/10 outline outline-amber-200 flex justify-center items-center text-4xl">
        Guest List
      </h2>
      {/* name + pref */}
      <div className="h-6/10 outline outline-amber-200">
        <div className="w-full h-1/8 outline outline-blue-300"></div>
      </div>
      {/* restrictions */}
      <div className="h-2/10 outline outline-amber-200">
        <h3 className="text-center">
          Dietary Restrictions, Allergies, Dislikes:
        </h3>
      </div>
    </div>
  );
};

export default ConfirmPage;
