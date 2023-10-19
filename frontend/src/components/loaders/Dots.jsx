import React from "react";
import { ThreeDots } from "react-loader-spinner";

const Dots = ({ color, width, height }) => {
  return (
    <>
      <ThreeDots
        height={height}
        width={width}
        radius="9"
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </>
  );
};

Dots.defaultProps = {
  color: "#E40084",
  width: "80",
  height: "80",
};

export default Dots;
