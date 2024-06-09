import React from "react";
import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../../store/useConversation";
import { extractTime } from "../../utils/extractTime";

function Message({chat}) {
  const { userAuth } = useAuthContext();
	const { selectedConversation } = useConversation();
	const fromMe = chat.recieverID === userAuth.userID;

	const formattedTime = extractTime(chat.createdAt);
	const chatClassName = fromMe ? "chat-start" : "chat-end";
	const profilePic = fromMe ? userAuth.avatar : selectedConversation?.avatar;
	const bubbleBgColor = !fromMe ? "bg-blue-800" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
				<div className='w-10 rounded-full'>
					<img alt='user' src={profilePic} />
				</div>
			</div>
      <div className={`chat-bubble text-white ${bubbleBgColor} pb-2`}>{chat.message}</div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center text-white">{formattedTime}</div>
    </div>
  );
}

export default Message;
