import styled from "styled-components";
import { IDiary } from "../atoms";

interface IDiaries {
  diaries: IDiary[];
}

function Diaries({ diaries }: IDiaries) {
  return (
    <Wrapper>
      {diaries.map(({ text, date }) => (
        <Diary key={date}>{text}</Diary>
      ))}
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const Diary = styled.div``; //나중에 카드형식으로, 제목이랑 날짜만 보이게 하고, 클릭하면 내용 보이게

export default Diaries;
