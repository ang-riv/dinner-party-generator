import React from "react";
const PreviewCard = ({ title, img, name }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="border border-blue-300 size-32 mb-1.5"></div>
      <h4 className="font-bold text-sm">{title}</h4>
      <p className="text-sm">Brought by: {name}</p>
    </div>
  );
};

export default PreviewCard;
