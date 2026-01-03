import { useMemo } from "react";
import { IUserConfig } from "../types/types";
import { darkTheme, lightTheme } from "../theme/theme";

function useUserTheme({ isDarkTheme, UIScale }: IUserConfig) {
  return useMemo(() => {
    const baseFontSize = 14 + UIScale * 2; // 14, 16, 18, 20
    const UIMaxWidth = 500 + UIScale * 100; // 500, 600, 700, 800
    return {
      ...(isDarkTheme ? darkTheme : lightTheme),
      fontSizes: {
        xxl: baseFontSize * 2,
        xl: baseFontSize * 1.4,
        l: baseFontSize * 1.2,
        m: baseFontSize * 1,
        s: baseFontSize * 0.7,
        xs: baseFontSize * 0.4,
        fixed: 12,
      },
      UIMaxWidth,
    };
  }, [isDarkTheme, UIScale]);
}

export default useUserTheme;
