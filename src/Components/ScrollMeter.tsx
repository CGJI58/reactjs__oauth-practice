import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function ScrollMeter() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [innerHeight, setInnerHeight] = useState<number>(window.innerHeight);
  const [scrollHeight, setScrollHeight] = useState<number>(
    document.documentElement.scrollHeight
  );
  const [noScroll, setNoScroll] = useState<boolean>(true);

  const throttledScroll = useRef(
    throttle(
      (progressValue: number) => {
        const progress = progressValue * 100;

        setScrollProgress(progress);
      },
      200,
      { leading: false, trailing: true }
    )
  );

  const observer = new MutationObserver(() => {
    const currentHeight = document.documentElement.scrollHeight;
    setScrollHeight(() => currentHeight);
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });

  useMotionValueEvent(scrollYProgress, "change", (progressValue) => {
    if (noScroll) {
      throttledScroll.current(0);
      setNoScroll(false);
    } else {
      throttledScroll.current(progressValue);
    }
  });

  window.addEventListener("resize", () => {
    setInnerHeight(() => window.innerHeight);
  });

  useEffect(() => {
    if (innerHeight === scrollHeight) {
      setNoScroll(true);
    }
  }, [innerHeight, scrollHeight]);

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
