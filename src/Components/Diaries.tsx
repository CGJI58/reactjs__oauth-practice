import styled from "styled-components";
import Diary from "./Diary";
import { useRecoilValue } from "recoil";
import { userRecordState } from "../States/userAtom";
import { useState } from "react";
import { IUserRecord } from "../types/types";

function Diaries() {
  const { diaries } = useRecoilValue<IUserRecord>(userRecordState);
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const focusIndexHandler = (index: number) => {
    setFocusIndex((prev) => (prev === index ? 0 : index));
  };
  return (
    <Wrapper>
      <DiariesList>
        {diaries.map((diary) => (
          <Diary
            key={diary.id}
            diary={diary}
            focusIndex={focusIndex}
            focusIndexHandler={focusIndexHandler}
          />
        ))}
      </DiariesList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

const DiariesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;
`;

export default Diaries;
