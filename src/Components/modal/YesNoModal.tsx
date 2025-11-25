import styled from "styled-components";
import { ModalId, OnAnswer } from "../../types/types";

interface IYesNoModal {
  modalId: ModalId;
  onAnswer: OnAnswer;
}

function YesNoModal({ modalId, onAnswer }: IYesNoModal) {
  return (
    <Choice>
      <Yes onClick={() => onAnswer({ modalId, visible: false, confirm: true })}>
        예
      </Yes>
      <No onClick={() => onAnswer({ modalId, visible: false, confirm: false })}>
        아니오
      </No>
    </Choice>
  );
}
const Choice = styled.div`
  bottom: 50%;
  transform: translate(0, 50%);
  width: 70%;
  height: 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
  & > * {
    width: 100px;
    height: 3rem;
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
