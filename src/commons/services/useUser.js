import { useCookies } from "react-cookie";

import parseJwt from "./ParseJwtToken";

const useUser = () => {
  const [cookies] = useCookies("access_token");

  if (cookies.access_token == null) return null;
  const { firstName, lastName, sub, role, id } = parseJwt(cookies.access_token);

  return { firstName, lastName, sub, role, id };
};

export default useUser;
