import { useSetRecoilState } from "recoil";
import { userState } from "../States/userAtom";
import { updateUserConfig } from "../Api/userApi";
import { IGetUserByCookie, IUserConfig, IUserState } from "../types/types";
import { useNavigate } from "react-router-dom";
import { getUserByCookie } from "../Api/authApi";

function useUser() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const navigate = useNavigate();

  //DB userSchema 정보를 FE userState 에 동기화
  const loadUser = () => {
    (async () => {
      const { status, userData }: IGetUserByCookie = await getUserByCookie();
      if (status === 200 && userData) {
        setUser(() => userData);
      } else if (status !== null) {
        console.error("loadUser: 사용자 정보가 일치하지 않음");
        navigate("/");
      } else {
        console.error("loadUser: fail to fetch the server.");
        navigate("/");
      }
    })();
  };

  //FE userConfig 정보를 -> DB 에 동기화
  const saveUserConfig = async (userConfig: IUserConfig) => {
    const ok = await updateUserConfig(userConfig);
    return ok;
  };

  return { loadUser, saveUserConfig };
}

export default useUser;
