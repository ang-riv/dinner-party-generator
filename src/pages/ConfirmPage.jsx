import React, { useContext } from "react";
import { RestrictionsContext } from "../components/contexts/RestrictionsContext";
import { GuestContext } from "../components/contexts/GuestContext";
import Arrow, { DIRECTION } from "react-arrows";
const ConfirmPage = () => {
  const { guests } = useContext(GuestContext);
  const { foodRestrictions, dietRestrictions } =
    useContext(RestrictionsContext);

  return (
    <div className="h-10/12 px-2">
      <h2 className="h-2/10 flex justify-center items-center text-4xl">
        Guest List
      </h2>
      {/* name + pref */}
      <div className="h-6/10">
        {guests.map((guest, index) => {
          const start = `from${index}`;
          const end = `to${index}`;
          const name = `${index + 1}) ${guest.name}`;
          return (
            <div className="w-full flex justify-between mb-1">
              <div id={start} className="pr-2">
                <p className="relative top-2">{name}</p>
              </div>
              <div id={end} className="pl-1.5">
                <p className="relative top-2">{guest.preference}</p>
              </div>

              <Arrow
                className="arrow"
                from={{
                  direction: DIRECTION.BOTTOM_RIGHT,
                  node: () => document.getElementById(start),
                  translation: [0, 0],
                }}
                to={{
                  direction: DIRECTION.BOTTOM_LEFT,
                  node: () => document.getElementById(end),
                  translation: [0, 0],
                }}
              />
            </div>
          );
        })}
      </div>
      {/* restrictions */}
      <div className="h-2/10">
        <h3 className="text-center">
          Dietary Restrictions, Allergies, Dislikes:
        </h3>
        <p>➢{dietRestrictions.join(", ")}</p>
        <p>➢{foodRestrictions.join(", ")}</p>
      </div>
    </div>
  );
};

export default ConfirmPage;
