import { useEffect } from "react";
import { getUserByCookie } from "../Api/api";
import { useRecoilState } from "recoil";
import { defaultUserState, IUserState, userState } from "../States/atoms";

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
