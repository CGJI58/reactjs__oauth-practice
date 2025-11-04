import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userSynchronizedState } from "../States/atoms";
import useAuth from "../Hooks/useAuth";

/**
 * 지금 보류해둔 작업계획 중에,
 * tempDiary와 관련한 작업이 끝나기 전 까지는
 * 라우트를 변경할 수 없도록 하여
 * tempDiary 저장 및 삭제 로직이 Write 페이지 내에서 모두 완료되도록 하는
 * navigationGuard 를 만드는게 있음.
 * 그 작업이 완료되고 나면 logout의 tempDiary 관련 로직들이 필요 없어지기 때문에
 * modal 최적화 작업에 관련한 작업을 생략하고,
 * 필요 없어질 로직은 미리 삭제하였음.
 */
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
