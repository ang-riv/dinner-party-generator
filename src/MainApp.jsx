// * acts like app since I made everything in app
import React from "react";
import IntroPage from "./pages/IntroPage";
import DishesPage from "./pages/DishesPage";
import GuestProvider from "./components/GuestProvider";
function MainApp() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <GuestProvider>
        <div className="border border-blue-400 py-8">
          <DishesPage />
        </div>
      </GuestProvider>
    </div>
  );
}

export default MainApp;
