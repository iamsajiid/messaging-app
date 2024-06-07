import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    JSON.parse(localStorage.getItem("chat-user")) || null
  );

  useEffect(() => {
    localStorage.setItem("chat-user", JSON.stringify(userAuth));
  }, [userAuth]);

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  return useContext(AuthContext);
}
