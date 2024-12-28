import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userrecord";

function Home() {
  const user = useRecoilValue<IUserState>(userState);

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
