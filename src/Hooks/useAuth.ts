import { useNavigate } from "react-router-dom";
import {
  deleteCookie,
  deleteUser,
  getCodeRequestURL,
  loginByGhCode,
} from "../Api/api";
import useUser from "./useUser";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IModalVariants, IUserInfo, IUserState } from "../types/types";
import { defaultUserState, userInfoState, userState } from "../States/atoms";

function useAuth() {
  const navigate = useNavigate();
  const setUser = useSetRecoilState<IUserState>(userState);
  const { email } = useRecoilValue<IUserInfo>(userInfoState);
  const { loadUser } = useUser();
  const signOutVariants: IModalVariants = {
    modalId: "signOut",
    sentence: "회원 탈퇴하시겠습니까?",
  };

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

  return { loadCodeRequestURL, login, logOut, signOut, signOutVariants };
}

export default useAuth;
