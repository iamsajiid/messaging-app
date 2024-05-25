import React from "react";

function Button({children, type = "button", className = "", ...props}) {
  return (
    <div>
      <button className={`btn btn-block btn-sm mt-2 ${className}`} type={type} {...props}>
        {children}
      </button>
    </div>
  );
}

export default Button;
