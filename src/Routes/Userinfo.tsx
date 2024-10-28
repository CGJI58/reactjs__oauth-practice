import { useEffect } from "react";
import styled from "styled-components";

interface IUserinfo {
  ghCode: string;
}

function Userinfo({ ghCode }: IUserinfo) {
  return <Wrapper>{ghCode}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Userinfo;
