import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userSynchronizedState } from "../States/userAtom";
import useAuth from "../Hooks/useAuth";

function Logout() {
  const synchronized = useRecoilValue<boolean>(userSynchronizedState);
  const { logOut } = useAuth();

  useEffect(() => {
    if (synchronized) {
      (async () => {
        await logOut();
      })();
    }
  }, [synchronized]);

  return (
    <>
      <span>로그아웃 하는 중 입니다...</span>
    </>
  );
}

export default Logout;
