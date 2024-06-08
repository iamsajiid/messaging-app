import React from "react";

function Button({children, type = "button", className = "", ...props}) {
  return (
      <button className={`btn btn-block btn-sm ${className}`} type={type} {...props}>
        {children}
      </button>
  );
}

export default Button;
