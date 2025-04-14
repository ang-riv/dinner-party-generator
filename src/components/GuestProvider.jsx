import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // courses
  const courses = ["Appetizers", "Entrees", "Desserts", "Beverages"];
  // page changes from buttons
  const [page, setPage] = useState("Intro");
  return (
    <GuestContext value={{ page, setPage, courses }}>{children}</GuestContext>
  );
}

export default GuestProvider;
