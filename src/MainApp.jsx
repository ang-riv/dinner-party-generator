// * acts like app since I made everything in app
import React, { useEffect, useState } from "react";
import IntroPage from "./pages/IntroPage";
import DishesPage from "./pages/DishesPage";
import GuestNamePage from "./pages/GuestNamePage";
import ConfirmPage from "./pages/ConfirmPage";
import RestrictionsPage from "./pages/RestrictionsPage";
import PreviewPage from "./pages/PreviewPage";
import GuestProvider from "./components/contexts/GuestProvider";
import RestrictionProvider from "./components/contexts/RestrictionProvider";
import StylingProvider from "./components/contexts/StylingProvider";
import Steps from "./components/Steps";
import NavButtons from "./components/NavButtons";
import MenuPage from "./pages/MenuPage";
import TestStyles from "./TestStyles";

function MainApp() {
  const [pageNum, setPageNum] = useState(0);
  const menuStyling = false;
  // navigating through the pages
  const pages = [
    <IntroPage setPageNum={setPageNum} />,
    <DishesPage />,
    <GuestNamePage />,
    <RestrictionsPage />,
    <ConfirmPage />,
    <PreviewPage pageNum={pageNum} />,
  ];

  const [currentPage, setCurrentPage] = useState(pages[0]);
  useEffect(() => {
    setCurrentPage(pages[pageNum]);
  }, [pageNum]);
  return (
    <div className="flex justify-center items-center w-screen h-screen">
      <GuestProvider>
        <StylingProvider>
          {pageNum != 6 && menuStyling === false ? (
            <>
              {pageNum === 0 ? (
                <div className="flex items-center justify-center max-w-[449px] max-h-[449px] outline outline-primary p-1 py-10">
                  {pages[0]}
                </div>
              ) : (
                <div className="flex flex-col justify-between h-full max-h-[670px] min-h-[650px]  min-w-80 w-full max-w-[450px] outline outline-primary py-3">
                  <Steps active={pageNum} />
                  <RestrictionProvider>{currentPage}</RestrictionProvider>
                  <NavButtons
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    pageCap={pages.length}
                  />
                </div>
              )}
            </>
          ) : (
            <MenuPage />
          )}
        </StylingProvider>
      </GuestProvider>
    </div>
  );
}

export default MainApp;
