import React, { useEffect, useRef, useState } from "react";
import Input from "../Input";
import Messages from "./Messages";
import Button from "../Button";
import { BsSend } from "react-icons/bs";
import { TiMessages } from "react-icons/ti";
import useConversation from "../../../store/useConversation";

function MessageContainer() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const formRef = useRef(null);
  const [clicked, setClicked] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (formRef.current && !formRef.current.contains(e.target)) {
        setClicked(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // useEffect(()=>{
  //   return (setSelectedConversation(null))
  // }, [setSelectedConversation])

  return !selectedConversation ? (
    <NoChatSelected />
  ) : (
    <div className="w-full flex flex-col">
      <div className="bg-blue-800 px-4 py-2 mb-2">
        <span className="text-white font-bold ml-7">
          {selectedConversation.name}
        </span>
      </div>

      <Messages />

      <form
        className="px-4 my-3"
        onSubmit={(e) => handleSubmit(e)}
        onClick={() => setClicked(true)}
        ref={formRef}
      >
        <div className="w-full relative">
          <input
            type="text"
            className={`${
              clicked ? "bg-gray-600" : ""
            } border-none outline-none text-sm rounded-lg block w-full p-2.5 pl-4 bg-gray-700 border-gray-600 text-white`}
          />
          <button
            type="submit"
            className={`${
              clicked ? "text-white" : "text-gray-500"
            } absolute inset-y-0 end-0 flex items-center pe-3 mr-2`}
          >
            <BsSend />
          </button>
        </div>
      </form>
    </div>
  );
}

const NoChatSelected = () => {
  return (
    <div className="w-full flex items-center justify-center h-full">
      <div className="px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2">
        <p>Welcome 👋 </p>
        <p>Select a chat to start messaging</p>
        <TiMessages className="text-3xl md:text-6xl text-center" />
      </div>
    </div>
  );
};

export default MessageContainer;
