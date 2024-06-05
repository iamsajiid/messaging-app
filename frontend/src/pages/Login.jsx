import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Login() {
  const { handleSubmit, register } = useForm();

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-500">
          Login
          <span className="text-blue-500"> Chat</span>
        </h1>
        <form onSubmit={handleSubmit}>
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
          <Link to="/auth/register" className="text-sm  hover:underline hover:text-blue-600 mt-4 inline-block">
            {"don't"} have an account ?
          </Link>
          <Button className="mt-3" children={"Login"}/>
        </form>
      </div>
    </div>
  );
}

export default Login;
