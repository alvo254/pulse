import React from "react";
import { RotatingLines } from "react-loader-spinner";

const ButtonLoader = ({ color, width }) => {
  return (
    <>
      <RotatingLines
        strokeColor={color}
        strokeWidth="5"
        animationDuration="0.75"
        width={width}
        visible={true}
      />
    </>
  );
};

ButtonLoader.defaultProps = {
  color: "white",
  width: "30",
};

export default ButtonLoader;
