import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { useEffect } from "react";
import Modal from "../Components/modal";
import { IDiary, IOnModal } from "../types/types";
import useModal from "../Hooks/useModal";
import useDeleteDiary from "../Hooks/useDeleteDiary";
import useTempDiary from "../Hooks/useTempDiary";

const modifyVariants: IOnModal = {
  modalId: "modify",
  sentence: "이 게시글을 수정하시겠습니까?",
};
const deleteVariants: IOnModal = {
  modalId: "delete",
  sentence: "이 게시글을 삭제하시겠습니까?",
};

function Read() {
  useGetUserByCookie();
  useTempDiary();
  const navigate = useNavigate();
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  const { title, date, text, id: diaryId } = diary;
  const { deleteDiary } = useDeleteDiary();
  const { modalProps, modalResult, modalOn, createModal } = useModal();

  const runModify = () => {
    navigate(`../write?mode=modify`, { state: { diary } });
  };

  const runDelete = () => {
    deleteDiary(diaryId);
    navigate("/");
  };

  useEffect(() => {
    if (modalProps && modalResult) {
      const { modalId } = modalProps;
      if (modalId === modifyVariants.modalId) {
        runModify();
      }
      if (modalId === deleteVariants.modalId) {
        runDelete();
      }
    }
  }, [modalResult]);

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
  margin-top: 30px;
  width: 100%;
  max-width: 600px;
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
    padding: 10px;
    background-color: ${(props) => props.theme.backgroundDarker};
    &:hover {
      color: ${(props) => props.theme.highlight};
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
