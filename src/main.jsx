import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./App.jsx";
import LoginForm from "./components/LoginForm/LoginForm.jsx";
import Register from "./components/Register/RegisterForm.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "login",
    element: <LoginForm registerLink={"/register"} />,
  },
  {
    path: "register",
    element: <Register loginLink={"/login"} />,
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
