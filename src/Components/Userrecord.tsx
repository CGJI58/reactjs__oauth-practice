import styled from "styled-components";
import { IUserState } from "../atoms";
import Diaries from "./Diaries";
import Nickname from "./Nickname";
import { useEffect } from "react";
import { updateUser } from "../utility/utility";

function UserRecord({ user }: { user: IUserState }) {
  useEffect(() => {
    updateUser(user);
  }, [user]);
  return (
    <Wrapper>
      <Nickname nickname={user.userRecord.nickname} />
      <Diaries diaries={user.userRecord.diaries} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
`;

export default UserRecord;
