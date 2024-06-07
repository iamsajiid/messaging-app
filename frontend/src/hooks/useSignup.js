import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function useSignup() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userAuth, setUserAuth } = useAuthContext()

  const signup = async ({name, username, email, password, confirmPassword, gender}) => {
    const success = handleInputErrors({name, username, email, password, confirmPassword, gender});
    
    if (!success) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/auth/register",
        { name, username, email, password, gender },
        { withCredentials: true }
      );

      if (res) {
        navigate("/");
      }
      
      localStorage.setItem("chat-user", JSON.stringify(res.data))
      setUserAuth(res.data)
      console.log("userAuth -- ", userAuth)
      
    } catch (error) {
      toast.error(error.response?.data?.msg || error.message);
    } finally {
      setLoading(false);
    }
  };

  function handleInputErrors({name, username, email, password, confirmPassword, gender,}) {
    if (!name || !username || !email || !password || !confirmPassword || !gender) {
      toast.error("Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  }
  return { signup, loading };
}

export default useSignup;
