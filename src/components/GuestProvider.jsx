import React, { useState } from "react";
import { GuestContext } from "./GuestContext";
function GuestProvider({ children }) {
  // page changes from buttons
  const [page, setPage] = useState("Intro");
  return <GuestContext value={{ page, setPage }}>{children}</GuestContext>;
}

export default GuestProvider;
