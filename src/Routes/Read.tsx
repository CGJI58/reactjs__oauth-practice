import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import Modal from "../Components/modal/ModalIndex";
import { IDiary, ModalId } from "../types/types";
import useModal from "../Hooks/useModal";
import useTempDiary from "../Hooks/useTempDiary";
import useDiary from "../Hooks/useDiary";
import {
  deleteDiaryVariants,
  modifyDiaryVariants,
  tempDiaryVariants,
} from "../constants/variants";
import { defaultModalResponse } from "../constants/defaults";

function Read() {
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  const { title, date, text, id: diaryId } = diary;
  const { modalProps, modalResponse, createModal } = useModal();
  const { tempDiary, runSaveTempDiary, runRemoveTempDiary } = useTempDiary();
  const { deleteDiary, modifyDiary } = useDiary();
  const [modalId, setModalId] = useState<ModalId>(null);

  useEffect(() => {
    if (tempDiary.status === "loaded") {
      setModalId("tempDiary");
    }
  }, [tempDiary.status]);

  useEffect(() => {
    switch (modalId) {
      case "tempDiary":
        createModal(tempDiaryVariants);
        break;
      case "modifyDiary":
        createModal(modifyDiaryVariants);
        break;
      case "deleteDiary":
        createModal(deleteDiaryVariants);
        break;
    }
  }, [modalId]);

  useEffect(() => {
    if (modalResponse !== defaultModalResponse) {
      if (modalResponse.confirm) {
        switch (modalProps.modalId) {
          case tempDiaryVariants.modalId:
            runSaveTempDiary();
            break;
          case modifyDiaryVariants.modalId:
            modifyDiary(diary);
            break;
          case deleteDiaryVariants.modalId:
            deleteDiary(diaryId);
            break;
        }
      }
      if (modalId === "tempDiary") {
        runRemoveTempDiary();
      }
      setModalId(null);
    }
  }, [modalResponse]);

  return (
    <Wrapper>
      <Buttons>
        <ModifyBtn onClick={() => setModalId("modifyDiary")}>수정</ModifyBtn>
        <DeleteBtn onClick={() => setModalId("deleteDiary")}>삭제</DeleteBtn>
      </Buttons>
      <Context>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryDate>{date}</DiaryDate>
        <DiaryText>{text}</DiaryText>
      </Context>
      <Modal {...modalProps} />
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
