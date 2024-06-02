import React from "react";

function Button({children, type = "button", className = "", ...props}) {
  return (
    <div>
      <button className={`btn btn-block btn-sm ${className}`} type={type} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
