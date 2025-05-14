import React from "react";
const PreviewCard = ({ title, image, name, url }) => {
  return (
    <div className="flex flex-col justify-between items-center w-38">
      <div className="flex flex-col justify-center items-center">
        <div className="outline-2 outline-blue-300 size-36 mb-1.5">
          <img src={image} alt={title} className="object-cover size-full" />
        </div>
        <h4 className="font-bold text-sm text-center underline hover:cursor-pointer hover:text-primary">
          <a href={url} target="_blank">
            {title}
          </a>
        </h4>
      </div>
      <p className="text-sm">
        Brought by: <span className="font-bold">{name}</span>
      </p>
    </div>
  );
};

export default PreviewCard;
