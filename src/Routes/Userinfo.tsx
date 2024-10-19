import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Userinfo() {
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code");
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

  return <Wrapper></Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Userinfo;
