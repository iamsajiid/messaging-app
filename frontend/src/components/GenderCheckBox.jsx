import React, { forwardRef } from "react";

const GenderCheckBox = forwardRef(({ selectedGender, onChange }, ref) => {
  return (
    <div className="flex mt-4">
      <div className="form-control flex-row gap-4">
        <label className="label gap-2 cursor-pointer">
          <span className="label-text text-white">Male</span>
          <input
            type="radio"
            name="gender"
            value="male"
            className="radio border-white"
            checked={selectedGender === "male"}
            onChange={onChange}
            ref={ref}
          />
        </label>
        <label className="label gap-2 cursor-pointer">
          <span className="label-text text-white">Female</span>
          <input
            type="radio"
            name="gender"
            value="female"
            className="radio border-white"
            checked={selectedGender === "female"}
            onChange={onChange}
            ref={ref}
          />
        </label>
      </div>
    </div>
  );
});

export default GenderCheckBox;
