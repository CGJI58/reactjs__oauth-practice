import { useEffect } from "react";
import { getUserByCookie } from "../Api/api";
import { useRecoilState } from "recoil";
import { defaultUserState, userState } from "../States/atoms";
import { IGetUserByCookie, IUserState } from "../types/types";
import { useNavigate } from "react-router-dom";

function useGetUserByCookie() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const navigate = useNavigate();

  useEffect(() => {
    if (user === defaultUserState) {
      (async () => {
        const { status, userData }: IGetUserByCookie = await getUserByCookie();
        if (status === 200 && userData) {
          setUser(() => userData);
        } else if (status !== null) {
          console.error("사용자 정보가 일치하지 않음");
          navigate("/");
        } else {
          console.error("fail to fetch the server.");
          navigate("/");
        }
      })();
    }
  }, []);
}

export default useGetUserByCookie;
