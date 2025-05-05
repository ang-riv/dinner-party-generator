import React from "react";
import { StylingContext } from "./StylingContext";

function StylingProvider({ children }) {
  const styles = {
    mainContentWrapper:
      "min-h-10/12 h-full flex flex-col overflow-y-scroll px-2",
  };
  return <StylingContext value={{ styles }}>{children}</StylingContext>;
}

export default StylingProvider;
