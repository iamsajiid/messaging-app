import React, { forwardRef, useId } from "react";

const Input = forwardRef(({ label, labelClassname = "", type = "text", className = "", ...props }, ref) => {
    const id = useId();
    return (
      <div className="w-full">
        {label && (
          <label className={`label p-2 mt-3 text-white ${labelClassname}`} htmlFor={id}>
            {label}
          </label>
        )}

        <input className={`w-full input input-bordered h-10 ${className}`}
        type={type}
        ref={ref}
        id={id}
        {...props}>
        </input>
      </div>
    );
  }
);

export default Input;
