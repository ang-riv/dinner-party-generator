import React from "react";
import { StylingContext } from "./StylingContext";

function StylingProvider({ children }) {
  const styles = {
    mainContentWrapper:
      "min-h-10/12 h-full flex flex-col overflow-y-scroll px-2",
    sectionTitle: "flex justify-center items-center text-center text-4xl h-2/8",
    sectionContentWrapper: "min-h-6/8 flex flex-col justify-around",
  };
  return <StylingContext value={{ styles }}>{children}</StylingContext>;
}

export default StylingProvider;
