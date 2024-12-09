import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { useRecoilValue } from "recoil";
import Diaries from "./Diaries";
import { useEffect } from "react";
import { updateUser } from "../utility/utility";
import Nickname from "./Nickname";

function LoggedInHome() {
  const user = useRecoilValue<IUserState>(userState);

  useEffect(() => {
    updateUser(user);
  }, [user]);

  return (
    <Wrapper>
      <Nickname nickname={user.userInfo.nickname} />
      <Diaries diaries={user.userInfo.diaries ?? []} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export default LoggedInHome;
