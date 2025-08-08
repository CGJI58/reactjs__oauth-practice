import styled from "styled-components";
import { IModalProp } from "../../types/modal";

function RangeModal({ setModalAnswer }: Partial<IModalProp>) {
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
    <Choice>
      <RangeBar type="range"></RangeBar>
      <Confirm>
        <Yes onClick={onYes}>확인</Yes>
      </Confirm>
    </Choice>
  );
}

export default RangeModal;

const Choice = styled.div`
  background-color: pink;
  bottom: 30%;
  transform: translate(0, 50%);
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: column;
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

const RangeBar = styled.input``;

const Confirm = styled.div`
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
