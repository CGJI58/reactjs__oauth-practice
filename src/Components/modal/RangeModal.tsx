import styled from "styled-components";
import {
  IUserConfig,
  ModalId,
  OnAnswer,
  RangeProps,
  UIScaleOption,
} from "../../types/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { userConfigState } from "../../States/atoms";
import useTypeGuard from "../../Hooks/useTypeGuard";
import { backgroundGradient } from "../../theme/animations";
import useFocusTrap from "../../Hooks/useFocusTrap";

interface IRangeModal {
  modalId: ModalId;
  onAnswer: OnAnswer;
  rangeProps: RangeProps;
}

function RangeModal({ modalId, onAnswer, rangeProps }: IRangeModal) {
  const { isUIScaleOption } = useTypeGuard();
  const { UIScale } = useRecoilValue<IUserConfig>(userConfigState);
  const [rangeValue, setRangeValue] = useState<UIScaleOption>(UIScale);
  const defaultInputRef = useRef<HTMLInputElement>(null);
  const { runFocusTrap } = useFocusTrap();
  const choiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (defaultInputRef.current) {
      defaultInputRef.current.focus();
    }
  }, []);
  useEffect(() => {
    if (choiceRef?.current) {
      const container = choiceRef.current;
      runFocusTrap({ container });
    }
  }, []);

  return (
    <Choice ref={choiceRef}>
      <Notice>
        {rangeProps?.indexArray[rangeValue] ?? "error: no rangeIndexArray"}
      </Notice>
      <Panel>
        <RangeBar
          ref={defaultInputRef}
          type="range"
          min={0}
          max={rangeProps?.indexArray.length - 1}
          step={1}
          value={rangeValue}
          onChange={(event) => {
            const rawRangeValue = Number(event.target.value);
            if (isUIScaleOption(rawRangeValue)) {
              setRangeValue(rawRangeValue);
            }
          }}
        ></RangeBar>
      </Panel>
      <Confirm>
        <Yes
          type="button"
          value="확인"
          onClick={() =>
            onAnswer({ modalId, visible: false, confirm: true, rangeValue })
          }
        />
      </Confirm>
    </Choice>
  );
}

export default RangeModal;

const Choice = styled.div`
  gap: 20px;
  bottom: 30%;
  transform: translate(0, 50%);
  width: 70%;
  display: flex;
  flex-direction: column;
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
  align-items: center;
`;

const Notice = styled.span``;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const RangeBar = styled.input.attrs({ type: "range" })`
  cursor: pointer;
  width: 100%;
`;

const Confirm = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
`;

const Yes = styled.input`
  color: ${(props) => props.theme.text};
  font-size: ${(props) => props.theme.fontSizes.l}px;
  font-weight: bold;
  width: 100px;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundDarker};
  &:focus {
    animation: ${({ theme }) =>
        backgroundGradient(theme.backgroundDarker, theme.highlightPositive)}
      1s infinite linear;
  }
  &:hover {
    background-color: ${(props) => props.theme.highlightPositive};
  }
`;
