import { faCircleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

function ScrollTopBtn() {
  const moveTop = () => {
    window.scrollTo({ top: 0 });
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
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.3;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
  * {
    font-size: ${(props) => props.theme.fontSizes.xxl}px;
  }
`;
