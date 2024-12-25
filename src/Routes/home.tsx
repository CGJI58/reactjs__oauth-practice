import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";
import Blind from "../Components/blind";
import { useEffect } from "react";
import UserRecord from "../Components/userrecord";

function Home() {
  const [user, setUser] = useRecoilState<IUserState>(userState);

  useEffect(() => {
    if (user.userInfo.email === "") {
      // BE로 쿠키를 보내 인증을 하여 사용자 정보를 가져오는 알고리즘
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
