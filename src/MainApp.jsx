// * acts like app since I made everything in app
import React from "react";
import IntroPage from "./pages/IntroPage";
import DishesPage from "./pages/DishesPage";
import GuestNamePage from "./pages/GuestNamePage";
import ConfirmPage from "./pages/ConfirmPage";
import RestrictionsPage from "./pages/RestrictionsPage";
import PreviewPage from "./pages/PreviewPage";
import GuestProvider from "./components/contexts/GuestProvider";
import RestrictionProvider from "./components/contexts/RestrictionProvider";
import Steps from "./components/Steps";
import NavButtons from "./components/NavButtons";
function MainApp() {
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <GuestProvider>
        <div className="flex flex-col justify-between h-10/12">
          <Steps active={3} />
          {/* <RestrictionProvider>
            <RestrictionsPage />
          </RestrictionProvider> */}
          <RestrictionProvider>
            <PreviewPage />
          </RestrictionProvider>

          <NavButtons />
        </div>
      </GuestProvider>
    </div>
  );
}

export default MainApp;
