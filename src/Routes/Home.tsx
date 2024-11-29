import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { IUserState, userState } from "../atoms";
import { useSetRecoilState } from "recoil";

async function login(ghCode: string) {
  const response = await fetch("http://localhost:8000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ghCode,
    }),
  });
  const data = await response.json();
  return data;
}

function Home() {
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code");
  const setUser = useSetRecoilState<IUserState>(userState);

  useEffect(() => {
    if (ghCode) {
      login(ghCode).then((user) => setUser(user));
    }
  }, [ghCode]);

  return (
    <Wrapper>
      <span>Home page</span>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
