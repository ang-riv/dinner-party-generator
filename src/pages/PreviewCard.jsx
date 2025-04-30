import React from "react";
const PreviewCard = ({ title, image, name }) => {
  return (
    <div className="flex flex-col justify-between items-center w-38">
      <div className="flex flex-col justify-center items-center">
        <div className="outline-2 outline-blue-300 size-36 mb-1.5">
          <img src={image} alt="" className="object-cover size-full" />
        </div>
        <h4 className="font-bold text-sm text-center">{title}</h4>
      </div>
      <p className="text-sm">
        <span className="underline">Brought by:</span> {name}
      </p>
    </div>
  );
};

export default PreviewCard;
