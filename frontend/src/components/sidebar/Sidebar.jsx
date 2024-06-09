import React, { useState, useEffect, useRef } from "react";
import Input from "../Input";
import Button from "../Button";
import { IoSearchSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import Conversations from "./Conversations";
import useLogout from "../../hooks/useLogout";

function Sidebar() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { loading, logout } = useLogout();
  const [clicked, setClicked] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="border-r border-slate-500 p-4 flex flex-col w-5/12">
      <form
        className={`flex items-center gap-1 relative`}
        onSubmit={(e) => handleSubmit(e)}
        onClick={() => setClicked(true)}
        ref={formRef}
      >
        <Input
          placeholder="search"
          className={`${clicked ? "bg-white" : "bg-gray-900"}`}
        />
        <Button
          type="submit"
          className={`border-none w-min h-9 absolute right-0 items-center hover:bg-transparent ${
            clicked ? "bg-white" : "bg-gray-900"
          }`}
          children={<IoSearchSharp className="w-5 h-5 outline-none" />}
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
        className="w-min bg-black border-black mt-auto"
        onClick={logout}
      />
    </div>
  );
}

export default Sidebar;
