import { useCookies } from "react-cookie";

import parseJwt from "./ParseJwtToken";

const useUser = () => {
  const [cookies] = useCookies("access_toke");

  const { firstName, lastName, sub, role } = parseJwt(cookies.access_token);

  return { firstName, lastName, sub, role };
};

export default useUser;
