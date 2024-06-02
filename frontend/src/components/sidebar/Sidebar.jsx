import React from "react";
import Input from "../Input";
import Button from "../Button";
import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Conversations from "./Conversations";

function Sidebar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
        children={<BiLogOut className="w-6 h-6 text-white cursor-pointer" />}
        className="w-min"
      />
    </div>
  );
}

export default Sidebar;
