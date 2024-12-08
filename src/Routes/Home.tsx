import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilValue } from "recoil";
import LoggedInHome from "../Components/LoggedInHome";

function Home() {
  const { login } = useRecoilValue<IUserState>(userState);

  return (
    <Wrapper>{login ? <LoggedInHome /> : <span>로그인 하세요</span>}</Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
