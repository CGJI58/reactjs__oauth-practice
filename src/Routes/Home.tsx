import styled from "styled-components";
import Header from "../Components/Header";
import { useMatch } from "react-router-dom";
import Login from "./Login";
import Userinfo from "./Userinfo";
import { useEffect, useState } from "react";

function Home() {
  const loginMatch = useMatch("/login");
  const userInfoMatch = useMatch("/userinfo");
  return (
    <Wrapper>
      <Header />
      {loginMatch ? <Login /> : null}
      {userInfoMatch ? <Userinfo /> : null}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  padding-top: 50px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: #374151;
  height: 100vh;
  color: whitesmoke;
`;

export default Home;
