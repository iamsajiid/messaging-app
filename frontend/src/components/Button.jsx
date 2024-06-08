import React, { forwardRef } from "react";

const Button = forwardRef(
  ({ children, type = "button", className = "", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`btn btn-block btn-sm ${className}`}
        type={type}
        {...props}
      >
        {children}
      </button>
    );
  }
);

export default Button;
