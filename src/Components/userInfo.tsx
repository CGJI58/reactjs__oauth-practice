import {
  faCircleUser,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { userConfigState } from "../States/atoms";
import { IUserConfig } from "../types/types";

function UserInfo() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [{ nickname, isDarkTheme }, setUserConfig] =
    useRecoilState<IUserConfig>(userConfigState);
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
  return (
    <Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <FontAwesomeIcon icon={faCircleUser} />
      {isHovered && (
        <DropList>
          <DropItem onClick={() => navigate("/profile")}>{nickname}</DropItem>
          <DropItem
            onClick={() =>
              setUserConfig((prev) => ({
                ...prev,
                isDarkTheme: !prev.isDarkTheme,
              }))
            }
          >
            <Label>Dark mode:</Label>
            {isDarkTheme ? (
              <FontAwesomeIcon icon={faToggleOn} />
            ) : (
              <FontAwesomeIcon icon={faToggleOff} />
            )}
          </DropItem>
          <DropItem onClick={() => navigate("/logout")}>Log out</DropItem>
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
    font-size: 1rem;
    color: ${(props) => props.theme.text};
    :visited {
      color: ${(props) => props.theme.text};
    }
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
  transition: all 0.3s;
  &:hover {
    background-color: ${(props) => props.theme.backgroundDarker};
  }
  &:last-child {
    border-radius: 0 0 10px 10px;
  }
`;

export default UserInfo;
