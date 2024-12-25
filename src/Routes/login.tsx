import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { IUserState, userState } from "../atoms";
import { getCodeRequestURL, getUserByGhCode } from "../utility/utility";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [codeRequestURL, setCodeRequestURL] = useState("");
  const ghCode = new URLSearchParams(location.search).get("code");
  const setUser = useSetRecoilState<IUserState>(userState);

  useEffect(() => {
    getCodeRequestURL().then((url) => setCodeRequestURL(url));
  }, []);

  useEffect(() => {
    if (ghCode) {
      getUserByGhCode(ghCode)
        .then((user) => setUser(user))
        .then(() => navigate("/"));
    }
  }, [ghCode]);

  return (
    <Wrapper>
      <Popup>
        <Link to="/">
          <ExitBtn>❌</ExitBtn>
        </Link>
        <Title>Log In</Title>
        <Link to={codeRequestURL}>
          <GithubButton>
            <FontAwesomeIcon icon={faGithub} size="2x" />
            <span>Log in with a github</span>
          </GithubButton>
        </Link>
      </Popup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.8);
  box-sizing: border-box;
`;
const Popup = styled.div`
  position: relative;
  width: 400px;
  height: 300px;
  box-sizing: border-box;
  border-radius: 10px;
  background-color: darkcyan;
  display: flex;
  flex-direction: column;
  padding: 50px;
  gap: 20px;
`;

const ExitBtn = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  width: 30px;
  height: 30px;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const GithubButton = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  box-sizing: border-box;
  gap: 20px;
  background-color: #1f2937;
  cursor: pointer;
  color: white;
  border-radius: 10px;
  width: 100%;
  a {
    color: white;
    text-decoration: none;
  }
`;

export default Login;
