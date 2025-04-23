import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import useDeleteDiary from "../Hooks/useDeleteDiary";
import { IModal } from "../types/types";

function Modal({ diary, sentence, modalFlag, setModalFlag }: IModal) {
  const navigate = useNavigate();
  const { deleteDiary } = useDeleteDiary();

  const onYes = () => {
    if (modalFlag === "modify") {
      navigate(`../write?mode=modify`, { state: { diary } });
    }
    if (modalFlag === "delete") {
      deleteDiary(diary.id);
      navigate("/");
    }
  };
  return (
    <Wrapper>
      <Question>{sentence}</Question>
      <Choice>
        <Yes onClick={() => onYes()}>예</Yes>
        <No onClick={() => setModalFlag(null)}>아니오</No>
      </Choice>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  background-color: ${(props) => props.theme.backgroundLighter};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  & > * {
    position: absolute;
  }
`;

const Question = styled.div`
  top: 30%;
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  font-weight: bold;
`;

const Choice = styled.div`
  bottom: 30%;
  transform: translate(0, 50%);
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  font-size: 1.2rem;
  font-weight: bold;
  & > * {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: ${(props) => props.theme.backgroundDarker};
    &:hover {
      color: ${(props) => props.theme.highlight};
    }
  }
`;

const Yes = styled.div``;

const No = styled.div``;

export default Modal;
