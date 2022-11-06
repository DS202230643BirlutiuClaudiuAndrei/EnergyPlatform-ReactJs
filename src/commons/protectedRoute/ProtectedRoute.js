import { useLocation, useHistory } from "react-router-dom";

import { useCookies } from "react-cookie";
import useUser from "../services/useUser";
import Swal from "sweetalert2";

const ProtectedRoute = ({ role, children }) => {
  const [cookies, setCookie] = useCookies(["access_token", "redirect_to"]);
  const user = useUser();
  const location = useLocation();
  const history = useHistory();

  if (!user) {
    setCookie("redirect_to", location.pathname, { path: "/" });
    Swal.fire(
      "Access denied",
      "You have no permissions to access that page",
      "error"
    );
    history.push("/login");
  }
  if (user)
    if (role && user.role !== role) {
      Swal.fire(
        "Access denied",
        "You have no permissions to access that page",
        "error"
      );
      history.push("/");
    }

  return children;
};
export default ProtectedRoute;
