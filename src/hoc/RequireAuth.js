import React from "react";
import { useLocation, Navigate, useOutletContext } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { userData } = useOutletContext();

  console.log(userData, "userData");

  if (userData.role !== "ADMIN") {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAuth;
