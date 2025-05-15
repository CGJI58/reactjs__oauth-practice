import { useSetRecoilState } from "recoil";
import { userState, userSynchronizedState } from "../States/atoms";
import { getUserByCookie, updateUser } from "../Api/api";
import { IGetUserByCookie, IUserState } from "../types/types";
import { useNavigate } from "react-router-dom";

function useUser() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const setUserSynchronized = useSetRecoilState<boolean>(userSynchronizedState);
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

  //FE userState 정보를 -> DB userSchema 에 동기화
  const saveUser = async (user: IUserState) => {
    const ok = await updateUser(user);
    if (ok) {
      setUserSynchronized(() => {
        console.log("동기화 성공.");
        return true;
      });
    } else {
      console.error("saveUser: 동기화 실패.");
    }
  };

  return { loadUser, saveUser };
}

export default useUser;
