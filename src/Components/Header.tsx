import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { userInfoState } from "../States/userAtom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import QuickSetting from "./Quicksetting";
import ScrollMeter from "./ScrollMeter";
import { IUserInfo } from "../types/types";
import { defaultDiary } from "../constants/defaults";

function Header() {
  const { githubId } = useRecoilValue<IUserInfo>(userInfoState);

  return (
    <Wrapper>
      <HomeBtn />
      {githubId === null && <LoginBtn />}
      {githubId !== null && <WriteBtn userId={githubId} />}
      {githubId !== null && <QuickSettingBtn />}
      {githubId !== null && <ScrollMeter />}
    </Wrapper>
  );
}

function HomeBtn() {
  return (
    <Col>
      <StyledLink to="/" tabIndex={-1}>
        <FontAwesomeIcon className="headerBtn" icon={faHouse} />
      </StyledLink>
    </Col>
  );
}

function WriteBtn({ userId }: { userId: number }) {
  return (
    <Col>
      <StyledLink
        to={{ pathname: "/write", search: "?mode=create" }}
        state={{ diary: { ...defaultDiary, userId } }}
        tabIndex={-1}
      >
        <div className="headerBtn">Write</div>
      </StyledLink>
    </Col>
  );
}

function LoginBtn() {
  return (
    <Col>
      <StyledLink to="/login" tabIndex={-1}>
        <div className="headerBtn">Log in</div>
      </StyledLink>
    </Col>
  );
}

function QuickSettingBtn() {
  return (
    <Col>
      <QuickSetting />
    </Col>
  );
}

const Wrapper = styled.header`
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
    user-select: none;
    color: ${(props) => props.theme.text};
  }
  .headerBtn {
    font-size: ${(props) => props.theme.fontSizes.xl}px;
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
