import React from "react";
import Input from "../Input";
import Button from "../Button";
import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Conversations from "./Conversations";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import useLogout from "../../hooks/useLogout";

function Sidebar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { loading, logout } = useLogout();

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col">
      <form
        className="flex items-center gap-2"
        onSubmit={(e) => handleSubmit(e)}
      >
        <Input placeholder="search" />
        <Button
          type="submit"
          className="bg-sky-500 text-white"
          children={<IoSearchSharp className="w-6 h-6 outline-none" />}
        />
      </form>
      <div className="divider px-3"></div>
      <Conversations />
      <Button
        children={
          loading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <BiLogOut className="w-6 h-6 text-white cursor-pointer" />
          )
        }
        className="w-min bg-black border-black"
        onClick={logout}
      />
    </div>
  );
}

export default Sidebar;
