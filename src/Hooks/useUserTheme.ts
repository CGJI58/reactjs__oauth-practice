import { useMemo } from "react";
import { IUserConfig } from "../types/types";
import { darkTheme, lightTheme } from "../theme/theme";

function useUserTheme({ isDarkTheme, UIScale }: IUserConfig) {
  const baseFontSize = 14 + UIScale * 2;
  const UIWidth = 500 + UIScale * 100;
  return useMemo(() => {
    return {
      ...(isDarkTheme ? darkTheme : lightTheme),
      fontSizes: {
        xxl: baseFontSize * 2,
        xl: baseFontSize * 1.4,
        l: baseFontSize * 1.2,
        m: baseFontSize * 1,
        s: baseFontSize * 0.8,
        xs: baseFontSize * 0.6,
      },
      UIWidth,
    };
  }, [isDarkTheme, UIScale]);
}

export default useUserTheme;
