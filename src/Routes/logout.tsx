import { useEffect } from "react";
import useUpdate from "../Hooks/useUpdate";
import { deleteCookie } from "../Api/api";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { defaultUserState, userState } from "../States/atoms";
import { IUserState } from "../types/types";

function Logout() {
  const navigate = useNavigate();
  const { ok } = useUpdate();
  const setUser = useSetRecoilState<IUserState>(userState);

  const onLogout = async () => {
    await deleteCookie();
    setUser(() => defaultUserState);
  };

  useEffect(() => {
    if (ok) {
      (async () => {
        await onLogout();
      })();
      console.log("logout done.");
      navigate("/");
    }
  }, [ok]);

  return <span>저장 후 로그아웃 하는 중 입니다...</span>;
}

export default Logout;
