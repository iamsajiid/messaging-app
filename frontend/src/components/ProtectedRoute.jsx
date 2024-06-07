import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children, redirectTo }) => {
  const { userAuth } = useAuthContext();

  if (userAuth && (redirectTo === "/auth/login" || redirectTo === "/auth/register")) {
    return <Navigate to="/" />;
  }

  if (!userAuth && redirectTo === "/") {
    return <Navigate to="/auth/login" />;
  }

  return children;
};

export default ProtectedRoute;
