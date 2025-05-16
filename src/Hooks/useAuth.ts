import { useNavigate } from "react-router-dom";
import { deleteCookie, getCodeRequestURL, loginByGhCode } from "../Api/api";
import useUser from "./useUser";
import { useSetRecoilState } from "recoil";
import { IUserState } from "../types/types";
import { defaultUserState, userState } from "../States/atoms";

function useAuth() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState<IUserState>(userState);
  const { loadUser } = useUser();

  const loadCodeRequestURL = async () => {
    const url = await getCodeRequestURL();
    return url;
  };

  const login = async (ghCode: string) => {
    await loginByGhCode(ghCode);
    loadUser();
    navigate("/");
  };

  const logOut = async () => {
    await deleteCookie();
    setUser(() => defaultUserState);
  };

  const signOut = () => {};

  return { loadCodeRequestURL, login, logOut, signOut };
}

export default useAuth;
