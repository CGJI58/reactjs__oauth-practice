import { useNavigate } from "react-router-dom";
import {
  deleteCookie,
  deleteUser,
  getCodeRequestURL,
  loginByGhCode,
} from "../Api/api";
import useUser from "./useUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IUserInfo, IUserState } from "../types/types";
import { userInfoState, userState } from "../States/atoms";
import { defaultUserState } from "../constants/defaults";

function useAuth() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState<IUserState>(userState);
  const { email } = useRecoilValue<IUserInfo>(userInfoState);
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

  const signOut = async () => {
    await deleteUser(email);
    await logOut();
  };

  return { loadCodeRequestURL, login, logOut, signOut };
}

export default useAuth;
