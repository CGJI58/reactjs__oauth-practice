import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Home() {
  const location = useLocation();
  const ghCode =
    new URLSearchParams(location.search).get("code") ?? "not logged in";
  console.log(ghCode);
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
  }, [ghCode]);

  return (
    <Wrapper>
      <span>Home page</span>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

export default Home;
