import React from "react";

const FullError = ({ title, content }) => {
  return (
    <div className="w-full h-screen">
      <div className="w-full pl-[10%] pt-[15%]">
        <h1 className="mb-4 text-black text-[3rem]">{title}</h1>
        <p>{content}</p>
      </div>
    </div>
  );
};

FullError.defaultProps = {
  title: "Connection Error",
  content: "Problem Loading Page",
};

export default FullError;
