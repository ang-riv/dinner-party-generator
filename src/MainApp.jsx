// * acts like app since I made everything in app
import React from "react";
import Steps from "./components/Steps";
function MainApp() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <Steps />
    </div>
  );
}

export default MainApp;
