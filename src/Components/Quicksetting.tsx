import {
  faGear,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { userConfigState } from "../States/userAtom";
import { IUserConfig } from "../types/types";
import useModalContext from "../Hooks/useModalContext";
import useUISettings from "../Hooks/useUISettings";

function QuickSetting() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const { isDarkTheme } = useRecoilValue<IUserConfig>(userConfigState);
  const { modalAction, modalResponse } = useModalContext();
  const { handleUIScale, handleDarkMode } = useUISettings();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 200);
  };
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  useEffect(() => {
    if (modalResponse.confirm && modalResponse.modalId === "UIScale") {
      handleUIScale(modalResponse.rangeValue);
    }
  }, [modalResponse]);

  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <FontAwesomeIcon icon={faGear} className="headerBtn" />
      {isHovered && (
        <DropList>
          <DropItem onClick={() => handleDarkMode()}>
            <Label className="dropItemBtn">Dark mode:</Label>
            {isDarkTheme ? (
              <FontAwesomeIcon className="dropItemBtn" icon={faToggleOn} />
            ) : (
              <FontAwesomeIcon className="dropItemBtn" icon={faToggleOff} />
            )}
          </DropItem>
          <DropItem
            className="dropItemBtn"
            onClick={() => modalAction({ modalId: "UIScale" })}
          >
            화면 크기
          </DropItem>
          <DropItem
            className="dropItemBtn"
            onClick={() => navigate("/setting")}
          >
            Settings
          </DropItem>
        </DropList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const DropList = styled.div`
  position: absolute;
  top: 50px;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundLighter};
  border-radius: 0 0 10px 10px;
  box-shadow: ${(props) => props.theme.boxShadow};
  cursor: default;
  & > * {
    color: ${(props) => props.theme.text};
    :visited {
      color: ${(props) => props.theme.text};
    }
  }
  .dropItemBtn {
    font-size: ${(props) => props.theme.fontSizes.m}px;
  }
`;

const Label = styled.label``;

const DropItem = styled.div`
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 10px 0;
  user-select: none;
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.backgroundDarker};
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

export default QuickSetting;
