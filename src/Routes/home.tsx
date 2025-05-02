import styled from "styled-components";
import { userState } from "../States/atoms";
import { useRecoilValue } from "recoil";
import UserRecord from "../Components/userRecord";
import ScrollTopBtn from "../Components/scrollTopBtn";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { IUserState } from "../types/types";
import useTempDiary from "../Hooks/useTempDiary";

function Home() {
  const {
    userInfo: { email },
  } = useRecoilValue<IUserState>(userState);

  useTempDiary();
  useGetUserByCookie();

  return (
    <Wrapper>
      {email !== "" ? <UserRecord /> : <span>log in please</span>}
      {email !== "" ? <ScrollTopBtn /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 10px;
`;

export default Home;
