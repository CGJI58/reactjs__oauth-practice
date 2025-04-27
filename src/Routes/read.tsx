import { useLocation } from "react-router-dom";
import styled from "styled-components";
import useGetUserByCookie from "../Hooks/useGetUserByCookie";
import { useEffect, useState } from "react";
import Modal from "../Components/modal";
import { IDiary, IModal, ModalFlag } from "../types/types";

const MODIFY_SENTENCE = "이 게시글을 수정하시겠습니까?";
const DELETE_SENTENCE = "이 게시글을 삭제하시겠습니까?";

function Read() {
  const location = useLocation();
  const diary: IDiary = location.state.diary;
  const { title, date, text } = diary;

  useGetUserByCookie();

  const [modalFlag, setModalFlag] = useState<ModalFlag>(null);
  const [modalConfig, setModalConfig] = useState<IModal>({
    diary,
    sentence: "",
    modalFlag: null,
    setModalFlag,
  });

  useEffect(() => {
    if (modalFlag === "modify") {
      setModalConfig((prev) => ({
        ...prev,
        modalFlag,
        sentence: MODIFY_SENTENCE,
      }));
    }
    if (modalFlag === "delete") {
      setModalConfig((prev) => ({
        ...prev,
        modalFlag,
        sentence: DELETE_SENTENCE,
      }));
    }
  }, [modalFlag]);

  return (
    <Wrapper>
      <Buttons>
        <ModifyBtn onClick={() => setModalFlag("modify")}>수정</ModifyBtn>
        <DeleteBtn onClick={() => setModalFlag("delete")}>삭제</DeleteBtn>
      </Buttons>
      <Context>
        <DiaryTitle>{title}</DiaryTitle>
        <DiaryDate>{date}</DiaryDate>
        <DiaryText>{text}</DiaryText>
      </Context>
      {modalFlag && (
        <ModalBackground>
          <Modal {...modalConfig} />
        </ModalBackground>
      )}
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
  line-height: 200%;
  white-space: pre-wrap;
`;

const ModalBackground = styled.div`
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Read;
