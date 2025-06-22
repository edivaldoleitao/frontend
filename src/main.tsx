import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./features/login/components/LoginForm.tsx";
import Register from "./features/register/components/RegisterForm.tsx";
import Edit from "./features/editProfile/components/EditForm.tsx";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <Login />,
  },
  {
    path: "/CreateAccount",
    element: <Register />,
  },
  {
    path: "/editProfile",
    element: <Edit />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
