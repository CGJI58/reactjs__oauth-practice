import styled from "styled-components";
import { useLocation } from "react-router-dom";

const CLIENT_ID = "Ov23likK8jCwRyDMDNi8";
const CLIENT_SECRET = "";

function Userinfo() {
  const location = useLocation();
  const githubCode = new URLSearchParams(location.search).get("code");
  // `https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${githubCode}`;
  return (
    <Wrapper>
      <span>github code : {githubCode}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Userinfo;
