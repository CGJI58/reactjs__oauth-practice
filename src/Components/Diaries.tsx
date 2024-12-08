import styled from "styled-components";
import { IDiary } from "../atoms";
import Diary from "./Diary";

interface IDiaries {
  diaries: IDiary[];
}

function Diaries({ diaries }: IDiaries) {
  return (
    <Wrapper>
      {diaries.map((diary) => (
        <Diary key={diary.date} diary={diary} />
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  padding-bottom: 10px;
`;

export default Diaries;
