import styled from "styled-components";
import { IDiary } from "../atoms";
import Diary from "./diary";
import { useState } from "react";

interface IDiaries {
  diaries: IDiary[];
}

function Diaries({ diaries }: IDiaries) {
  return (
    <Wrapper>
      <DiariesList>
        {diaries.map((diary) => (
          <Diary key={diary.date} diary={diary} />
        ))}
      </DiariesList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  box-sizing: border-box;
  padding: 10px;
  align-self: center;
`;

const EditModeBtn = styled.button`
  margin-bottom: 10px;
  align-self: flex-end;
`;

const DiariesList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding-bottom: 10px;
`;

export default Diaries;
