import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilValue } from "recoil";
import LoggedInHome from "../Components/LoggedInHome";

function Home() {
  const { login } = useRecoilValue<IUserState>(userState);

  return <Wrapper>{login ? <LoggedInHome /> : null}</Wrapper>;
}

const Wrapper = styled.div``;

export default Home;
