import styled from "styled-components";
import YesNoModal from "./YesNoModal";
import RangeModal from "./RangeModal";
import { IModalProp } from "../../types/types";
import { useEffect, useRef } from "react";

function Modal(modalProps: IModalProp) {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { sentence, modalOption, rangeProps, onAnswer, visible } = modalProps;

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popupRef.current &&
      event.target instanceof Node &&
      !popupRef.current.contains(event.target)
    ) {
      onAnswer({ visible: false, confirm: false });
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return visible ? (
    <ModalBackground>
      <Wrapper ref={popupRef}>
        <Sentence>{sentence}</Sentence>
        {modalOption === "YesNo" && <YesNoModal onAnswer={onAnswer} />}
        {modalOption === "Range" && (
          <RangeModal
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
