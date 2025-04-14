// * acts like app since I made everything in app
import React from "react";
import IntroPage from "./pages/IntroPage";
import GuestProvider from "./components/GuestProvider";
function MainApp() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <GuestProvider>
        <IntroPage />
      </GuestProvider>
    </div>
  );
}

export default MainApp;
