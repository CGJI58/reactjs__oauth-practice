import styled from "styled-components";
import Header from "../Components/Header";
import { useMatch } from "react-router-dom";
import Login from "./Login";
import Userinfo from "./Userinfo";
import { useEffect, useState } from "react";

function Home() {
  const loginMatch = useMatch("/login");
  const userInfoMatch = useMatch("/userinfo");
  const [data, setData] = useState({ clientId: "" });
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((data) => setData(data));
  }, []);
  return (
    <Wrapper>
      <Header />
      {loginMatch ? <Login /> : null}
      {userInfoMatch ? <Userinfo /> : null}
      <span>{data.clientId}</span>
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
