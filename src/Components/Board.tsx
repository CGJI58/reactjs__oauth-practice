import styled from "styled-components";
import Diary from "./Diary";
import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { boardState } from "../States/boardAtom";
import { getDiaries } from "../Api/diaryApi";
import { IBoardState } from "../types/types";

function Board() {
  const [focusIndex, setFocusIndex] = useState<number>(0);
  const focusIndexHandler = (index: number) => {
    setFocusIndex((prev) => (prev === index ? 0 : index));
  };
  const [board, setBoard] = useRecoilState<IBoardState>(boardState);

  useEffect(() => {
    (async () => {
      const diaries = await getDiaries();
      setBoard((prev) => ({ ...prev, diaries }));
    })();
    // write 제출하고나서 바로 실행이 되어서 마지막에 저장한 다이어리는 여기서 안 보이고,
    // 좀 이따가 새로고침해서 다시 이 로직이 실행되어야 마지막에 저장한 다이어리가 보인다.
  }, []);

  return (
    <Wrapper>
      <Diaries>
        {board.diaries.map((diary) => (
          <Diary
            key={diary.id}
            diary={diary}
            focusIndex={focusIndex}
            focusIndexHandler={focusIndexHandler}
          />
        ))}
      </Diaries>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
`;

const Diaries = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 10px 0px;
`;

export default Board;
