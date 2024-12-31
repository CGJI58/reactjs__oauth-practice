import styled from "styled-components";
import { defaultUserState, IUserState, userState } from "../atoms";
import { useRecoilState, useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userrecord";
import { useEffect } from "react";
import { getUserByCookie } from "../utility/utility";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);
  useEffect(() => {
    if (user === defaultUserState) {
      getUserByCookie().then((user) => setUser(user));
    }
  }, []);

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
