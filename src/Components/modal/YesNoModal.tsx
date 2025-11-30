import styled from "styled-components";
import { ModalId, OnAnswer } from "../../types/types";
import { useEffect, useRef } from "react";
import { backgroundGradient } from "../../theme/animations";

interface IYesNoModal {
  modalId: ModalId;
  onAnswer: OnAnswer;
}

function YesNoModal({ modalId, onAnswer }: IYesNoModal) {
  const yesRef = useRef<HTMLInputElement>(null);
  const noRef = useRef<HTMLInputElement>(null);
  const yesArr: Array<ModalId> = ["modifyDiary", "saveDiary", "nickname"];
  const noArr: Array<ModalId> = [
    "deleteDiary",
    "clearDiaries",
    "logOut",
    "signOut",
  ];

  useEffect(() => {
    if (modalId !== null) {
      if (yesArr.includes(modalId)) {
        yesRef.current?.focus();
      } else if (noArr.includes(modalId)) {
        noRef.current?.focus();
      }
    }
  }, [modalId]);

  return (
    <Choice>
      <Yes
        ref={yesRef}
        type="button"
        value="예"
        onClick={() => onAnswer({ modalId, visible: false, confirm: true })}
      />
      <No
        ref={noRef}
        type="button"
        value="아니오"
        onClick={() => onAnswer({ modalId, visible: false, confirm: false })}
      />
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
  & > * {
    background-color: ${(props) => props.theme.backgroundDarker};
    color: ${(props) => props.theme.text};
    font-size: ${(props) => props.theme.fontSizes.l}px;
    font-weight: bold;
    width: 100px;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Yes = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightPositive)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightPositive};
  }
`;

const No = styled.input`
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightNegative)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightNegative};
  }
`;

export default YesNoModal;
