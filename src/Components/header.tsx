import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState, userState } from "../States/atoms";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import UserInfo from "./userInfo";
import ScrollMeter from "./ScrollMeter";

function Header() {
  const user = useRecoilValue<IUserState>(userState);

  return (
    <Wrapper>
      <Col>
        <StyledLink to="/">
          <FontAwesomeIcon icon={faHouse} />
        </StyledLink>
      </Col>
      {user.userInfo?.email === "" ? null : (
        <Col>
          <StyledLink
            to={{ pathname: "/write", search: "?mode=create" }}
            state={{ diary: { id: "", date: "", title: "", text: "" } }}
          >
            Write
          </StyledLink>
        </Col>
      )}
      {user.userInfo?.email === "" ? (
        <Col>
          <StyledLink to="/login">Log in</StyledLink>
        </Col>
      ) : (
        <Col>
          <UserInfo />
        </Col>
      )}
      <ScrollMeter />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 99;
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.background.lighter};
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.5rem;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.05), 4px 4px 8px rgba(0, 0, 0, 0.05);
  a {
    cursor: default;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
`;

const Col = styled.div`
  width: 30%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
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
