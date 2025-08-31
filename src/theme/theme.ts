import { DefaultTheme } from "styled-components";

const baseTheme: DefaultTheme = {
  boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2), -2px -2px 4px rgba(0, 0, 0, 0.2)",
};

export const darkTheme: DefaultTheme = {
  ...baseTheme,
  text: "whitesmoke",
  highlightPositive: "springgreen",
  highlightNegative: "red",
  backgroundRegular: "#374151",
  backgroundLighter: "#374251",
  backgroundDarker: "#2A303E",
};

export const lightTheme: DefaultTheme = {
  ...baseTheme,
  text: "black",
  highlightPositive: "green",
  highlightNegative: "firebrick",
  backgroundRegular: "#F9FAFB",
  backgroundLighter: "#FFFFFF",
  backgroundDarker: "#E5E7EB",
};
