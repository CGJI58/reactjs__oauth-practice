import styled from "styled-components";
import Diary from "./diary";
import { useRecoilValue } from "recoil";
import { IUserState, userState } from "../States/atoms";
import { useState } from "react";

function Diaries() {
  const {
    userRecord: { diaries },
  } = useRecoilValue<IUserState>(userState);
  const [focused, setFocused] = useState<number>(0);
  return (
    <Wrapper>
      <DiariesList>
        {diaries.map((diary) => (
          <Diary key={diary.id} diary={diary} focus={[focused, setFocused]} />
        ))}
      </DiariesList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  align-self: center;
`;

const DiariesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;
`;

export default Diaries;
