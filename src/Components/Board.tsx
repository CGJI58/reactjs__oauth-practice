import styled from "styled-components";
import Diary from "./Diary";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { boardState } from "../States/boardAtom";
import { IBoardState, IFocusIndexHandler } from "../types/types";
import useDiary from "../Hooks/useDiary";

function Board() {
  const [focusIndex, setFocusIndex] = useState<string | undefined>(undefined);
  const focusIndexHandler: IFocusIndexHandler = (index) => {
    if (!index) return;
    setFocusIndex((prev) => (prev === index ? undefined : index));
  };

  const { diaries, synchronized } = useRecoilValue<IBoardState>(boardState);
  const { getBoard } = useDiary();

  useEffect(() => {
    if (!synchronized) {
      (async () => {
        await getBoard();
      })();
    }
  }, [synchronized]);

  return (
    <Wrapper>
      <Diaries>
        {diaries.map((diary) => (
          <Diary
            key={diary.diaryId === null ? "tempIndex" : diary.diaryId}
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
