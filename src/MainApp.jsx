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
import Steps from "./components/Steps";
import NavButtons from "./components/NavButtons";
import MenuPage from "./pages/MenuPage";
import TestStyles from "./TestStyles";

function MainApp() {
  const [pageNum, setPageNum] = useState(0);
  const menuStyling = true;
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
        {pageNum != 6 && menuStyling === false ? (
          <>
            <div className="flex flex-col justify-between h-full max-h-[670px] min-h-[650px]  min-w-80 w-full max-w-[450px] outline outline-pink-400 py-3 overflow-y-scroll">
              {pageNum === 0 ? (
                <div className="flex items-center justify-center w-full h-full">
                  {pages[0]}
                </div>
              ) : (
                <>
                  <Steps active={pageNum} />
                  <RestrictionProvider>{currentPage}</RestrictionProvider>
                  <NavButtons
                    pageNum={pageNum}
                    setPageNum={setPageNum}
                    pageCap={pages.length}
                  />
                </>
              )}
            </div>
          </>
        ) : (
          <TestStyles />
        )}
      </GuestProvider>
    </div>
  );
}

export default MainApp;
