import styled from "styled-components";
import Diary from "./diary";
import { useRecoilValue } from "recoil";
import { userRecordState } from "../States/atoms";
import { useState } from "react";
import { IUserRecord } from "../types/types";

function Diaries() {
  const { diaries } = useRecoilValue<IUserRecord>(userRecordState);
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
  align-self: center;
  min-width: 100%;
`;

const DiariesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;
  & > * {
    min-width: 100%;
  }
`;

export default Diaries;
