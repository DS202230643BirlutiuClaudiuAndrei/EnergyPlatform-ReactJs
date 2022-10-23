import React from "react";
import { useLocation, Redirect, useHistory, Outlet } from "react-router-dom";

import { useCookies } from "react-cookie";
import { ChildFriendly, Cookie } from "@mui/icons-material";
import useUser from "../services/useUser";
const ProtectedRoute = ({ role, children }) => {
  const [cookies, setCookie] = useCookies(["access_token", "redirect_to"]);
  const user = useUser();
  const location = useLocation();
  const history = useHistory();

  if (!user) {
    setCookie("redirect_to", location.pathname, { path: "/" });
    history.push("/login");
  }
  if (role && user.role !== role) {
    history.push("/error");
  }

  return children;
};
export default ProtectedRoute;
