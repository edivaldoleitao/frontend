import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./components/layouts/AuthLayout/AuthLayout.tsx";

const router = createBrowserRouter([
  {
    path: "/Login",
    element: <AuthLayout setLogin={true} />,
  },
  {
    path: "/CreateAccount",
    element: <AuthLayout setLogin={false} />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
