import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

function Userinfo() {
  const location = useLocation();
  const userId = new URLSearchParams(location.search).get("id");
  const userPw = new URLSearchParams(location.search).get("pw");
  const githubCode = new URLSearchParams(location.search).get("code");
  return (
    <Wrapper>
      <span>ID : {userId}</span>
      <span>PW : {userPw}</span>
      <span>github code : {githubCode}</span>
    </Wrapper>
  );
}

export default Userinfo;
