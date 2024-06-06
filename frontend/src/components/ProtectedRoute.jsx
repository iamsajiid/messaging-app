import React from "react";
import { useAuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { userAuth } = useAuthContext();

  if (userAuth) {
    return <Navigate to={"/"} />;
  }
  return children;
}

export default ProtectedRoute;
