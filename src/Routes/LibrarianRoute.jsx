import React from "react";
import { Navigate } from "react-router-dom";
import useRole from "../hooks/useRole";

const LibrarianRoute = ({ children }) => {
  const { role, roleLoading } = useRole();

  if (roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (role !== "librarian") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default LibrarianRoute;
