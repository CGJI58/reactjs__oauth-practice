import styled from "styled-components";
import { IModalProp } from "../../types/types";

function YesNoModal({ setModalAnswer }: Partial<IModalProp>) {
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
      <Yes onClick={() => onYes()}>예</Yes>
      <No onClick={() => onNo()}>아니오</No>
    </Choice>
  );
}
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

export default YesNoModal;
