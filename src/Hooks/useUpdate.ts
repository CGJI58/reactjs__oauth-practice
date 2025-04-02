import { useRecoilValue } from "recoil";
import { IUserState, userState } from "../States/atoms";
import { useEffect, useState } from "react";
import { updateUser } from "../Api/api";

/**
 * ok는 오직 onUpdate()에 의해서만 true 가 될 수 있다.
 * ok는 update가 BE와 DB에서 작업을 모두 완료했음을 의미하는 boolean 값이기 때문.
 */
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
    if (ok) {
      console.log("update complete.");
    }
  }, [ok]);

  return { ok, setOk };
}

export default useUpdate;
