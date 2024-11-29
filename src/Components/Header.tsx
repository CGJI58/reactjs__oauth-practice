import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { IUserState, userState } from "../atoms";

function Header() {
  const { login } = useRecoilValue<IUserState>(userState);

  return (
    <Wrapper>
      <Link to="/">
        <Col>Home</Col>
      </Link>
      {login ? (
        <Link to={`/userinfo`}>
          <Col>User info</Col>
        </Link>
      ) : (
        <Link to="/login">
          <Col>Log in</Col>
        </Link>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 24px;
  background-color: rgba(0, 0, 0, 0.2);
  a {
    height: 100%;
    text-decoration: none;
    color: whitesmoke;
  }
`;

const Col = styled.div`
  width: 100px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Header;
