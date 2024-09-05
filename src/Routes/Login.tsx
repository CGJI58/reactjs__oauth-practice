import styled from "styled-components";
import Header from "../Components/Header";

const Wrapper = styled.div`
  height: 100vh;
  background-color: gray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  width: 600px;
  height: 400px;
  border-radius: 10px;
  padding: 50px;
  box-sizing: border-box;
  gap: 5px;
`;

const BoxHeader = styled.div``;

const BoxLabel = styled.h4``;

const GithubBtn = styled.div`
  width: 50px;
  height: 50px;
  background-color: black;
  border-radius: 50%;
`;

function Login() {
  return (
    <Wrapper>
      <Header />
      <LoginBox>
        <BoxHeader>Log In</BoxHeader>
        <BoxLabel>ID</BoxLabel>
        <input placeholder="ID" />
        <BoxLabel>PW</BoxLabel>
        <input placeholder="PW" />
        <button>log in</button>
        <BoxLabel>log in with a github</BoxLabel>
        <GithubBtn />
      </LoginBox>
    </Wrapper>
  );
}

export default Login;
