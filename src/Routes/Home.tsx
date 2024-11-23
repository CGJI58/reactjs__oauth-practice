import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { defaultUserState, IUserState, userState } from "../atoms";
import { useRecoilState } from "recoil";

const postGhCode = async (ghCode: string) => {
  await fetch("http://localhost:8000/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ghCode,
    }),
  });
};

function Home() {
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code");
  const [user, setUser] = useRecoilState<IUserState>(userState);
  useEffect(() => {
    if (ghCode) {
      postGhCode(ghCode);
      setUser((prev) => ({ ...prev, ghCode }));
    }
  }, [setUser, ghCode]);

  return (
    <Wrapper>
      <span>Home page</span>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
