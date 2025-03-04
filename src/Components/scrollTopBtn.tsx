import styled from "styled-components";

function ScrollTopBtn() {
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return <Wrapper onClick={() => moveTop()}>🔝</Wrapper>;
}

export default ScrollTopBtn;

const Wrapper = styled.div`
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
