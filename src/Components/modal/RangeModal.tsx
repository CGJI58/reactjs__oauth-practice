import styled from "styled-components";
import { IUserConfig, IModalProp } from "../../types/types";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { userConfigState } from "../../States/atoms";

function RangeModal({ setModalAnswer, modalId }: Partial<IModalProp>) {
  const [userConfig, setUserConfig] =
    useRecoilState<IUserConfig>(userConfigState);
  const [fontSize, setFontSize] = useState<number>(userConfig.fontSize);
  const onYes = () => {
    if (setModalAnswer) {
      if (modalId === "fontSize") {
        setUserConfig((prev) => ({ ...prev, fontSize }));
      }
      if (modalId === "screenWidth") {
        //화면너비 적용. 위와 동일 예정
      }
      setModalAnswer(true);
    }
  };
  return (
    <Choice>
      {modalId === "fontSize" && (
        <Panel>
          <Example $fontSize={fontSize}>가나다 ABC abc 123</Example>
          <RangeBar
            type="range"
            min={12}
            max={24}
            step={1}
            value={fontSize}
            onChange={(event) => setFontSize(Number(event.target.value))}
          ></RangeBar>
          <span>{`${fontSize}px`}</span>
        </Panel>
      )}
      {modalId === "screenWidth" && (
        <div>스마트폰 너비에 맞게 320 ~ 480 옵션 제공할 예정</div>
      )}
      <Confirm>
        <Yes onClick={onYes}>확인</Yes>
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
`;

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Example = styled.span<{ $fontSize: number }>`
  font-size: ${(props) => props.$fontSize}px;
  margin-bottom: 10px;
  height: 30px;
  display: flex;
  align-items: center;
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

const Yes = styled.div`
  width: 100px;
  height: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: ${(props) => props.theme.backgroundDarker};
  &:hover {
    color: ${(props) => props.theme.highlightPositive};
  }
`;
