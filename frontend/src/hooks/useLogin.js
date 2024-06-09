import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

function useLogin() {
  const [loading, setLoading] = useState(false);
  const { userAuth, setUserAuth } = useAuthContext();
  const navigate = useNavigate();

  const login = async ({username, password}) => {
    const success = handleInputErrors({ username, password });
    if (!success) return;

    setLoading(true);
    try {
      const res = await axios.post(
        "/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (res) {
        navigate("/");
      }
      const data = res.data.data;
      setUserAuth(data);
      setLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleInputErrors = ({ username, password }) => {
    if (!username || !password) {
      toast.error("enter credentials");
      return false;
    }
    return true;
  };

  return { loading, login };
}

export default useLogin;
