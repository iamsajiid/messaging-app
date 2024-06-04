import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import SignUpPage from "./pages/SignUp.jsx";
import HomePage from "./pages/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path:"/",
        element: <HomePage/>
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path:"/sign-up",
        element: <SignUpPage/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router}/>
);
