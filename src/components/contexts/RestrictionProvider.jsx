import React, { useState } from "react";
import { RestrictionsContext } from "./RestrictionsContext";
function RestrictionProvider({ children }) {
  return <RestrictionsContext value={{}}>{children}</RestrictionsContext>;
}

export default RestrictionProvider;
