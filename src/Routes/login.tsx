import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getCodeRequestURL, loginByGhCode } from "../Api/api";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [codeRequestURL, setCodeRequestURL] = useState("");
  const ghCode = new URLSearchParams(location.search).get("code");
  const popupRef = useRef<HTMLDivElement | null>(null);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      popupRef.current &&
      event.target instanceof Node &&
      !popupRef.current.contains(event.target)
    ) {
      console.log("oustside popup clicked");
      navigate("/");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  useEffect(() => {
    if (ghCode) {
      loginByGhCode(ghCode).then(() => navigate("/"));
    } else {
      getCodeRequestURL().then((url) => setCodeRequestURL(url));
    }
  }, [ghCode]);

  return (
    <Wrapper>
      <Popup ref={popupRef}>
        <Link to="/">
          <ExitBtn>
            <FontAwesomeIcon icon={faXmark} />
          </ExitBtn>
        </Link>
        <Title>Log In</Title>
        <GithubButton>
          <Link to={codeRequestURL}>
            <FontAwesomeIcon icon={faGithub} size="2x" />
            <span>Log in with a github</span>
          </Link>
        </GithubButton>
      </Popup>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Popup = styled.div`
  z-index: 101;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 300px;
  box-shadow: ${(props) => props.theme.boxShadow};
  border-radius: 10px;
  background-color: ${(props) => props.theme.backgroundLighter};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const ExitBtn = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  background-color: ${(props) => props.theme.backgroundDarker};
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  * {
    color: ${(props) => props.theme.text};
  }
`;

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 10px;
`;

const GithubButton = styled.div`
  & > a {
    background-color: ${(props) => props.theme.backgroundDarker};
    box-shadow: ${(props) => props.theme.boxShadow};
    border-radius: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    font-size: 0.9rem;
    color: ${(props) => props.theme.text};
    text-decoration: none;
    :visited {
      color: ${(props) => props.theme.text};
      text-decoration: none;
    }
  }
`;

export default Login;
