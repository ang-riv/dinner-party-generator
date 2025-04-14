import React, { useContext } from "react";
import { GuestContext } from "../components/GuestContext";
const IntroPage = () => {
  const { setPage } = useContext(GuestContext);
  return (
    <div className="prose">
      <h1 className="prose-h1 text-center text-6xl mb-8">
        Dinner Party <br />
        Generator
      </h1>
      <p className="prose-p text-md text-center leading-normal">
        You’re having a party, but who’s cooking what? Let go of all the
        pressure and generate a delicious menu that assigns everyone a random
        starter, entree, or dessert!
      </p>
      <div className="w-full flex justify-center">
        <button
          className="btn btn-primary rounded-md btn-md px-10"
          onClick={() => setPage("Dishes")}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default IntroPage;
