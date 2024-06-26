import React, { useState } from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import GenderCheckBox from "../components/GenderCheckBox";
import useSignup from "../hooks/useSignup";

function SignUp() {
  const { handleSubmit, register, setValue, watch } = useForm();
  const { loading, signup } = useSignup();
  const [inputs, setInputs] = useState({});

  const gender = watch("gender");

  const create = async (data) => {
    setInputs(data);
    await signup(data);
  };

  const handleGenderChange = (e) => {
    setValue("gender", e.target.value);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> Chat</span>
        </h1>
        <form onSubmit={handleSubmit(create)}>
          <Input
            label={"Full Name"}
            name="name"
            placeholder="enter name"
            {...register("name", {
              required: true,
            })}
          />
          <Input
            label={"Username"}
            name="username"
            placeholder="enter username"
            {...register("username", {
              required: true,
            })}
          />
          <Input
            label={"email"}
            name="email"
            placeholder="enter email"
            {...register("email", {
              required: true,
            })}
          />
          <Input
            label={"Password"}
            name="password"
            type="password"
            placeholder="enter password"
            {...register("password", {
              required: true,
            })}
          />
          <Input
            label={"Confirm Password"}
            name="confirmPassword"
            type="password"
            placeholder="confirm password"
            {...register("confirmPassword", {
              required: true,
            })}
          />
          <GenderCheckBox
            selectedGender={gender}
            onChange={handleGenderChange}
            ref={
              register("gender", {
                required: true,
              }).ref
            }
          />
          <Link
            to="/auth/login"
            className="text-sm text-white hover:underline hover:text-blue-600 mt-5 inline-block"
          >
            already have an account?
          </Link>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Sign Up"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
