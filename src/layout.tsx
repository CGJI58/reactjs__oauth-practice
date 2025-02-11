import { FC, ReactNode } from "react";
import Header from "./Components/header";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
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
  min-height: 100vh;
  color: whitesmoke;
`;

export default Layout;
