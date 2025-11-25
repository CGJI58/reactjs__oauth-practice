import styled from "styled-components";
import YesNoModal from "./YesNoModal";
import RangeModal from "./RangeModal";
import { IModalProps, OnAnswer } from "../../types/types";
import { useCallback, useEffect, useRef } from "react";

function Modal(modalProps: IModalProps) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { modalId, sentence, modalOption, rangeProps, onAnswer, visible } =
    modalProps;
  const onAnswerRef = useRef<OnAnswer>();

  const handleOutsideClick = useCallback(
    (event: MouseEvent) => {
      if (
        popupRef.current &&
        onAnswerRef.current &&
        event.target instanceof Node &&
        !popupRef.current.contains(event.target)
      ) {
        onAnswerRef.current({ modalId, visible: false, confirm: false });
      }
    },
    [modalId]
  );

  useEffect(() => {
    onAnswerRef.current = onAnswer;
  }, [onAnswer]);

  useEffect(() => {
    if (visible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [visible, handleOutsideClick]);

  return visible ? (
    <ModalBackground>
      <Wrapper ref={popupRef}>
        <Sentence>{sentence}</Sentence>
        {modalOption === "YesNo" && (
          <YesNoModal modalId={modalId} onAnswer={onAnswer} />
        )}
        {modalOption === "Range" && (
          <RangeModal
            modalId={modalId}
            onAnswer={onAnswer}
            rangeProps={rangeProps ?? { indexArray: [] }}
          />
        )}
      </Wrapper>
    </ModalBackground>
  ) : null;
}

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

const Wrapper = styled.div`
  z-index: 100;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.backgroundLighter};
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  & > * {
    position: absolute;
  }
`;

const Sentence = styled.div`
  top: 30%;
  left: 50%;
  width: 100%;
  display: flex;
  justify-content: center;
  transform: translate(-50%, -50%);
  font-size: ${(props) => props.theme.fontSizes.xl}px;
  font-weight: bold;
`;

export default Modal;
