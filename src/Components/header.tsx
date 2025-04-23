import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState, userState } from "../States/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import UserInfo from "./userInfo";
import ScrollMeter from "./ScrollMeter";

function Header() {
  const {
    userInfo: { email },
  } = useRecoilValue<IUserState>(userState);

  return (
    <Wrapper>
      <HomeBtn />
      {email === "" && <LoginBtn />}
      {email !== "" && <WriteBtn />}
      {email !== "" && <UserInfoBtn />}
      {email !== "" && <ScrollMeter />}
    </Wrapper>
  );
}

function HomeBtn() {
  return (
    <Col>
      <StyledLink to="/">
        <FontAwesomeIcon icon={faHouse} />
      </StyledLink>
    </Col>
  );
}

function WriteBtn() {
  return (
    <Col>
      <StyledLink
        to={{ pathname: "/write", search: "?mode=create" }}
        state={{ diary: { id: "", date: "", title: "", text: "" } }}
      >
        Write
      </StyledLink>
    </Col>
  );
}

function LoginBtn() {
  return (
    <Col>
      <StyledLink to="/login">Log in</StyledLink>
    </Col>
  );
}

function UserInfoBtn() {
  return (
    <Col>
      <UserInfo />
    </Col>
  );
}

const Wrapper = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.backgroundLighter};
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-weight: bold;
  font-size: 1.5rem;
  box-shadow: ${(props) => props.theme.boxShadow};
  a {
    cursor: default;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
`;

const Col = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: ${(props) => props.theme.backgroundDarker};
  }

  & > * {
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${(props) => props.theme.text};
  }
`;

const StyledLink = styled(Link)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  &:visited {
    color: ${(props) => props.theme.text};
  }
`;

export default Header;
