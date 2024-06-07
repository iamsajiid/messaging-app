import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setUserAuth } = useAuthContext();
  const navigate = useNavigate()

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/logout", {
        withCredentials: true,
      });
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setUserAuth(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
      navigate("/auth/login")
    }
  };
  return { logout, loading };
};

export default useLogout;
