import React from "react";

const ErrorMessage = ({ variant, children }) => {
  return <div className={`alert${variant}`}>{children}</div>;
};

ErrorMessage.defaultProps = {
  variant: "alert info",
};

export default ErrorMessage;
