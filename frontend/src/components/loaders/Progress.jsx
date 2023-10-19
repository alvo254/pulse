import React from "react";
import { ProgressBar } from "react-loader-spinner";

const Progress = ({ borderColor, barColor, width, height }) => {
  return (
    <>
      <ProgressBar
        height={height}
        width={width}
        ariaLabel="progress-bar-loading"
        wrapperClass="progress-bar-wrapper"
        borderColor={borderColor}
        barColor={barColor}
      />
    </>
  );
};

Progress.defaultProps = {
  borderColor: "#F4442E",
  barColor: "#51E5FF",
  width: "80",
  height: "80",
};

export default Progress;
