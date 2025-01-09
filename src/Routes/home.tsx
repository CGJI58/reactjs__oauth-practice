import styled from "styled-components";
import { defaultUserState, IUserState, loginState, userState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userrecord";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const login = useRecoilValue(loginState);
  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
  }, [login]);

  return (
    <Wrapper>
      {user.userInfo.email === "" ? (
        <Blind login={login} />
      ) : (
        <UserRecord user={user} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
