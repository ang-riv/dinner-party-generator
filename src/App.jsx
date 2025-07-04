import { useEffect, useState } from "react";
import IntroPage from "./pages/IntroPage";
import DishesPage from "./pages/DishesPage";
import GuestNamePage from "./pages/GuestNamePage";
import ConfirmPage from "./pages/ConfirmPage";
import RestrictionsPage from "./pages/RestrictionsPage";
import PreviewPage from "./pages/PreviewPage";
import Steps from "./components/Steps";
import NavButtons from "./components/NavButtons";
import MenuPage from "./pages/MenuPage";
import AppProvider from "./components/contexts/AppProvider";
import { motion, AnimatePresence } from "motion/react";

function App() {
  const [pageNum, setPageNum] = useState(0);

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

  const variants = {
    initial: { y: 10, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -10, opacity: 0 },
    transition: { duration: 0.8 },
  };
  return (
    <div
      className="flex justify-center items-center w-screen h-screen overflow-y-scroll"
      data-theme="dinnerTheme"
    >
      <AppProvider>
        <main className="w-full h-full flex justify-center items-center">
          <AnimatePresence mode="wait">
            {pageNum != 6 ? (
              <>
                {pageNum === 0 ? (
                  <motion.div
                    key={0}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="flex items-center justify-center max-w-[449px] h-fit sm:outline-2 sm:outline-primary py-10 sm:shadow-xl sm:shadow-base-200"
                  >
                    {pages[0]}
                  </motion.div>
                ) : (
                  <motion.div
                    key={pageNum}
                    variants={variants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition="transition"
                    className="flex flex-col justify-between h-full max-h-[670px] min-h-[650px]  min-w-80 w-full max-w-[450px] sm:outline-2 sm:outline-primary py-3 sm:shadow-xl sm:shadow-base-200"
                  >
                    <Steps active={pageNum} />
                    {currentPage}
                    <NavButtons
                      pageNum={pageNum}
                      setPageNum={setPageNum}
                      pageCap={pages.length}
                    />
                  </motion.div>
                )}
              </>
            ) : (
              <MenuPage key={7} pageNum={pageNum} setPageNum={setPageNum} />
            )}
          </AnimatePresence>
        </main>
      </AppProvider>
    </div>
  );
}

export default App;
