import { FC, ReactNode } from "react";
import Header from "../Components/header";
import styled from "styled-components";
import useUpdate from "../Hooks/useUpdate";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  useUpdate();
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundRegular};
  min-height: 100vh;
  color: ${(props) => props.theme.text};
  & > * {
    max-width: 600px;
  }
  main {
    padding-top: 50px;
    width: 100%;
    min-height: 100vh;
    position: relative;
  }
`;

export default Layout;
