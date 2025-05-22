import styled from "styled-components";
import { IModalProp } from "../types/types";

function Modal({ sentence, setModalAnswer }: Partial<IModalProp>) {
  const onYes = () => {
    if (setModalAnswer) {
      setModalAnswer(true);
    }
  };
  const onNo = () => {
    if (setModalAnswer) {
      setModalAnswer(false);
    }
  };
  return (
    <ModalBackground>
      <Wrapper>
        <Question>{sentence}</Question>
        <Choice>
          <Yes onClick={() => onYes()}>예</Yes>
          <No onClick={() => onNo()}>아니오</No>
        </Choice>
      </Wrapper>
    </ModalBackground>
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
  }
`;

const Yes = styled.div`
  &:hover {
    color: ${(props) => props.theme.highlightPositive};
  }
`;

const No = styled.div`
  &:hover {
    color: ${(props) => props.theme.highlightNegative};
  }
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

export default Modal;
