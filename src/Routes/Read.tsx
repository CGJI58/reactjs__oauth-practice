import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect } from "react";
import Modal from "../Components/modal/ModalIndex";
import { IDiary } from "../types/types";
import useModal from "../Hooks/useModal";
import useTempDiary from "../Hooks/useTempDiary";
import useDiary from "../Hooks/useDiary";

function Read() {
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  const { title, date, text, id: diaryId } = diary;
  const { modalProps, modalAnswer, modalOn, createModal } = useModal();
  const {
    saveTempDiaryVariants,
    tempDiary,
    runSaveTempDiary,
    runRemoveTempDiary,
  } = useTempDiary();
  const { modifyVariants, deleteVariants, deleteDiary, modifyDiary } =
    useDiary();

  useEffect(() => {
    if (tempDiary) {
      createModal(saveTempDiaryVariants);
    }
  }, [tempDiary]);

  useEffect(() => {
    if (modalProps && modalAnswer !== null) {
      const { modalId } = modalProps;
      if (modalId === modifyVariants.modalId) {
        if (modalAnswer) {
          modifyDiary(diary);
        }
      }
      if (modalId === deleteVariants.modalId) {
        if (modalAnswer) {
          deleteDiary(diaryId);
        }
      }
      if (modalId === saveTempDiaryVariants.modalId) {
        if (modalAnswer) {
          runSaveTempDiary();
        }
        runRemoveTempDiary();
      }
    }
  }, [modalAnswer]);

  return (
    <Wrapper>
      <Buttons>
        <ModifyBtn onClick={() => createModal(modifyVariants)}>수정</ModifyBtn>
        <DeleteBtn onClick={() => createModal(deleteVariants)}>삭제</DeleteBtn>
      </Buttons>
      <Context>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryDate>{date}</DiaryDate>
        <DiaryText>{text}</DiaryText>
      </Context>
      {modalOn && <Modal {...modalProps} />}
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
  gap: 30px;
  & > * {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  & > * {
    cursor: pointer;
    user-select: none;
    padding: 10px;
    background-color: ${(props) => props.theme.backgroundDarker};
    &:hover {
      color: ${(props) => props.theme.highlightNegative};
    }
  }
`;

const ModifyBtn = styled.div``;

const DeleteBtn = styled.div``;

const Context = styled.div`
  & > * {
    margin: 0;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background: ${(props) => props.theme.backgroundLighter};
    box-shadow: ${(props) => props.theme.boxShadow};
    outline: none;
    font: inherit;
    color: inherit;
  }
`;

const DiaryDate = styled.div`
  width: 100%;
`;

const DiaryTitle = styled.div`
  width: 100%;
`;

const DiaryText = styled.div`
  width: 100%;
  line-height: 180%;
  white-space: pre-wrap;
`;

export default Read;
