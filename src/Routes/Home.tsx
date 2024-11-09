import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { saveNowLoggedInUser } from "../model/localstorage";

interface IHome {
  setGhCode: (ghCode: string) => void;
}

function Home({ setGhCode }: IHome) {
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code") ?? "";
  useEffect(() => {
    fetch("http://localhost:8000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ghCode,
      }),
    });
    if (ghCode !== "") {
      saveNowLoggedInUser(ghCode);
      setGhCode(ghCode);
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
