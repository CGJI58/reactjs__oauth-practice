import { motion } from "framer-motion";
import styled from "styled-components";
import useScrollProgress from "../Hooks/useScrollProgress";

function ScrollMeter() {
  const { scrollProgress } = useScrollProgress();
  return (
    <Wrapper
      scrollprogress={scrollProgress}
      animate={{ width: `${scrollProgress}%` }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    />
  );
}

const Wrapper = styled(motion.div)<{ scrollprogress: number }>`
  height: 2px;
  left: 0px;
  bottom: 0px;
  background-color: ${(props) => props.theme.highlightNegative};
  position: absolute;
`;

export default ScrollMeter;
