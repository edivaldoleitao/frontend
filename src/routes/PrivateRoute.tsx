import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.tsx";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (user === undefined) {
    return null;
  }

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
