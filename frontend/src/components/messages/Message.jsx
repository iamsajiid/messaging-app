import React from "react";

function Message() {
  return (
    <div>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="user" />
        </div>
      </div>
      <div className={`chat-bubble text-white pb-2`}>Hi whats up</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">12:34</div>
    </div>
  );
}

export default Message;
