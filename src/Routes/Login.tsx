import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Login() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    scope: "read:user user:email",
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code");
  useEffect(() => {
    if (ghCode) {
      const accessTokenUrl = getAccessTokenUrl(ghCode);
      console.log(accessTokenUrl);
      fetchAccessToken(accessTokenUrl);
    }
  }, [ghCode]);
  return (
    <Wrapper>
      <Popup>
        <ExitBtn>
          <Link to="/">❌</Link>
        </ExitBtn>
        <Title>Log In</Title>
        <Link to={finalUrl}>
          <GithubButton>
            <FontAwesomeIcon icon={faGithub} size="2x" />
            <span>get gh code</span>
          </GithubButton>
        </Link>
        {ghCode ? (
          <LoginButton>
            <Link to={getAccessTokenUrl(ghCode)}>Log in</Link>
          </LoginButton>
        ) : null}
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
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  a {
    text-decoration: none;
  }
`;

const Title = styled.div`
  font-size: 34px;
  font-weight: 800;
  margin-bottom: 10px;
`;

const LoginForm = styled.form`
  display: grid;
  grid-template-columns: 4fr 1fr;
  gap: 5px;
`;

const IDPWBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  input {
    border-radius: 5px;
    padding: 5px;
  }
`;

const LoginButton = styled.button`
  border-radius: 10px;
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

const getAccessTokenUrl = (ghCode: string) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    client_secret: process.env.REACT_APP_CLIENT_SECRET ?? "",
    code: ghCode,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  return finalUrl;
};

const fetchAccessToken = async (accessTokenUrl: string) => {
  const data = await fetch(accessTokenUrl);
  const json = await data.json();
  console.log(json);
  // return json;
};

export default Login;
