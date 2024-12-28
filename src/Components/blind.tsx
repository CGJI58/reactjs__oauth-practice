import Cookies from "js-cookie";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";
import { useSetRecoilState } from "recoil";
import { userState } from "../atoms";

function Blind() {
  const setUser = useSetRecoilState(userState);
  const jwtToken = Cookies.get("jwt");
  useEffect(() => {
    if (jwtToken) {
      console.log("Home: Cookie found.");
      getUserByCookie(jwtToken).then((user) => setUser(user));
    } else {
      console.log("Home: Cookie not found.");
    }
  }, [jwtToken]);
  return <span>로그인을 해주세요.</span>;
}

export default Blind;
