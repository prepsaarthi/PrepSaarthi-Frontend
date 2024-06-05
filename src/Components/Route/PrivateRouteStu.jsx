import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRouteStu = ({ allowedRoles }) => {
  const { loading, isAuthenticated, user } = useSelector(
    (state) => state.student
  );
  if (loading === false && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  if (
    loading === false &&
    allowedRoles &&
    !allowedRoles.includes(user.user.role)
  ) {
    return <Navigate to="/unauthorized" />;
  }

  if (loading === false) {
    return <Outlet />;
  }
};

export default PrivateRouteStu;
