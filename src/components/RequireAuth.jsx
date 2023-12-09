import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import {
  selectUser,
  selectUserLoading,
} from "../redux/slices/userSlice/userSelectors";

export default function RequireAuth({ children }) {
  let user = useSelector(selectUser);
  let loading = useSelector(selectUserLoading);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.id || user == undefined) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}
