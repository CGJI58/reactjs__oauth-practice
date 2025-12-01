import styled from "styled-components";
import { ModalId, OnAnswer } from "../../types/types";
import { useEffect, useRef } from "react";
import { backgroundGradient } from "../../theme/animations";
import { defaultFocusVariants } from "../../constants/variants";
import useFocusTrap from "../../Hooks/useFocusTrap";

interface IYesNoModal {
  modalId: ModalId;
  onAnswer: OnAnswer;
}

function YesNoModal({ modalId, onAnswer }: IYesNoModal) {
  const yesRef = useRef<HTMLInputElement>(null);
  const noRef = useRef<HTMLInputElement>(null);
  const { yesArr, noArr } = defaultFocusVariants;
  const { runFocusTrap } = useFocusTrap();
  const choiceRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (modalId !== null) {
      if (yesArr.includes(modalId)) {
        yesRef.current?.focus();
      } else if (noArr.includes(modalId)) {
        noRef.current?.focus();
      }
    }
  }, [modalId]);

  useEffect(() => {
    if (choiceRef?.current) {
      const container = choiceRef.current;
      runFocusTrap({ container });
    }
  }, []);

  return (
    <Choice ref={choiceRef}>
      <Yes
        ref={yesRef}
        type="button"
        tabIndex={1}
        value="예"
        onClick={() => onAnswer({ modalId, visible: false, confirm: true })}
      />
      <No
        ref={noRef}
        type="button"
        tabIndex={2}
        value="아니오"
        onClick={() => onAnswer({ modalId, visible: false, confirm: false })}
      />
    </Choice>
  );
}
const Choice = styled.form`
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
