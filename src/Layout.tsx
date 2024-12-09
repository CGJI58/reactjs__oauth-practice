import { FC, ReactNode } from "react";
import Header from "./Components/Header";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
      <ScrollTopBtn onClick={() => moveTop()}>🔝</ScrollTopBtn>
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

const ScrollTopBtn = styled.div`
  position: fixed;
  bottom: 50px;
  right: 50px;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s;
  &:hover {
    opacity: 0.8;
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export default Layout;
