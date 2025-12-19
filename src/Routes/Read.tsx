import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { IDiary } from "../types/types";
import useModalContext from "../Hooks/useModalContext";
import { useEffect } from "react";
import useDiary from "../Hooks/useDiary";
import { backgroundGradient } from "../theme/animations";

function Read() {
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  const { title, date, text, id: diaryId } = diary;
  const { modalAction, modalResponse } = useModalContext();
  const { navigateToModifyPage, deleteDiary } = useDiary();

  useEffect(() => {
    if (modalResponse.confirm) {
      if (modalResponse.modalId === "modifyDiary") {
        navigateToModifyPage(diary);
      } else if (modalResponse.modalId === "deleteDiary") {
        if (diaryId === null) {
          console.error("diaryId: null");
          return;
        }
        deleteDiary(diaryId);
      }
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <Headline>
        <DiaryDate>
          <div>작성일</div>
          <div>{date}</div>
        </DiaryDate>
        <Buttons>
          <ModifyBtn
            type="button"
            value="수정"
            onClick={() => modalAction({ modalId: "modifyDiary" })}
          />
          <DeleteBtn
            type="button"
            value="삭제"
            onClick={() => modalAction({ modalId: "deleteDiary" })}
          />
        </Buttons>
      </Headline>
      <Context>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryText>{text}</DiaryText>
      </Context>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  font-size: ${(props) => props.theme.fontSizes.m}px;
  margin-top: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-self: center;
  padding-bottom: 30px;
  gap: 10px;
`;

const Headline = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
`;

const DiaryDate = styled.div`
  display: flex;
  margin-left: 10px;
  gap: 20px;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  gap: 10px;
  & > * {
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.l}px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
    padding: 5px 10px;
    background-color: ${(props) => props.theme.backgroundDarker};
  }
`;

const ModifyBtn = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightPositive)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightPositive};
  }
`;

const DeleteBtn = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightNegative)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightNegative};
  }
`;

const Context = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  & > * {
    margin: 0;
    padding: 10px;
    border-radius: 5px;
    background: ${(props) => props.theme.backgroundLighter};
    box-shadow: ${(props) => props.theme.boxShadow};
    width: 100%;
    line-height: 180%;
    overflow-wrap: break-word;
  }
`;

const DiaryTitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
`;

const DiaryText = styled.div`
  white-space: pre-wrap;
`;

export default Read;
