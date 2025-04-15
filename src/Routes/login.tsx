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
            <FontAwesomeIcon icon={faXmark} color="whitesmoke" />
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
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;
const Popup = styled.div`
  z-index: 101;
  position: relative;
  width: 400px;
  height: 300px;

  border-radius: 10px;
  background-color: ${(props) => props.theme.background.lighter};
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
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const GithubButton = styled.div`
  & > a {
    background-color: ${(props) => props.theme.background.regular};
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2), 4px 4px 8px rgba(0, 0, 0, 0.2);

    border-radius: 10px;
    padding: 10px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 20px;
    color: ${(props) => props.theme.text};
    text-decoration: none;
    :visited {
      color: ${(props) => props.theme.text};
      text-decoration: none;
    }
  }
`;

export default Login;
