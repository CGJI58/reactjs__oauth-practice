import { getUserByCookie } from "../Api/api";
import { useSetRecoilState } from "recoil";
import { userState } from "../States/atoms";
import { IGetUserByCookie, IUserState } from "../types/types";
import { useNavigate } from "react-router-dom";

function useGetUserByCookie() {
  const setUser = useSetRecoilState<IUserState>(userState);
  const navigate = useNavigate();

  const onGetUserByCookie = () => {
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
  };

  return { onGetUserByCookie };
}

export default useGetUserByCookie;
