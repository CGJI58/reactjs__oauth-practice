import { useEffect } from "react";
import { getUserByCookie } from "../Api/api";
import { useRecoilState } from "recoil";
import { defaultUserState, userState } from "../States/atoms";
import { IUserState } from "../types/types";

function useGetUserByCookie() {
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    if (user === defaultUserState) {
      (async () => {
        const userData = await getUserByCookie();
        setUser(userData);
      })();
    }
  }, []);
}

export default useGetUserByCookie;
