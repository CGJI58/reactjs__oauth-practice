// animations.ts
import { keyframes } from "styled-components";

export const backgroundGradient = (bg: string, hi: string) => keyframes`
  0%   { background-color: ${bg}; }
  50% { background-color: ${hi};
 }
  100% { background-color: ${bg}; }
`;
