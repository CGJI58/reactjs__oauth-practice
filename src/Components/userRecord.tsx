import styled from "styled-components";
import { IUserState } from "../States/atoms";
import Diaries from "./diaries";
import Nickname from "./nickname";
import { useEffect } from "react";
import { updateUser } from "../Api/api";

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
