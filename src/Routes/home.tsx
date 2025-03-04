import styled from "styled-components";
import { IUserState, userState } from "../States/atoms";
import { useRecoilValue } from "recoil";
import Blind from "../Components/blind";
import UserRecord from "../Components/userRecord";
import ScrollTopBtn from "../Components/scrollTopBtn";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";

function Home() {
  const user = useRecoilValue<IUserState>(userState);
  useGetUserByCookie();

  return (
    <Wrapper>
      {user.userInfo.email === "" ? <Blind /> : <UserRecord />}
      <ScrollTopBtn />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
