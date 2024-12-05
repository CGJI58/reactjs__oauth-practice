import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IUserState, userState } from "../atoms";
import { updateUser } from "../utility/utility";

function Header() {
  const navigate = useNavigate();
  const [user, setUser] = useRecoilState<IUserState>(userState);
  const onLogOut = () => {
    setUser((prev) => ({ ...prev, login: false }));
    updateUser(user);
    navigate("/");
  };

  return (
    <Wrapper>
      <Link to="/">
        <Col>Home</Col>
      </Link>
      {user.login ? (
        <Link to={`/userinfo`}>
          <Col>User info</Col>
        </Link>
      ) : null}
      {user.login ? (
        <Col onClick={() => onLogOut()}>Log out</Col>
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
  width: 1fr;
  padding: 0 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

export default Header;
