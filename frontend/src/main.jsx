import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import { AuthContextProvider } from "./context/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute redirectTo="/">
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/login",
        element: (
          <ProtectedRoute redirectTo="/auth/login">
            <LoginPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/auth/register",
        element: (
          <ProtectedRoute redirectTo="/auth/register">
            <SignUpPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
);
