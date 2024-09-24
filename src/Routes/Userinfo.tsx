import styled from "styled-components";
import { useLocation } from "react-router-dom";

function Userinfo() {
  const location = useLocation();
  const ghCode = new URLSearchParams(location.search).get("code");
  if (ghCode) {
    getAccessToken(ghCode);
  }

  return (
    <Wrapper>
      <span>github code : {ghCode}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const getAccessToken = async (ghCode: string) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.REACT_APP_CLIENT_ID ?? "",
    client_secret: process.env.REACT_APP_CLIENT_SECRET ?? "",
    code: ghCode,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const data = await fetch(finalUrl, {
    method: "POST",
    // mode: "no-cors",
  });
  console.log(data);
  // console.log("Response status:", data.status);
  // const json = await data.json();
  // console.log("Response JSON: ", json);
};

export default Userinfo;
