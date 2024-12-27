import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import Blind from "../Components/blind";
import { useEffect } from "react";
import UserRecord from "../Components/userrecord";
import { getUserByCookie } from "../utility/utility";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    if (user.userInfo.email === "") {
      if (true) {
        // 이 조건문은 브라우저의 쿠키가 있으면 실행, 없으면 패스할 것.
        getUserByCookie().then((user) => setUser(user));
      }
    }
  }, [user]);

  return (
    <Wrapper>
      {user.userInfo.email === "" ? <Blind /> : <UserRecord user={user} />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
