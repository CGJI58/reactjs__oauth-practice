import {
  faCircleUser,
  faToggleOff,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Nickname from "./nickname";
import { useRecoilState } from "recoil";
import { isDarkThemeState } from "../States/atoms";

function UserInfo() {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] =
    useRecoilState<boolean>(isDarkThemeState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 500);
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
          <DropItem>
            <Nickname />
          </DropItem>
          <DropItem onClick={() => setIsDarkTheme((prev) => !prev)}>
            <Label>Dark mode:</Label>
            {isDarkTheme ? (
              <FontAwesomeIcon icon={faToggleOn} />
            ) : (
              <FontAwesomeIcon icon={faToggleOff} />
            )}
          </DropItem>
          <DropItem>
            <Link to="/logout">Log out</Link>
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
  width: 50%;
  min-width: 200px;
  @media (max-width: 600px) {
    width: 90vw;
    right: 0;
  }
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
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default UserInfo;
