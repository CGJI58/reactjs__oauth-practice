import { useMotionValueEvent, useScroll } from "framer-motion";
import { throttle } from "lodash";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "./useWindowSize";

function useScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const { innerHeight } = useWindowSize();
  const [scrollHeight, setScrollHeight] = useState<number>(
    document.documentElement.scrollHeight
  );
  const [noScroll, setNoScroll] = useState<boolean>();

  //scroll event를 0.2초 당 최대 한 번 감지. 마지막 이벤트 사용 true.
  const throttledScroll = useRef(
    throttle(
      (progressValue: number) => setScrollProgress(progressValue * 100),
      200,
      { trailing: true }
    )
  );

  //사용자의 조작으로 인한 변화에 따른 scrollHeight 변화 감지
  useEffect(() => {
    const target = document.documentElement;
    const resizeObserver = new ResizeObserver(() => {
      setScrollHeight(() => target.scrollHeight);
    });
    resizeObserver.observe(target);
    return () => resizeObserver.disconnect();
  }, []);

  useMotionValueEvent(scrollYProgress, "change", (progressValue) => {
    throttledScroll.current(progressValue);
  });

  useEffect(() => {
    setNoScroll(innerHeight >= scrollHeight);
  }, [innerHeight, scrollHeight]);

  // 스크롤값이 0 (맨 위) 아닌 상태에서 noScroll===true가 되면 scrollMeter가 100인 채로 굳어버림.
  // 그리고 그냥 noScroll===true인 페이지 렌더링하면 초기값으로다가 scrollMeter가 100이 되어버림.
  // 나중에서 버그 수정할것
  return { scrollProgress, noScroll };
}

export default useScrollProgress;
