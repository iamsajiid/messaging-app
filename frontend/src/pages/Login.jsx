import React from "react";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import useLogin from "../hooks/useLogin";

function Login() {
  const { handleSubmit, register } = useForm();
  const {login, loading} = useLogin()

  const method = async (data) => {
    await login(data)
  }

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> Chat</span>
        </h1>
        <form onSubmit={handleSubmit(method)}>
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
            type="password"
            placeholder="enter password"
            {...register("password", {
              required: true,
            })}
          />
          <Link to="/auth/register" className="text-sm text-white hover:underline hover:text-blue-600 mt-5 inline-block">
            {"don't"} have an account ?
          </Link>
          <Button type="submit" className="mt-3" disabled={loading}>
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Login"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;
