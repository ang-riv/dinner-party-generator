// * acts like app since I made everything in app
import React from "react";
import IntroPage from "./pages/IntroPage";
import DishesPage from "./pages/DishesPage";
import GuestNamePage from "./pages/GuestNamePage";
import GuestProvider from "./components/GuestProvider";
import Steps from "./components/Steps";
import NavButtons from "./components/NavButtons";
function MainApp() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <GuestProvider>
        <div className="border border-blue-400 flex flex-col justify-between h-10/14">
          <Steps active={0} />
          <GuestNamePage />
          <NavButtons />
        </div>
      </GuestProvider>
    </div>
  );
}

export default MainApp;
