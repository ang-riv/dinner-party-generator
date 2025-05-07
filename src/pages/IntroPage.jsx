import React, { useContext, useEffect } from "react";
import { GuestContext } from "../components/contexts/GuestContext";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
const IntroPage = ({ setPageNum }) => {
  const { handleGuestReset } = useContext(GuestContext);
  const { handleFoodReset } = useContext(RestrictionsContext);

  // sets initial values for both first time render and reset
  const handleReset = async () => {
    await handleGuestReset();
    await handleFoodReset();
  };

  useEffect(() => {
    handleReset();
  }, []);

  return (
    <div className="prose">
      <h1 className="prose-h1 text-center text-6xl mb-8 text-primary">
        Dinner Party <br />
        Generator
      </h1>
      <p className="prose-p text-md text-center leading-normal">
        You’re having a party, but who’s cooking what? Let go of all that
        pressure and generate a delicious menu that assigns everyone a random
        starter, entree, dessert, or beverage!
      </p>
      <div className="w-full flex justify-center">
        <button
          className="btn btn-primary rounded-md btn-md px-10"
          onClick={() => setPageNum(1)}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
