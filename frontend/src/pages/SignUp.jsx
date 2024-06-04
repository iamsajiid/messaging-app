import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import GenderCheckBox from "../components/GenderCheckBox";

function SignUp() {
  const { handleSubmit, register } = useForm();

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up
          <span className="text-blue-500"> Chat</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <Input
            label={"Full Name"}
            name="name"
            placeholder="enter name"
            {...register("name", {
              required: true
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
            label={"Password"}
            name="password"
            placeholder="enter password"
            {...register("password", {
              required: true,
            })}
          />
          <Input
            label={"Confirm Password"}
            name="password"
            placeholder="confirm password"
            {...register("password", {
              required: true,
            })}
          />
          <GenderCheckBox/>
          <a href="#" className="text-sm text-white hover:underline hover:text-blue-600 mt-5 inline-block">
            already have an account ?
          </a>
          <Button className="mt-3" children={"Sign Up"} />
        </form>
      </div>
    </div>
  );
}

export default SignUp;
