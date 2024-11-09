import { FC, ReactNode } from "react";
import Header from "./Components/Header";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
  token: string;
}

const Layout: FC<LayoutProps> = ({ children, token }) => {
  return (
    <Wrapper>
      <Header token={token} />
      <main>{children}</main>
    </Wrapper>
  );
};

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

export default Layout;
