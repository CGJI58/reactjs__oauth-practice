import { useEffect, useState } from "react";
import { debounce } from "lodash";

export function useWindowSize() {
  const [innerHeight, setInnerHeight] = useState<number>(0);
  const [innerWidth, setInnerWidth] = useState<number>(0);

  useEffect(() => {
    setInnerHeight(window.innerHeight);
    setInnerWidth(window.innerWidth);

    const handleResize = debounce(() => {
      setInnerHeight(window.innerHeight);
      setInnerWidth(window.innerWidth);
    }, 500);

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      handleResize.cancel();
    };
  }, []);

  return { innerHeight, innerWidth };
}

export default useWindowSize;
