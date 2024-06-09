import React, { useState } from "react";
import useConversation from "../../store/useConversation";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
  const { userAuth } = useAuthContext()

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message, senderID: userAuth.userID }
      );
      const data = await res.data.message;
      setMessages([ ...messages, data ]);
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
