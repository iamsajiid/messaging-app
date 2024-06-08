import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useGetConversations() {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchConversations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/user/sidebar");
      if (!res) {
        throw new Error("Conversations not found or invalid format");
      }
      setConversations(res.data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConversations()
  },[])
  return { loading, conversations };
}

export default useGetConversations;
