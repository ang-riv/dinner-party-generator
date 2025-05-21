import { useContext, useRef } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import generatePDF from "react-to-pdf";
import { LemonEmoji } from "../components/Icons";

const MenuPage = ({ setPageNum }) => {
  const targetRef = useRef();
  const { guests, numOfDishes, courses } = useContext(GuestContext);
  const filtered = courses.filter((course) => numOfDishes[course] != 0);
  const primaryBlue = "#60a5fa";
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full pt-34 pb-5">
      <div
        className="w-[320px] max-w-96 h-fit py-6 flex justify-center items-center"
        style={{ backgroundColor: "#93c5fd" }}
        ref={targetRef}
      >
        <div
          className="w-11/12 min-h-11/12 rounded-t-full pt-10"
          style={{
            border: `3px solid ${primaryBlue}`,
            backgroundColor: "white",
          }}
        >
          <div className="relative -left-3 bottom-2">
            <LemonEmoji />
          </div>
          <h1
            className="text-[55px] leading-none text-center mb-8"
            style={{ color: primaryBlue }}
          >
            Dinner Party Menu
          </h1>

          {/* courses + dishes */}
          <div className="">
            {filtered.map((course, index) => {
              const courseTitle = course.toUpperCase();
              return (
                <div className="mb-10" key={index}>
                  <h2
                    className="font-bold underline text-center"
                    style={{ color: primaryBlue }}
                  >
                    {courseTitle}
                  </h2>
                  <div>
                    {guests.map((guest) => {
                      if (guest.recipe.course === course) {
                        return (
                          <p
                            className="text-center px-5 hover:text-primary"
                            style={{ color: "#2d3748" }}
                          >
                            <a
                              href={guest.recipe.sourceUrl}
                              target="_blank"
                              className="hover:text-primary hover:underline"
                            >
                              {guest.recipe.title}
                            </a>
                          </p>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="relative scale-x-[-1] top-3 -right-3">
            <LemonEmoji />
          </div>
        </div>
      </div>
      <div className="flex justify-around mt-2 max-w-[360px] w-full">
        <button
          className="btn btn-secondary btn-lg text-lg"
          onClick={() =>
            generatePDF(targetRef, { filename: "menu-invitation.pdf" })
          }
        >
          Save PDF
        </button>
        <button
          className="btn btn-primary btn-lg text-lg"
          onClick={() => setPageNum(0)}
        >
          Start Over
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
