import React from "react";
import FadeLoader from "react-spinners/FadeLoader";

const LoadingComponent = () => {
  return <FadeLoader color="#000" loading={true} size={200} />;
};

export default LoadingComponent;
