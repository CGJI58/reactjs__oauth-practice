import { useRecoilValue } from "recoil";
import { IUserState, userState } from "../States/atoms";
import { useEffect, useState } from "react";
import { updateUser } from "../Api/api";

function useUpdate() {
  const user = useRecoilValue<IUserState>(userState);
  const [ok, setOk] = useState<boolean>(false);

  const onUpdate = async (user: IUserState) => {
    const ok = await updateUser(user);
    return ok;
  };

  useEffect(() => {
    onUpdate(user).then((ok) => setOk(ok));
  }, [user]);

  useEffect(() => {
    // 로그아웃 하기 전에 임시저장이 완료되었는지를 검사하는 용도로 사용할 예정
  }, [ok]);
}

export default useUpdate;
