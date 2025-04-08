import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function ScrollTopBtn() {
  const moveTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Wrapper onClick={() => moveTop()}>
      <FontAwesomeIcon icon={faCircleUp} />
    </Wrapper>
  );
}

export default ScrollTopBtn;

const Wrapper = styled.div`
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.5;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
`;
