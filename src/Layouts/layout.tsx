import { FC, ReactNode } from "react";
import Header from "../Components/header";
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
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.backgroundRegular};
  min-height: 100vh;
  color: ${(props) => props.theme.text};
  main {
    margin-top: 50px;
    height: 100%;
  }
`;

export default Layout;
