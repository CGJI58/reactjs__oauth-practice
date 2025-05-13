import { useSetRecoilState } from "recoil";
import { userSynchronizedState } from "../States/atoms";
import { updateUser } from "../Api/api";
import { IUserState } from "../types/types";

function useUpdate() {
  const setUserSynchronized = useSetRecoilState<boolean>(userSynchronizedState);
  const onUpdate = async (user: IUserState) => {
    const ok = await updateUser(user);
    if (ok) {
      setUserSynchronized(() => {
        console.log("동기화 성공.");
        return true;
      });
    } else {
      console.log("동기화 실패.");
    }
  };

  return { onUpdate };
}

export default useUpdate;
