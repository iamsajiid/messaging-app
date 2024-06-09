import React, { useEffect, useState } from "react";
import useConversation from "../../store/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

function useGetMessages() {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`/api/message/${selectedConversation._id}`);
        if (!res) {
          throw new Error("no messages found");
        }
        await setMessages(res.data.chat);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false)
      }
    };
    if (selectedConversation?._id) getMessages();
  }, [selectedConversation._id, setMessages]);

  return { loading, messages };
}

export default useGetMessages;
