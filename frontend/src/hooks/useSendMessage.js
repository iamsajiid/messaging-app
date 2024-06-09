import React, { useState } from "react";
import useConversation from "../../store/useConversation";
import axios from "axios";

function useSendMessage() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = axios.post(
        `/api/message/send/${selectedConversation._id}`,
        { message }
      );
      const data = res.data
      setMessages({...messages, data})
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, sendMessage };
}

export default useSendMessage;
