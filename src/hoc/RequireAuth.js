import React from "react";
import { Navigate, useOutletContext } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { userData } = useOutletContext();

  if (userData.role !== "ADMIN") {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAuth;
