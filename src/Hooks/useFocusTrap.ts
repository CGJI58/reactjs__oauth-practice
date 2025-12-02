import { useLayoutEffect, useState } from "react";
import { focusableSelectors } from "../constants/variants";

interface IRunFocusTrap {
  container: HTMLElement;
}

export function useFocusTrap() {
  const [container, setContainer] = useState<HTMLElement | null>(null);

  const runFocusTrap = ({ container }: IRunFocusTrap) => {
    setContainer(container);
  };

  useLayoutEffect(() => {
    if (!container) return;

    const getFocusableElements = (): Array<HTMLElement> =>
      Array.from(
        container.querySelectorAll<HTMLElement>(focusableSelectors.join(","))
      );

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" && event.key !== "Escape") return;

      const focusableEls = getFocusableElements();
      if (focusableEls.length <= 1) return;

      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (event.key === "Escape") {
        const focusWall = document.querySelector<HTMLElement>(".focusWall");
        if (focusWall) {
          const index = focusableEls.findIndex(
            (el) => el === document.activeElement
          );
          if (index > 0) {
            focusableEls[index - 1]?.focus();
            focusableEls[index - 1]?.blur();
          } else {
            focusWall.focus();
            focusWall.blur();
          }
        }
      } else {
        if (event.shiftKey) {
          // Shift+Tab
          if (document.activeElement === firstEl) {
            event.preventDefault();
            lastEl.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastEl) {
            event.preventDefault();
            firstEl.focus();
          }
        }
      }
    };

    container.addEventListener("keydown", handleKeyDown);

    return () => container.removeEventListener("keydown", handleKeyDown);
  }, [container]);

  return { runFocusTrap };
}

export default useFocusTrap;
